module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'userpreference',
        'q1',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q2',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q3',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q4',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q5',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q6',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q7',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q8',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q9',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q10',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q11',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q12',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q13',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q14',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q15',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q16',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q17',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q18',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q19',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'userpreference',
        'q20',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('userpreference', 'q20', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q19', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q18', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q17', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q16', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q15', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q14', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q13', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q12', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q11', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q10', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q9', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q8', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q7', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q6', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q5', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q4', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q3', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q2', {
        transaction,
      });

      await queryInterface.removeColumn('userpreference', 'q1', {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
