import { SET_FORM } from "../constants"

const inicialState = {}

export default (state = inicialState, action) => {
  switch (action.type) {
  	case SET_FORM:
  		return { ...state, [action.name]:action.form }
    default:
      return state
  }
} 