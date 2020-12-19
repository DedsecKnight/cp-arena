const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult, body } = require('express-validator');
const User = require('../../models/User');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();

// @route   /api/users/
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    res.send("User route OK");
});


// @route   POST /api/users/
// @desc    Register a user
// @access  Public
router.post('/', [
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

        const payload = {
            user: user._id
        };

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


module.exports = router;