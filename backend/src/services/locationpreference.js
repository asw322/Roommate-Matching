const db = require('../db/models');
const LocationpreferenceDBApi = require('../db/api/locationpreference');

module.exports = class LocationpreferenceService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await LocationpreferenceDBApi.create(
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
      let locationpreference = await LocationpreferenceDBApi.findBy(
        {id},
        {transaction},
      );

      if (!locationpreference) {
        throw new ValidationError(
          'locationpreferenceNotFound',
        );
      }

      await LocationpreferenceDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return locationpreference;

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

      await LocationpreferenceDBApi.remove(
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


  static async getAllPreferredLocationsBasedOnId(id) {
    const transaction = await db.sequelize.transaction();

    try {
      let locationpreference = await LocationpreferenceDBApi.findAll({id: id},{transaction});

      if (!locationpreference) {
        throw new ValidationError('locationpreferenceNotFound', );
      }

      await transaction.commit();
      return locationpreference;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async getAllIdBasedOnLocations(locationsArray) {
    const transaction = await db.sequelize.transaction();

    try {
      let id = await LocationPreferenceDBApi.findAll({cityArray: locationsArray}, {transaction}); 

      await transaction.commit();
      return id;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }
};

