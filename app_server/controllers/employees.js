const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

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

const employeeGet = async (req, res) => {
  const employee = await Employee.findOne({ _id: req.params.id });

  res.render('employee-info', { title: 'My Profile', employee} )
};

const employeeEdit = (req, res) => {
  res.render('employee-edit', {
    title: 'Sign-Up',
    pageHeader: {
      title: 'Sign-Up',
      strapline: 'Achieve your goals!'
    }
  });
};

const employeeCreate = async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  req.flash('success', 'Succesfully Created Profile!');
  res.redirect('/');
};

const employeeAddFeedback = async (req, res) => {
  const employee = await Employee.findOne({ _id: req.params.id });
  res.render('employee-add-feedback', { title: 'Feedback', employee} );
};

const employeePostFeedback = async (req, res) => {
  await Employee.update( {_id: req.params.id}, {$push: {feedback: req.body} });
  req.flash('success', 'Succesfully Posted Employee Feedback!');
  res.redirect('/');
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
  res.redirect('/');
};

const employeeInfo = (req, res) => {
  res.render('employee-info', { title: 'Employee Information', employee} );
};


module.exports = {
  employeeList,
  employeeGet,
  employeeEdit,
  employeeCreate,
  employeeAddFeedback,
  employeePostFeedback,
  employeeGoals,
  employeeAddGoal,
  employeePostGoal,
  employeeInfo
};
