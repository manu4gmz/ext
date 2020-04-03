import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import BackgroundAllSpaces from "../components/backgroundAllSpaces";
//import { fetchId } from "../../redux/actions/spaces"
import { fetchSpaces } from "../../redux/actions/spaces"


// const AllSpaces = () => {
function AllSpaces({ allSpaces, navigation, route, fetchSpaces }) {

  const scrollView = useRef(null);
  const [ loading, setLoading ] = useState(true)
  const [ spaces, setSpaces ] = useState({properties:[], total: 0, pages: 0});

  //const [index, setIndex] = useState(1);

  useEffect(()=>{
    fetchSpaces(route.params.query, route.params.index)
    .then(data => {
      setLoading(false);
      setSpaces(data);
    });
  },[])

  function setIndex(i) {
    console.log(i);
    navigation.push("AllSpaces", {query:route.params.query, index: i})
  }

  function sendId(id) {
    //fetchId(id)
    return navigation.navigate(`SingleView`, {propertyId: id})
  }

  function removeFilter(key) {
    const { query } = route.params;
    delete query[key]
    console.log(key, route.params.query);
    
    setLoading(true);
    fetchSpaces(query, 1)
    .then(data => {
      setLoading(false);
      setSpaces(data);
    });

    
  }

  return (
    <BackgroundAllSpaces
      allSpaces={spaces.properties}
      total={spaces.total}
      pages={spaces.pages}
      navigation={navigation}
      sendId={sendId}
      setIndex={setIndex}
      scrollView={scrollView}
      index={route.params.index}
      filter={route.params.query}
      removeFilter={removeFilter}
      loading={loading}
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