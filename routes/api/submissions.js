const express = require('express');
const upload = require('express-fileupload');
const router = express.Router();
const exec_code = require('../../code_execution/code_exec');

const Problem = require('../../models/Problem');
const Submission = require('../../models/Submission');
const User = require('../../models/User');

const auth = require('./auth')

router.use(upload());

// @route   /api/submissions/
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    res.send("Submission route OK");
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
            language: "cpp"
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
module.exports = router;