import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getProblem } from '../../utilities/getProblem';

const Profile = ({ auth : { user, submissions, loading } }) => {
    const { name, handle, description } = user;
    var problemAC = new Map(), problemSubmission = new Map();
    var mostAC = "", mostSubmit = "";
    var maxAC = 0, problemCount = 0, maxSubmit = 0;

    submissions.forEach((submission) => {
        problemSubmission.set(submission.name, problemSubmission.get(submission.name) || 0 + 1);
        if (submission.verdict === "Accepted") problemAC.set(submission.name, problemAC.get(submission.name) || 0 + 1);

        if (problemAC.get(submission.name) > maxAC) {
            mostAC = submission.name;
            maxAC = problemAC.get(submission.name);
        }
        if (problemSubmission.get(submission.name) > maxSubmit) {
            mostSubmit = submission.name;
            maxSubmit = problemSubmission.get(submission.name);
        }

        if (problemSubmission.get(submission.name) == 1) problemCount++;
    });
    
    return (
        <Fragment>
            <section className="container">
            <div className="user-profile">
                <div className="user-top">
                    <img className="round-img my-1" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" />
                    <h1 className="large my-3">{name}</h1>
                    <p className="lead">@{handle}</p>
                    <p className="lead">{description}</p>
                </div>
                <div className="user-summary">
                    <h3><strong>Summary</strong></h3>
                    <div className="summary">
                        <h5 className="summary-info"><strong>Total submission: </strong>{submissions.length}</h5>
                        <h5 className="summary-info"><strong>Problem solved: </strong>{problemCount}</h5>
                        <h5 className="summary-info"><strong>Problem written: </strong>0</h5>
                    </div>
                </div>
                <div className="user-stat">
                    <h3><strong>Facts about me</strong></h3>
                    <div className="summary">
                        <h5 className="summary-info"><strong>Most used language: </strong>C++</h5>
                        <h5 className="summary-info"><strong>Problem with most submission: </strong>{mostSubmit}</h5>
                        <h5 className="summary-info"><strong>Problem with most AC: </strong>{mostAC}</h5>
                    </div>
                </div>
                <div className="user-bottom">
                    <h3>Here are the problems that you're recently working on </h3>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className="hide-sm">Submission ID</th>
                            <th scope="col">Problem Name</th>
                            <th scope="col" className="hide-sm">Most Recent Submission</th>
                            <th scope="col">Verdict</th>
                        </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission, idx)=>(
                                <tr key={idx}>
                                    <th scope="row">{idx+1}</th>
                                    <td className="hide-sm"><a href="#">{submission._id}</a></td>
                                    <td><a href="#">{submission.name}</a></td>
                                    <td className="hide-sm">2020/12/16</td>
                                    <td className={submission.verdict === "Accepted" ? "accepted" : "wa"}>{submission.verdict}</td>
                                </tr>
                            ))}
                        
                        {/* <tr>
                            <th scope="row">2</th>
                            <td><a href="#">122456</a></td>
                            <td><a href="#">Two Sums</a></td>
                            <td className="hide-sm">2020/12/16</td>
                            <td className="accepted">Accepted</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td><a href="#">113456</a></td>
                            <td><a href="#">Longest Increasing Subsequence</a></td>
                            <td className="hide-sm">2020/12/15</td>
                            <td className="wa">WA in test 2</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td><a href="#">100456</a></td>
                            <td><a href="#">Recover Binary Search Tree</a></td>
                            <td className="hide-sm">2020/12/15</td>
                            <td className="wa">TLE on test 3</td>
                        </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        </Fragment>   
    )
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired
}

const state_prop = state => ({
    auth: state.auth
})

export default connect(state_prop, null)(Profile)
