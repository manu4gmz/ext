import { SPACE, ALLSPACES, IDSPACE, ALLCOMMENTS, SET_CENTROIDE, PROPIETARIO, MORESPACES } from "../constants"

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
    centroide: null,
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
        case MORESPACES:
            return { 
                ...state, 
                allSpaces: { 
                    ...state.allSpaces, 
                    properties: [
                        ...state.allSpaces.properties, 
                        ...action.result.properties
                    ], 
                    suggestions: [ 
                        ...state.allSpaces.suggestions, 
                        ...action.result.suggestions
                    ], 
                    ads: [ 
                        ...state.allSpaces.ads, 
                        ...action.result.ads
                    ] 
                } 
            }
        case ALLCOMMENTS:
            return { ...state, comments: action.comments }
        case "COORDENADAS":
            return { ...state, coordenadas: action.coordenadas }
        case PROPIETARIO:
            return { ...state, propietario: action.propietario }
        default:
            return state;
    }

}
