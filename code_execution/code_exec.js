const { spawnSync, spawn } = require('child_process');
const config = require('config');
const { COMPILATION_ERROR } = require('./checker_flag');

const EventEmitter = require('events')
const { execJava } = require('./java')
const { execCpp } = require('./cpp')
const { execPython } = require('./python')

class CodeExecEvent extends EventEmitter {}

const exec_cpp = (filename, input, timelimit, judge_output, eventObj) => {
    spawnSync(`g++ -std=c++17 -Wshadow -Wall -o "${filename}" "${filename}.cpp"  -O2 -Wno-unused-result`,{
        shell: true, 
        cwd: "submissions"
    });
    execCpp(filename, input, timelimit, judge_output, eventObj);
}

const exec_python = (filename, input, timelimit, judge_output, eventObj) => {
    spawnSync(`python -m py_compile "${filename}.py"`, { shell: true, cwd: "submissions"});
    execPython(filename, input, timelimit, judge_output, eventObj);
}

const exec_java = (filename, input, timelimit, judge_output, eventObj) => {
    spawnSync(`javac ${filename}.java`, { shell: true, cwd: "submissions"});
    execJava(filename, input, timelimit, judge_output, eventObj);

}

const exec_code = (input, filename, filetype, timelimit, judge_output, eventObj) => {
    let out = [];
    switch (filetype) {
        case "cpp": 
            out = exec_cpp(filename, input, timelimit, judge_output);
            break;
        case "java": 
            out = exec_java(filename, input, timelimit, judge_output, eventObj);
            break;
        case "py":
            out = exec_python(filename, input, timelimit, judge_output);
            break;
        default: out = []
    }
    return out;
}

const exec_checker = (input, judge_output, user_output, checkerName) => {
    let data = `${input}\\n${user_output}\\n${judge_output}`;
    const command = `g++ -std=c++17 -Wshadow -Wall -o "${checkerName}" "${checkerName}.cpp"  -O2 -Wno-unused-result`;
    spawnSync(command, {
        shell: true, 
        cwd: 'checker'
    });
    let child = spawnSync(`${checkerName}.exe`, {
        shell: true, 
        cwd: "checker", 
        input: data,
        encoding: 'utf-8',
        stdio: 'pipe'
    });
    spawn(`del ${checkerName}`, {
        shell: true, 
        cwd: "checker"
    });
    spawn(`del ${checkerName}.cpp`, {
        shell: true,
        cwd: "checker"
    });

    if (child.status > 0) return COMPILATION_ERROR;
    return child.status;
}

module.exports = { exec_checker, exec_code, CodeExecEvent };