import { USERINFO } from "../constants"

const initialCartState = {
  userInfo: {}
}

export default function (state = initialCartState, action) {
  switch (action.type) {
    case USERINFO:
      return { ...state, singleSpace: action.info }
    default:
      return state;
  }

}
