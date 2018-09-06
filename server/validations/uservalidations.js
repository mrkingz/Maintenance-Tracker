import _ from 'lodash';
import Validator from 'validator';
import database from '../database';
import UtilityService from '../services/utilityService';

/**
 * 
 * @export UserValidations
 * @class UserValidations
  * @extends {UtilityService}
 */
export default class UserValidations extends UtilityService {
  /**
   * Validates user's sign up details
   * @static
   * @returns {function} Returns an express middleware function that handles the validation
   * @method validateSignupDetails
   * @memberof UserValidations
   */
  static validateSignupDetails() {
    return (req, res, next) => {
      let message = '';
      let { 
        username, email, password, decoded 
      } = req.body;

      username = this.trimWhiteSpace(username.toLowerCase());
      email = this.trimWhiteSpace(email.toLowerCase());
      password = this.trimWhiteSpace(password);

      if (Validator.isEmpty(username)) {
        message = 'Please, enter your username!';
      } else if (username.length < 3) {
        message = 'username, too short! Must be at least 3 characters long!';
      } else if (Validator.isEmpty(email)) {
        message = 'Please, enter your email address!';
      } else if (!username.match(/^[a-zA-Z0-9_\.]+$/)) {
        message = 'Sorry, not a valid username!';
      } else if (!Validator.isEmail(email)) {
        message = 'Please, enter a valid email address!';
      } else if (Validator.isEmpty(password)) {
        message = 'Please, enter your password!';
      } else if (password.length < 8) {
        message = 'Sorry, password too short! Must be at least 8 characters long!';
      }

      if (Validator.isEmpty(message)) {
        req.body = { 
          email, username, password, decoded
        };
        return next();
      }
      return this.errorResponse(res, 400, message);
    };
  }

  /**
   * Validates password
   * @static
   * @returns {function} Returns an express middleware function that handles the PUT request
   * @method validatePassword
   * @memberof UserValidations
   */
  static validatePassword() {
    return (req, res, next) => {
      const { password } = req.body;
      let message;
      
      if (_.isUndefined(password)) {
        message = 'Password is required!';
      } else if (_.isEmpty(this.trimWhiteSpace(password))) {
        message = 'Sorry, password cannot be empty';
      } else if (password.length < 8) {
        message = 'Sorry, password too short! Must be at least 8 characters long!';
      }
      return message ? this.errorResponse(res, 400, message) : next();
    };
  }

  /**
   * Validates if a user sign up credential has been used
   * @param {string} string - the property name 
   * @static
   * @returns {function} Returns an express middleswar function that does the validation
   * @method isUnique
   * @memberof UserValidations
   */
  static isUnique(string) {
    return (req, res, next) => {
      const str = string.toLowerCase();
      const value = req.body[str];
      const sql = `SELECT ${str} FROM users WHERE ${str} = $1 LIMIT 1`;
      database.getPool().connect((err, client, done) => {
        if (err) {
          res.status(500).json({
            status: 'fail',
            message: database.getConnectionError(err)
          });
        }
        client.query(sql, [value], (err, result) => {
          done();
          if (err) {
            return this.errorResponse(res, 500, 'Sorry, an error occured');
          } else if (result.rows.length > 0) {
            return res.status(409).json({
              status: 'fail',
              message: `${string} has been used`
            });
          }
          return next();
        });
      });
    };
  }

  /**
   * Validates required fields
   * @static
   * @returns {function} Returns an express middleware function that handles 
   * the validation for required fields
   * @method isRequired
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
   * @method validateEmail
   * @memberof UserValidations
   */
  static validateEmail() {
    return (req, res, next) => {
      let message;
      const { email } = req.params;
      if (!Validator.isEmail(email)) {
        message = 'Please, enter a valid email address';
      } else {
        return next();
      }
      return res.status(400).json({
        status: 'fail',
        message
      });
    };
  }
}