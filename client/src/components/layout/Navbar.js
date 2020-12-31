import React from 'react'
import PropTypes from 'prop-types'
import { logoutUser } from '../../actions/auth';
import { connect } from 'react-redux';
import { updateTab } from '../../actions/navTab';

const Navbar = ({ logoutUser, currentTab, updateTab }) => {
    const logOut = (e) => {
        e.preventDefault();
        logoutUser();
    }
    return (
        <nav className="navbar">
            <div className="logo">
                <h2><i className="fas fa-code"></i> CP-Arena</h2>
            </div>
            <div className="nav-links">
                <li className={`nav-link ${currentTab === 1 && "active"}`}><a href="!#" onClick={e => updateTab(1)}>My Stats</a></li>
                <li className={`nav-link ${currentTab === 2 && "active"}`}><a href="!#" onClick={e => updateTab(2)}>Problem Set</a></li>
                <li className={`nav-link ${currentTab === 4 && "active"}`}><a href="!#" onClick={e => updateTab(4)}>Snippets</a></li>
                <li className={`nav-link ${currentTab === 8 && "active"}`}><a href="!#" onClick={e => updateTab(8)}>Problem Writing</a></li>
                <li className="nav-link"><a href="!#" onClick={e => logOut(e)}>Logout</a></li>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logoutUser : PropTypes.func.isRequired,
    updateTab: PropTypes.func.isRequired
}

export default connect(null, { logoutUser, updateTab })(Navbar);
