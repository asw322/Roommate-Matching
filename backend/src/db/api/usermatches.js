
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class UsermatchesDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const usermatches = await db.usermatches.create(
  {
  id: data.id || undefined,

    matchedId: data.matchedId
    ||
    null
,

    matchedType: data.matchedType
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return usermatches;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const usermatches = await db.usermatches.findByPk(id, {
      transaction,
    });

    await usermatches.update(
      {

        matchedId: data.matchedId
        ||
        null
,

        matchedType: data.matchedType
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return usermatches;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const usermatches = await db.usermatches.findByPk(id, options);

    await usermatches.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await usermatches.destroy({
      transaction
    });

    return usermatches;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const usermatches = await db.usermatches.findOne(
      { where },
      { transaction },
    );

    if (!usermatches) {
      return usermatches;
    }

    const output = usermatches.get({plain: true});

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
    let include = [

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.matchedId) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'usermatches',
            'matchedId',
            filter.matchedId,
          ),
        };
      }

      if (filter.matchedType) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'usermatches',
            'matchedType',
            filter.matchedType,
          ),
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
          active:
            filter.active === true ||
            filter.active === 'true',
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

    let { rows, count } = await db.usermatches.findAndCountAll(
      {
        where,
        include,
        distinct: true,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: (filter.field && filter.sort)
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
        transaction,
      },
    );

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
          Utils.ilike(
            'usermatches',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.usermatches.findAll({
      attributes: [ 'id', 'id' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }

};

