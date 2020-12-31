import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Problemset from './Problemset';
import Profile from './Profile'
import PropTypes from 'prop-types';

const Main = ({navTab}) => {
    return (
        <Fragment>
            <Navbar currentTab={navTab}/>
            { navTab === 1 ? <Profile /> : navTab === 2 ? <Problemset /> : ""}
        </Fragment>
    )
}

const state_prop = state => ({
    navTab: state.navTab
});

Main.propTypes = {
    navTab: PropTypes.number.isRequired
}

export default connect(state_prop, null)(Main);
