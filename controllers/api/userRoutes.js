const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


//Get All Users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


//Create User
router.post('/', withAuth, async (req, res) => {
  try {
    const userData = await User.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    });

    res.status(200).json(userData);

  } catch (err) {
    res.status(400).json(err);
  }
});


//Update an existing employee
router.put('/:id', withAuth, async (req, res) => {
  try {
    const employeeData = await User.update(
      {
        ...req.body,
      },
      {
        where:  {
          id: req.params.id,
        },
      },
    );

    if (!employeeData) {
      res.status(404).json({ message: 'No employees found with this id!' });
      return;
    }

    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//Delete existing employee by ID
router.delete('/:id', async (req, res) => {
    try {
      const employeeData = await User.destroy({
        where:  {
          id: req.params.id,
          //user_id: req.session.user_id,
        },
      });

      if (!employeeData) {
        res.status(404).json({ message: 'No employees found with this id!' });
        return;
      }

      res.status(200).json(employeeData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

//User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.role_id = userData.role_id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


//user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
