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
    axios.get(`/singleSpace/${spaceId}`)
        .then(res => dispatch(singleSpace(res.data)))
}

export const fetchSpaces = (datosSpace) => dispatch => {
    axios.get(`/singleSpace?z=${datosSpace.n}&c=${datosSpace.p}&t=${datosSpace.t}&v=${datosSpace.v}`)
        .then(res => dispatch(allSpaces(res.data)))
}
