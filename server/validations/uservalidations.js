import has from 'lodash/has';
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
   * @returns {function} Returns an express middleware function that handles the validation for required fields
   * @memberof UserValidations
   */
  static isRequired() {
    return (req, res, next) => {
      const { body } = req;
      if (!has(body, ['username']) || !has(body, ['email']) || !has(body, ['password'])) {
        const { username, email, password } = req.body;
        req.body = { username, email, password };
        return res.status(400).json({
          status: 'fail',
          message: 'Username, email and password are required'
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