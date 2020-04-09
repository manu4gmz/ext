import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Comments from "../components/Comments";
import { fetchSpace, writeComment } from "../../redux/actions/spaces";

const CommentsContainer = ({ space, fetchSpace, id, writeComment, route, user, navigation }) => {
  useEffect(() => {
    fetchSpace(route.params.propertyId);
  }, [space]);

  const [comment, setComment] = useState("");

  function handleCommentChange(e) {
    setComment(e);
  }

  function handleSubmit() {
    //Le mando el nombre y apellido del usuario loggeado para guardarlo como info en el comment
    writeComment(route.params.propertyId, comment, `${user.firstName} ${user.lastName}`)
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
      handleCommentChange={handleCommentChange}
      handleSubmit={handleSubmit}
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
    user: state.profile.userInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSpace: spaceId => dispatch(fetchSpace(spaceId)),
    writeComment: (...params) => dispatch(writeComment(...params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
