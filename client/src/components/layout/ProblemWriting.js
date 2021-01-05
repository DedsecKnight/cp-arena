import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'

const ProblemWriting = () => {
    return (
        <Fragment>
            <h2 class="my-5">Propose a problem here</h2>
            <form class="cparena-form">
                <div class="form-group">
                    <input type="text" class="form-control" name="name" placeholder="Problem name" />
                </div>
                <div class="form-group">
                    <select name="difficulty" class="form-control">
                        <option selected>Choose a difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div class="form-group">
                    <textarea name="statement" cols="30" rows="10" class="form-control" placeholder="Problem Statement"></textarea>
                </div>
                <div class="form-group">
                    <textarea name="inputSpec" cols="30" rows="5" class="form-control" placeholder="Input description"></textarea>
                </div>
                <div class="form-group">
                    <textarea name="outputSpec" cols="30" rows="5" class="form-control" placeholder="Output description"></textarea>
                </div>
                <div class="form-group">
                    <p class="lead">Upload validator script</p>
                    <input type="file" class="form-control-file" />
                </div>
                <div class="test-case">
                    <p class="lead">Test case #1</p>
                    <input type="file" class="form-control-file" />
                    <div class="form-group case-action">
                        <button class="btn btn-danger">Delete Test Case #1</button>
                    </div>
                </div>
                <div class="test-case">
                    <p class="lead">Test case #2</p>
                    <input type="file" class="form-control-file" />
                    <div class="form-group case-action">
                        <button class="btn">Add new test case</button>
                        <button class="btn btn-danger">Delete Test Case #2</button>
                    </div>
                </div>
                <div class="hint">
                    <p class="lead">Hint #1</p>
                    <textarea name="inputSpec" cols="30" rows="3" class="form-control" placeholder="Hint #1"></textarea>
                    <div class="form-group case-action">
                        <button class="btn btn-danger">Delete Hint #1</button>
                    </div>
                </div>
                <div class="hint">
                    <p class="lead">Hint #2</p>
                    <textarea name="inputSpec" cols="30" rows="3" class="form-control" placeholder="Hint #1"></textarea>
                    <div class="form-group case-action">
                        <button class="btn">Add new hint</button>
                        <button class="btn btn-danger">Delete Hint #2</button>
                    </div>
                </div>
                <input type="submit" class="btn btn-primary my-4" />
            </form>
        </Fragment>
    )
}

// ProblemWriting.propTypes = {

// }

export default ProblemWriting
