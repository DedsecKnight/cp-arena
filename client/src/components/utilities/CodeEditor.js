import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/theme/material-palenight.css'

const CodeEditor = ({ onChange, ...rest }) => {
    return (
        <CodeMirror {...rest} onBeforeChange={(editor, data, value) => {
            onChange(value);
        }}></CodeMirror>
    );
}

CodeEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
}

export default CodeEditor
