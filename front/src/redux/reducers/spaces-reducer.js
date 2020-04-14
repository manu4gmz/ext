import { SPACE, ALLSPACES, IDSPACE, SET_CENTROIDE } from "../constants"

const initialCartState = {
    allSpaces: {
        properties: [],
        total: 0,
        pages: 0,
    },
    singleSpace: {},
    idSpace: "",
    coordenadas: {},
    centroide: {lat: -34.6144934119689, lon: -58.4458563545429}
}
export default function (state = initialCartState, action) {
    switch (action.type) {
        case SET_CENTROIDE:
            return {...state, centroide: action.centroide}
        case SPACE:
            return { ...state, singleSpace: action.space }
        case IDSPACE:
            return { ...state, idSpace: action.idSpace }
        case ALLSPACES:
            return { ...state, allSpaces: action.allSpaces }
        case "COORDENADAS":
            return { ...state, coordenadas: action.coordenadas }
        default:
            return state;
    }

}
