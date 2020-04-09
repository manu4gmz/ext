import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import SingleView from "../components/SingleView";
import { fetchSpace } from "../../redux/actions/spaces"

const SingleViewPage = ({ space, fetchSpace, id, route, navigation }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchSpace(route.params.propertyId)
        .then(()=>setLoading(false));
    }, [])

    return <SingleView space={space} loading={loading}/>;
};

const mapStateToProps = (state, ownProps) => {
    return {
        id: state.spaces.idSpace,
        space: state.spaces.singleSpace
        
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchSpace: (spaceId) => dispatch(fetchSpace(spaceId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleViewPage);
