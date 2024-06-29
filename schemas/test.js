var mongoose = require('mongoose')

var testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questionModel'
    }],
    duration: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['CREATED', 'REGISTRATION_STARTED', 'REGISTRATION_COMPLETE', 'TEST_STARTED', 'TEST_COMPLETE', 'RESULT_DECLARED', 'CANCELLED'],
        default: 'CREATED'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    }
},
    {
        timestamps: {}
    })

module.exports = testSchema