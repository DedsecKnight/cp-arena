import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { fileExtension } from '../../utilities/config';
// import PropTypes from 'prop-types'
import CodeEditor from '../utilities/CodeEditor';

const SubmitSolution = ({ match }) => {
    const [problemName, setName] = useState("");

    const getProblemName = async (id) => {
        try {
            const res =  await axios.get(`http://localhost:5000/api/problems/${id}`);
            setName(res.data.name);
        } 
        catch (error) {
            console.error(error.response);
        }
    }

    useEffect(() => {
        getProblemName(match.params.id);
    })

    const [code, setCode] = useState("");
    const [file, setFile] = useState("");
    const [options, setOptions] = useState({
        mode: '',
        indentWithTabs: true,
        lineWrapping: true,
        smartIndent: true,
        lineNumbers: true,
        autoCloseTags: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        theme: 'material-palenight'
    })
    

    const changeLanguage = (e) => {
        setOptions({...options, mode: e.target.value});
    };

    const submit = async (e) => {
        e.preventDefault();
        if (code && file) {
            console.log("Multiple solution detected");
            return;
        }
        try {
            if (file) {
                let formData = new FormData();
                formData.append('submission', file);
                formData.append('problem', match.params.id);
                const config = { headers: { "Content-Type" : "multipart/form-data" } };
                const res = await axios.post('http://localhost:5000/api/submissions', formData, config);    
                console.log(res.data);
            }
            else {
                const config = { headers: { "Content-Type": "application/json" } };
                const body = { code, language: fileExtension[options.mode], problem: match.params.id };
                const res = await axios.post('http://localhost:5000/api/submissions', body, config);
                console.log(res.data);
            }
        } 
        catch (error) {
            console.log(error.response);
        }
    }

    return (
        <Fragment>
            <h2 className="my-4">Problem Name: {problemName}</h2>
            <form onSubmit={e => submit(e)}>
                <div className="form-group">
                    <select name="language" onChange={e => changeLanguage(e)} className="form-control" value={options.mode}>
                        <option value="">Choose your language</option>
                        <option value="text/x-java">Java</option>
                        <option value="text/x-c++src">C++</option>
                        <option value="text/x-python">Python</option>
                    </select>
                </div>
                <div className="form-group">
                    <input disabled={code !== "" && "disabled"} name="submission" type="file" className="form-control-file" onChange={e => setFile(e.target.files[0])}/>
                </div> 
                <div className="form-group">
                    <CodeEditor onChange={setCode} value={code} options={options} />
                </div>
                <div className="form-group problem-action">
                    <button className="btn btn-primary problem-btn" type="submit">Submit Solution</button>
                    <Link className="btn btn-light problem-btn" to={`/problemset/${match.params.id}`}>Back to Problem Description</Link>
                </div>
            </form>
        </Fragment>
    )
}

// SubmitSolution.propTypes = {

// }

export default SubmitSolution
