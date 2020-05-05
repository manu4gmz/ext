import { LOGGED, USERPROPERTIES, USERFAVS, DELFAV, DELFAVS, ADDFAVORITE } from "../constants"

const initialCartState = {
    logged: {},
    properties: [],
    favorites: []
}

export default function (state = initialCartState, action) {
    switch (action.type) {
        case LOGGED:
            return { ...state, logged: action.logged }
        case USERPROPERTIES:
            return { ...state, properties: action.properties }
        case USERFAVS:
            return { ...state, favorites: action.favs } 
        case DELFAVS:
            return { ...state, favorites: []}    
        case DELFAV:
            return { ...state, favorites: action.fav}  
        case ADDFAVORITE:
            return {...state,favorites: action.id }           
        default:
            return state;
    }
}
