const User = require('./User');
const Roles = require('./Roles');


Roles.hasOne(User, {
  foreignKey: 'role_id',
});

User.belongsTo(Roles, {
  foreignKey: 'role_id'
});


module.exports = { User,Roles };