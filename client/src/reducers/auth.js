import { USER_LOGIN, USER_LOGOUT, UPDATE_USER, LOGIN_FAILED, GET_SUBMISSION, FETCH_SUBMISSION_ERROR} from '../actionTypes';

const initialState = {
    authenticated: false,
    user: null, 
    token: localStorage.getItem("token"),
    submissions: null,
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
        case USER_LOGIN:
            localStorage.setItem('token', payload.token);
            return ({
                ...state,
                loading: false,
                token: payload.token
            });
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
        case GET_SUBMISSION:
            return {
                ...state,
                loading: false,
                submissions: payload
            }
        case FETCH_SUBMISSION_ERROR:
            return {
                ...state,
                loading: false,
                submissions: null
            }
        default:
            return state;
    }
}

export default reducer;