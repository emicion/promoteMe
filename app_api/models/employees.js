const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  goalName: {
    type: String,
    'default': "Coming Soon"
  },
  goalProgress: {
    type: Number,
    'default': 0,
    min: 0,
    max: 100
  }
});

const accomplishmentSchema = new mongoose.Schema({
  accomplishmentName: {
    type: String,
    'default': "Coming Soon"
  },
  accomplishmentDescription: String
});

const feedbackSchema = new mongoose.Schema({
  author: String,
  feedbackText: String,
  createdOn: {
    type: Date,
    'default': Date.now
  }
});

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  hireDate: {
    type: Date,
    required: true
  },
  biography: String,
  goals: [goalSchema],
  accomplishments: [accomplishmentSchema],
  feedback: [feedbackSchema]
});

mongoose.model('Employee', employeeSchema, 'Employees');
