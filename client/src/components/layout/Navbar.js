import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';
import { connect } from 'react-redux';
import { HOME_TAB, PROBLEM_TAB, PROBLEM_WRITING_TAB, SNIPPET_TAB } from '../../utilities/config'

const Navbar = ({ logoutUser, currentTab }) => {
    return (
        <nav className="navbar sticky-top">
            <div className="logo">
                <h2><i className="fas fa-code"></i> CP-Arena</h2>
            </div>
            <div className="nav-links">
                <li className={`nav-link ${currentTab === HOME_TAB && "active"}`}>
                    <Link to="/">My Stats</Link>
                </li>

                <li className={`nav-link ${currentTab === PROBLEM_TAB && "active"}`}>
                    <Link to="/problemset">Problem Set</Link>
                </li>

                <li className={`nav-link ${currentTab === SNIPPET_TAB && "active"}`}>
                    <Link to="/snippet">Snippets</Link>
                </li>

                <li className={`nav-link ${currentTab === PROBLEM_WRITING_TAB && "active"}`}>
                    <Link to="/problemwriting">Problem Writing</Link>
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
}

export default connect(null, { logoutUser })(Navbar);
