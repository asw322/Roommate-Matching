const db = require('../db/models');
const UsersurveyDBApi = require('../db/api/usersurvey');

module.exports = class UsersurveyService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await UsersurveyDBApi.create(
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let usersurvey = await UsersurveyDBApi.findBy(
        {id},
        {transaction},
      );

      if (!usersurvey) {
        throw new ValidationError(
          'usersurveyNotFound',
        );
      }

      await UsersurveyDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return usersurvey;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await UsersurveyDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

