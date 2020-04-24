import { USERINFO } from "../constants"

const inicialState = {
  userInfo: {}
}

export default (state = inicialState, action) => {
  switch (action.type) {
    case USERINFO:
      return { ...state, userInfo: action.info }
    default:
      return state;
  }
}
