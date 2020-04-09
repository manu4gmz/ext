import { ADD_PICTURE, REMOVE_PICTURE } from "../constants"

const inicialState = []

export default (state = inicialState, action) => {
  switch (action.type) {
  	case ADD_PICTURE:
  		return [...state, action.picture]
  	case REMOVE_PICTURE:
  		return [...state.filter(a => a.uri != action.picture.uri ) ]
    default:
      return state
  }
} 