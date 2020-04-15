import axios from "axios"
import { SPACE, ALLSPACES, IDSPACE, PORPERTIESID, ALLCOMMENTS, PROPIETARIO } from "../constants"

const propertiesId = (id) => ({
    type: PORPERTIESID,
    id
})

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
})

const fetchPropietario = (propietarioId) => ({
    type: PROPIETARIO,
    propietarioId
})

export const fecthUserProp = (propId) => dispatch => {
    return axios.get(`https://ext-api.web.app/api/users/info/${propId}`)
        .then((data) => {
            return dispatch(fetchPropietario(data.data))
        })
}

const allComments = (comments) => ({
    type: ALLCOMMENTS,
    comments
})

export const fetchSpace = (spaceId) => dispatch => {
    return axios.get(`https://ext-api.web.app/api/properties/singleSpace/${spaceId}`)
        .then(res => res.data)
        .then(res => {
            dispatch(singleSpace(res))
            return res
        })
}

export const fetchSpaces = (datosSpace, page = 1) => dispatch => {
    const queries = Object.keys(datosSpace).map(key => key + "=" + datosSpace[key]).join("&");
    return axios.get(`https://ext-api.web.app/api/properties/${page}${queries ? "?" + queries : ""}`)
        .then(res => res.data)
        .then(data => {
            dispatch(allSpaces(data))
            return data;
        })
}
export const fetchId = (id) => dispatch => {
    return dispatch(captureId(id))
}

export const addSpace = (body) => dispatch => {
    return axios
        .post(`https://ext-api.web.app/api/properties/createSpace`, body)
        .then(res => res.data)
        .catch(error => console.log(error))
}

export const addPhotos = (id, body) => dispatch => {
    return axios
        .put(`https://ext-api.web.app/api/properties/update/${id}`, {
            ...body,
            uid: getState().user.logged.uid
        })
        .then(res => res.data)
        .catch(error => console.log(error))
}

export const editSpace = (propertyId, body) => (dispatch, getState) => {
    console.log(getState().user.logged.uid)
    return axios
        .put(`https://ext-api.web.app/api/properties/update/${propertyId}`, {
            ...body,
            uid: getState().user.logged.uid
        })
        .then(res => {
            console.log("Todo bien al parecer...")
            return propertyId
        })
        .catch(error => console.log(error))
}

export const fetchComments = id => (dispatch) => {
    return axios
        .get(`http://localhost:5000/ext-api/us-central1/app/api/properties/comments/${id}`)
        .then(res => res.data)
        .then(data => dispatch(allComments(data)))
}

export const writeComment = (id, comment, nombre) => (dispatch, getState) => {
    return axios
        .put(`https://ext-api.web.app/api/properties/comments/${id}`, { comment, userId: getState().user.logged.uid, nombre })
        // .put(`http://localhost:5000/ext-api/us-central1/app/api/properties/comments/${id}`, { comment, userId: getState().user.logged.uid, nombre })
        .then(res => dispatch(allComments(res.data)))
    // console.log({ comment, userId: getState().user.logged.uid, nombre })
}

export const writeResponse = (propertyId, commentIndex, response) => dispatch => {
    return axios
        .put(`https://ext-api.web.app/api/properties/response?propertyId=${propertyId}&commentIndex=${commentIndex}`, { response })
        // .put(`http://localhost:5000/ext-api/us-central1/app/api/properties/response?propertyId=${propertyId}&commentIndex=${commentIndex}`, { response })
        .then(res => dispatch(allComments(res.data)))
}       