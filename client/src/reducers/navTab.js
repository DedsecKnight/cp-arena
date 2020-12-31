import { RESET_TAB, UPDATE_TAB } from '../actionTypes';

const initialState = 1

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case UPDATE_TAB:
            return payload
        case RESET_TAB:
            return 1
        default:
            return state
    }
}

export default reducer;