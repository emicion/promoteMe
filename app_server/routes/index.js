var express = require('express');
var router = express.Router();
const ctrlEmployees = require('../controllers/employees');
const ctrlOthers = require('../controllers/others');

/* GET Employees page */
router.get('/', ctrlEmployees.employeeList);
router.get('/employee', ctrlEmployees.employeeInfo);
router.get('/employee/review/new', ctrlEmployees.addReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
