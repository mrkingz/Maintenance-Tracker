import _ from 'lodash';
import Validator from 'validator';
import collections from '../collections';

/**
 * 
 * 
 * @export
 * @class UserValidations
 */
export default class UserValidations {
  /**
   * Validates user's sign up details
   * @static
   * @returns {function} Returns an express middleware function that handles the validation
   * @memberof UserValidations
   */
  static validateSignupDetails() {
    return (req, res, next) => {
      let message;
      const { 
        username, email, password, decoded 
      } = req.body;

      if (Validator.isEmpty(username)) {
        message = 'Please, enter your username!';
      } else if (username.length < 3) {
        message = 'username, too short! Must be at least 3 characters long!';
      } else if (Validator.isEmpty(email)) {
        message = 'Please, enter your email address!';
      } else if (!Validator.isEmail(email)) {
        message = 'Please, enter a valid email address!';
      } else if (Validator.isEmpty(password)) {
        message = 'Please, enter your password!';
      } else if (password.length < 8) {
        message = 'Sorry, password too short! Must be at least 8 characters long!';
      }

      if (_.isEmpty(message)) {
        req.body = { 
          email, username, password, decoded
        };
        return next();
      }

      return res.status(400).json({
        status: 'fail',
        message
      });
    };
  }
  /**
   * Validates if a user sign up credential has been used
   * @param {string} string - the property name 
   * @static
   * @returns {function} Returns an express middleswar function that does the validation
   * @memberof UserValidations
   */
  static isUnique(string) {
    return (req, res, next) => {
      let isUnique = true;
      let length = collections.getUsersCount();

      for (let i = 0; i < length; i++) {
        if (collections.getUsers()[i][string.toLowerCase()] === req.body[string.toLowerCase()]) {
          isUnique = false;
          break;
        }
      }

      if (isUnique) {
        return next();
      }
      res.status(409).json({
        status: 'fail',
        message: `${string} has been used`
      });
    };
  }

  /**
   * Validates required fields
   * @static
   * @returns {function} Returns an express middleware function that handles 
   * the validation for required fields
   * @memberof UserValidations
   */
  static isRequired() {
    return (req, res, next) => {
      const { username, email, password } = req.body;
      if (_.isUndefined(username) || _.isUndefined(email) || _.isUndefined(password)) {
        return res.status(400).json({
          status: 'fail',
          message: 'Username, email and password are required!'
        });
      }

      return next();
    };
  }

  /**
   * Validates email
   * @static
   * @return {function} Returns an express middleware function that does the validation
   * @memberof UserValidations
   */
  static isValidEmail() {
    return (req, res, next) => {
      if (Validator.isEmail(req.body.email)) {
        return next();
      }
      return res.status(400).json({
        status: 'fail',
        message: 'Please, enter a valid email address'
      });
    };
  }
}