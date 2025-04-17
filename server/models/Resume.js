
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  templateId: { type: String, required: true },
  personalInfo: {
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    website: { type: String, default: '' },
    summary: { type: String, default: '' }
  },
  experience: [{
    company: { type: String, default: '' },
    position: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    description: { type: String, default: '' },
    current: { type: Boolean, default: false }
  }],
  education: [{
    institution: { type: String, default: '' },
    degree: { type: String, default: '' },
    field: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  skills: [{
    name: { type: String, default: '' },
    level: { type: Number, default: 0 }
  }],
  lastUpdated: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
