const mongoose = require('mongoose');
const md5 = require('md5');
const slug = require('slugs');

const managerSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
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
