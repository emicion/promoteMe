const mongoose = require('mongoose');
const Emp = mongoose.model('Employee');

const employeesCreate =(req, res) => {
  Emp.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    hireDate: req.body.hireDate,
    biography: req.body.biography
  }, (err, employee) => {
    if (err) {
      res
        .status(400)
        .json(err);
    } else {
      res
        .status(201)
        .json(employee);
    }
  });
};
const employeesReadOne = function (req, res) {
  if (req.params && req.params.employeeid) {
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
        res
          .status(200)
          .json(employee);
      });
  } else {
    res
      .status(404)
      .json({
        "message": "No employeeid in request"
      });
  }
};
const employeesUpdateOne = (req, res) => {
  if (!req.params.employeeid) {
    res
      .status(404)
      .json({
        "message": "Not found, employeeid is required"
      });
    return;
  }
  Emp
    .findById(req.params.employeeid)
    .exec((err, employee) => {
      if (!employee) {
        res
          .json(404)
          .status({
            "message": "employeeid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.position = req.body.position;
      employee.hireDate = req.body.hireDate;
      employee.biography = req.body.biography;
      employee.feedback = req.body.feedback;
      employee.save((err, employee) => {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          res
            .status(200)
            .json(employee);
        }
      });
    }
  );
};

const employeesDeleteOne =(req, res) => {
  const employeeid = req.params.employeeid;
  if (employeeid) {
    Emp
      .findByIdAndRemove(employeeid)
      .exec((err, employee) => {
          if (err) {
            res
              .status(404)
              .json(err);
            return;
          }
          res
            .status(204)
            .json(null);
        }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "No employeeid"
      });
  }
};

module.exports = {
  employeesCreate,
  employeesReadOne,
  employeesUpdateOne,
  employeesDeleteOne
};
