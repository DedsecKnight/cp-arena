import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateTab } from '../../actions/navTab'
import { addAlert } from '../../actions/alert';
import { PROBLEM_WRITING_TAB } from '../../utilities/config'

const ProblemWriting = ({ history, updateTab, addAlert }) => {
    useEffect(() => {
        updateTab(PROBLEM_WRITING_TAB);
        if (testcases.length === 0) addTestCase();
    }, [updateTab]);

    const [formData, setForm] = useState({
        name: "",
        difficulty: "",
        statement: "",
        inputSpecification: "",
        outputSpecification: "",
        hint: [],
        timelimit: '',
        memorylimit: '',
        testcases: [],
        checkerRequired: false,
        checkerCode: ''
    });

    const initialTestCase = {
        inputFile: '',
        outputFile: '',
        isSampleCase: false,
        explanation: ''
    }

    const addTestCase = () => {
        setForm({...formData, testcases: [...formData.testcases, {...initialTestCase }]});
    }
    
    const deleteTestCase = (idx) => {
        const updated_testcase = formData.testcases;
        if (updated_testcase.length === 1) {
            addAlert("At least 1 test case is required", "danger");
            return;
        }
        updated_testcase.splice(idx, 1);
        setForm({...formData, testcases: updated_testcase });
    }

    const addInput = (e, idx) => {
        let case_list = formData.testcases
        let curr_case = formData.testcases[idx];
        curr_case.inputFile = e.target.files[0];
        case_list[idx] = curr_case;
        setForm({...formData, testcases: case_list});
    }

    const addOutput = (e, idx) => {
        let case_list = formData.testcases
        let curr_case = formData.testcases[idx];
        curr_case.outputFile = e.target.files[0];
        case_list[idx] = curr_case;
        setForm({...formData, testcases: case_list});
    }

    const setSample = (e, idx) => {
        let case_list = formData.testcases;
        let curr_case = formData.testcases[idx];
        curr_case.isSampleCase = e.target.checked;
        case_list[idx] = curr_case;
        setForm({...formData, testcases: case_list});
    }

    const updateExplanation = (e, idx) => {
        let case_list = formData.testcases;
        case_list[idx].explanation = e.target.value;
        setForm({...formData, testcases: case_list});
    }

    const update = (e) => {
        setForm({...formData, [e.target.name] : (e.target.type === 'checkbox' ? e.target.checked : e.target.value)});
    }

    const { 
        name,
        difficulty,
        statement, 
        checkerRequired, 
        inputSpecification,
        outputSpecification,
        testcases, 
        hint,
        timelimit, 
        memorylimit,
        checkerCode
    } = formData;

    const submit = async (e) => {
        e.preventDefault();
        if (testcases.length === 0) {
            addAlert("At least 1 test case is required", "danger");
            return;
        }

        if (checkerRequired && !checkerCode) {
            addAlert("Cannot find checker script", "danger");
            return;
        }

        const body = {
            name,
            difficulty,
            statement,
            inputSpecification,
            outputSpecification,
            hint,
            timelimit,
            memorylimit,
            testcases: [],
            sampleTestCases: [],
            checkerRequired,
        };

        // const n = testcases.length;

        for (let i = 0; i < testcases.length; i++) {
            let curr_case = ({
                input: '',
                output: ''
            });

            let inputReader = new FileReader();
            let outputReader = new FileReader();
            
            const { inputFile, outputFile, explanation, isSampleCase } = testcases[i];

            if (!inputFile) {
                addAlert(`Input data not found for test case ${i+1}`, 'danger');
                return;
            }
            if (!outputFile) {
                addAlert(`Output data not found for test case ${i+1}`, 'danger');
                return;
            }

            const currIdx = i;

            const read = async (idx) => {
                if (idx === 0) {
                    inputReader.onload = async (e) => {
                        curr_case.input = e.target.result;
                        try {
                            await read(idx + 1);    
                        } 
                        catch (error) {
                            console.error(error.message);
                        }
                    }
                    inputReader.readAsText(inputFile);
                }
                else {
                    outputReader.onload = async (e) => {
                        curr_case.output = e.target.result;
                        body.testcases.push(curr_case);
                        if (isSampleCase) {
                            curr_case.explanation = explanation;
                            body.sampleTestCases.push(curr_case);
                        }
                        if (currIdx === testcases.length-1) {
                            if (body.sampleTestCases.length === 0) {
                                addAlert("At least 1 sample test case is required", "danger");
                                return;
                            }
                            try {
                                const config = { headers: { "Content-Type" : "application/json" }};
                                await axios.post('http://localhost:5000/api/problems', body, config);
                                addAlert("Problem added", "success");
                                history.push('/problemset');
                            } 
                            catch (error) {
                                error.response.data.errors.forEach(error => addAlert(error.msg, "danger"));
                            }
                        }
                    }
                    outputReader.readAsText(outputFile);
                }

            };

            try {
                await read(0);
            } catch (error) {
                console.error(error.message);
            }
        }
        
    }

    const updateHint = (e, idx) => {
        let hint_list = formData.hint;
        hint_list[idx] = e.target.value;
        setForm({...formData, hint: hint_list});
    }

    const addHint = () => {
        setForm({...formData, hint: [...hint, ""]});
    }

    const deleteHint = (idx) => {
        let hint_list = formData.hint;
        hint_list.splice(idx, 1);
        setForm({...formData, hint: hint_list});
    }

    

    return (
        <Fragment>
            <h2 className="my-3">Propose a problem here</h2>
            <form className="cparena-form" onSubmit={e => submit(e)}>
                <div className="form-group">
                    <input value={name} onChange={e => update(e)} type="text" className="form-control" name="name" placeholder="Problem name" required />
                </div>
                <div className="form-group">
                    <select name="difficulty" className="form-control" value={difficulty} onChange={e => update(e)} required>
                        <option value="" disabled>Choose a difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="form-group">
                    <input placeholder="Time limit (seconds)"required type="text" pattern="[0-9]+" name="timelimit" value={timelimit} onChange={e => update(e)} className="form-control"/>
                </div>
                <div className="form-group">
                <input placeholder="Memory limit (MB)" required type="text" pattern="[0-9]+" name="memorylimit" value={memorylimit} onChange={e => update(e)} className="form-control"/>
                </div>
                <div className="form-group">
                    <textarea name="statement" required value={statement} onChange={e => update(e)} cols="30" rows="10" className="form-control" placeholder="Problem Statement"></textarea>
                </div>
                <div className="form-group">
                    <textarea name="inputSpecification" value={inputSpecification} onChange={e => update(e)} cols="30" rows="5" className="form-control" placeholder="Input description"></textarea>
                </div>
                <div className="form-group">
                    <textarea name="outputSpecification" value={outputSpecification} onChange={e => update(e)} cols="30" rows="5" className="form-control" placeholder="Output description"></textarea>
                </div>
                <div className="form-group">
                    <p className="lead">Checker required:  <input type="checkbox" name="checkerRequired" checked={checkerRequired} onChange={e => update(e)}/> </p>
                    <p className="lead">Upload checker script</p>
                    <input disabled={!checkerRequired && "disabled"} type="file" className="form-control-file" />
                </div>
                { testcases.map((testcase, idx)=> (
                    <div key={idx} className="test-case">
                        <p className="lead">Test case #{idx+1}</p>
                        <p>
                            Input file:  
                            <input type="file" onChange={e => addInput(e, idx)} className="form-control-file" />
                        </p>
                        <p>
                            Output file:  
                            <input type="file" onChange={e => addOutput(e, idx)} className="form-control-file" />
                        </p>
                        {testcase.isSampleCase && (
                            <div className="form-group">
                                <textarea placeholder="Add explanation for input and output" value={testcase.explanation} onChange={e => updateExplanation(e, idx)} id="" cols="30" rows="5" className="form-control"></textarea>    
                            </div>
                        )}
                        <div className="form-group case-action">
                            {idx === testcases.length-1 && (<button onClick={e => addTestCase()} className="btn">Add new test case</button>)}
                            <button onClick={e => deleteTestCase(idx)} className="btn btn-danger">Delete Test Case #{idx+1}</button>
                        </div>
                        <p className="lead">Is sample test cases: <input type="checkbox" name="sample1" value={testcase.isSampleCase} onChange={e => setSample(e, idx)}/> </p>
                    </div>
                )) }
                { hint.length === 0 ? (
                    <div className="form-group case-action">
                        <button onClick={e => addHint()} className="btn">Add new hint</button>
                    </div>
                ) : 
                hint.map((h, idx) => (
                    <div key={idx} className="hint">
                        <p className="lead">Hint #{idx+1}</p>
                        <textarea name="inputSpec" cols="30" rows="3" value={h} onChange={e => updateHint(e, idx)} className="form-control" placeholder={`Hint #${idx+1}`}></textarea>
                        <div className="form-group case-action">
                            {idx === hint.length - 1 && (<button onClick={e => addHint()} className="btn">Add new hint</button>)}
                            <button onClick={e => deleteHint(idx)} className="btn btn-danger">Delete Hint #{idx + 1}</button>
                        </div>
                    </div>
                ))
                }
                <input type="submit" className="btn btn-primary my-4" />
            </form>
        </Fragment>
    )
}

ProblemWriting.propTypes = {
    updateTab: PropTypes.func.isRequired,
    addAlert: PropTypes.func.isRequired
}

export default connect(null, { updateTab, addAlert })(withRouter(ProblemWriting))
