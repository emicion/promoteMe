const mongoose = require('mongoose');
const md5 = require('md5');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  isManager: Boolean,
  id: String
});



userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
mongoose.model('User', userSchema, 'Users');
