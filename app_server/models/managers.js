const mongoose = require('mongoose');
const slug = require('slugs');

const managerSchema = new mongoose.Schema({
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
  hireDate: {
    type: Date,
    required: true
  },
  storeNumber: {
    type: Number,
    required: true
  },
  slug: String
});

managerSchema.pre('save', function(next) {
  if(!this.isModified('lastName')) {
    next();
    return;
  }
  this.slug = slug(this.lastName);
  next();
});

mongoose.model('Manager', managerSchema, 'Managers');
