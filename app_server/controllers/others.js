/* GET About page */
const about = (req, res) => {
  res.render('about', { title: 'About' });
};

/* GET Login page */
const login = (req, res) => {
  res.render('login', {
    title: 'Login',
    pageHeader: {
      title: 'Login',
      strapline: 'Achieve your goals!'
    }
  });
};

module.exports = {
  about,
  login
};
