
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class LocationpreferenceDBApi {

  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const locationpreference = await db.locationpreference.create({
      id: data.id || undefined,
      city: data.city || null,
      importHash: data.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    },
    { transaction },
    );

    return locationpreference;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const locationpreference = await db.locationpreference.findByPk(id, {
      transaction,
    });

    await locationpreference.update(
      {

        city: data.city
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return locationpreference;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const locationpreference = await db.locationpreference.findByPk(id, options);

    await locationpreference.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await locationpreference.destroy({
      transaction
    });

    return locationpreference;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const locationpreference = await db.locationpreference.findOne(
      { where },
      { transaction },
    );

    if (!locationpreference) {
      return locationpreference;
    }

    const output = locationpreference.get({plain: true});

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
    let include = [ ];
    let attributes = [ ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if(filter.createdById) {
        where = {
          ...where,
          ['createdById']: Utils.uuid(filter.createdById),
        };
      }

      if (filter.city) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'locationpreference',
            'city',
            filter.city,
          ),
        };
      }

      if(filter.attributes) {
        attributes = filter.attributes;
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

    let { rows, count } = await db.locationpreference.findAndCountAll(
      {
        where,
        include,
        attributes,
        distinct: true,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: (filter.field && filter.sort)
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
        transaction,
      },
    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike(
            'locationpreference',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.locationpreference.findAll({
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

