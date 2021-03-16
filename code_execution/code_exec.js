const { spawnSync } = require('child_process');
const config = require('config');

const exec_cpp = (filename, input, timelimit) => {
    var out = [];
    try {
        spawnSync(`g++ -std=c++17 -Wshadow -Wall -o "${filename}" "${filename}.cpp"  -O2 -Wno-unused-result`,{
            shell: true, 
            cwd: "submissions"
        });
        input.forEach((inp, idx) => {
            let child = spawnSync(`${filename}.exe`, {
                shell: true, 
                cwd: "submissions", 
                input: inp,
                encoding: 'utf-8',
                stdio: 'pipe',
                timeout: timelimit * 100
            });

            if (child.error.errno === "ETIMEDOUT") {
                throw new Error(`Time limit exceeded in test ${idx + 1}`);
            }

            if (child.status === 0) out.push(child.output[1]);
            else throw new Error(config.get("compilationError"));
        });
    } 
    catch (error) {
        out = [error.message];
    }

    try {
        spawnSync(`del /f ${filename}.exe`, {
            shell: true, 
            cwd: 'submissions'
        });
        spawnSync(`del /f ${filename}.cpp`, {
            shell: true, 
            cwd: 'submissions'
        })
    } 
    catch (error) {
        console.error(error);
    }

    return out;
}

const exec_python = (filename, input, timelimit) => {
    var out = [];
    try {
        spawnSync(`python -m py_compile "${filename}.py"`, { shell: true, cwd: "submissions"});
        input.forEach((inp, idx) => {
            let child = spawnSync(`python ${filename}.py`, {
                shell: true, 
                cwd: "submissions", 
                input: inp, 
                encoding: 'utf-8',
                stdio: 'pipe',
                timeout: timelimit * 100
            });
            
            if (child.error && child.error.errno === "ETIMEDOUT") {
                throw new Error(`Time limit exceeded in test ${idx + 1}`);
            }

            if (child.status === 0) out.push(child.output[1]);
            else throw new Error(config.get("compilationError"));
        });
    } 
    catch (error) {
        out = [error.message];
    }

    try {
        spawnSync(`del ${filename}.py`, {
            shell: true, 
            cwd: 'submissions'
        });    
    } catch (error) {
        console.error("error in cleaning up");
    }

    return out;
}

const exec_java = (filename, input, timelimit) => {
    var out = [];
    try {
        spawnSync(`javac ${filename}.java`, { shell: true, cwd: "submissions"});
        input.forEach((inp, idx) => {
            let child = spawnSync(`java ${filename}`, {
                shell: true, 
                cwd: "submissions", 
                input: inp,
                encoding: 'utf-8',
                stdio: 'pipe',
                timeout: timelimit * 100
            });
            
            if (child.error.errno === "ETIMEDOUT") {
                throw new Error(`Time limit exceeded in test ${idx + 1}`);
            }

            if (child.status === 0) out.push(child.output[1]);
            else throw new Error(config.get("compilationError"));
        });  
    } 
    catch (error) {
        out = [error.message];
    }

    try {
        spawnSync(`del *.class`, {
            shell: true, 
            cwd: 'submissions'
        });
        spawnSync(`del ${filename}.java`, {
            shell: true, 
            cwd: 'submissions'
        });  
    } catch (error) {
        console.error(error);
    }

    return out;
}

const exec_code = (input, filename, filetype, timelimit) => {
    let out = [];
    switch (filetype) {
        case "cpp": 
            out = exec_cpp(filename, input, timelimit);
            break;
        case "java": 
            out = exec_java(filename, input, timelimit);
            break;
        case "py":
            out = exec_python(filename, input, timelimit);
            break;
        default: out = []
    }
    return out;
}

module.exports = exec_code;