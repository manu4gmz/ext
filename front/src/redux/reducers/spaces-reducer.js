import { SPACE, ALLSPACES, IDSPACE } from "../constants"

const initialCartState = {
    allSpaces: [],
    singleSpace: {},
    idSpace: ""
}
export default function (state = initialCartState, action) {
    switch (action.type) {
        case SPACE:
            return { ...state, singleSpace: action.space }
        case IDSPACE:
            return { ...state, idSpace: action.idSpace }
        case ALLSPACES:
            return { ...state, allSpaces: action.allSpaces }
        default:
            return state;
    }

}
