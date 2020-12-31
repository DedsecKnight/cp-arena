import { USER_LOGIN, USER_LOGOUT, LOGIN_FAILED, UPDATE_USER } from '../actionTypes';
import { setAuthToken } from '../utilities/setToken';
import { getSubmission } from './submission';
import { resetTab } from './navTab';

import axios from 'axios';

export const updateUser = (token) => async dispatch => {
    if (!token) dispatch({ type : LOGIN_FAILED });
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
        await dispatch(updateUser(res.data.token));
    } 
    catch (error) {
        dispatch({ type: LOGIN_FAILED });
        console.error(error);
    }
}

export const logoutUser = () => dispatch => {
    dispatch({ type: USER_LOGOUT });
    dispatch(resetTab());
}