const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class UserpreferenceDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const userpreference = await db.userpreference.create(
      {
        id: data.id || undefined,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return userpreference;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const userpreference = await db.userpreference.findByPk(id, {
      transaction,
    });

    await userpreference.update(
      {
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return userpreference;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const userpreference = await db.userpreference.findByPk(id, options);

    await userpreference.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await userpreference.destroy({
      transaction,
    });

    return userpreference;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const userpreference = await db.userpreference.findOne(
      { where },
      { transaction },
    );

    if (!userpreference) {
      return userpreference;
    }

    const output = userpreference.get({ plain: true });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if(filter.nid) {
        where = {
          ...where,
          ['id']: {
            [Op.ne]: Utils.uuid(filter.nid)
          },
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = await db.userpreference.findAndCountAll({
      where,
      include,
      distinct: true,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction,
    });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('userpreference', 'id', query),
        ],
      };
    }

    const records = await db.userpreference.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }

  static async findAllOtherBasedOnId(id, options) {
    const transaction = (options && options.transaction) || undefined;

    let userpreference = await db.userpreference.findAll(
      {
        where: {
          id: {
            [Op.ne]: id,
          },
        },
      },
      { transaction },
    );

    return userpreference;
  }

  static async findAllOtherBasedOnIdAndLocation(where, options) {
    const transaction = (options && options.transaction) || undefined;

    let userpreference = await db.userpreference.findAll(
      {
        where: {
          id: {
            [Op.ne]: id, 
          }
        },
        attributes: ['id'],
        include: [
          {model: db.locationpreference, attributes:['id']}
        ]
      }, 
      { transaction }
    );

    return userpreference;
  }
};
