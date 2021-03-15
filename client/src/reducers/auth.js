import { USER_LOGIN, USER_LOGOUT, UPDATE_USER, LOGIN_FAILED, ADD_SNIPPET, REMOVE_SNIPPET, REGISTER_FAILED } from '../actionTypes';

const initialState = {
    authenticated: false,
    user: null, 
    token: localStorage.getItem("token"),
    loading: true
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case UPDATE_USER:
            return ({
                ...state, 
                loading: false,
                authenticated: true,
                user: payload
            });
        case ADD_SNIPPET:
            return ({
                ...state,
                user: { ...state.user, snippet: [...state.user.snippet, payload]}
            });
        case REMOVE_SNIPPET: 
            return ({
                ...state, 
                user: { ...state.user, snippet: state.user.snippet.filter(s => s.id !== payload )}
            });
        case USER_LOGIN:
            localStorage.setItem('token', payload.token);
            return ({
                ...state,
                token: payload.token
            });
        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case USER_LOGOUT:
            localStorage.removeItem("token"); 
            return {
                ...state,
                token: null,
                user: null,
                loading: false,
                authenticated: false
            };
        default:
            return state;
    }
}

export default reducer;