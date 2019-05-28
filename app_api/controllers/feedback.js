const mongoose = require('mongoose');
const Emp = mongoose.model('Employee');

const feedbackCreate = function (req, res) {
  const employeeid = req.params.employeeid;
  if (employeeid) {
    Emp
      .findById(employeeid)
      .select('feedback')
      .exec((err, employee) => {
        if (err) {
          res
            .status(400)
            .json(err);
        }
      }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "Not found, employeeid required"
      });
  }
};

const feedbackReadOne = function (req, res) {
  if (req.params && req.params.employeeid && req.params.feedbackid) {
    Emp
      .findById(req.params.employeeid)
      .exec((err, employee) => {
        if (!employee) {
          res
            .status(404)
            .json({
              "message": "employeeid not found"
            });
          return;
        } else if (err) {
          res
            .status(404)
            .json(err);
          return;
        }
        if (employee.feedback && employee.feedback.length > 0) {
          const feedback = employee.feedback.id(req.params.feedbackid);
          if (!feedback) {
            res
              .status(404)
              .json({
                "message": "feedbackid not found"
            });
          } else {
            response = {
              employee : {
                lastName : employee.lastName,
                id : req.params.employeeid
              },
              feedback : feedback
            };
            res
              .status(200)
              .json(response);
          }
        } else {
          res
            .status(404)
            .json({
              "message": "No feedback found"
          });
        }
      });
  } else {
    res
      .status(404)
      .json({
        "message": "Not found, employeeid and feedbackid are both required"
      });
  }
};

const feedbackUpdateOne = function (req, res) {
  if (!req.params.employeeid || !req.params.feedbackid) {
    res
      .status(404)
      .json({
        "message": "Not found, employeeid and feedbackid are both required"
      });
    return;
  }
  Emp
    .findById(req.params.employeeid)
    .select('feedback')
    .exec((err, employee) => {
      if (!employee) {
        res
          .status(404)
          .json({
            "message": "employeeid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      if (employee.feedback && employee.feedback.length > 0) {
        let thisfeedback = employee.feedback.id(req.params.feedbackid);
        if (!thisfeedback) {
          res
            .status(404)
            .json({
              "message": "feedbackid not found"
            });
        } else {
          thisfeedback.author = req.body.author;
          thisfeedback.feedbackText = req.body.feedbackText;
          employee.save((err, employee) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              res
                .status(200)
                .json(thisfeedback);
            }
          });
        }
      } else {
        res
          .status(404)
          json({
            "message": "No feedback to update"
          });
      }
    }
  );
};

const feedbackDeleteOne = function (req, res) {
  if (!req.params.employeeid || !req.params.feedbackid) {
    res
      .status(404)
      .json({
        "message": "Not found, employeeid and feedbackid are both required"
      });
    return;
  }
  Emp
    .findById(req.params.employeeid)
    .select('feedback')
    .exec((err, employee) => {
      if (!employee) {
        res
          .status(404)
          .json({
            "message": "employeeid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      if (employee.feedback && employee.feedback.length > 0) {
        if (!employee.feedback.id(req.params.feedbackid)) {
          res
            .status(404)
            .json({
              "message": "feedbackid not found"
            });
        } else {
          employee.feedback.id(req.params.feedbackid).remove();
          employee.save((err) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No feedback to delete"
          });
      }
    }
  );
};

module.exports = {
  feedbackCreate,
  feedbackReadOne,
  feedbackUpdateOne,
  feedbackDeleteOne
};
