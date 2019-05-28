const express = require('express');
const router = express.Router();
const ctrlEmployees = require('../controllers/employees');
const ctrlFeedback = require('../controllers/feedback');

router
  .route('/employees')
  .post(ctrlEmployees.employeesCreate);
router
  .route('/employees/:employeeid')
  .get(ctrlEmployees.employeesReadOne)
  .put(ctrlEmployees.employeesUpdateOne)
  .delete(ctrlEmployees.employeesDeleteOne);
router
  .route('/employees/:employeeid/feedback')
  .post(ctrlFeedback.feedbackCreate);
router
  .route('/employees/:employeeid/feedback/:feedbackid')
  .get(ctrlFeedback.feedbackReadOne)
  .put(ctrlFeedback.feedbackUpdateOne)
  .delete(ctrlFeedback.feedbackDeleteOne);

module.exports = router;
