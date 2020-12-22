const express = require('express');
const { spawn } = require('child_process');
const upload = require('express-fileupload');
const router = express.Router();

router.use(upload());

// @route   /api/submissions/
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    res.send("Submission route OK");
})

// @route   POST /api/submissions/
// @desc    Upload submission
// @access  Public
router.post('/', async (req, res) => {
    //let file = req.files.submission;
    try {
        const { input } = req.body;
        const exec_code = (input) => {
            const compile = spawn('g++ -std=c++17 -Wshadow -Wall -o "jump_choreo" "jump_choreo.cpp"  -O2 -Wno-unused-result', {shell: true, cwd: "submissions"});
            var out = [];
            compile.on('exit', () => {
                input.forEach((inp, idx) => {
                    let child = spawn('jump_choreo.exe', { shell: true, cwd: "submissions"});
            
                    child.stdin.setEncoding('utf-8');
                
                    child.stdin.write(inp);
                    child.stdin.end();
                
                    var ret = "";
                
                    child.stdout.on('data', (data) => {
                        ret += data.toString('utf-8');
                        child.stdout.once('drain', () => {});
                    });
                
                    child.on('exit', () => {
                        out.push(ret);
                        if (idx == input.length - 1) {
                            spawn('del /f jump_choreo.exe', {shell: true, cwd: "submissions"});
                            res.json({ output: out });
                        }
                    });
                });
            });
        }
        exec_code(input);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

module.exports = router;