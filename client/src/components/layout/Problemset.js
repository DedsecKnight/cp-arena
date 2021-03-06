import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateTab } from '../../actions/navTab';
import { PROBLEM_TAB } from '../../utilities/config';

const Problemset = ({ updateTab }) => {
    var [problemSet, initializeProblemset] = useState([]);
    const getProblemSet = async() => {
        const res = await axios.get('http://localhost:5000/api/problems');
        initializeProblemset(res.data);
    }
    
    useEffect(() => {
        getProblemSet();
        updateTab(PROBLEM_TAB);
    }, [updateTab]);

    return (
        <Fragment>
            <h2 className="my-3">Let's solve some problems</h2>
            <div className="problem-list">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Problem Name</th>
                        <th scope="col">Difficulty</th>
                        <th scope="col" className="hide-sm">Submissions</th>
                        <th scope="col" className="hide-sm">Accepted</th>
                    </tr>
                    </thead>
                    <tbody>
                        {problemSet.map((problem, idx) => (
                            <tr key={idx}>
                                <th scope="row">{idx+1}</th>
                                <td><Link to={`/problemset/${problem._id}`}>{problem.name}</Link></td>
                                <td className={problem.difficulty}><strong>{problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}</strong></td>
                                <td className="hide-sm">{problem.submissionCount}</td>
                                <td className="hide-sm">{problem.acceptedCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

Problemset.propTypes = {
    updateTab: PropTypes.func.isRequired
}

export default connect(null, { updateTab })(Problemset);
