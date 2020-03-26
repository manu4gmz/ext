import axios from "axios"
import { SPACE, ALLSPACES } from "../constants"

const allSpaces = (allSpaces) => ({
    type: ALLSPACES,
    allSpaces
});
const singleSpace = (space) => ({
    type: SPACE,
    space
});

export const fetchSpace = (spaceId) => dispatch => {
    axios.get(`http://localhost:5000/ext-api/us-central1/app/api/properties/singleSpace/${spaceId}`)
        .then(res => dispatch(singleSpace(res.data)))
}

export const fetchSpaces = (datosSpace) => dispatch => {
    axios.get(`http://localhost:5000/ext-api/us-central1/app/api/properties/spaces?z=${datosSpace.n}&c=${datosSpace.p}&t=${datosSpace.t}&v=${datosSpace.v}`)
        .then(res => dispatch(allSpaces(res.data)))
}
