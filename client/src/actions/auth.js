import { USER_LOGIN, USER_LOGOUT, LOGIN_FAILED, UPDATE_USER, GET_SUBMISSION, FETCH_SUBMISSION_ERROR } from '../actionTypes';
import {setAuthToken} from '../utilities/setToken';

import axios from 'axios';

export const updateUser = (token) => async dispatch => {
    if (!token) throw new Error("Invalid token");
    setAuthToken(token);
    try {
        const res = await axios.get('http://localhost:5000/api/users/me');
        await dispatch(getSubmission());
        dispatch({ type: UPDATE_USER, payload: res.data });   
    } 
    catch (error) {
        dispatch({ type: LOGIN_FAILED });
        console.error(error);
    }
}

export const loginUser = (data) => async dispatch => {
    try {
        const config = { headers: { "Content-Type": "application/json" }};
        const res = await axios.post('http://localhost:5000/api/users/login', data, config);
        dispatch({ type: USER_LOGIN, payload: res.data });
        dispatch(updateUser(res.data.token));
    } 
    catch (error) {
        dispatch({ type: LOGIN_FAILED });
        console.error(error);
    }
}

export const getSubmission = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/submissions/me');
        dispatch({ type: GET_SUBMISSION, payload: res.data });    
    } 
    catch (error) {
        dispatch({ type: FETCH_SUBMISSION_ERROR });
        console.error(error);
    }
}

export const logoutUser = () => dispatch => {
    dispatch({ type: USER_LOGOUT });
}