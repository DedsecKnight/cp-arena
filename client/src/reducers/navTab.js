import { RESET_TAB, UPDATE_TAB } from '../actionTypes';

const initialState = parseInt(localStorage.getItem('currentTab')) || 1;

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case UPDATE_TAB:
            localStorage.setItem('currentTab', payload);
            return payload
        case RESET_TAB:
            localStorage.setItem('currentTab', 1);
            return 1
        default:
            return state
    }
}

export default reducer;