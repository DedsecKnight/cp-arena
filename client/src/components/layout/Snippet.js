import React, { Fragment, useState, useEffect } from 'react'
import CodeEditor from '../utilities/CodeEditor'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateTab } from '../../actions/navTab'
import { languageDatabase } from '../../utilities/config';
import axios from 'axios';
import { SNIPPET_TAB } from '../../utilities/config'
import CodeDisplay from '../utilities/CodeDisplay'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { addAlert } from '../../actions/alert';
import { addSnippet } from '../../actions/auth';
import { v4 as uuid } from 'uuid';

const Snippet = ({ auth : { user : {snippet} }, updateTab, addAlert, addSnippet }) => {
    useEffect(() => {
        updateTab(SNIPPET_TAB);

        // Enable popover JS
        window.$('[data-toggle="popover"]').popover();
    }, [updateTab]);

    const [snippets, updateSnippet] = useState(snippet); 
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [name, changeName] = useState("");
    const [language, setLanguage] = useState("");
    const [editorOption, setOption] = useState({
        mode: '',
        indentWithTabs: true,
        lineWrapping: true,
        smartIndent: true,
        lineNumbers: true,
        autoCloseTags: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        theme: 'material-palenight'
    });
    
    const changeLanguage = (e) => {
        setLanguage(e.target.value);
        setOption({...editorOption, mode: e.target.value});
    }

    const resetField = () => {
        setCode("");
        setDescription("");
        changeName("");
        setLanguage("");
        setOption({...editorOption, mode: ''});
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { "Content-Type": 'application/json' } };
            const id = uuid();
            const body = { id, name, code, language, description };
            // Add snippet to database
            await axios.post('http://localhost:5000/api/users/snippets', body, config);

            // Update view of current component
            updateSnippet([...snippets, body]);

            // Update Redux Store
            addSnippet(body);

            // Reset data
            resetField();

            // Send notification
            addAlert("Snippet added", "success");
        } 
        catch (error) {
            error.response.data.errors.forEach(error => addAlert(error.msg, "danger"));
            //console.error(error.response);
        }
    }

    return (
        <Fragment>
            <h2 className="my-3">Your snippets</h2>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Snippet Name</th>
                    <th scope="col">Language</th>
                    <th scope="col">Description</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    {snippets.map((snippet, idx)=>(
                        <tr key={idx}>
                            <th scope="row">{idx+1}</th>
                            <td><a href="!#" data-toggle="modal" data-target={`#snippet${idx}`}>{snippet.name}</a></td>
                            <td className={snippet.language}><strong>{languageDatabase[snippet.language]}</strong></td>
                            <td>{snippet.description}</td>
                            <td><button className="btn btn-light" type="button"><h4 className="delete-button">&times;</h4></button></td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
            
            {snippets.map((snippet, idx)=>(
                <div key={idx} className="modal fade" id={`snippet${idx}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{snippet.name}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <CodeDisplay code={snippet.code} language={snippet.language} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <CopyToClipboard text={snippet.code}>
                                    <button type="button" className="btn btn-primary" data-container="body" data-trigger="focus" data-toggle="popover" data-placement="top" data-content="Copied to clipboard">
                                        Copy to clipboard
                                    </button>
                                </CopyToClipboard> 
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="my-5 add-snippet">
                <h2 className="my-4">Create your Snippet below</h2>
                <form onSubmit={e => submit(e)}>
                    <div className="form-group">
                        <input type="text" placeholder="Enter Snippet Name" value={name} onChange={e => changeName(e.target.value)} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <select name="language" onChange={e => changeLanguage(e)} className="form-control" value={language}>
                            <option value="">Choose your language</option>
                            <option value="text/x-java">Java</option>
                            <option value="text/x-c++src">C++</option>
                            <option value="text/x-python">Python</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <CodeEditor onChange={setCode} value={code} options={editorOption}/>
                    </div>
                    <div className="form-group">
                        <textarea name="description" cols="30" rows="10" placeholder="Describe your snippet" value={description} onChange={e=>setDescription(e.target.value)} className="form-control"></textarea>
                    </div>
                    <div className="form-group snippet-action my-4">
                        <button type="submit" className="btn btn-primary">Add new snippet</button>
                    </div>
                </form>
            </div>
            
        </Fragment>
    )
}

Snippet.propTypes = {
    updateTab: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    addAlert: PropTypes.func.isRequired,
    addSnippet: PropTypes.func.isRequired
}

const state_props = state => ({
    auth: state.auth
})

export default connect(state_props, { updateTab, addAlert, addSnippet })(Snippet)
