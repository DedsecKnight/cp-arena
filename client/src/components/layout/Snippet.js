import React, { Fragment, useState, useEffect } from 'react'
import CodeEditor from '../utilities/CodeEditor'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateTab } from '../../actions/navTab'
import database from '../../utilities/languageDatabase';
import axios from 'axios';
import { SNIPPET_TAB } from '../../utilities/config'

const Snippet = ({ auth : { user : {snippet} }, updateTab }) => {
    useEffect(() => {
        updateTab(SNIPPET_TAB);
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
            await axios.post('http://localhost:5000/api/users/snippets', {name, code, language, description}, config);
            updateSnippet([...snippets, { name, code, language, description }]);
            resetField();
        } 
        catch (error) {
            console.error(error.response);
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
                            <td><a href="!#">{snippet.name}</a></td>
                            <td className={snippet.language}><strong>{database[snippet.language]}</strong></td>
                            <td>{snippet.description}</td>
                            <td><button className="btn btn-light" type="button"><h4 className="delete-button">&times;</h4></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
    auth: PropTypes.object.isRequired
}

const state_props = state => ({
    auth: state.auth
})

export default connect(state_props, { updateTab })(Snippet)
