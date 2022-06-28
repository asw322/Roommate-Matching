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


  static async getUserPreferences(id) {
    const transaction = await db.sequelize.transaction();

    try {
      let userpreference = await UserpreferenceDBApi.findBy({id}, {transaction}, );

      if (!userpreference) {
        throw new ValidationError('userpreferenceNotFound', );
      }

      await transaction.commit();
      return userpreference;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }


  static async getAllOtherUserPreferences(id) {
    const transaction = await db.sequelize.transaction();

    try {
      let allotheruserpreference = await UserpreferenceDBApi.findAllOtherBasedOnId({id}, {transaction}, )

      if(!allotheruserpreference) {
        throw new ValidationError('allotheruserpreference', );
      }

      await transaction.commit();
      return allotheruserpreference;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }
  

  static async getAllOtherUserPreferencesInLocation(id, userLocationPreferences) {
    const transaction = await db.sequelize.transaction();

    try {
      let allotheruserpreferenceinlocation = await UserpreferenceDBApi.findAllOtherBasedOnIdAndLocation({id, userLocationPreferences}, {transaction}, );

      if(!allotheruserpreferenceinlocation) {
        throw new ValidationError('allotheruserpreferenceinlocation', );
      }

      await transaction.commit();
      return allotheruserpreferenceinlocation;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }
};

