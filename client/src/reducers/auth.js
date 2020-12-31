import { USER_LOGIN, USER_LOGOUT, UPDATE_USER, LOGIN_FAILED, GET_SUBMISSION, FETCH_SUBMISSION_ERROR, UPDATE_SUBMISSION_STAT } from '../actionTypes';

const initialState = {
    authenticated: false,
    user: null, 
    token: localStorage.getItem("token"),
    submissionsData: {
        submissions: [],
        submissionCount: {},
        acceptedCount: {},
        maxAC: 0,
        maxSubmit: 0,
        currMaxAC: "",
        currMaxSubmit: "",
        solvedProblems: 0
    },
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
                authenticated: false,
                submissionsData: {
                    submissions: [],
                    submissionCount: {},
                    acceptedCount: {},
                    maxAC: 0,
                    maxSubmit: 0,
                    currMaxAC: "",
                    currMaxSubmit: "",
                    solvedProblems: 0
                }
            };
        case UPDATE_SUBMISSION_STAT:
            const subCount = state.submissionsData.submissionCount ? (state.submissionsData.submissionCount[payload.name] || 0) : 0;
            const acCount = state.submissionsData.acceptedCount ? (state.submissionsData.acceptedCount[payload.name] || 0) : 0;
            return ({
                ...state,
                submissionsData: {
                    ...state.submissionsData,
                    submissionCount: {
                        ...state.submissionsData.submissionCount,
                        [payload.name]: subCount + 1
                    },
                    acceptedCount: {
                        ...state.submissionsData.acceptedCount,
                        [payload.name]: acCount + (payload.verdict === "Accepted")
                    },
                    maxAC: Math.max(state.submissionsData.maxAC, acCount + (payload.verdict === "Accepted")),
                    maxSubmit: Math.max(state.submissionsData.maxSubmit, subCount + 1),
                    currMaxAC: (state.submissionsData.maxAC < acCount + (payload.verdict === "Accepted") ? payload.name : state.submissionsData.currMaxAC),
                    currMaxSubmit: (state.submissionsData.maxSubmit < subCount + 1 ? payload.name : state.submissionsData.currMaxSubmit),
                    solvedProblems: Object.keys(state.submissionsData.acceptedCount).filter((key) => state.submissionsData.acceptedCount[key] > 0).length + (acCount === 0 && payload.verdict === "Accepted")
                }
            });
        case GET_SUBMISSION:
            return {
                ...state,
                submissionsData: {
                    ...state.submissionsData,
                    submissions: payload
                }
            }
        case FETCH_SUBMISSION_ERROR:
            return {
                ...state,
                loading: true,
                submissionsData: {
                    submissions: [],
                    submissionCount: {},
                    acceptedCount: {},
                    maxAC: 0,
                    maxSubmit: 0,
                    currMaxAC: "",
                    currMaxSubmit: "",
                    solvedProblems: 0
                }
            }
        default:
            return state;
    }
}

export default reducer;