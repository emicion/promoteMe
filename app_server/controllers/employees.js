const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const User = mongoose.model('User');

const employeeList = async (req, res) => {
  const employees = await Employee.find();
  console.log(employees);
  res.render('employee-list', {
    title: 'Employee Feed',
    pageHeader: {
      title: 'Today is the Day ',
      strapline: 'Help your employees achieve their goals!'
    },
    employees
  });
};

const employeeEdit = async (req, res) => {
  const employee = await Employee.findOne({ _id: req.params.id });
  var employeeHireDate = employee.hireDate.toISOString().substring(0,10);
  res.render('employee-edit', {
    title: 'Edit Profile',
    pageHeader: {
      title: 'Edit Profile',
      strapline: 'Achieve your goals!'
    },
    employee, employeeHireDate
  });
};

const employeeUpdate = async (req, res) => {
  const employee = await Employee.findOneAndUpdate({ _id: req.params.id },
    {firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    hireDate: req.body.hireDate,
    biography: req.body.biography},
    {new: true, runValidators: true});
  req.flash('success', 'Succesfully Updated Employee Profile!');
  res.redirect(`/employees/${employee._id}`);
};

const employeeAdd = (req, res) => {
  res.render('employee-add', {
    title: 'Sign-Up',
    pageHeader: {
      title: 'Sign-Up',
      strapline: 'Achieve your goals!'
    }
  });
};

const employeeCreate = async (req, res, next) => {
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position:req.body.position,
    storeNumber: req.body.storeNumber,
    hireDate: req.body.hireDate,
    biography: req.body.biography,
    accomplishments: req.body.accomplishments
  });
  await employee.save();

  const user = new User({
    email: req.body.email,
    isManager: false,
    id: employee._id
  });
  await user.setPassword(req.body.password);
  await user.save();

  const { thisUser } = await User.authenticate()('user', 'password');
  next();
};

const employeeAddFeedback = async (req, res) => {
  const employee = await Employee.findOne({ _id: req.params.id });
  res.render('employee-add-feedback', { title: 'Feedback', employee} );
};

const employeePostFeedback = async (req, res) => {
  await Employee.update( {_id: req.params.id}, {$push: {feedback: req.body} });
  req.flash('success', 'Succesfully Posted Employee Feedback!');
  res.redirect(`/employees/${req.params.id}`);
};

const employeeGoals = async (req, res) => {
  const employee = await Employee.findOne({ _id: req.params.id });
  res.render('employee-goals', { title: 'My Goals', employee});
};

const employeeAddGoal = async (req, res) => {
  const employee = await Employee.findOne({ _id: req.params.id });
  res.render('employee-add-goal', { title: 'My Goals', employee});
};

const employeePostGoal = async (req, res) => {
  await Employee.update( {_id: req.params.id}, {$push: {goals: req.body} });
  req.flash('success', 'Succesfully Posted A New Goal!');
  res.redirect(`/employees/${req.params.id}/goals`);
};

const employeeInfo = async (req, res) => {
  const employee = await Employee.findOne({ _id: req.params.id });
  res.render('employee-info', { title: 'Employee Information', employee} );
};


module.exports = {
  employeeList,
  employeeEdit,
  employeeAdd,
  employeeUpdate,
  employeeCreate,
  employeeAddFeedback,
  employeePostFeedback,
  employeeGoals,
  employeeAddGoal,
  employeePostGoal,
  employeeInfo
};
