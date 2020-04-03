import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Comments from "../components/Comments";
import { fetchSpace, writeComment } from "../../redux/actions/spaces";

const CommentsContainer = ({ space, fetchSpace, id, writeComment }) => {
  useEffect(() => {
    fetchSpace(id);
  }, []);

  const [comment, setComment] = useState("");

  function handleCommentChange(e) {
    setComment(e);
  }

  function handleSubmit() {
    // console.log(id, { comment, userId: "userIdTest1", rating: 5 });
    //hacer que las estrellas seteen el rating
    //conseguir el userId del que postea el comment
    let rating = 5;
    writeComment(id, comment, rating);
  }

  return (
    <Comments
      space={space}
      handleCommentChange={handleCommentChange}
      handleSubmit={handleSubmit}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: state.spaces.idSpace,
    space: state.spaces.singleSpace
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSpace: spaceId => dispatch(fetchSpace(spaceId)),
    writeComment: (...params) => dispatch(writeComment(...params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
