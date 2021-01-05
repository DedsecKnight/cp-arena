import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import Login from './components/layout/Login';

import { connect } from 'react-redux';
import { updateUser } from './actions/auth';
import Profile from './components/layout/Profile';
import Problemset from './components/layout/Problemset';

import Navbar from './components/layout/Navbar';
import ProtectedComponent from './components/utilities/ProtectedComponent';
import Snippet from './components/layout/Snippet';
import ProblemWriting from './components/layout/ProblemWriting';

const CPArena = ({ auth : { token, authenticated, loading }, updateUser, navTab }) => {
    useEffect(() => {
        updateUser(token);
    }, [updateUser, token]);
    return (
        !loading && (<Router>
            {authenticated && (<Navbar currentTab={navTab}/>)}
                {!authenticated && (<Route path="/login" exact component={Login} />)}
                (<section className="container">
                    <Switch>
                        <ProtectedComponent path="/" exact component={Profile} />
                        <ProtectedComponent path="/problemset" exact component={Problemset}/>
                        
                        <ProtectedComponent path="/snippet" exact component={Snippet}/>
                        
                        <ProtectedComponent path="/problemwriting" exact component={ProblemWriting}/>  
                        <Redirect from="*" to="/" />
                    </Switch>
                </section>)
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
