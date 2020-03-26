import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import SingleView from "../components/SingleView";
import { singleSpace } from "../../redux/actions/spaces"
const SingleViewPage = ({ space, singleSpace }) => {
    useEffect(() => {
        singleSpace(id);

    }, [])
    return <SingleView space={space} />;
};

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.match.params.id,
        space: state.spaces.singleSpace
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        singleSpace: (spaceId) => (dispatch(singleSpace(spaceId)))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleViewPage);
