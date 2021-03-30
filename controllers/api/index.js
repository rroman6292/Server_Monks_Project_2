const router = require('express').Router();
const userRoutes = require('./userRoutes');
//const employeeRoutes = require('./employeeRoutes');

router.use('/users', userRoutes);
//router.use('/employee', employeeRoutes);

module.exports = router;
