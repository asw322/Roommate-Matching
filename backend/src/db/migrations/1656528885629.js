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
                      'usersurvey',
                      'q1',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q2',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q3',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q4',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q5',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q6',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q7',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q8',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q9',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q10',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q11',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q12',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q13',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q14',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q15',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q16',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q17',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q18',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q19',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'usersurvey',
                      'q20',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
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

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q20',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q19',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q18',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q17',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q16',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q15',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q14',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q13',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q12',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q11',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q10',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q9',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q8',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q7',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q6',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q5',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q4',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q3',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q2',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'usersurvey',
                        'q1',
                        { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
