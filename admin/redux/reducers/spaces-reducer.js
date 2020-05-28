  
import { SET_PENDING, SET_SPACES, SET_VERIFIED, SET_SPACE, SET_REJECTED } from '../constants'

const initialState = {
    pending: {
        properties: [],
        pages: 0,
        total: 0
    },
    verified: {
        properties: [],
        pages: 0,
        total: 0
    },
    rejected: {
        properties: [],
        pages: 0,
        total: 0
    },
    all: {
        properties: [],
        pages: 0,
        total: 0
    },
    space: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PENDING:
            return {...state, pending: action.spaces };
        case SET_VERIFIED:
            return {...state, verified: action.spaces };
        case SET_REJECTED:
            return {...state, rejected: action.spaces };
        case SET_SPACES:
            return {...state, all: action.spaces };
        case SET_SPACE:
            return {...state, space: action.space };
        default:
            return state;
    }
}