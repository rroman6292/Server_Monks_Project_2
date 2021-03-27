const User = require('./User');
const Roles = require('./Roles');
const Onboarding = require('./Onboarding');

User.hasOne(Roles, {
  foreignKey: 'role_id',
});

Roles.hasOne(Onboarding, {
    foreignKey: 'onboarding_id',
  });



module.exports = { User,Roles,Onboarding };