import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/layout/Login';

import { connect } from 'react-redux';
import { logoutUser, updateUser } from './actions/auth';
import Main from './components/layout/Main';

const CPArena = ({ auth : { token, authenticated, loading }, updateUser, logoutUser }) => {
    useEffect(() => {
        if (token) updateUser(token);
        else logoutUser();
    }, []);
    return (
        <Fragment>
            { !loading ? authenticated ? (<Main />) : (<Login />) : ("")}
        </Fragment>
    )
}

const state_props = state => ({
    auth: state.auth
});

CPArena.propTypes = {
    auth: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
}

export default connect(state_props, { updateUser, logoutUser })(CPArena);
