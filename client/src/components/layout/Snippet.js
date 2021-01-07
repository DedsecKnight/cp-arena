import React, { Fragment, useState, useEffect } from 'react'
import CodeEditor from '../utilities/CodeEditor'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateTab } from '../../actions/navTab'

const Snippet = ({ updateTab }) => {
    useEffect(() => {
        updateTab(3);
    }, []);

    const [code, setCode] = useState("");
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

    const submit = (e) => {
        e.preventDefault();
        console.log({ name, code, language });
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
                <tr>
                    <th scope="row">1</th>
                    <td><a href="!#">Inverse Factorial</a></td>
                    <td className="java"><strong>Java</strong></td>
                    <td>Compute (n!)^-1 mod (a_prime_number)</td>
                    <td><button className="btn btn-light" type="button"><h4 className="delete-button">&times;</h4></button></td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td><a href="!#">Segment Tree</a></td>
                    <td className="cpp"><strong>C++</strong></td>
                    <td>Boilerplate code for Segment Tree</td>
                    <td><button className="btn btn-light" type="button"><h4 className="delete-button">&times;</h4></button></td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td><a href="!#">AVL Tree</a></td>
                    <td className="python"><strong>Python</strong></td>
                    <td>Boilerplate code for AVL Tree</td>
                    <td><button className="btn btn-light" type="button"><h4 className="delete-button">&times;</h4></button></td>
                </tr>
                </tbody>
            </table>
            <div className="my-5 add-snippet">
                <h2 className="my-4">Create your Snippet below</h2>
                <form onSubmit={e => submit(e)}>
                    <div className="form-group">
                        <input type="text" placeholder="Enter Snippet Name" value={name} onChange={e => changeName(e.target.value)} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <select name="language" onChange={e => changeLanguage(e)} className="form-control" defaultValue="">
                            <option value="">Choose your language</option>
                            <option value="text/x-java">Java</option>
                            <option value="text/x-c++src">C++</option>
                            <option value="text/x-python">Python</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <CodeEditor onChange={setCode} value={code} options={editorOption}/>
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
    updateTab: PropTypes.func.isRequired
}

export default connect(null, { updateTab })(Snippet)
