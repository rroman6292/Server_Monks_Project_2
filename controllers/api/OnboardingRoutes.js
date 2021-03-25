 const router = require('express').Router();
// const { Project } = require('../../models');
// const withAuth = require('../../utils/auth');

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


  router.put('/:id', async (req, res) => {
    try {
      const onboardingData = await Onboarding.update(
      {
        name: req.body.name,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
   });

//router.delete
//router.get
  
  module.exports = router;
  