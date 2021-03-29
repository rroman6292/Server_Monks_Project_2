const router = require('express').Router();
const { Onboarding } = require('../../models');
const withAuth = require('../../utils/auth');

//show all onboarding plans
router.get('/', async (req, res) => {
  try {
    const onboardingData = await Onboarding.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ],
    });

    // Serialize data so the template can read it
    const onboardingProject = onboardingData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('onboarding', { 
      onboardingProject, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//show a specific onboaring plan
router.get('/onboarding/:id', async (req, res) => {
  try {
    const onboardingData = await Onboarding.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    });

    const onboardingProject = onboardingData.get({ plain: true });

    res.render('onboarding', {
      ...onboardingProject,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create onboarding plan
router.post('/', withAuth, async (req, res) => {
  try {
    const newOnboardingPlan = await Onboarding.create({
      ...req.body,
      name: req.body.name,
      description: req.body.description,
    });

    res.status(200).json(newOnboardingPlan);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete onboarding plan
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const onboardingData = await Onboarding.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!onboardingData) {
      res.status(404).json({ message: 'No onboarding plan found with this id!' });
      return;
    }

    res.status(200).json(onboardingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


// route to create/add a onboarding plan
router.post('/', async (req, res) => {
    try { 
      const onboardingData = await Onboarding.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(200).json(onboardingData)
  } catch (err) {
    res.status(400).json(err);
  }
});

//route to update onboarding plan
router.put('/:id', async (req, res) => {
  const onboardingData = await Onboarding.update(
    {
      name: req.body.name,
      description: req.body.description,
    },
    {
      where: {
        id: req.params.id,
      }   
    }
  )  
});


module.exports = router;
  