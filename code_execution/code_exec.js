const { spawnSync } = require('child_process');

const exec_cpp = (filename, input) => {
    spawnSync(`g++ -std=c++17 -Wshadow -Wall -o "${filename}" "${filename}.cpp"  -O2 -Wno-unused-result`,{
        shell: true, 
        cwd: "submissions"
    });
    var out = [];
    input.forEach((inp) => {
        let child = spawnSync(`${filename}.exe`, {
            shell: true, 
            cwd: "submissions", 
            input: inp,
            encoding: 'utf-8',
            stdio: 'pipe'
        });
        out.push(child.output[1]);
    });
    spawnSync(`del /f ${filename}.exe`, {
        shell: true, 
        cwd: 'submissions'
    });
    spawnSync(`del /f ${filename}.cpp`, {
        shell: true, 
        cwd: 'submissions'
    })
    return out;
}

const exec_java = (filename, input) => {
    spawnSync(`javac ${filename}.java`, { shell: true, cwd: "submissions"});
    let out = [];
    input.forEach((inp) => {
        let child = spawnSync(`java ${filename}`, {
            shell: true, 
            cwd: "submissions", 
            input: inp,
            encoding: 'utf-8',
            stdio: 'pipe'
        });
        out.push(child.output[1]);
    });
    spawnSync(`del *.class`, {
        shell: true, 
        cwd: 'submissions'
    });
    spawnSync(`del ${filename}.java`, {
        shell: true, 
        cwd: 'submissions'
    });
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
        default: out = []
    }
    return out;
}

module.exports = exec_code;