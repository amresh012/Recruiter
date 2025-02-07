const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    experiance: {
        enum:["Beginner", "Intermediate", "Expert"]
    },
    role: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    skills: {
        type: [String]

    },
    media: {
        type: String,

    },
    filled: {
        type: Boolean,
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;