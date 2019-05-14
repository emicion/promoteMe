const employeeList = (req, res) => {
  res.render('index', { title: 'Employee List'} );
};

const employeeInfo = (req, res) => {
  res.render('index', { title: 'Employee'} );
};

const addReview = (req, res) => {
  res.render('index', { title: 'Review Employee'} );
};

module.exports = {
  employeeList,
  employeeInfo,
  addReview
};
