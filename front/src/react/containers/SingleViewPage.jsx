import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import SingleView from "../components/SingleView";
import { fetchSpace, fecthUserProp } from "../../redux/actions/spaces"
const SingleViewPage = ({ space, fetchSpace, id, route, allSpaces, navigation, fecthUserProp, propietario }) => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchSpace(route.params.propertyId)
            .then((res) => {
                fecthUserProp(res.userId)
                    .then(() => setLoading(false))
            })
    }, [])


    return <SingleView
        space={space}
        allSpaces={allSpaces}
        loading={loading}
        navigation={navigation}
        propietario={propietario}
    />;
};

const mapStateToProps = (state, ownProps) => {
    return {
        id: state.spaces.idSpace,
        space: state.spaces.singleSpace,
        allSpaces: state.spaces.allSpaces,
        propietario: state.spaces.propietario
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchSpace: (spaceId) => dispatch(fetchSpace(spaceId)),
        fecthUserProp: (propId) => dispatch(fecthUserProp(propId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleViewPage);
