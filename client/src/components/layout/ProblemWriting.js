import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateTab } from '../../actions/navTab'

const ProblemWriting = ({ updateTab }) => {
    useEffect(() => {
        updateTab(4);
    }, [updateTab]);
    return (
        <Fragment>
            <h2 className="my-3">Propose a problem here</h2>
            <form className="cparena-form">
                <div className="form-group">
                    <input type="text" className="form-control" name="name" placeholder="Problem name" />
                </div>
                <div className="form-group">
                    <select name="difficulty" className="form-control" defaultValue="">
                        <option value="">Choose a difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="form-group">
                    <textarea name="statement" cols="30" rows="10" className="form-control" placeholder="Problem Statement"></textarea>
                </div>
                <div className="form-group">
                    <textarea name="inputSpecification" cols="30" rows="5" className="form-control" placeholder="Input description"></textarea>
                </div>
                <div className="form-group">
                    <textarea name="outputSpecification" cols="30" rows="5" className="form-control" placeholder="Output description"></textarea>
                </div>
                <div className="form-group">
                    <p className="lead">Upload validator script</p>
                    <input type="file" className="form-control-file" />
                </div>
                <div className="test-case">
                    <p className="lead">Test case #1</p>
                    <input type="file" className="form-control-file" />
                    <div className="form-group case-action">
                        <button className="btn btn-danger">Delete Test Case #1</button>
                    </div>
                </div>
                <div className="test-case">
                    <p className="lead">Test case #2</p>
                    <input type="file" className="form-control-file" />
                    <div className="form-group case-action">
                        <button className="btn">Add new test case</button>
                        <button className="btn btn-danger">Delete Test Case #2</button>
                    </div>
                </div>
                <div className="hint">
                    <p className="lead">Hint #1</p>
                    <textarea name="inputSpec" cols="30" rows="3" className="form-control" placeholder="Hint #1"></textarea>
                    <div className="form-group case-action">
                        <button className="btn btn-danger">Delete Hint #1</button>
                    </div>
                </div>
                <div className="hint">
                    <p className="lead">Hint #2</p>
                    <textarea name="inputSpec" cols="30" rows="3" className="form-control" placeholder="Hint #1"></textarea>
                    <div className="form-group case-action">
                        <button className="btn">Add new hint</button>
                        <button className="btn btn-danger">Delete Hint #2</button>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary my-4" />
            </form>
        </Fragment>
    )
}

ProblemWriting.propTypes = {
    updateTab: PropTypes.func.isRequired,
}

export default connect(null, { updateTab })(ProblemWriting)
