const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const usermatches = sequelize.define(
    'usermatches',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      matchedId: {
        type: DataTypes.TEXT,
      },

      matchedType: {
        type: DataTypes.TEXT,
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

  usermatches.associate = (db) => {
    db.usermatches.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.usermatches.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return usermatches;
};
