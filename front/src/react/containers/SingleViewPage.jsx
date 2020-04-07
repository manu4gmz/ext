import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import SingleView from "../components/SingleView";
import { fetchSpace } from "../../redux/actions/spaces"
const SingleViewPage = ({ space, fetchSpace, id, route, navigation, user }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchSpace(route.params.propertyId)
        .then(()=>setLoading(false));

    }, [])

    function handleEdit() {
        navigation.push("EditSpace", {propertyId: route.params.propertyId})
    }

    console.log(user)
    const editable = user && user.properties && user.properties.includes(route.params.propertyId);

    return <SingleView space={space} loading={loading} edit={editable} handleEdit={handleEdit}/>;
};

const mapStateToProps = (state, ownProps) => {
    return {
        id: state.spaces.idSpace,
        space: state.spaces.singleSpace,
        user: state.user.logged
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchSpace: (spaceId) => dispatch(fetchSpace(spaceId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleViewPage);
