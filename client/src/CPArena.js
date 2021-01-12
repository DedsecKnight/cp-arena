import React, { useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import Login from './components/layout/Login';

import { connect } from 'react-redux';
import { updateUser } from './actions/auth';
import Profile from './components/layout/Profile';
import Problemset from './components/layout/Problemset';

import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/utilities/ProtectedRoute';
import Snippet from './components/layout/Snippet';
import ProblemWriting from './components/layout/ProblemWriting';
import Problem from './components/layout/Problem';
import SubmitSolution from './components/layout/SubmitSolution';
import Alert from './components/utilities/Alert';

const CPArena = ({ auth : { token, authenticated, loading }, updateUser, navTab }) => {
    useEffect(() => {
        updateUser(token);
    }, [updateUser, token]);
    return (
        !loading && (<Router>
            {!authenticated && (
                <Fragment>
                    <Route path="/login" exact component={Login} />
                    <Redirect from="*" to="/login" />
                </Fragment>
            )}
            {authenticated && (<Navbar currentTab={navTab}/>)}
                <section className="container">
                    <Alert />
                    <Switch>
                        <ProtectedRoute path="/" exact component={Profile} />
                        <ProtectedRoute path="/problemset" exact component={Problemset}/>
                        
                        <ProtectedRoute path="/snippet" exact component={Snippet}/>
                        
                        <ProtectedRoute path="/problemwriting" exact component={ProblemWriting}/>  
                        <ProtectedRoute path="/problemset/:id" exact component={Problem} />
                        <ProtectedRoute path="/problemset/:id/submit" exact component={SubmitSolution}/>
                        {authenticated && <Redirect from="*" to="/404" /> }
                    </Switch>
                </section>
        </Router>)
    )
}

const state_props = state => ({
    auth: state.auth,
    navTab: state.navTab
});

CPArena.propTypes = {
    auth: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    navTab: PropTypes.number.isRequired
}

export default connect(state_props, { updateUser })(CPArena);
