const router = require('express').Router();
const userRoutes = require('./userRoutes');
const onboardingRoutes = require('./onboardingRoutes');

router.use('/users', userRoutes);
router.use('/onboarding', onboardingRoutes);

module.exports = router;
