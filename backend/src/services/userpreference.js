const db = require('../db/models');
const UserpreferenceDBApi = require('../db/api/userpreference');

module.exports = class UserpreferenceService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await UserpreferenceDBApi.create(
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
      let userpreference = await UserpreferenceDBApi.findBy(
        {id},
        {transaction},
      );

      if (!userpreference) {
        throw new ValidationError(
          'userpreferenceNotFound',
        );
      }

      await UserpreferenceDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return userpreference;

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

      await UserpreferenceDBApi.remove(
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

