
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class UsersurveyDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const usersurvey = await db.usersurvey.create(
  {
  id: data.id || undefined,

    q1: data.q1
    ||
    null
,

    q2: data.q2
    ||
    null
,

    q3: data.q3
    ||
    null
,

    q4: data.q4
    ||
    null
,

    q5: data.q5
    ||
    null
,

    q6: data.q6
    ||
    null
,

    q7: data.q7
    ||
    null
,

    q8: data.q8
    ||
    null
,

    q9: data.q9
    ||
    null
,

    q10: data.q10
    ||
    null
,

    q11: data.q11
    ||
    null
,

    q12: data.q12
    ||
    null
,

    q13: data.q13
    ||
    null
,

    q14: data.q14
    ||
    null
,

    q15: data.q15
    ||
    null
,

    q16: data.q16
    ||
    null
,

    q17: data.q17
    ||
    null
,

    q18: data.q18
    ||
    null
,

    q19: data.q19
    ||
    null
,

    q20: data.q20
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return usersurvey;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const usersurvey = await db.usersurvey.findByPk(id, {
      transaction,
    });

    await usersurvey.update(
      {

        q1: data.q1
        ||
        null
,

        q2: data.q2
        ||
        null
,

        q3: data.q3
        ||
        null
,

        q4: data.q4
        ||
        null
,

        q5: data.q5
        ||
        null
,

        q6: data.q6
        ||
        null
,

        q7: data.q7
        ||
        null
,

        q8: data.q8
        ||
        null
,

        q9: data.q9
        ||
        null
,

        q10: data.q10
        ||
        null
,

        q11: data.q11
        ||
        null
,

        q12: data.q12
        ||
        null
,

        q13: data.q13
        ||
        null
,

        q14: data.q14
        ||
        null
,

        q15: data.q15
        ||
        null
,

        q16: data.q16
        ||
        null
,

        q17: data.q17
        ||
        null
,

        q18: data.q18
        ||
        null
,

        q19: data.q19
        ||
        null
,

        q20: data.q20
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return usersurvey;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const usersurvey = await db.usersurvey.findByPk(id, options);

    await usersurvey.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await usersurvey.destroy({
      transaction
    });

    return usersurvey;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const usersurvey = await db.usersurvey.findOne(
      { where },
      { transaction },
    );

    if (!usersurvey) {
      return usersurvey;
    }

    const output = usersurvey.get({plain: true});

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

      if (filter.q1Range) {
        const [start, end] = filter.q1Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q1: {
              ...where.q1,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q1: {
              ...where.q1,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q2Range) {
        const [start, end] = filter.q2Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q2: {
              ...where.q2,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q2: {
              ...where.q2,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q3Range) {
        const [start, end] = filter.q3Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q3: {
              ...where.q3,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q3: {
              ...where.q3,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q4Range) {
        const [start, end] = filter.q4Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q4: {
              ...where.q4,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q4: {
              ...where.q4,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q5Range) {
        const [start, end] = filter.q5Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q5: {
              ...where.q5,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q5: {
              ...where.q5,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q6Range) {
        const [start, end] = filter.q6Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q6: {
              ...where.q6,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q6: {
              ...where.q6,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q7Range) {
        const [start, end] = filter.q7Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q7: {
              ...where.q7,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q7: {
              ...where.q7,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q8Range) {
        const [start, end] = filter.q8Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q8: {
              ...where.q8,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q8: {
              ...where.q8,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q9Range) {
        const [start, end] = filter.q9Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q9: {
              ...where.q9,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q9: {
              ...where.q9,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q10Range) {
        const [start, end] = filter.q10Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q10: {
              ...where.q10,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q10: {
              ...where.q10,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q11Range) {
        const [start, end] = filter.q11Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q11: {
              ...where.q11,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q11: {
              ...where.q11,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q12Range) {
        const [start, end] = filter.q12Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q12: {
              ...where.q12,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q12: {
              ...where.q12,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q13Range) {
        const [start, end] = filter.q13Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q13: {
              ...where.q13,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q13: {
              ...where.q13,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q14Range) {
        const [start, end] = filter.q14Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q14: {
              ...where.q14,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q14: {
              ...where.q14,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q15Range) {
        const [start, end] = filter.q15Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q15: {
              ...where.q15,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q15: {
              ...where.q15,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q16Range) {
        const [start, end] = filter.q16Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q16: {
              ...where.q16,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q16: {
              ...where.q16,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q17Range) {
        const [start, end] = filter.q17Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q17: {
              ...where.q17,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q17: {
              ...where.q17,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q18Range) {
        const [start, end] = filter.q18Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q18: {
              ...where.q18,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q18: {
              ...where.q18,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q19Range) {
        const [start, end] = filter.q19Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q19: {
              ...where.q19,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q19: {
              ...where.q19,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.q20Range) {
        const [start, end] = filter.q20Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            q20: {
              ...where.q20,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            q20: {
              ...where.q20,
              [Op.lte]: end,
            },
          };
        }
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

    let { rows, count } = await db.usersurvey.findAndCountAll(
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
            'usersurvey',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.usersurvey.findAll({
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

