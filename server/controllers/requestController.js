import isEmpty from 'lodash/isEmpty';
import database from '../database';
import UtilityService from '../services/utilityService';

/** 
 * @export RequestController
 * @class RequestController
 * @extends {UtilityService}
 */
export default class RequestController extends UtilityService {
	/**
	 * Creates a maintenance/repair request
	 * @static
	 * @returns {function} Return an express middleware function that handles the POST request
   * @method createRequest
	 * @memberof RequestController
	 */
  static createRequest() {
    return (req, res) => {
      const { decoded } = req.body;
      const moment = new Date();
      const fields = 'subject, priority, status, type, description, userid, createdat';
      const sql = `INSERT INTO requests (${fields},  updatedat)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING requestid, ${fields}`;
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError(err));
        }
        const {
          subject, priority, type, description
        } = req.body;
        const values = [
          subject, priority, 'Pending', type, description, decoded.userid, moment, moment
        ];
        client.query(sql, values, (err, result) => {
          done();
          if (err) {
            this.errorResponse(res, 500, database.getQueryError(err));
          } else {
            this.successResponse(res, 201, 'Request successfully created', {
              ...result.rows[0],
            });
          }
        });
      });
    };
  }

  /**
   * Gets request lists
   * Note: if privilege.isAdmin is true, this function gets all requests
   * if privilege.isAdmin is false, this function gets all requests in belonging to a user
   * @static
   * @returns {function} Returns an express middleware function that handles the get request
   * @method getRequests
   * @memberof RequestController
   */
  static getRequests() {
    return (req, res) => {
      const { userid, isadmin } = req.body.decoded;
      const condition = (isadmin) ? '' : 'WHERE userid = $1';
      const sql = `SELECT * from requests ${condition} ORDER BY createdat ASC`;
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError());
        }
        client.query(sql, (isadmin) ? null : [userid], (err, result) => {
          done();
          if (err) {
            this.errorResponse(res, 500, database.getQueryError());
          } else if (isEmpty(result.rows)) {
            this.successResponse(res, 404, 'Requests not found');
          } else {
            this.successResponse(res, 200, undefined, {
              requests: result.rows
            });
          }
        });
      });
    };
  }

  /**
   * Gets a signle user's request
   * @static
   * @returns {function} Returns an express middleware function that handles the GET request
   * @method getUserRequest
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
            return this.successResponse(res, 404, 'Request not found');
          }
          return this.successResponse(res, 200, undefined, {
            request: result.rows[0]
          });
        });
      });
    };
  }

  /**
   * Filters request
   * @static
   * @returns {function} Returns an express middleware function that handles the GET request
   * @method filterRequests
   * @memberof RequestController
   */
  static filterRequests() {
    return (req, res, next) => {
      if (isEmpty(req.query)) {
        next();
      } else {
        const values = [];
        const { userid, isadmin } = req.body.decoded;
        const { type, status, priority } = req.query;
        let condition = '';
        let index = 1;
        if (!isadmin) {
          values.push(userid);
          condition += `userid = $${index++}`;
        }
        if (type) {
          values.push(type);
          condition += `type =  $${index++}`;
        }
        if (status) {
          values.push(status);
          condition += `${condition ? ' AND' : ''} status = $${index++}`;
        }
        if (priority) {
          values.push(priority);
          condition += `${condition ? ' AND' : ''} priority = $${index++}`;
        }
        const sql = `SELECT * FROM requests WHERE ${condition} ORDER BY createdat ASC`;
        database.getPool().connect((err, client, done) => {
          if (err) {
            return this.errorResponse(res, 500, database.getConnectionError(err));
          }
          client.query(sql, values, (err, result) => {
            done();
            if (err) {
              this.errorResponse(res, 500, database.getQueryError(err));
            } else if (isEmpty(result.rows)) {
              this.successResponse(res, 404, 'Sorry, no result matches your filter');
            } else {
              this.successResponse(res, 200, undefined, {
                request: result.rows
              });
            }
          });
        });
      }
    };
  }

  /**
   * Updates a request
   * @static
   * @returns {function} An express middleware function that handles the PUT request
   * @method updateRequest
   * @memberof RequestController
   */
  static updateRequest() {
    return (req, res) => {
      const { decoded, ...updates } = req.body;
      let row;
      const sql = 'SELECT * FROM requests WHERE userid = $1 AND requestid = $2 LIMIT 1';
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError(err));
        }
        client.query(sql, [decoded.userid, req.params.requestId], (err, result) => {
          done();
          if (err) {
            this.errorResponse(res, 500, this.getQueryError());
          } else if (isEmpty(result.rows[0])) {
            this.errorResponse(res, 404, 'Sorry, request not found');
          } else {
            row = result.rows[0];
            let message;
            if (row.status !== 'Pending') {
              message = `Sorry, request already ${row.status.toLowerCase()}, update not allowed!`;
              this.errorResponse(res, 403, message);
            } else {
              const {
                subject, priority, description, type
              } = updates;
              const values = [
                subject || row.subject,
                priority || row.priority,
                description || row.description,
                type || row.type,
                new Date(),
                decoded.userid,
                req.params.requestId
              ];
              const updateSQL = `UPDATE requests 
              SET subject = $1, priority = $2, description = $3, type = $4, updatedat = $5 
              WHERE userid = $6 AND requestid = $7 
              RETURNING *`;
              client.query(updateSQL, values, (err, update) => {
                done();
                if (err) {
                  this.errorResponse(res, 500, database.getQueryError(err));
                } else if (!isEmpty(update.rows[0])) {
                  message = 'Request successfully updated';
                  this.successResponse(res, 202, message, {
                    request: update.rows[0]
                  });
                }
              });
            }
          }
        });
      });
    };
  }

  /**
   * Updates request's status
   * @static
   * @param {string} status the new request status
   * @returns {function} Returns an express middleware function that handles the PUT request
   * @method updateRequestStatus
   * @memberof RequestController
   */
  static updateRequestStatus(status) {
    return (req, res) => {
      const requestId = req.params.requestId;
      const sql = 'SELECT * FROM requests WHERE requestid = $1 LIMIT 1';
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError(err));
        }
        client.query(sql, [requestId], (err, result) => {
          done();
          if (err) {
            this.errorResponse(res, 500, database.getQueryError(err));
          } else if (isEmpty(result.rows[0])) {
            this.errorResponse(res, 404, 'Sorry, request not found');
          } else {
            const updateSQL = `UPDATE requests
            SET status = $1, updatedat = $2 WHERE requestid = $3 RETURNING *`;
            client.query(updateSQL, [status, new Date(), requestId], (err, update) => {
              if (err) {
                this.errorResponse(res, 500, database.getQueryError(err));
              } else if (!isEmpty(update.rows[0])) {
                const message = `Request succeccfully ${status.toLowerCase()}`;
                this.successResponse(res, 202, message, update.rows[0]);
              }
            });
          }
        });
      });
    };
  }

  /**
   * Deletes a request
   * @static
   * @returns {function} Returns an express middleware function that handles the DELETE request
   * @method deleteRequest
   * @memberof RequestController
   */
  static deleteRequest() {
    return (req, res) => {
      const { userid } = req.body.decoded;
      const requestId = req.params.requestId;
      const sql = 'SELECT status FROM requests WHERE requestid = $1 AND userid = $2';
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError(err));
        }
        client.query(sql, [requestId, userid], (err, result) => {
          done();
          if (err) {
            this.errorResponse(res, 500, database.getQueryError(err));
          } else if (isEmpty(result.rows[0])) {
            this.errorResponse(res, 404, 'Sorry, request not found');
          } else if (result.rows[0].status !== 'Pending') {
            const string = result.rows[0].status.toLowerCase();
            const message = `Sorry, request already ${string} delete not allowed!`;
            this.errorResponse(res, 500, message);
          } else {
            const deleteSQL = 'DELETE FROM requests WHERE requestid = $1 AND userid = $2';
            client.query(deleteSQL, [requestId, userid], (err) => {
              if (err) {
                this.errorResponse(res, 500, database.getQueryError());
              } else {
                this.successResponse(res, 200, 'Request successfully deleted');
              }
            });
          }
        });
      });
    };
  }
}