import React from 'react'
import PropTypes from 'prop-types'
import { logoutUser } from '../../actions/auth';
import { connect } from 'react-redux';

const Navbar = ({ logoutUser }) => {
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
                <li className="nav-link active"><a href="mystat.html">My Stats</a></li>
                <li className="nav-link"><a href="problemset.html">Problem Set</a></li>
                <li className="nav-link"><a href="snippet.html">Snippets</a></li>
                <li className="nav-link"><a href="problemwriting.html">Problem Writing</a></li>
                <li className="nav-link"><a href="#" onClick={e => logOut(e)}>Logout</a></li>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logoutUser : PropTypes.func.isRequired
}

export default connect(null, { logoutUser })(Navbar);
