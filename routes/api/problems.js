const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const Problem = require('../../models/Problem');

// @route   GET /api/problems/
// @desc    Get all problems
// @access  Public
router.get('/', async (req, res) => {
    try {
        const problemset = await Problem.find();
        return res.status(200).json(problemset);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST /api/problems/
// @desc    Add a new problem
// @access  Public
router.post('/',  [
    check('name', 'Problem name is required').not().isEmpty(),
    check('difficulty', 'Problem difficulty is required').not().isEmpty(),
    body('difficulty').custom(val => {
        if (val !== "easy" && val !== "normal" && val !== "hard") throw new Error('Invalid difficulty');
        return true;
    }),
    check('statement', 'Problem statement is required').not().isEmpty(),
    check('timelimit', 'Time Limit is required').not().isEmpty(), 
    check('memorylimit', 'Memory Limit is required').not().isEmpty(),
    body('testcases').custom((arr) => {
        if (arr.length < 1) throw new Error('At least 1 test cases is required');
        arr.forEach(obj => {
            if (!obj.input || obj.input.length == 0) throw new Error('Test case input is required');
            if (!obj.output || obj.output.length == 0) throw new Error('Test case output is required');
        });
        return true;
    }),
    body('sampleTestCases').custom((arr) => {
        if (arr.length < 1) throw new Error('At least 1 test cases is required');
        arr.forEach(obj => {
            if (!obj.input || obj.input.length == 0) throw new Error('Test case input is required');
            if (!obj.output || obj.output.length == 0) throw new Error('Test case output is required');
        });
        return true;
    }),
    body('checkerCode').custom((code, { req }) => {
        if (!code && req.body.checkerRequired) throw new Error('Checker Code is required');
        return true;
    })
], async (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(400).json({ errors: errors });
    const { name, difficulty, statement, inputSpecification, outputSpecification, hint, sampleTestCases, checkerRequired, timelimit, memorylimit, testcases } = req.body;
    try {
        let problem = await Problem.find({ name: req.body.name });
        if (problem.length > 0) return res.status(400).json({ errors: [{ msg : "Problem already exists" }]});

        problem = { 
            name, 
            difficulty, 
            statement, 
            inputSpecification, 
            outputSpecification, 
            hint, 
            timelimit, 
            memorylimit, 
            testcases,
            sampleTestCases,
            checkerRequired
        };

        if (checkerRequired) problem.checkerCode = req.body.checkerCode;
        problem = new Problem(problem);

        await problem.save();

        return res.status(200).json(req.body);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");    
    }
});

// @route   GET /api/problems/easy
// @desc    Get all easy problems
// @access  Public
router.get('/easy', async (req, res) => {
    try {
        const problems = await Problem.find({ difficulty: "easy" });
        return res.status(200).json(problems);    
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET /api/problems/medium
// @desc    Get all medium problems
// @access  Public
router.get('/medium', async (req, res) => {
    try {
        const problems = await Problem.find({ difficulty: "medium" });
        return res.status(200).json(problems);    
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET /api/problems/hard
// @desc    Get all hard problems
// @access  Public
router.get('/hard', async (req, res) => {
    try {
        const problems = await Problem.find({ difficulty: "hard" });
        return res.status(200).json(problems);    
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET /api/problems/:id
// @desc    Get problem by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const problem = await Problem.findOne({ _id: req.params.id });
        return res.status(200).json(problem);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;