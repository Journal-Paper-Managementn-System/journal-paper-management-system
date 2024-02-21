const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    keywords: [
        {
            type: String,
            required: true
        }
    ],
    file: {
        type: String,
        required: true
    },
    authors: [{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        affiliation: {
            type: String,
            required: true
        },
        firstAuthor: {
            type: Boolean,
            required: true
        },
        secondAuthor: {
            type: Boolean,
            required: true
        },
        correspondingAuthor: {
            type: Boolean,
            required: true
        }
    }],
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Submission = mongoose.model('Submission', subSchema);
module.exports = Submission;