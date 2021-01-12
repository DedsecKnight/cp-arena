import { ADD_ALERT, REMOVE_ALERT } from '../actionTypes';
import { v4 as uuid } from 'uuid';

export const addAlert = (msg, type) => dispatch => {
    const alert = { id: uuid(), msg, type };
    dispatch({ type : ADD_ALERT, payload: alert});
    setTimeout(() => {
        dispatch({ type: REMOVE_ALERT, payload: alert.id });
    }, 5000);
} 