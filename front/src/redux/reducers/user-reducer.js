import { LOGGED, USERPROPERTIES, USERFAVS} from "../constants"

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
            return { ...state, properties: action.properties };
        case USERFAVS:
            return { ...state, favorites: action.properties };       
        default:
            return state;
    }
}
