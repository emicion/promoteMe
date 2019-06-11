const mongoose = require('mongoose');
const slug = require('slugs');

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  progress: {
    type: Number,
    'default': 0,
    min: 0,
    max: 100
  }
});
// const accomplishmentSchema = new mongoose.Schema({
//   accomplishmentName: {
//     type: String,
//     required: true
//   },
//   accomplishmentDescription: String
// });

const feedbackSchema = new mongoose.Schema({
  comment: String,
  author: String
});

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'Please enter a first name!'
  },
  lastName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  storeNumber: {
    type: Number,
    required: true
  },
  hireDate: {
    type: Date,
    required: true
  },
  biography: String,
  goals: [goalSchema],
  accomplishments: [String],
  feedback: [feedbackSchema],
  slug: String
});

employeeSchema.pre('save', function(next) {
  if(!this.isModified('lastName')) {
    next();
    return;
  }
  this.slug = slug(this.lastName);
  next();
});

mongoose.model('Employee', employeeSchema, 'Employees');
