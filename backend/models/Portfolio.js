const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  // Personal Information
  personalInfo: {
    name: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    summary: String,
    profileImage: String,
    linkedin: String,
    github: String,
    website: String
  },
  
  // Skills
  skills: [{
    name: String,
    category: String, // Technical, Soft, Language, etc.
    level: String, // Beginner, Intermediate, Advanced, Expert
    icon: String
  }],
  
  // Projects
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    image: String,
    liveUrl: String,
    githubUrl: String,
    features: [String],
    startDate: Date,
    endDate: Date,
    status: String // Completed, In Progress, Planned
  }],
  
  // Experience
  experience: [{
    company: String,
    position: String,
    location: String,
    startDate: Date,
    endDate: Date,
    current: Boolean,
    description: String,
    achievements: [String],
    technologies: [String]
  }],
  
  // Education
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    gpa: String,
    description: String,
    achievements: [String]
  }],
  
  // Certificates
  certificates: [{
    name: String,
    issuer: String,
    issueDate: Date,
    expiryDate: Date,
    credentialId: String,
    credentialUrl: String,
    image: String,
    description: String
  }],
  
  // Languages
  languages: [{
    name: String,
    proficiency: String // Native, Fluent, Conversational, Basic
  }],
  
  // Contact Form Messages
  messages: [{
    name: String,
    email: String,
    subject: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);