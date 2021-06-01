const { spawnSync, spawn } = require('child_process');
const config = require('config');
const { COMPILATION_ERROR } = require('./checker_flag');

const EventEmitter = require('events')
const { execJava } = require('./java')
const { execCpp } = require('./cpp')
const { execPython } = require('./python')

class CodeExecEvent extends EventEmitter {}

const exec_cpp = (filename, input, timelimit, judge_output, eventObj) => {
    try {
        spawnSync(`g++ -std=c++17 -Wshadow -Wall -o "${filename}" "${filename}.cpp"  -O2 -Wno-unused-result`,{
            shell: true, 
            cwd: "submissions"
        });
    } catch (error) {
        eventObj.emit('finished', {
            status: 'NO_OK',
            message: config.get('compilationError')
        })
    }
    execCpp(filename, input, timelimit, judge_output, eventObj);
}

const exec_python = (filename, input, timelimit, judge_output, eventObj) => {
    try {
        spawnSync(`python -m py_compile "${filename}.py"`, { shell: true, cwd: "submissions"});
    } catch (error) {
        eventObj.emit('finished', {
            status: 'NO_OK',
            message: config.get('compilationError')
        })
    }
    execPython(filename, input, timelimit, judge_output, eventObj);
}

const exec_java = (filename, input, timelimit, judge_output, eventObj) => {
    try {
        spawnSync(`javac ${filename}.java`, { shell: true, cwd: "submissions"});
    } catch (error) {
        eventObj.emit('finished', {
            status: 'NO_OK',
            message: config.get('compilationError')
        })
    }
    execJava(filename, input, timelimit, judge_output, eventObj);

}

const exec_code = (input, filename, filetype, timelimit, judge_output, eventObj) => {
    switch (filetype) {
        case "cpp": 
            exec_cpp(filename, input, timelimit, judge_output, eventObj);
            break;
        case "java": 
            exec_java(filename, input, timelimit, judge_output, eventObj);
            break;
        case "py":
            exec_python(filename, input, timelimit, judge_output, eventObj);
            break;
        default: 
            return
    }
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