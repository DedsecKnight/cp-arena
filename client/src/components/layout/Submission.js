import React, { Fragment, useEffect } from 'react'
import Moment from 'react-moment'
import { fileExtensionReverse } from '../../utilities/config';
import { connect } from 'react-redux'
import CodeDisplay from '../utilities/CodeDisplay';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Submission = ({ match, submission : { submissions }, auth: { user : { handle }} }) => {
    useEffect(() => {
        // Enable popover JS
        window.$('[data-toggle="popover"]').popover();
    }, []);
    const currentSubmission = submissions[parseInt(match.params.id)];
    const { language, submission, name : { _id, name }, verdict, date } = currentSubmission;
    return (
        <Fragment>
            <div className="problem-action">
                <Link className="btn problem-btn btn-light" to="/">Go back to My Stat</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Author</th>
                        <th scope="col">Problem Name</th>
                        <th scope="col">Verdict</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Moment format="YYYY/MM/DD -  HH:mm" local>{date}</Moment></td>
                        <td>@{handle}</td>
                        <td><Link to={`/problemset/${_id}`}>{name}</Link></td>
                        <td className={verdict === "Accepted" ? "accepted" : "wa"}>{verdict}</td>
                    </tr>
                </tbody>
            </table>
            <div className="my-4">
                <CodeDisplay code={submission} language={fileExtensionReverse[language]} />
                <CopyToClipboard text={submission}>
                    <button type="button" className="btn btn-primary my-3" data-container="body" data-trigger="focus" data-toggle="popover" data-placement="top" data-content="Copied to clipboard">
                        Copy to clipboard
                    </button>
                </CopyToClipboard> 
            </div>
            
        </Fragment>
    )
}

Submission.propTypes = {
    submission: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const state_props = state => ({
    submission: state.submission,
    auth: state.auth
})

export default connect(state_props, null)(Submission)
