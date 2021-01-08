import React from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/material-palenight.css'
import 'codemirror/addon/display/autorefresh';

const CodeDisplay = ({ language, code }) => {
    return (
        <CodeMirror value={code} options={{
            mode: `${language}`,
            smartIndent: true,
            theme: 'material-palenight',
            readOnly: 'nocursor',
            autoRefresh: {delay: 500}
        }}></CodeMirror>
    )
}


export default CodeDisplay
