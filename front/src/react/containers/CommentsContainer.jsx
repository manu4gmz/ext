import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Comments from "../components/Comments";
import { fetchSpace, writeComment, fetchComments, writeResponse } from "../../redux/actions/spaces";
import Loading from "../components/Loading";

const CommentsContainer = ({ space, fetchSpace, id, writeComment, route, user, navigation, fetchComments, comments, writeResponse }) => {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  
  useEffect(() => {
    fetchSpace(route.params.propertyId);
    fetchComments(route.params.propertyId)
    .then(()=>setLoading(false))
  }, [route.params.propertyId]);

  const [comment, setComment] = useState("");
  const [response, setResponse] = useState({})

  function handleCommentChange(text) {
    if (response.id) {
      setResponse({...response, response: text});
    }
    else { 
      setComment(text);
    }
    
  }

  function handleSubmit() {
    //Le mando el nombre y apellido del usuario loggeado para guardarlo como info en el comment
    if (response.id) {
      writeResponse(route.params.propertyId, response.id, response.response)
      .then(()=> setResponse({}))
    }
    else { 
      writeComment(route.params.propertyId, comment, rating)
      .then(()=> setComment(""))
    }
  }

  function handleResponseChange(e,index) {
    setResponse(res => {
      const newRes = [...res];
      newRes[index] = e;
      return newRes;
    });
  }

  function handleResponse(commentIndex) {
    writeResponse(route.params.propertyId, commentIndex, response[commentIndex])
  }

  function redirectToLogin() {
    return navigation.navigate(`Login`)
  }

  function setResponseComment(comment) {
    setResponse(comment);
  }

  if (loading) return <Loading/>;

  return (
    <Comments
      space={space}
      comments={comments}
      comment={comment}
      handleCommentChange={handleCommentChange}
      handleSubmit={handleSubmit}
      handleResponseChange={handleResponseChange}
      handleResponse={handleResponse}
      redirectToLogin={redirectToLogin}
      response={response}
      setResponseComment={setResponseComment}
      user={user}
      setRating={setRating}
      rating={rating}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: state.spaces.idSpace,
    space: state.spaces.singleSpace,
    comments: state.spaces.comments,
    user: state.user.logged
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSpace: spaceId => dispatch(fetchSpace(spaceId)),
    fetchComments: id => dispatch(fetchComments(id)),
    writeComment: (...params) => dispatch(writeComment(...params)),
    writeResponse: (...params) => dispatch(writeResponse(...params)) //propertyId, commentIndex, response
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
