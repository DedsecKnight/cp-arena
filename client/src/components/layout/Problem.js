import React, { Fragment, memo, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Problem = ({ match, auth : { loading } }) => {
    const [problem, initializeProblem] = useState({
        hint: [],
        sampleTestCases: []
    });

    const parseInput = (input) => {
        return input.split('\n');
    }

    const fetchProblem = async (id) => {
        const res = await axios.get(`http://localhost:5000/api/problems/${id}`);
        initializeProblem(res.data); 
    }

    useEffect(() => {
        fetchProblem(match.params.id);
    }, []);
    
    const { 
        hint, 
        inputSpecification, 
        memorylimit, 
        timelimit, 
        name, 
        outputSpecification,
        sampleTestCases, 
        statement
    } = problem;

    return (
        (!loading && <Fragment>
            <div className="problem-action">
                <Link className="btn problem-btn btn-light" to="/problemset">Go back to Problemset</Link>
                <button className="btn btn-info problem-btn" disabled={hint.length === 0 && ("disabled")} data-toggle="modal" data-target="#problemHint">Get Hint</button>
                <button className="btn btn-primary problem-btn">Submit Solution</button>
            </div>
            
            <div className="modal fade" id="problemHint" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Hint for {name}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">This problem involves Combinatorics</div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button className="btn btn-primary">Next Hint</button>
                    </div>
                </div>
                </div>
            </div>

            <div className="my-5">
                <h1 className="title center-text">{name}</h1>
                <p className="lead center-text"><strong>Time Limit</strong>: {timelimit} seconds</p>
                <p className="lead center-text"><strong>Memory Limit</strong>: {memorylimit} MB</p>
            </div>

            <div className="problem-statement">
                {statement && parseInput(statement).map((paragraph) => (
                    <p className="lead">{paragraph}</p>
                ))}
            </div>

            <div className="my-5">
                <h2 className="title">Input</h2>
                <p className="lead">{inputSpecification}</p>
            </div>
            <div className="my-5">
                <h2 className="title">Output</h2>
                <p className="lead">{outputSpecification}</p>
            </div>
            {sampleTestCases.map(testcase => (
                <div className="my-5">
                    <h4>Sample Input 1</h4>
                    <p className="lead">{testcase.input}</p>
                    <h4>Sample Output 1</h4>
                    <p className="lead">{testcase.output}</p>
                </div>
            ))}
            
        </Fragment>)
    )
}

Problem.propTypes = {
    auth: PropTypes.object.isRequired,
}

const state_prop = state => ({
    auth: state.auth,
})

export default connect(state_prop, null)(Problem)
