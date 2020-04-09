import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import BackgroundAllSpaces from "../components/backgroundAllSpaces";
//import { fetchId } from "../../redux/actions/spaces"
import { fetchSpaces } from "../../redux/actions/spaces"
import { fetchFav } from "../../redux/actions/user"
import Axios from "axios";


// const AllSpaces = () => {
function AllSpaces({ allSpaces, user, navigation, route, fetchSpaces }) {

  const scrollView = useRef(null);
  const [loading, setLoading] = useState(true)
  const [spaces, setSpaces] = useState({ properties: [], total: 0, pages: 0 });
  const [favs, setFavs] = useState([])
  //const [index, setIndex] = useState(1);

  useEffect(() => {
    fetchSpaces(route.params.query, route.params.index)
      .then(data => {
        setLoading(false);
        setSpaces(data);
      });
    if (!user) return;
    fetchFav(user.uid)
      .then(data => {
        setFavs(data.data.favoritos)
      })
  }, [])



  function setIndex(i) {
    navigation.push("AllSpaces", { query: route.params.query, index: i })
  }

  function sendId(id) {
    //fetchId(id)
    return navigation.navigate(`SingleView`, { propertyId: id })
  }

  function showComments(id) {
    return navigation.navigate(`Comments`, { propertyId: id })
  }

  function favorites(id, userId) {
    if (favs && favs.includes(id)) return;
    setFavs(favs => [...(favs || []), id])

    Axios
      .put(`https://ext-api.web.app/api/users/fav/${userId}`, { id })
      .then(res => res.data)
      .catch(error => console.log(error))

    // console.log(id,userId,"favorites")

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
      favs={favs || []}
      user={user}
      total={spaces.total}
      pages={spaces.pages}
      navigation={navigation}
      sendId={sendId}
      favorites={favorites}
      setIndex={setIndex}
      scrollView={scrollView}
      index={route.params.index}
      filter={route.params.query}
      removeFilter={removeFilter}
      loading={loading}
      showComments={showComments}
    />
  );
}



const mapStateToProps = (state, ownProps) => {
  return {

    allSpaces: state.spaces.allSpaces,
    user: state.user.logged
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSpaces: (query, index) => (dispatch(fetchSpaces(query, index)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSpaces);