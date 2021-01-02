import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';
import { connect } from 'react-redux';
import { updateTab } from '../../actions/navTab';

const Navbar = ({ logoutUser, currentTab, updateTab }) => {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2><i className="fas fa-code"></i> CP-Arena</h2>
            </div>
            <div className="nav-links">
                <li className={`nav-link ${currentTab === 1 && "active"}`}>
                    <Link to="/" onClick={e => updateTab(1)}>My Stats</Link>
                </li>

                <li className={`nav-link ${currentTab === 2 && "active"}`}>
                    <Link to="/problemset" onClick={e => updateTab(2)}>Problem Set</Link>
                </li>

                <li className={`nav-link ${currentTab === 3 && "active"}`}>
                    <Link to="/snippet" onClick={e => updateTab(3)}>Snippets</Link>
                </li>

                <li className={`nav-link ${currentTab === 4 && "active"}`}>
                    <Link to="/problemwriting" onClick={e => updateTab(4)}>Problem Writing</Link>
                </li>

                <li className="nav-link">
                    <Link to="/login" onClick={e => logoutUser()}>Logout</Link>
                </li>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logoutUser : PropTypes.func.isRequired,
    updateTab: PropTypes.func.isRequired
}

export default connect(null, { logoutUser, updateTab })(Navbar);
