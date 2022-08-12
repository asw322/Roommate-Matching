const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const usersurvey = sequelize.define(
    'usersurvey',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      q1: {
        type: DataTypes.INTEGER,
      },

      q2: {
        type: DataTypes.INTEGER,
      },

      q3: {
        type: DataTypes.INTEGER,
      },

      q4: {
        type: DataTypes.INTEGER,
      },

      q5: {
        type: DataTypes.INTEGER,
      },

      q6: {
        type: DataTypes.INTEGER,
      },

      q7: {
        type: DataTypes.INTEGER,
      },

      q8: {
        type: DataTypes.INTEGER,
      },

      q9: {
        type: DataTypes.INTEGER,
      },

      q10: {
        type: DataTypes.INTEGER,
      },

      q11: {
        type: DataTypes.INTEGER,
      },

      q12: {
        type: DataTypes.INTEGER,
      },

      q13: {
        type: DataTypes.INTEGER,
      },

      q14: {
        type: DataTypes.INTEGER,
      },

      q15: {
        type: DataTypes.INTEGER,
      },

      q16: {
        type: DataTypes.INTEGER,
      },

      q17: {
        type: DataTypes.INTEGER,
      },

      q18: {
        type: DataTypes.INTEGER,
      },

      q19: {
        type: DataTypes.INTEGER,
      },

      q20: {
        type: DataTypes.INTEGER,
      },

      q21: {
        type: DataTypes.INTEGER,
      },

      q22: {
        type: DataTypes.INTEGER,
      },

      q23: {
        type: DataTypes.INTEGER,
      },

      q24: {
        type: DataTypes.INTEGER,
      },

      q25: {
        type: DataTypes.INTEGER,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  usersurvey.associate = (db) => {
    db.usersurvey.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.usersurvey.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return usersurvey;
};
