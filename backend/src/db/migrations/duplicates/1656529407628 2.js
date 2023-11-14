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
                      'userquestionweight',
                      'q1',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q2',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q3',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q4',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q5',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q6',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q7',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q8',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q9',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q10',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q11',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q12',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q13',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q14',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q15',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q16',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q17',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q18',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
                      'q19',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'userquestionweight',
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
                        'userquestionweight',
                        'q20',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q19',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q18',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q17',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q16',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q15',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q14',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q13',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q12',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q11',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q10',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q9',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q8',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q7',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q6',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q5',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q4',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q3',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
                        'q2',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'userquestionweight',
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
