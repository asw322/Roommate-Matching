const db = require('../db/models');
const UsermatchesDBApi = require('../db/api/usermatches');

module.exports = class UsermatchesService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await UsermatchesDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let usermatches = await UsermatchesDBApi.findBy({ id }, { transaction });

      if (!usermatches) {
        throw new ValidationError('usermatchesNotFound');
      }

      await UsermatchesDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return usermatches;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await UsermatchesDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
