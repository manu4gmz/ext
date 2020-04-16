import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import BackgroundAllSpaces from "../components/backgroundAllSpaces";
import { fetchSpaces } from "../../redux/actions/spaces"
import { fetchFav, fetchFavs,deleteFav, deleteFavs, addFav  } from "../../redux/actions/user"
import Axios from "axios";

function AllSpaces({ allSpaces, user, navigation,deleteFav,addFav, deleteFavs, route, fetchSpaces,state,fetchFavs }) {

  const scrollView = useRef(null);
  const [loading, setLoading] = useState(true)
  const [spaces, setSpaces] = useState({ properties: [], total: 0, pages: 0 });

  useEffect(() => {
    if (!user) return;
    deleteFavs()
    fetchFav(user.uid)
      .then((res) => {
        fetchFavs(res.data.favoritos)
      })
    fetchSpaces(route.params.query, route.params.index)
      .then(data => {
        setSpaces(data);
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

  function favorites (userId, id, espacio) {
    let favoritos = state.user.favorites
      if(favoritos.length && favoritos.some(fav=> fav.id == id)){
        let newFavs =  favoritos.filter(fav => fav.id !== id)
        deleteFavs()
        deleteFav(newFavs, id, userId)
        
    } else {
      let newFavs = [...favoritos, espacio]
      addFav(newFavs,userId,id)      
    }
  
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
      favs={state.user.favorites}
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
    user: state.user.logged,
    state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchFavs: (favoritos) => (dispatch(fetchFavs(favoritos))),
    fetchSpaces: (query, index) => (dispatch(fetchSpaces(query, index))),
    deleteFavs: () => (dispatch(deleteFavs())),
    deleteFav: (favorites, id, userId) => (dispatch(deleteFav(favorites, id, userId))),
    addFav: (newFavs,userId,id) => (dispatch(addFav(newFavs,userId,id)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSpaces);