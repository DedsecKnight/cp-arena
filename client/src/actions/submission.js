import axios from 'axios';
import { GET_SUBMISSION, NEW_SUBMISSION, FETCH_SUBMISSION_ERROR, RESET_SUBMISSION } from '../actionTypes';

export const getSubmission = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/submissions/me');
        res.data.forEach((submission) => {
            if (submission.name) dispatch({ type: NEW_SUBMISSION, payload: submission })
        });
        dispatch({ type: GET_SUBMISSION, payload: res.data });  
          
    } 
    catch (error) {
        dispatch({ type: FETCH_SUBMISSION_ERROR });
        console.error(error.response);
    }
}

export const clearSubmission = () => dispatch => {
    dispatch({ type: RESET_SUBMISSION });
}