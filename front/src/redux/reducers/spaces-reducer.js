import { SPACE, ALLSPACES, IDSPACE, ALLCOMMENTS } from "../constants"

const initialCartState = {
    allSpaces: {
        properties: [],
        total: 0,
        pages: 0,
    },
    singleSpace: {},
    idSpace: "",
    comments: [],
}
export default function (state = initialCartState, action) {
    switch (action.type) {
        case SPACE:
            return { ...state, singleSpace: action.space }
        case IDSPACE:
            return { ...state, idSpace: action.idSpace }
        case ALLSPACES:
            return { ...state, allSpaces: action.allSpaces }
        case ALLCOMMENTS:
            return { ...state, comments: action.comments }
        default:
            return state;
    }

}
