const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  hiringtype: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  experiance: {
    type: [String],
    enum: ["Beginner", "Intermediate", "Expert"],
  },
  role: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  media: {
    type: String,
  },
  filled: {
    type: Boolean,
  },
  createdAt: { type: Date, default: Date.now },
  expiryDate: {
    type: Date,
    default: () => Date.now() + 30 * 24 * 60 * 60 * 1000,
  }, // 30 days from creation
  reposted: { type: Boolean, default: false },
  repostHistory: [
    {
      repostedAt: { type: Date, default: Date.now },
    },
  ],
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;