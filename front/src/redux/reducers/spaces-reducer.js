import { SPACE, ALLSPACES } from "../constants"

const initialCartState = {
    allSpaces: [],
    singleSpace: {}
}
export default function (state = initialCartState, action) {
    switch (action.type) {
        case SPACE:
            return { ...state, singleSpace: action.space }
        case ALLSPACES:
            return { ...state, allSpaces: action.allSpaces }
        default:
            return state;
    }

}

