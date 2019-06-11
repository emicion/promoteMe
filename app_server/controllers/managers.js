const mongoose = require('mongoose');
const Manager = mongoose.model('Manager');
const Employee = mongoose.model('Employee');

const managerAdd = (req, res) => {
  res.render('manager-add', {
    title: 'Sign-Up',
    pageHeader: {
      title: 'Sign-Up',
      strapline: 'Your Team Needs You!'
    }
  });
};

const managerCreate = async (req, res) => {
  const manager = new Manager(req.body);
  await manager.save();
  req.flash('success', 'Succesfully Created Profile!');
  res.redirect('/');
};

const managerEmployeeList = async (req, res) => {
  const manager = await Manager.findOne({"firstName" : "Melissa"})
  const employees = await Employee.find({"storeNumber" : manager.storeNumber});
  res.render('manager-employee-list', {
    title: 'My Employees',
    pageHeader: {
      title: 'Today is the Day ',
      strapline: 'Help your employees achieve their goals!'
    },
    employees
  });
  console.log(employees);
};

const managerInfo = async (req, res) => {
  const manager = await Manager.findOne({"firstName" : "Melissa"});
  res.render('manager-info', {title: 'My Profile', manager});
  console.log(manager);
};

module.exports = {
  managerAdd,
  managerCreate,
  managerEmployeeList,
  managerInfo
};
