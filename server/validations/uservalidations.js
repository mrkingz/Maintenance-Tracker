import _ from 'lodash';
import data from '../data';

const users = data.users;

/**
 * 
 * 
 * @export
 * @class UserValidations
 */
export default class UserValidations {
  /**
   * Validates if username is unique
   * @param {string} string the property of the user
   * @static
   * @returns {function} an middleswar function that does the validation
   * @memberof UserValidations
   */
  static isUique(string) {
    return (req, res, next) => {
      let isUnique = true;
      let length = users.length;

      for (let i = 0; i < length; i++) {
        if (users[i][string.toLowerCase()] === req.body[string.toLowerCase()]) {
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
   * 
   * 
   * @static
   * @returns {function} a middleware function that handles the validation
   * @memberof UserValidations
   */
  static isRequired() {
    return (req, res, next) => {
      const { body } = req;
      if (!_.has(body, ['username']) || !_.has(body, ['email']) || !_.has(body, ['password'])) {
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
}