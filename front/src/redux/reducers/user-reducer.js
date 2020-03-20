import { LOGGED } from "../constants"

const initialCartState = {
    logged: {}
}
export default function (state = initialCartState, action) {
    switch (action.type) {
        case LOGGED:
            return { ...state, logged: action.logged }
        default:
            return state;
    }
}