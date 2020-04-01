import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import BackgroundAllSpaces from "../components/backgroundAllSpaces";
//import { fetchId } from "../../redux/actions/spaces"
import { fetchSpaces } from "../../redux/actions/spaces"


// const AllSpaces = () => {
function AllSpaces({ allSpaces, navigation, route, fetchSpaces }) {

  const scrollView = useRef(null);

  //const [index, setIndex] = useState(1);

  useEffect(()=>{
    fetchSpaces(route.params.query, route.params.index);
  },[])

  function setIndex(i) {
    console.log(i);
    navigation.push("AllSpaces", {query:route.params.query, index: i})
  }

  function sendId(id) {
    //fetchId(id)
    return navigation.navigate(`SingleView`, {propertyId: id})
  }

  return (
    <BackgroundAllSpaces
      allSpaces={allSpaces.properties}
      total={allSpaces.total}
      pages={allSpaces.pages}
      navigation={navigation}
      sendId={sendId}
      setIndex={setIndex}
      scrollView={scrollView}
      index={route.params.index}
    />
  );
}

const mapStateToProps = (state, ownProps) => {
  return {

    allSpaces: state.spaces.allSpaces
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSpaces: (query, index) => (dispatch(fetchSpaces(query, index)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSpaces);