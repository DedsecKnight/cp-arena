import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const Profile = ({ auth : { user }, submission }) => {
    const { name, handle, description } = user;
    const { submissions, currMaxAC, currMaxSubmit, solvedProblems } = submission;
    
    return (
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
                        <h5 className="summary-info"><strong>Problem solved: </strong>{solvedProblems}</h5>
                    </div>
                </div>
                <div className="user-stat">
                    <h3><strong>Facts about me</strong></h3>
                    <div className="summary">
                        <h5 className="summary-info"><strong>Most used language: </strong>C++</h5>
                        <h5 className="summary-info"><strong>Problem with most submission: </strong>{currMaxSubmit || "N/A"}</h5>
                        <h5 className="summary-info"><strong>Problem with most AC: </strong>{currMaxAC || "N/A"}</h5>
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
                            <th scope="col" className="hide-sm">Submission Time</th>
                            <th scope="col">Verdict</th>
                        </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission, idx)=> idx < 5 && (
                                <tr key={idx}>
                                    <th scope="row">{idx+1}</th>
                                    <td className="hide-sm"><a href="!#">{submission._id}</a></td>
                                    <td><a href="!#">{submission.name.name}</a></td>
                                    <td className="hide-sm"><Moment format="YY/MM/DD -  HH:mm" local>{submission.date}</Moment></td>
                                    <td className={submission.verdict === "Accepted" ? "accepted" : "wa"}>{submission.verdict}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
 
    )
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    submission: PropTypes.object.isRequired
}

const state_prop = state => ({
    auth: state.auth,
    submission: state.submission
})

export default connect(state_prop, null)(Profile)
