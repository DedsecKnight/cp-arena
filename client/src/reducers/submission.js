import { GET_SUBMISSION, NEW_SUBMISSION, FETCH_SUBMISSION_ERROR, RESET_SUBMISSION } from '../actionTypes';

const initialState = {
    submissions: [],
    submissionCount: {},
    acceptedCount: {},
    maxAC: 0,
    maxSubmit: 0,
    currMaxAC: "",
    currMaxSubmit: "",
    solvedProblems: 0
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case NEW_SUBMISSION:
            const subCount = state.submissionCount[payload.name.name] || 0;
            const acCount = state.acceptedCount[payload.name.name] || 0;
            return ({
                ...state,
                submissionCount: {
                    ...state.submissionCount,
                    [payload.name.name]: subCount + 1
                },
                acceptedCount: {
                    ...state.acceptedCount,
                    [payload.name.name]: acCount + (payload.verdict === "Accepted")
                },
                maxAC: Math.max(state.maxAC, acCount + (payload.verdict === "Accepted")),
                maxSubmit: Math.max(state.maxSubmit, subCount + 1),
                currMaxAC: (state.maxAC < acCount + (payload.verdict === "Accepted") ? payload.name.name : state.currMaxAC),
                currMaxSubmit: (state.maxSubmit < subCount + 1 ? payload.name.name : state.currMaxSubmit),
                solvedProblems: Object.keys(state.acceptedCount).filter((key) => state.acceptedCount[key] > 0).length + (acCount === 0 && payload.verdict === "Accepted")
            });
        case GET_SUBMISSION:
            return {
                ...state,
                submissions: payload
            }
        case RESET_SUBMISSION:
        case FETCH_SUBMISSION_ERROR:
            return initialState
        default: 
            return state
    }
}

export default reducer;