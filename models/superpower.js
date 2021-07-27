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
      // define association here
    }
  }
  Superpower.init(
    {
      heroId: {
        field: 'hero_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
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
