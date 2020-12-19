const mongoose = require('mongoose');
const Problem = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    difficulty: {
        type: String, 
        required: true
    },
    statement: {
        type: String, 
        required: true
    }, 
    timelimit: {
        type: Number, 
        required: true
    }, 
    memorylimit: {
        type: Number, 
        required: true
    }, 
    testcases: [{
        input: {
            type: String, 
            required: true
        }, 
        output: {
            type: String, 
            required: true
        }
    }]
});

const ProblemModel = mongoose.model('problem', Problem);
module.exports = ProblemModel;