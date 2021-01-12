import { combineReducers } from 'redux';
import auth from './auth';
import navTab from './navTab'
import submission from './submission';
import alert from './alert';

export default combineReducers({
    auth,
    navTab,
    submission,
    alert
});