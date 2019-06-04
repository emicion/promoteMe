var express = require('express');
var router = express.Router();
const ctrlEmployees = require('../controllers/employees');
const ctrlOthers = require('../controllers/others');

/* GET Employees page */
router.get('/', ctrlEmployees.employeeList);
router.get('/employees/:id', ctrlEmployees.employeeGet);
router.get('/add', ctrlEmployees.employeeEdit);
router.get('/employees/:id/feedback', ctrlEmployees.employeeAddFeedback);
router.get('/employees/:id/goals', ctrlEmployees.employeeGoals);
router.get('/employees/:id/goals/add', ctrlEmployees.employeeAddGoal);



router.get('/employee', ctrlEmployees.employeeInfo);

/* POST Employee page */
router.post('/add', ctrlEmployees.employeeCreate);

/*POST Employee page */
router.post('/employees/:id/feedback', ctrlEmployees.employeePostFeedback);

/* POST Goal */
router.post('/employees/:id/goals/add', ctrlEmployees.employeePostGoal);

/* Other pages */
router.get('/about', ctrlOthers.about);
router.get('/login', ctrlOthers.login);

module.exports = router;
