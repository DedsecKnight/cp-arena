const mongoose = require('mongoose');
const User = new mongoose.Schema({
    name: {
        type: String, 
    },
    handle: {
        type: String, 
        required: true
    },
    description: {
        type: String,
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
        code: {
            type: String, 
        },
        description: {
            type: String,
            default: "N/A"
        },
        language: {
            type: String,
            default: "N/A"
        }
    }]
});

const UserModel = mongoose.model('user', User);
module.exports = UserModel;