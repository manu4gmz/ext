import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import SingleView from "../components/SingleView";
import { fetchSpace, fecthUserProp } from "../../redux/actions/spaces"
const SingleViewPage = ({ space, fetchSpace, id, route, allSpaces, navigation, fecthUserProp, propietario,logged }) => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchSpace(route.params.propertyId)
        .then((space) => {
            setLoading(false);

            if (logged) {
                console.log("Buscando al propietario!")
                fecthUserProp(space.userId);
            }
        })

        
    }, []);

    console.log(propietario)

    return <SingleView
        space={space}
        allSpaces={allSpaces}
        loading={loading}
        navigation={navigation}
        propietario={propietario}
        logged={logged}
    />;
};

const mapStateToProps = (state, ownProps) => {
    return {
        logged: state.user.logged,
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
