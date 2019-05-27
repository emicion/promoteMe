const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  goalName: {
    type: String,
    required: true
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
    required: true
  },
  accomplishmentDescription: String
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
  accomplishments: [accomplishmentSchema]
});

mongoose.model('Employee', employeeSchema, 'Employees');
