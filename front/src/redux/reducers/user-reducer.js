import { LOGGED, USERPROPERTIES } from "../constants"

const initialCartState = {
    logged: {},
    properties: []
}

export default function (state = initialCartState, action) {
    switch (action.type) {
        case LOGGED:
            return { ...state, logged: action.logged }
        case USERPROPERTIES:
            return { ...state, properties: action.properties }
        default:
            return state;
    }
}
