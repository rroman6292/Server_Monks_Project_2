const router = require('express').Router();
const { User, Onboarding } = require('../../models');



//View all staff - Admin Role
router.get('/', async (req,res) => {
    try{
        const employeeData = await User.findAll({
            include: {[model: Onboarding]},
        });
        res.status(200).json(employeeData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


//View all employees - Manager Role

router.get('/', async (req,res) => {
try{
    const employeeData = await User.findAll({
        where: {role: 'employee'},
        include: {[model: Onboarding]},
    });
    res.status(200).json(employeeData);
} catch (err) {
    res.status(400).json(err);
}
});


//Create User
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


//Update existing employee by ID
router.put('/:id', (req, res) => {
    User.update(req.body,   {
          where: {
            id: req.params.id,
          },
        }
      )
        .then((updatedUser) =>  {
          res.json(`The user with an id of ${req.params.id} has been updated.`);
      })
      .catch((err) => {
        res.json(err);
      });
  });


//Delete existing employee by ID
router.delete('/:id', (req, res) => {
    User.destroy(req.body,   {
          where: {
            id: req.params.id,
          },
        }
      )
        .then((updatedUser) =>  {
          res.json(`The user with an id of ${req.params.id} has been deleted.`);
      })
      .catch((err) => {
        res.json(err);
      });
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
