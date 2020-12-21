const express = require('express');
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
    let file = req.files.submission;
    try {
        await file.mv('submissions/' + file.name);    
        return res.status(200).json({ submission: file.data.toString('utf8') });
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

module.exports = router;