const { spawnSync } = require('child_process');

const exec_code = (input, filename, filetype) => {
    spawnSync(`g++ -std=c++17 -Wshadow -Wall -o "${filename}" "${filename}.${filetype}"  -O2 -Wno-unused-result`,{
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
    spawnSync(`del /f ${filename}.${filetype}`, {
        shell: true, 
        cwd: 'submissions'
    })
    return out;
}

module.exports = exec_code;