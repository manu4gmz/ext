import React, {useState} from "react";
import { TouchableOpacity, Image } from "react-native";
import {connect} from "react-redux";

import { addFav } from "../../redux/actions/user";

const FavButton = ({espacio, toggleFav, user}) => {
    const [liked, setLiked] = useState((user.favoritos || []).includes(espacio.id))

    return (
    <TouchableOpacity onPress={() => {
        setLiked(l => !l); 
        toggleFav();
    }}>
        <Image
            style={{ width: 30, height: 30, marginRight: 2 }}
            source={
                liked ? 
                    require("../../public/icons/corazon-ro.png") 
                    : require("../../public/icons/corazon-ne.png")
            }
        />
    </TouchableOpacity>
)}


/*
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
*/

const mapStateToProps = (state, ownProps) => ({
    user: state.user.logged
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleFav: () => dispatch(addFav(ownProps.espacio.id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FavButton);