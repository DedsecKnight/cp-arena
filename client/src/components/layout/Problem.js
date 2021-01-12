import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { updateTab } from '../../actions/navTab';
import { connect } from 'react-redux';
import { PROBLEM_TAB } from '../../utilities/config';

const Problem = ({ match, updateTab }) => {
    const fetchProblem = async (id) => {
        const res = await axios.get(`http://localhost:5000/api/problems/${id}`);
        initializeProblem(res.data); 
        setInitialized(true);
    }

    useEffect(() => {
        fetchProblem(match.params.id);
        updateTab(PROBLEM_TAB);
    }, [updateTab, match.params.id]);

    const [hintIndex, setIndex] = useState(0);
    const [initialized, setInitialized] = useState(false);
    const [problem, initializeProblem] = useState({});

    const parseInput = (input) => {
        return input.split('\n');
    }
    
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
        (initialized && <Fragment>
            <div className="problem-action">
                <Link className="btn problem-btn btn-light" to="/problemset">Go back to Problemset</Link>
                <button className="btn btn-info problem-btn" disabled={hint.length === 0 && ("disabled")} data-toggle="modal" data-target="#problemHint">Get Hint</button>
                <Link to={`/problemset/${match.params.id}/submit`} className="btn btn-primary problem-btn">Submit Solution</Link>
            </div>
            
            <div className="modal fade" id="problemHint" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Hint #{hintIndex + 1} for {name}</h5>
                            <button type="button" onClick={e => setIndex(0)} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">{hint[hintIndex]}</div>
                        <div className="modal-footer">
                            <button onClick={e => setIndex(0)} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button disabled={hintIndex >= hint.length-1 && "disabled"} onClick={e => setIndex(hintIndex + 1)} className="btn btn-primary">Next Hint</button>
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
                {parseInput(statement).map((paragraph, idx) => (
                    <p key={idx} className="lead">{paragraph}</p>
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
            {sampleTestCases.map((testcase, idx) => (
                <div key={idx} className="my-5">
                    <h4>Sample Input {idx+1}</h4>
                    {parseInput(testcase.input).map((input, idx)=> (
                        <p key={idx} className="lead">{input}</p>
                    ))}
                    <h4>Sample Output {idx+1}</h4>
                    {parseInput(testcase.output).map((output, idx)=> (
                        <p key={idx} className="lead">{output}</p>
                    ))}    
                </div>
            ))}
            
        </Fragment>)
    )
}

Problem.propTypes = {
    updateTab: PropTypes.func.isRequired
}

export default connect(null, { updateTab })(Problem);
