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

router.post('/', async (req, res) => {
    let file = req.files.submission;
    try {
        await file.mv('submissions/' + file.name);    
        res.send("Success");
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

module.exports = router;