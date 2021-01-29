const { spawnSync } = require('child_process');
const config = require('config');

const exec_cpp = (filename, input) => {
    var out = [];
    try {
        spawnSync(`g++ -std=c++17 -Wshadow -Wall -o "${filename}" "${filename}.cpp"  -O2 -Wno-unused-result`,{
            shell: true, 
            cwd: "submissions"
        });
        input.forEach((inp) => {
            let child = spawnSync(`${filename}.exe`, {
                shell: true, 
                cwd: "submissions", 
                input: inp,
                encoding: 'utf-8',
                stdio: 'pipe'
            });

            if (child.output[2] === "") out.push(child.output[1]);
            else throw new Error(config.get("compilationError"));
        });
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
        out = [error.message];
    }
    return out;
}

const exec_python = (filename, input) => {
    var out = [];
    try {
        spawnSync(`python -m py_compile "${filename}.py"`, { shell: true, cwd: "submissions"});
        input.forEach((inp) => {
            let child = spawnSync(`python ${filename}.py`, {
                shell: true, 
                cwd: "submissions", 
                input: inp, 
                encoding: 'utf-8',
                stdio: 'pipe'
            });

            if (child.output[2] === "") out.push(child.output[1]);
            else throw new Error(config.get("compilationError"));
        });
        spawnSync(`del ${filename}.py`, {
            shell: true, 
            cwd: 'submissions'
        });    
    } 
    catch (error) {
        out = [error.message];
    }
    return out;
}

const exec_java = (filename, input) => {
    var out = [];
    try {
        spawnSync(`javac ${filename}.java`, { shell: true, cwd: "submissions"});
        input.forEach((inp) => {
            let child = spawnSync(`java ${filename}`, {
                shell: true, 
                cwd: "submissions", 
                input: inp,
                encoding: 'utf-8',
                stdio: 'pipe'
            });
            if (child.output[2] === "") out.push(child.output[1]);
            else throw new Error(config.get("compilationError"));
        });
        spawnSync(`del *.class`, {
            shell: true, 
            cwd: 'submissions'
        });
        spawnSync(`del ${filename}.java`, {
            shell: true, 
            cwd: 'submissions'
        });    
    } 
    catch (error) {
        out = [error.message];
    }
    return out;
}

const exec_code = (input, filename, filetype) => {
    let out = [];
    switch (filetype) {
        case "cpp": 
            out = exec_cpp(filename, input);
            break;
        case "java": 
            out = exec_java(filename, input);
            break;
        case "py":
            out = exec_python(filename, input);
            break;
        default: out = []
    }
    return out;
}

module.exports = exec_code;