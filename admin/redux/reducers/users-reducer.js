import { SET_USERS, SET_LOGGED } from '../constants'

const initialState = {
    all: [],
    logged: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGED:
            return { ...state, logged: action.user };
        case SET_USERS:
            return { ...state, all: action.users };
        default:
            return state;
    }
}