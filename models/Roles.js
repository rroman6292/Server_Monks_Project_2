const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Roles extends Model {}

Roles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    onboarding_id:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'onboarding',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role',
  }
);

module.exports = Roles;
