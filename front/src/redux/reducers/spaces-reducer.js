import { SPACE, ALLSPACES, IDSPACE, ALLCOMMENTS, SET_CENTROIDE, PROPIETARIO } from "../constants"

const initialCartState = {
    propietario: {},
    allSpaces: {
        properties: [],
        total: 0,
        pages: 0,
        markers: []
    },
    singleSpace: {},
    idSpace: "",
    comments: [],
    coordenadas: {},
    centroide: { lat: -34.6144934119689, lon: -58.4458563545429 },
}
export default function (state = initialCartState, action) {
    switch (action.type) {
        case SET_CENTROIDE:
            return { ...state, centroide: action.centroide }
        case SPACE:
            return { ...state, singleSpace: action.space }
        case IDSPACE:
            return { ...state, idSpace: action.idSpace }
        case ALLSPACES:
            return { ...state, allSpaces: action.allSpaces }
        case ALLCOMMENTS:
            return { ...state, comments: action.comments }
        case "COORDENADAS":
            return { ...state, coordenadas: action.coordenadas }
        case PROPIETARIO:
            return { ...state, propietario: action.propietarioId }
        default:
            return state;
    }

}
