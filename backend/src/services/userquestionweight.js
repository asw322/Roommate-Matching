const db = require('../db/models');
const UserquestionweightDBApi = require('../db/api/userquestionweight');

module.exports = class UserquestionweightService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await UserquestionweightDBApi.create(
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
      let userquestionweight = await UserquestionweightDBApi.findBy(
        {id},
        {transaction},
      );

      if (!userquestionweight) {
        throw new ValidationError(
          'userquestionweightNotFound',
        );
      }

      await UserquestionweightDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return userquestionweight;

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

      await UserquestionweightDBApi.remove(
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
  static async getUserQuestionWeights(id) {
    const transaction = await db.sequelize.transaction();

    try {
      let userquestionweight = await UserquestionweightDBApi.findBy({createdById: id}, {transaction}, );

      if (!userquestionweight) {
        throw new ValidationError('userquestionweightNotFound', );
      }

      await transaction.commit();
      return userquestionweight;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }
};

