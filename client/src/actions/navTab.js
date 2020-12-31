import { RESET_TAB, UPDATE_TAB } from "../actionTypes"

export const updateTab = (tabNumber) => dispatch => {
    dispatch({ type: UPDATE_TAB, payload: tabNumber });
}

export const resetTab = () => dispatch => {
    dispatch({ type: RESET_TAB });
}