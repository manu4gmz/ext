import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import BackgroundAllSpaces from "../components/AllSpacesMosaic";
//import BackgroundAllSpaces from "../components/backgroundAllSpaces";
import { fetchSpaces, fetchMoreSpaces } from "../../redux/actions/spaces";

function AllSpaces({ spaces, user, navigation,deleteFav,addFav, deleteFavs, route, fetchSpaces,state,fetchFavs, fetchMoreSpaces }) {

  const scrollView = useRef(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(2);
  //const [spaces, setSpaces] = useState({ properties: [], total: 0, pages: 0 });

  useEffect(() => {
    fetchSpaces(route.params.query)
    .then(data => {
      setLoading(false);
    });
  }, [])

  function setIndex(i) {
    navigation.push("AllSpaces", { query: route.params.query, index: i })
  }

  function sendId(id) {
    return navigation.navigate(`SingleView`, { propertyId: id })
  }

  function showComments(id) {
    return navigation.navigate(`Comments`, { propertyId: id })
  }

  function endlessScrolling () {
    if (page > spaces.pages) return;
    fetchMoreSpaces(route.params.query, page);
    setPage(i => i+1);
  }

  function removeFilter(key) {
    const { query } = route.params;
    delete query[key];

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
      markers={spaces.markers}
      user={user}
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
      showComments={showComments}
      onReachedEnd={endlessScrolling}
      suggestions={spaces.suggestions}
    />
  );
}  



const mapStateToProps = (state, ownProps) => {
  return {
    spaces: state.spaces.allSpaces,
    user: state.user.logged,
    state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSpaces: (query, index) => (dispatch(fetchSpaces(query, index))),
    fetchMoreSpaces: (query, index) => (dispatch(fetchMoreSpaces(query, index)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSpaces);