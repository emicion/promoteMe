const passport = require('passport');

const login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: "Failed Login! Please enter a valid username and password!",
  successRedirect: '/bounce',
  //successFlash: 'You are now logged in!'
});


const logout = (req, res) => {
  req.logout();
  req.flash('success', 'Your are now logged out!');
  res.redirect('/login');
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash('success', 'Still Logged in ' + req.user.email);
    next();
    return;
  }
  req.flash('error', 'Must be logged in to do that!');
  res.redirect('/login');
}

const bounce = (req, res) => {
  //req.flash('success', 'Your are now logged in ' + req.user.email + '!');
  if (!req.user.isManager) {
    res.redirect('/employees/' + req.user.id);
  } else {
    res.redirect('/managers/' + req.user.id);
  };
};

module.exports = {
  login,
  logout,
  isLoggedIn,
  bounce
};
