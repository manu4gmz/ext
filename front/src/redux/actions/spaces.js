import api from "../api"
import { SPACE, ALLSPACES, IDSPACE, PORPERTIESID, ALLCOMMENTS, PROPIETARIO } from "../constants";



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

const fetchPropietario = (propietario) => ({
    type: PROPIETARIO,
    propietario
})

export const fecthUserProp = (propId) => dispatch => {
    return api.get(`/users/info/${propId}`)
        .then((data) => {
            return dispatch(fetchPropietario(data.data))
        })
}

const allComments = (comments) => ({
    type: ALLCOMMENTS,
    comments
})

export const fetchSpace = (spaceId) => dispatch => {
    return api.get(`/properties/singleSpace/${spaceId}`)
        .then(res => res.data)
        .then(res => {
            dispatch(singleSpace(res))
            return res
        })
}

export const fetchSpaces = (datosSpace, page = 1) => dispatch => {
    const queries = Object.keys(datosSpace).map(key => key + "=" + datosSpace[key]).join("&");
    return api.get(`/properties/${page}${queries ? "?" + queries : ""}`)
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
    return api
        .post(`/properties/createSpace`, body)
        .then(res => res.data)
        .catch(error => console.log(error))
}

export const addPhotos = (id, body) => dispatch => {
    return api
        .put(`/properties/update/${id}`, {
            ...body,
            uid: getState().user.logged.uid
        })
        .then(res => res.data)
        .catch(error => console.log(error))
}

export const editSpace = (propertyId, body) => (dispatch, getState) => {
    console.log(getState().user.logged.uid)
    return api
        .put(`/properties/update/${propertyId}`, {
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
    return api
        .get(`/properties/comments/${id}`)
        .then(res => res.data)
        .then(data => dispatch(allComments(data)))
}

export const writeComment = (id, comment) => (dispatch, getState) => {
    return api
        .post(`/properties/comments/${id}`, { comment, rating: 5 })
        // .put(`http://localhost:5000/ext-api/us-central1/app/api/properties/comments/${id}`, { comment, userId: getState().user.logged.uid, nombre })
        .then(res => dispatch(allComments(res.data)))
    // console.log({ comment, userId: getState().user.logged.uid, nombre })
}

export const writeResponse = (propertyId, commentId, response) => dispatch => {
    return api
        .post(`/properties/comments/${propertyId}/${commentId}`, { comment: response })
        .then(res => dispatch(fetchComments(propertyId)))
}       