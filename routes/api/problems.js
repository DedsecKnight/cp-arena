const express = require('express');
const router = express.Router();

// @route   /api/problems/
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    res.send("Problem route OK");
});

module.exports = router;