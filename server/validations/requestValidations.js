import _ from 'lodash';
import Validator from 'validator';
import UtilityService from '../services/utilityService';

/**
 * 
 * 
 * @export UtilityService
 * @class RequestValidations
 * @extends {UtilityService}
 */
export default class RequestValidations extends UtilityService {
  /**
   * Validates request details
   * @static
   * @returns {function} Returns an express middleware function that handles the validation
   * @memberof RequestValidations
   */
  static validateRequest() {
    return (req, res, next) => {
      let message;
      let {
        decoded, subject, priority, description, type
      } = req.body;
      subject = this.upperCaseFirst(this.trimWhiteSpace(subject, false), { bool: true });
      priority = this.upperCaseFirst(this.trimWhiteSpace(priority));
      description = this.upperCaseFirst(this.trimWhiteSpace(description, false));
      type = this.upperCaseFirst(this.trimWhiteSpace(type, false));

      if (req.method === 'POST') {
        message = this.postValidations({
          subject, priority, description, type
        });
      } else if (req.method === 'PUT') {
        message = this.putValidations({
          subject, priority, description, type
        });
      }

      if (_.isEmpty(message)) {
        req.body = {
          decoded, subject, priority, description, type
        };
        next();
      } else {
        res.status(400).json({
          status: 'fail',
          message
        });
      }
    };
  }

  /**
   * Validates request details during a POST operation
   * @static
   * @return {string} Returns the error message 
   * @param {object} fields the input fields
   * @method postValidations
   * @memberof RequestValidations
   */
  static postValidations(fields) {
    let message;
    const {
      subject, priority, description, type
    } = fields;
    /**
     * Validates for undefined, empty fields and invalid entry
     */
    if (_.isUndefined(subject)) {
      message = 'Request subject is required!';
    } else if (_.isUndefined(priority)) {
      message = 'Request priority is required!';
    } else if (_.isUndefined(description)) {
      message = 'Brief description is required!';
    } else if (_.isUndefined(type)) {
      message = 'Request type is required!';
    } else if (Validator.isEmpty(subject)) {
      message = 'Please, enter request subject!';
    } else if (Validator.isEmpty(priority)) {
      message = 'Please, enter request priority!';
    } else if (Validator.isEmpty(description)) {
      message = 'Please, enter brief request description!';
    } else if (Validator.isEmpty(type)) {
      message = 'Request type cannot be empty!';
    } else if (!this.isAlpabetic(subject)) {
      message = 'Invalid entry for subject!';
    } else if (!this.isAlpabetic(priority)) {
      message = 'Invalid entry for request priority!';
    } else if (!this.isAlpabetic(type)) {
      message = 'Invalid entry for request type!';
    }

    return message;
  }

  /**
 * Validates request details during a POST operation
 * @static
 * @param {object} fields the input fields
 * @return {string} Returns the error message 
 * @method postValidations
 * @memberof RequestValidations
 */
  static putValidations(fields) {
    let message;
    const {
      subject, priority, description, type
    } = fields;

    if (subject && Validator.isEmpty(subject)) {
      message = 'Request subject cannot be empty!';
    } else if (subject && !this.isAlpabetic(subject)) {
      message = 'Invalid entry for request subject!';
    } else if (priority && Validator.isEmpty(priority)) {
      message = 'Request priority cannot be empty!';
    } else if (priority && !this.isAlpabetic(priority)) {
      message = 'Invalid entry for request priority!';
    } else if (description && Validator.isEmpty(description)) {
      message = 'Brief description cannot be empty!';
    } else if (type && Validator.isEmpty(type)) {
      message = 'Request type cannot be empty!';
    } else if (type && !this.isAlpabetic(type)) {
      message = 'Invalid entry for request type!';
    }

    return message;
  }
}