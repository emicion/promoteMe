const mongoose = require('mongoose');
const Manager = mongoose.model('Manager');
const Employee = mongoose.model('Employee');
const User = mongoose.model('User');

const managerAdd = (req, res) => {
  res.render('manager-add', {
    title: 'Sign-Up',
    pageHeader: {
      title: 'Sign-Up',
      strapline: 'Your Team Needs You!'
    }
  });
};

const managerChangeGoalProgress = async (req, res) => {
  await Employee.findOneAndUpdate( {_id: req.params.id}, {$push: {goals: req.body} });
  req.flash('success', 'Succesfully Posted A New Goal!');
  res.redirect(`managers/employees/${req.params.id}/goals`);
};

const managerCreate = async (req, res, next) => {
  const manager = new Manager({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position:req.body.position,
    storeNumber: req.body.storeNumber,
    hireDate: req.body.hireDate
  });
  await manager.save();

  const user = new User({
    email: req.body.email,
    isManager: true,
    id: manager._id
  });
  await user.setPassword(req.body.password);
  await user.save();

  const { thisUser } = await User.authenticate()('user', 'password');
  next();
};

const managerEmployeeList = async (req, res) => {
  const manager = await Manager.findOne({ _id: req.params.id });
  const employees = await Employee.find({"storeNumber" : manager.storeNumber});
  res.render('manager-employee-list', {
    title: 'My Employees',
    pageHeader: {
      title: 'Today is the Day ',
      strapline: 'Help your employees achieve their goals!'
    },
    employees, manager
  });
};

const managerEdit = async (req, res) => {
  const manager = await Manager.findOne({ _id: req.params.id });
  var managerHireDate = manager.hireDate.toISOString().substring(0,10);
  res.render('manager-edit', {
    title: 'Edit Profile',
    pageHeader: {
      title: 'Edit Profile',
      strapline: 'Achieve your goals!'
    },
    manager, managerHireDate
  });
};

const managerUpdate = async (req, res) => {
  const manager = await Manager.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true, runValidators: true});
  req.flash('success', 'Succesfully Updated Manager Profile!');
  res.redirect(`/managers/${manager._id}`);
};

const managerViewEmployee = async (req, res) => {
  const manager = await Manager.findOne( { _id: req.user.id });
  const employee = await Employee.findOne( { _id: req.params.id } );
  res.render('manager-employee-info', {title: employee.lastName, employee, manager});
};

const managerViewEmployeeGoals = async (req, res) => {
  const manager = await Manager.findOne( { _id: req.user.id });
  const employee = await Employee.findOne( { _id: req.params.id } );
  res.render('manager-employee-info-goals', {tile: 'Goals', employee, manager});
};

const managerEmployeeFeedback = async (req, res) => {
  const manager = await Manager.findOne( { _id: req.user.id });
  const employee = await Employee.findOne( { _id: req.params.id } );
  res.render('manager-add-feedback', {title: "Feedback", employee, manager})
};

const managerPostFeedback = async (req, res) => {
  await Employee.update( {_id: req.params.id}, {$push: {feedback: req.body} });
  req.flash('success', 'Succesfully Posted Employee Feedback!');
  res.redirect(`/managers/employees/${req.params.id}`);
};



module.exports = {
  managerAdd,
  managerCreate,
  managerEmployeeList,
  managerEdit,
  managerUpdate,
  managerViewEmployee,
  managerViewEmployeeGoals,
  managerEmployeeFeedback,
  managerPostFeedback,
  managerChangeGoalProgress
};
