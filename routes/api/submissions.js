const express = require('express');
const router = express.Router();

// @route   /api/submissions/
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    res.send("Submission route OK");
})

module.exports = router;