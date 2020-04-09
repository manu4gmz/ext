import { ADD_PICTURE, REMOVE_PICTURE, SET_PICTURES } from "../constants"

const inicialState = []

export default (state = inicialState, action) => {
  switch (action.type) {
    case SET_PICTURES:
      console.log("ndea")
      return action.pictures
  	case ADD_PICTURE:
  		return [...state, action.picture]
  	case REMOVE_PICTURE:
  		return [...state.filter(a => a.uri != action.picture.uri ) ]
    default:
      return state
  }
} 