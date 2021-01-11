const express = require('express');
const upload = require('express-fileupload');
const router = express.Router();
const exec_code = require('../../code_execution/code_exec');

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
        let user_submission = await User.findOne({ _id: req.user.id }).populate('submission', ['name', 'submission', 'verdict', 'date']).select('submission');
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
    if (!req.files || !req.files.submission || !req.body.problem || !req.user) return res.status(400).json({ errors: [{msg: "Invalid request"}]});
    const { user : { id }, body : { problem }, files: { submission }} = req;
    const filename = id + "_" + problem, filetype = submission.name.substring(submission.name.indexOf(".")+1, submission.name.length);
    submission.name = filename + "." + filetype;
    try {
        await submission.mv('submissions/' + submission.name);
        let currProblem = await Problem.findOne({ _id: problem });
        const user_output = exec_code(currProblem.testcases.map(inp => inp.input), filename, filetype);
        const judge_output = currProblem.testcases.map((inp) => inp.output);
        
        let verdict = -1;

        for (var i = 0; i < judge_output.length; i++) {
            if (user_output[i].trim() !== judge_output[i]) {
                verdict = i;
                break;
            }
        }

        verdict = (verdict === -1 ? "Accepted" : `WA on test ${verdict + 1}`);
        currProblem.submissionCount++;
        if (verdict === "Accepted") currProblem.acceptedCount++;

        const file = submission.data.toString('utf-8');

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