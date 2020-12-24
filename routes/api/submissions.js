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
        let user_submission = await User.findOne({ _id: req.user.id }).populate('submission', ['name', 'submission', 'verdict']).select('submission');
        user_submission = user_submission.submission;
        var ret = [];
        user_submission.forEach(async (submit) => {
            try {
                const { _id, submission, verdict } = submit;
                let problem_name = await Problem.findOne({ _id: submit.name }).select('name');
                problem_name = problem_name.name;
                ret.push({
                    _id, 
                    name: problem_name,
                    submission, 
                    verdict
                });
                if (ret.length == user_submission.length) res.json(ret);
            } 
            catch (error) {
                console.error(error.message);
                res.status(500).send("Server Error");
            }
        });
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @route   POST /api/submissions/
// @desc    Upload submission
// @access  Private
router.post('/', auth, async (req, res) => {
    if (!req.files || !req.files.submission || !req.body.problem || !req.user) return res.status(400).json({ errors: [{msg: "Invalid request"}]});
    const { user : { id }, body : { problem }, files: { submission }} = req;
    const filename = id + "_" + problem, filetype = "cpp";
    submission.name = filename;
    try {
        await submission.mv('submissions/' + filename + "." + filetype);
        let input = await Problem.findOne({ _id: problem }).select('testcases');
        const output = exec_code(input.testcases.map(inp => inp.input), filename, filetype);
        const test_output = input.testcases.map((inp) => inp.output);
        
        let verdict = -1;

        for (var i = 0; i < test_output.length; i++) {
            if (output[i] !== test_output[i]) {
                verdict = i;
                break;
            }
        }

        verdict = (verdict === -1 ? "Accepted" : `WA on test ${verdict + 1}`);
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