import { combineReducers } from 'redux';
import auth from './auth';
import navTab from './navTab'
import submission from './submission';

export default combineReducers({
    auth,
    navTab,
    submission
});