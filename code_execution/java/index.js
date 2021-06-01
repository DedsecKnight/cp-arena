const { spawn } = require('child_process')

const execJava = (filename, input, timelimit, judge_output, eventObj) => {    
    exec_java_helper(filename, input, timelimit, judge_output, eventObj, 0);
}

const clean_up = (filename) => {
    spawn(`del *.class`, {
        shell: true, 
        cwd: 'submissions'
    });
    spawn(`del ${filename}.java`, {
        shell: true, 
        cwd: 'submissions'
    });
}

const exec_java_helper = (filename, input, timelimit, judge_output, eventObj, idx) => {
    if (idx >= input.length) {
        eventObj.emit('finished', {
            status: 'OK'
        });
        clean_up(filename);
        return;
    }
    const child = spawn(`java ${filename}`, {
        shell: true,
        cwd: "submissions",
        encoding: 'utf-8',
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

    child.on('error', () => {
        eventObj.emit('finished', {
            status: 'NO_OK',
            message: `Run time error in test ${idx + 1}`
        })
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
        exec_java_helper(filename, input, timelimit, judge_output, eventObj, idx + 1);
    })

    

}

module.exports = { execJava };