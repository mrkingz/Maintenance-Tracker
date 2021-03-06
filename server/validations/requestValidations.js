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
      const exp = /^[a-zA-Z\s]+$/;
      const {
        subject, priority, description, department
      } = req.body;

      if (req.method === 'POST') {
        /**
         * Validates for undefined, empty fields and invalid entry
         */
        if (_.isUndefined(subject)) {
          message = 'Request subject is required!';
        } else if (_.isUndefined(priority)) {
          message = 'Request priority is required!';
        } else if (_.isUndefined(description)) {
          message = 'Brief description is required!';
        } else if (_.isUndefined(department)) {
          message = 'Department is required!';
        } else if (Validator.isEmpty(subject)) {
          message = 'Please, enter request subject!';
        } else if (Validator.isEmpty(priority)) {
          message = 'Please, enter request priority!';
        } else if (Validator.isEmpty(description)) {
          message = 'Please, enter brief request description!';
        } else if (Validator.isEmpty(department)) {
          message = 'Please, select department!';
        } else if (!subject.match(exp)) {
          message = 'Invalid entry for subject!';
        } else if (!priority.match(exp)) {
          message = 'Invalid entry for request priority!';
        } else if (!department.match(exp)) {
          message = 'Invalid entry for department name!';
        }

        if (_.isEmpty(message)) {
          const { decoded } = req.body;
          req.body = {
            decoded, subject, priority, description, department, status: 'Pending'
          };
          return next();
        }
      } else if (req.method === 'PUT') {
        const { status } = req.body.status || '';
        if (!_.isUndefined(subject) && Validator.isEmpty(subject)) {
          message = 'Request subject cannot be empty!';
        } else if (!_.isUndefined(subject) && !subject.match(exp)) {
          message = 'Invalid entry for request subject!';
        } else if (!_.isUndefined(priority) && Validator.isEmpty(priority)) {
          message = 'Request priority cannot be empty!';
        } else if (!_.isUndefined(priority) && !priority.match(exp)) {
          message = 'Invalid entry for request priority!';
        } else if (!_.isUndefined(req.body.status) && Validator.isEmpty(req.body.status || '')) {
          message = 'Request status cannot be empty!';
        } else if (!_.isUndefined(status) && !status.match(exp)) {
          message = 'Invalid entry for request status!';
        } else if (!_.isUndefined(description) && Validator.isEmpty(description)) {
          message = 'Brief description cannot be empty!';
        } else if (!_.isUndefined(department) && Validator.isEmpty(department)) {
          message = 'Department cannot be empty!';
        } else if (!_.isUndefined(department) && !department.match(exp)) {
          message = 'Invalid entry for request department!';
        }

        if (_.isEmpty(message)) {
          const { decoded } = req.body;
          req.body = {
            decoded, subject, priority, description, department, status
          };
          return next();
        }
      }

      return res.status(400).json({
        status: 'fail',
        message
      });
    };
  }
}