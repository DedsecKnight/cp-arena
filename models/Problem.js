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
    inputSpecification: {
        type: String, 
        default: "No input specification available"
    },
    outputSpecification: {
        type: String, 
        default: "No output specification available"
    },
    hint: [{
        type: String
    }],
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
    }],
    sampleTestCases: [{
        input: {
            type: String, 
            required: true
        }, 
        output: {
            type: String, 
            required: true
        },
        explanation: {
            type: String
        }
    }],
    acceptedCount: {
        type: Number, 
        default: 0
    },
    submissionCount: {
        type: Number, 
        default: 0
    },
    validatorRequired: {
        type: Boolean,
        default: false
    },
    validatorCode: {
        type: String
    }
});

const ProblemModel = mongoose.model('problem', Problem);
module.exports = ProblemModel;