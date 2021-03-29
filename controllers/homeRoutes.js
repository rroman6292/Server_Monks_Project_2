const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('login', { 
           logged_in: req.session.logged_in,
           role: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });

    switch (userData.role_id)   {
        case 1:
            res.render('admin', {
                ...user,
                logged_in: true
            })
            break;
        case 2:
            res.render('manager', {
                ...user,
                logged_in: true
            })
            break;
        case 3:
            res.render('employee', {
                ...user,
                logged_in: true
            })
            break;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/admin');
    return;
  }

  res.render('login');
});

module.exports = router;
