import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'

const ProblemWriting = () => {
    return (
        <Fragment>
            <h2 className="my-5">Propose a problem here</h2>
            <form className="cparena-form">
                <div className="form-group">
                    <input type="text" className="form-control" name="name" placeholder="Problem name" />
                </div>
                <div className="form-group">
                    <select name="difficulty" className="form-control">
                        <option selected>Choose a difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="form-group">
                    <textarea name="statement" cols="30" rows="10" className="form-control" placeholder="Problem Statement"></textarea>
                </div>
                <div className="form-group">
                    <p className="lead">Upload solution check script</p>
                    <input type="file" className="form-control-file" />
                </div>
                <div className="test-case">
                    <p className="lead">Test case #1</p>
                    <div className="form-group">
                        <textarea name="input" cols="30" rows="5" className="form-control" placeholder="Input for test case #1"></textarea>
                    </div>
                    <div className="form-group">
                        <textarea name="output" cols="30" rows="5" className="form-control" placeholder="Output for test case #1"></textarea>
                    </div>
                    <div className="form-group case-action">
                        <button className="btn btn-danger">Delete Test Case #1</button>
                    </div>
                </div>
                <div className="test-case">
                    <p className="lead">Test case #2</p>
                    <div className="form-group">
                        <textarea name="input" cols="30" rows="5" className="form-control" placeholder="Input for test case #2"></textarea>
                    </div>
                    <div className="form-group">
                        <textarea name="output" cols="30" rows="5" className="form-control" placeholder="Output for test case #2"></textarea>
                    </div>
                    <div className="form-group case-action">
                        <button className="btn">Add new test case</button>
                        <button className="btn btn-danger">Delete Test Case #2</button>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary my-4" />
            </form>
        </Fragment>
    )
}

// ProblemWriting.propTypes = {

// }

export default ProblemWriting
