import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Comments from "../components/Comments";
import { fetchSpace, writeComment, fetchComments, writeResponse } from "../../redux/actions/spaces";

const CommentsContainer = ({ space, fetchSpace, id, writeComment, route, user, navigation, fetchComments, comments, writeResponse }) => {
  useEffect(() => {
    fetchSpace(route.params.propertyId);
    fetchComments(route.params.propertyId)
  }, []);

  const [comment, setComment] = useState("");
  const [response, setResponse] = useState("")

  function handleCommentChange(e) {
    setComment(e);
  }

  function handleSubmit() {
    //Le mando el nombre y apellido del usuario loggeado para guardarlo como info en el comment
    writeComment(route.params.propertyId, comment, `${user.firstName} ${user.lastName}`)
  }

  function handleResponseChange(e) {
    setResponse(e);
  }

  function handleResponse(commentIndex) {
    writeResponse(route.params.propertyId, commentIndex, response)
  }

  function redirectToLogin() {
    return navigation.navigate(`Login`)
  }

  function redirectToUser(id) {
    //para ver info del que comento
    console.log(`redirect to ${id}`)
  }

  return (
    <Comments
      space={space}
      comments={comments}
      handleCommentChange={handleCommentChange}
      handleSubmit={handleSubmit}
      handleResponseChange={handleResponseChange}
      handleResponse={handleResponse}
      redirectToLogin={redirectToLogin}
      redirectToUser={redirectToUser}
      user={user}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: state.spaces.idSpace,
    space: state.spaces.singleSpace,
    comments: state.spaces.comments,
    user: state.profile.userInfo
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
