'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superpower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Superpower.belongsToMany(models.Superhero, {
        through: 'heroes_to_superpowers',
        foreignKey: 'powerId',
      });
    }
  }
  Superpower.init(
    {
      superPower: {
        field: 'superpower',
        allowNull: false,
        type: DataTypes.STRING(64),
        validate: {
          notNull: true,
          notEmpty: true,
          unique: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Superpower',
      tableName: 'superpowers',
      underscored: true,
    }
  );
  return Superpower;
};
