import isEmpty from 'lodash/isEmpty';
import collections from '../collections';
import database from '../database';
import UtilityService from '../services/utilityService';

/** 
 * @export
 * @class RequestController
 * @extends {UtilityService}
 */
export default class RequestController extends UtilityService {
	/**
	 * Creates a maintenance/repair request
	 * @static
	 * @returns {function} Return an express middleware function that handles the POST request
	 * @memberof RequestController
	 */
  static createRequest() {
    return (req, res) => {
      const { decoded } = req.body;
      const moment = new Date();
      const fields = 'subject, priority, status, department, description, userid, createdat';
      const sql = `INSERT INTO requests (${fields},  updatedat)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING requestid, ${fields}`;
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError(err));
        }
        const {
          subject, priority, status, department, description
        } = req.body;
        client.query(sql, [
          subject, priority, status, department, description, decoded.userid, moment, moment
        ], (err, result) => {
          done();
          if (err) {
            return this.errorResponse(res, 500, database.getQueryError());
          }
          return this.successResponse(res, 201, 'Maintenance request successfully created', {
            ...result.rows[0],
          });
        });
      });
    };
  }

  /**
   * Gets request lists
   * Note: if privilege.isAdmin is true, this function gets all requests
   * if privilege.isAdmin is false, this function gets all requests in belonging to a user
   * @static
   * @param {object} privilege object containing isAdmin as privilede level of the user
   * @returns {function} Returns an express middleware function that handles the get request
   * @memberof RequestController
   */
  static getRequests(privilege) {
    return (req, res) => {
      const { userid } = req.body.decoded;
      const condition = (privilege.isAdmin) ? '' : 'WHERE userid = $1';
      const sql = `SELECT * from requests ${condition} ORDER BY updatedat DESC`;
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError());
        }
        client.query(sql, (privilege.isAdmin) ? null : [userid], (err, result) => {
          done();
          if (err) {
            return this.errorResponse(res, 500, database.getQueryError());
          } else if (isEmpty(result.rows)) {
            return this.successResponse(res, 404, undefined, 'Requests not found');
          }
          return this.successResponse(res, 200, undefined, {
            requests: result.rows
          });
        });
      });
    };
  }

  /**
   * Gets a signle user's request
   * @static
   * @returns {function} Returns an express middleware function that handles the GET request
   * @memberof RequestController
   */
  static getUserRequest() {
    return (req, res) => {
      const requestid = req.params.requestId;
      const { userid } = req.body.decoded;
      const sql = 'SELECT * FROM requests WHERE userid = $1 AND requestid = $2 LIMIT 1';
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError(err));
        }
        client.query(sql, [userid, requestid], (err, result) => {
          done();
          if (err) {
            return this.errorResponse(res, 500, database.getQueryError());
          } else if (isEmpty(result.rows)) {
            return this.successResponse(res, 404, undefined, 'Request not found');
          }
          return this.successResponse(res, 200, undefined, result.rows[0]);
        });
      });
    };
  }

  /**
   * Updates a request
   * @static
   * @returns {function} An express middleware function that handles the PUT request
   * @memberof RequestController
   */
  static updateRequest() {
    return (req, res) => {
      const requestId = req.params.requestId;
      const { decoded, ...updates } = req.body;
      const length = collections.getRequestsCount();

      let j = -1;
      for (let i = 0; i < length; i++) {
        if (parseInt(collections.getRequests()[i].requestId, 10) === parseInt(requestId, 10)) {
          j = i;
          break;
        }
      }

      if (j !== -1) {
        const request = collections.getRequests()[j];
        let message;
        if (decoded.isAdmin) {
          request.status = updates.status;
          message = `Request status successfully marked as ${updates.status}`;
        } else if (parseInt(request.userId, 10) === parseInt(decoded.userId, 10)) {
          request.subject = updates.subject || request.subject;
          request.priority = updates.priority || request.priority;
          request.description = updates.description || request.description;
          request.department = updates.department || request.department;
          message = 'Request successfully updated';
        }

        if (message) {
          return res.status(202).json({
            status: 'success',
            message,
            data: {
              request: {
                ...request
              }
            }
          });
        }
      }
      return res.status(404).json({
        status: 'fail',
        message: 'Sorry, request not found'
      });
    };
  }

  /**
   * Deletets a request
   * @static
   * @returns {function} Returns an express middleware function that handles the POST request
   * @memberof RequestController
   */
  static deleteRequest() {
    return (req, res) => {
      let request;
      const { userId } = req.body.decoded;
      const requestId = req.params.requestId;
      const length = collections.getRequestsCount();
      
      for (let i = 0; i < length; i++) {
        request = collections.getRequests()[i];
        if (parseInt(request.requestId, 10) === parseInt(requestId, 10)
            && parseInt(request.userId, 10) === parseInt(userId, 10)) {
            collections.getRequests().splice(i, 1);
          return res.status(200).json({
            status: 'success',
            message: 'Request successfully deleted'
          });
        }
      }
      return res.status(404).json({
        status: 'fail',
        message: 'Request not found'
      });
    };
  }
}