const sequelize = require('../config/connection');
const { User, Roles } = require('../models');
const userData = require('./userData.json');
const roleData = require('./roleData.json');
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  for (const role of roleData) {
    await Roles.create({
      ...role
    });
  }
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  process.exit();
};
seedDatabase();