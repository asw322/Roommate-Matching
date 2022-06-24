const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const userpreference = sequelize.define(
    'userpreference',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  userpreference.associate = (db) => {

    db.userpreference.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.userpreference.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return userpreference;
};

