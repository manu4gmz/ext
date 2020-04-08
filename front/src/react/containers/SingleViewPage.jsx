import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import SingleView from "../components/SingleView";
import { fetchSpace } from "../../redux/actions/spaces"
const SingleViewPage = ({ space, fetchSpace, id, route, allSpaces, navigation }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchSpace(route.params.propertyId)
            .then(() => setLoading(false));

    }, [])
    return <SingleView space={space} allSpaces={allSpaces} loading={loading} navigation={navigation} />;
};

const mapStateToProps = (state, ownProps) => {
    return {
        id: state.spaces.idSpace,
        space: state.spaces.singleSpace,
        allSpaces: state.spaces.allSpaces,

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchSpace: (spaceId) => dispatch(fetchSpace(spaceId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleViewPage);
