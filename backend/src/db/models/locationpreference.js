const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const locationpreference = sequelize.define(
    'locationpreference',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      city: {
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

  locationpreference.associate = (db) => {
    db.locationpreference.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.locationpreference.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return locationpreference;
};
