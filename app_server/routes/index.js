var express = require('express');
var router = express.Router();
const ctrlEmployees = require('../controllers/employees');
const ctrlManagers = require('../controllers/managers');
const ctrlAuth = require('../controllers/auth');
const ctrlOthers = require('../controllers/others');

/* GET Employee pages */
router.get('/', ctrlEmployees.employeeList);
router.get('/employees/:id/edit', ctrlAuth.isLoggedIn, ctrlEmployees.employeeEdit);
router.get('/add', ctrlEmployees.employeeAdd);
router.get('/employees/:id/feedback', ctrlEmployees.employeeAddFeedback);
router.get('/employees/:id/goals', ctrlAuth.isLoggedIn, ctrlEmployees.employeeGoals);
router.get('/employees/:id/goals/add', ctrlEmployees.employeeAddGoal);
router.get('/employees/:id', ctrlEmployees.employeeInfo);

/* GET Manager pages */
router.get('/manager-add', ctrlManagers.managerAdd);
router.get('/managers/:id', ctrlAuth.isLoggedIn, ctrlManagers.managerEmployeeList);
router.get('/managers/:id/edit', ctrlAuth.isLoggedIn, ctrlManagers.managerEdit);
router.get('/managers/employees/:id', ctrlAuth.isLoggedIn, ctrlManagers.managerViewEmployee);
router.get('/managers/employees/:id/goals', ctrlAuth.isLoggedIn, ctrlManagers.managerViewEmployeeGoals);
router.get('/managers/employees/:id/feedback', ctrlManagers.managerEmployeeFeedback);

/* POST Employee page */
router.post('/add', ctrlEmployees.employeeCreate, ctrlAuth.login);

/* POST Manager page */
router.post('/manager-add', ctrlManagers.managerCreate, ctrlAuth.login);

/* POST update Employee page */
router.post('/employees/:id/edit', ctrlEmployees.employeeUpdate);

/* POST update Manager page */
router.post('/managers/:id/edit', ctrlManagers.managerUpdate);

/*POST Employee feedback */
router.post('/employees/:id/feedback', ctrlEmployees.employeePostFeedback);

/*POST Employee feedback */
router.post('/managers/employees/:id/feedback', ctrlManagers.managerPostFeedback);

/* POST Goal */
router.post('/employees/:id/goals/add', ctrlEmployees.employeePostGoal);

router.post('/managers/employees/:id/goals', ctrlManagers.managerChangeGoalProgress);

/* Other pages */
router.get('/about', ctrlOthers.about);
router.get('/login', ctrlOthers.login);

router.get('/logout', ctrlAuth.logout);
router.post('/login', ctrlAuth.login);




router.get('/bounce', ctrlAuth.bounce);

module.exports = router;
