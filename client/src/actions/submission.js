import axios from 'axios';
import { GET_SUBMISSION, NEW_SUBMISSION, FETCH_SUBMISSION_ERROR } from '../actionTypes';

export const getSubmission = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/submissions/me');
        res.data.forEach((submission) => dispatch({ type: NEW_SUBMISSION, payload: submission }));
        dispatch({ type: GET_SUBMISSION, payload: res.data });  
          
    } 
    catch (error) {
        dispatch({ type: FETCH_SUBMISSION_ERROR });
        console.error(error.response);
    }
}