const mongoose = require('mongoose');
const Submission = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'problem'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    verdict: {
        type: String,
        required: true
    },
    language: {
        type: String, 
        required: true
    }
});

const SubmissionModel = mongoose.model('submission', Submission);
module.exports = SubmissionModel;