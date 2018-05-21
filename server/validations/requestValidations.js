import _ from 'lodash';
import Validator from 'validator';

/**
 * 
 * 
 * @export
 * @class RequestValidations
 */
export default class RequestValidations {
  /**
   * Validates request details
   * @static
   * @returns {function} Returns an express middleware function that handles the validation
   * @memberof RequestValidations
   */
  static validateRequest() {
    return (req, res, next) => {
      let message;
      const {
        subject, priority, description, department
      } = req.body;

      /**
       * Validates for undefined, empty fields and invalid entry
       */
      if (_.isUndefined(subject)) {
        message = 'Request subject is required';
      } else if (_.isUndefined(priority)) {
        message = 'Request priority is required';
      } else if (_.isUndefined(description)) {
        message = 'Brief description is required';
      } else if (_.isUndefined(department)) {
        message = 'Department is required';
      } else if (_.isEmpty(subject)) {
        message = 'Please, enter request subject';
      } else if (Validator.isEmpty(priority)) {
        message = 'Please, enter request priority';
      } else if (Validator.isEmpty(description)) {
        message = 'Please, enter brief request description';
      } else if (Validator.isEmpty(department)) {
        message = 'Please, select department';
      } else if (!subject.match(/^[a-zA-Z\s]+$/)) {
        message = 'Invalid entry for request subject!';
      } else if (!Validator.isAlpha(priority)) {
        message = 'Invalid entry for request priority!';
      } else if (!Validator.isAlpha(department)) {
        message = 'Invalid entry for department name';
      }

      if (_.isEmpty(message)) {
        const { decoded } = req.body;
        req.body = {
          decoded, subject, priority, description, department, status: 'Pending'
        };
        return next();
      }
      return res.status(400).json({
        status: 'fail',
        message
      });
    };
  }
}