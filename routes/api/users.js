const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult, body } = require('express-validator');
const User = require('../../models/User');
const router = express.Router();
const auth = require('./auth');


// @route   POST /api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', [
    check('handle', 'A handle is required').not().isEmpty(),
    check('email', 'An email is required').not().isEmpty(),
    check('email', 'Invalid email entered').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password length must be at least 6').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(400).json({ errors: errors });
    
    const { name, handle, email, password, description } = req.body;
    
    try {
        let user = await User.findOne({ email }); 
        if (user) return res.status(400).json({ errors: [{msg: "User already exists"}]});   
        
        user = new User({
            name: name,
            handle: handle, 
            description: description, 
            email: email,
            password: password,
            submission: [],
            snippet: []
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const payload = { user: { id: user._id} };

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            return res.status(200).json({ token });
        })
        
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', [
    check("email", 'Email is required').not().isEmpty(),
    check("password", 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(400).json({ errors: errors });
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).select('_id email password');
        if (!user) return res.status(400).json({ errors: [{msg : "Invalid credentials"}]});

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ errors: [{msg : "Invalid credentials"}]});

        const payload = { user: { id: user._id} };
        jwt.sign(payload, config.get("jwtSecret"), { expiresIn : 360000 }, (err, token) => {
            if (err) throw err;
            return res.status(200).json({ token });
        });    
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// @route   GET /api/users/me
// @desc    Get database of current user
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const me = await User.findOne({ _id: req.user.id }).select('-password');
        return res.status(200).json(me);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST /api/users/snippets
// @desc    Add snippet to user database
// @access  Private
router.post('/snippets', [ auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('code', 'Code is required').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(400).json({ errors: errors });

    try {
        const me = await User.findOne({ _id: req.user.id }).select('-password');
        const { name, code, language } = req.body;
        const newSnippet = { name, code, language };
        if (req.body.description) newSnippet.description = req.body.description;
        me.snippet.push(newSnippet);
        await me.save();
        res.json(me);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});




module.exports = router;