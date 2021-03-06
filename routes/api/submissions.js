const express = require('express');
const fs = require('fs');
const upload = require('express-fileupload');
const router = express.Router();
const { exec_code, exec_checker, CodeExecEvent } = require('../../code_execution/code_exec');
const { TC_FAILED, COMPILATION_ERROR } = require('../../code_execution/checker_flag');

const Problem = require('../../models/Problem');
const Submission = require('../../models/Submission');
const User = require('../../models/User');

const auth = require('./auth')

router.use(upload());

// @route   GET /api/submissions/me
// @desc    Get current user's submissions
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        let user_submission = await User.findOne({ _id: req.user.id }).populate('submission', ['name', 'submission', 'verdict', 'date', 'language']).select('submission');
        await Submission.populate(user_submission, {
            path: 'submission.name',
            select: 'name',
            model: Problem
        });
        res.json(user_submission.submission);
        
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST /api/submissions/
// @desc    Upload submission
// @access  Private
router.post('/', auth, async (req, res) => {
    if (!req.body.problem || !req.user) return res.status(400).json({ errors: [{msg: "Invalid request"}]});
    
    const submission_file = req.files && req.files.submission;
    const submission_code = req.body.code;

    if (!submission_code && !submission_file) return res.status(400).json({ errors: [{msg: "No submission found"}]});
    if (submission_code && submission_file) return res.status(400).json({ errors : [{ msg: "Multiple solutions found" }]});

    if (submission_code && !req.body.language) return res.status(400).json({ errors: [{ msg: "Please specify programming language" }] });

    const { user : { id }, body : { problem } } = req;
    let filename = req.body.file_name || (id + "_" + problem);
    let filetype = "";

    try {
        if (submission_file) {
            const { files: { submission } } = req;
            filetype = submission.name.substring(submission.name.indexOf(".")+1, submission.name.length);
            if (filetype !== "java") submission.name = filename + "." + filetype;
            else filename = submission.name.substring(0, submission.name.indexOf("."));
            await submission.mv('submissions/' + submission.name);
        }
        else {
            filetype = req.body.language;
            fs.writeFileSync(`submissions/${filename}.${filetype}`, req.body.code);
        }
        let currProblem = await Problem.findOne({ _id: problem });
        const judge_output = currProblem.testcases.map((inp) => inp.output);

        if (currProblem.checkerRequired) {
            fs.writeFileSync(`checker/${currProblem._id}.cpp`, currProblem.checkerCode);
        }
        
        const currentEvent = new CodeExecEvent();
        exec_code(currProblem.testcases.map(inp => inp.input), filename, filetype, currProblem.timelimit, judge_output, currentEvent);
        
        currentEvent.prependOnceListener('finished', async (judgeResult) => {
            verdict = (judgeResult.status === 'OK' ?  "Accepted" : judgeResult.message);
        
            currProblem.submissionCount++;
            if (verdict === "Accepted") currProblem.acceptedCount++;

            const file = (submission_file ? req.files.submission.data.toString('utf-8') : req.body.code);

            let submission_obj = new Submission({
                name: problem, 
                user: id, 
                submission: file,
                verdict, 
                language: filetype
            });
            
            
            let user = await User.findOne({ _id : id });
            user.submission.unshift(submission_obj._id);

            await user.save();
            await submission_obj.save();
            await currProblem.save();

            res.json({ verdict });
        })
        
        // for (var i = 0; i < user_output.length; i++) {
        //     if (user_output[i].indexOf("Time limit exceeded") !== -1 || user_output[i] === "Compilation Error") {
        //         compile_success = false;
        //         break;
        //     }
        //     if (currProblem.checkerRequired) {
        //         const { input, output } = currProblem.testcases[i];
        //         const status = exec_checker(input, output, user_output[i], currProblem._id);
        //         if (status === COMPILATION_ERROR) {
        //             compile_success = false;
        //             break;
        //         }
        //         if (status === TC_FAILED) {
        //             verdict = i;
        //             break;
        //         }
        //     }
        //     else if (user_output[i].trim() !== judge_output[i].trim()) {
        //         console.error(user_output[i]);
        //         verdict = i;
        //         break;
        //     }
        // }

        
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET /api/submissions/:problem_id
// @desc    Get all submissions for problem with problem_id
// @access  Public
router.get('/:problem_id', async (req, res) => {
    try {
        const submission_list = await Submission.find({ name: req.params.problem_id });
        res.json(submission_list);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");    
    }
});

module.exports = router;