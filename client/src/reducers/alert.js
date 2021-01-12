import { ADD_ALERT, REMOVE_ALERT } from "../actionTypes";

const initialState = []

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ADD_ALERT:
            return [payload, ...state];
        case REMOVE_ALERT:
            return state.filter((s) => s.id !== payload);
        default: 
            return state;
    }
} 

export default reducer;