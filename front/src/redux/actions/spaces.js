import axios from "axios"
import { SPACE, ALLSPACES, IDSPACE } from "../constants"

const allSpaces = (allSpaces) => ({
    type: ALLSPACES,
    allSpaces
});
const singleSpace = (space) => ({
    type: SPACE,
    space
});
const captureId = (idSpace) => ({
    type: IDSPACE,
    idSpace
});

export const fetchSpace = (spaceId) => dispatch => {
    axios.get(`https://ext-api.web.app/api/properties/singleSpace/${spaceId}`)
        .then(res => dispatch(singleSpace(res.data)))
}

export const fetchSpaces = (datosSpace) => dispatch => {
    return axios.get(`https://ext-api.web.app/api/properties/spaces?z=${datosSpace.n}&c=${datosSpace.p}&t=${datosSpace.t}&v=${datosSpace.v}`)
        .then(res => dispatch(allSpaces(res.data)))
}
export const fetchId = (id) => dispatch => {
    return dispatch(captureId(id))
}

export const addSpace = (body) => dispatch => {
    return axios
        .post(`http://localhost:5000/ext-api/us-central1/app/api/properties/createSpace`, body)
        .then(res => res)
        .catch(error => console.log(error))
}


//https://ext-api.web.app/api/