const mongoose = require('mongoose');
const { model } = require('./Submission');
const User = new mongoose.Schema({
    name: {
        type: String, 
    },
    handle: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String, 
        required: true, 
    },
    submission: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'submission'
    }],
    snippet: [{
        name: {
            type: String, 
            required: true,
        },
        content: {
            type: String, 
        },
        description: {
            type: String
        },
        language: {
            type: String,
            default: "N/A"
        }
    }]
});

const UserModel = mongoose.model('user', User);
module.exports = UserModel;