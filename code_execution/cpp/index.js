const { spawn } = require('child_process')
const config = require('config');

const execCpp = (filename, input, timelimit, judge_output, eventObj) => {    
    exec_cpp_helper(filename, input, timelimit, judge_output, eventObj, 0);
}

const clean_up = (filename) => {
    spawn(`del /f ${filename}.exe`, {
        shell: true, 
        cwd: 'submissions'
    });
    spawn(`del /f ${filename}.cpp`, {
        shell: true, 
        cwd: 'submissions'
    })
}

const exec_cpp_helper = (filename, input, timelimit, judge_output, eventObj, idx) => {
    if (idx >= input.length) {
        eventObj.emit('finished', {
            status: 'OK'
        });
        clean_up(filename);
        return;
    }
    const child = spawn(`${filename}.exe`, {
        shell: true,
        cwd: "submissions",
        encoding: 'utf-8',
        timeout: 1000
    });

    child.stdin.write(input[idx]);

    let timer = setTimeout(() => {
        child.kill();
        eventObj.emit('finished', {
            status: 'NO_OK',
            message: `Time limit exceed in test ${idx + 1}`
        })
        clean_up(filename);
        return;
    }, timelimit * 5000);

    child.on('error', (err) => {
        if (err.errno === "ETIMEDOUT") {
            eventObj.emit('finished', {
                status: 'NO_OK',
                message: `Time limit exceeded in test ${idx + 1}`
            })
        }
        else {
            eventObj.emit('finished', {
                status: 'NO_OK',
                message: `Run time error in test ${idx + 1}`
            })
        }
        clean_up(filename);
        return;
    })

    child.stdout.on('data', (data) => {
        if (data.toString() !== judge_output[idx]) {
            eventObj.emit('finished', {
                status: 'NO_OK',
                message: `Wrong answer in test ${idx + 1}`
            })
            clean_up(filename);
            return;
        }
    })

    child.on('exit', (code, signal) => {
        if (signal) {
            eventObj.emit('finished', {
                status: 'NO_OK',
                message: `Run time error in test ${idx + 1}`
            });
            clean_up(filename);
            return;
        }
        clearTimeout(timer);
        exec_cpp_helper(filename, input, timelimit, judge_output, eventObj, idx + 1);
    })

    

}

module.exports = { execCpp };