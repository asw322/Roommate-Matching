const db = require('../db/models');
const UsersDBApi = require('../db/api/users');

const InvitationEmail = require('./email/list/invitation');
const ValidationError = require('./notifications/errors/validation');
const EmailSender = require('./email');
const AuthService = require('./auth');

// Service agents used in calculateMatchesBasedOnUserPreferences
const LocationPreferenceService = require('./locationpreference');
const UserPreferenceService = require('./userpreference');
const UserQuestionWeightService = require('./userquestionweight');

module.exports = class UsersService {
  static async create(data, currentUser, sendInvitationEmails = true, host) {
    let transaction = await db.sequelize.transaction();
    let email = data.email;
    let emailsToInvite = [];
    try {
      if (email) {
        let user = await UsersDBApi.findBy({ email }, { transaction });
        if (user) {
          throw new ValidationError('iam.errors.userAlreadyExists');
        } else {
          await UsersDBApi.create(
            { data },
            {
              currentUser,
              transaction,
            },
          );
          emailsToInvite.push(email);
        }
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
    if (emailsToInvite && emailsToInvite.length) {
      if (!sendInvitationEmails) {
        return;
      }
      AuthService.sendPasswordResetEmail(email, 'invitation', host);
    }
  }

  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let users = await UsersDBApi.findBy({ id }, { transaction });

      if (!users) {
        throw new ValidationError('iam.errors.userNotFound');
      }

      await UsersDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return users;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.id === id) {
        throw new ValidationError('iam.errors.deletingHimself');
      }

      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await UsersDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async calculateMatchesBasedOnUserPreferences(id) {
    console.log("[calculateMatchesBasedOnUserPreferences]");
    const transaction = await db.sequelize.transaction();

    try {
      // get user location preferences
      let userLocationPreference = LocationPreferenceService.getAllPreferredLocationsBasedOnId(id);

      // get user preferences
      // let userPreferences = UserPreferenceService.getUserPreferences(id);

      // get user question weights
      // let userQuestionWeight = UserQuestionWeightService.getUserQuestionWeights(id);

      // get ID of all users that match current user's location preference
      // let validId = LocationPreferenceService.getAllIdBasedOnLocations(userLocationPreference);

      // get all other user's weights
      // let allOtherUserPreferences = UserPreferenceService.getAllOtherUserPreferences(id);

      // get all other user's weights based on current user's location preference
      // let allOtherUserPreferences = UserPreferenceService.getAllOtherUserPreferencesWithLocation(id, allId);

      // compare algorithm
      

      await transaction.commit();
      return userLocationPreference;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }
};
