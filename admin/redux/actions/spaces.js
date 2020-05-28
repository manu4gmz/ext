import api from "../api"
import { SET_PENDING, SET_VERIFIED, SET_SPACES, SET_SPACE, SET_REJECTED } from "../constants";
import { fetchUser } from "./users";

const setPending = (spaces) => ({
    type: SET_PENDING,
    spaces
});

const setVerified = (spaces) => ({
    type: SET_VERIFIED,
    spaces
});

const setRejected = (spaces) => ({
    type: SET_REJECTED,
    spaces
});


const setSpaces = (spaces) => ({
    type: SET_SPACES,
    spaces
});

const setSpace = (space) => ({
    type: SET_SPACE,
    space
});



export const fetchSpace = (spaceId) => dispatch => {
    return api.get(`/properties/singleSpace/${spaceId}`)
        .then(res => res.data)
        .then(res => {
            return fetchUser(res.userId)
            .then(user => {
                dispatch(setSpace({
                    ...res,
                    user
                }));
                return res;

            })
        })
}

export const fetchSpaces = (type, filter = {}, page = 1) => dispatch => {
    
    let query = { ...filter };

    if (!["pending","verified","all","rejected"].includes(type)) return;

    let resultCb;


    switch (type) {
        case "pending":
            query.enabled = true;
            resultCb = setPending;
            break;
        case "verified":
            query.v = true;
            resultCb = setVerified;
            break;
        case "rejected":
            query.rejected = true;
            resultCb = setRejected;
            break;
        case "all":
            resultCb = setSpaces;
            break;
    }

    const queries = Object.keys(query).map(key => key + "=" + query[key]).join("&");
        
    return api.get(`/properties/${page}${queries ? "?" + queries : ""}`)
        .then(res => res.data)
        .then(data => {
            dispatch(resultCb(data))
            return data;
        })
}

export const enableSpace = (id) => dispatch => {
    return api.put(`/properties/enable/${id}`)
        .then(()=>dispatch(fetchSpace(id)));
}

export const disableSpace = (id) => dispatch => {
    return api.put(`/properties/disable/${id}`)
        .then(()=>dispatch(fetchSpace(id)));
}

export const verifySpace = (id) => dispatch => {
    return api.put(`/properties/verify/${id}`)
        .then(()=>dispatch(fetchSpace(id)));
}

export const unverifySpace = (id) => dispatch => {
    return api.put(`/properties/unverify/${id}`)
        .then(()=>dispatch(fetchSpace(id)));
}