const request = require('request');
const employeeList = (req, res) => {
  res.render('employee-list', {
    title: 'Employee Feed',
    pageHeader: {
      title: 'Today is the Day ',
      strapline: 'Help your employees achieve their goals!'
    },
    employees: [{
      name: 'Masahiro Takahashi',
      position: 'Meat Cutter',
      years: 3,
      accomplishments: ['Fastest Wrapper', 'Best Customer Service', 'Cleanest Work Station', 'Never Late', 'Expert Gourmet']
    },{
      name: 'Risa Mizoguchi',
      position: 'Meat Clerk',
      years: 1,
      accomplishments: ['Fastest Wrapper', 'Best Customer Service', 'Cleanest Work Station', 'Never Late', 'Expert Gourmet']
    }, {
      name: 'Yama Iriguchi',
      position: 'Senior Meat Clerk',
      years: 5,
      accomplishments: ['Fastest Wrapper', 'Best Customer Service', 'Cleanest Work Station', 'Never Late', 'Expert Gourmet']
    }]
  });
};

const employeeInfo = (req, res) => {
  res.render('employee-info', { title: 'Employee Information'} );
};

const addReview = (req, res) => {
  res.render('index', { title: 'Review Employee'} );
};

module.exports = {
  employeeList,
  employeeInfo,
  addReview
};
