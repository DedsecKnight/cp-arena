import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const ProtectedComponent = ({ component: Component, auth: { authenticated, loading }, ...rest }) => {
    return (
        <Route {...rest} render={props => (!authenticated && !loading ) ? (<Redirect to="/login" />) : (
            <Component {...props} />
        )}></Route>
    );
}

ProtectedComponent.propTypes = {
    auth: PropTypes.object.isRequired,
}

const state_props = state => ({
    auth: state.auth 
});

export default connect(state_props, null)(ProtectedComponent);
