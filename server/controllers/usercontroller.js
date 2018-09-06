import _ from 'lodash';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import database from '../database';
import UtilityService from '../services/utilityService';

dotenv.load();

/**
 * 
 * @export UserController
 * @class UserController
 * @extends {UtilityService}
 */
export default class UserController extends UtilityService {
  /**
   * 
   * @static
   * @returns {function} Returns an express middleware function that handles the POST request
   * @method signup
   * @memberof UserController
   */
  static signup() {
    return (req, res) => {
      req.body.password = this.hashPassword(req.body.password);
      const moment = new Date();
      const isAdmin = false;
      const { email, username, password } = req.body;
      const sql = `INSERT INTO 
                    users (email, username, password, isadmin, createdat, updatedat) 
                    VALUES($1, $2, $3, $4, $5, $6) RETURNING userId`;

      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 400, database.getConnectionError(err));
        }
        client.query(sql, [email, username, password, isAdmin, moment, moment],
          (err, result) => {
            done();
            if (err) {
              return this.errorResponse(res, 400, database.getQueryError(err));
            }
            return this.successResponse(res, 201, 'Sign up was successful', {
              userId: result.rows[0].userid, username, email, isAdmin, createdAt: moment
            });
          });
      });
    };
  }

	/**
	 * Sign in a user with username/email and password
	 * @static 
	 * @returns {function} Returns an express middleware function that handles the POST 
	 * request to signup a user
   * @method signin
	 * @memberof UserController
	 */
  static signin() {
    return (req, res) => {
      const { username, email, password } = req.body;
      const values = [
        email ? email.toLowerCase() : undefined, 
        username ? username.toLowerCase() : undefined
      ];
      if ((_.isUndefined(username) && _.isUndefined(email)) || _.isUndefined(password)) {
        return this.errorResponse(res, 400, 'Username/email and password are required!');
      }
      const sql = 'SELECT * FROM users WHERE email = $1 OR username = $2 LIMIT 1';
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError(err));
        }
        client.query(sql, values, (err, result) => {
          done();
          if (err) {
            return this.errorResponse(res, 500, database.getQueryError());
          } else if (!_.isEmpty(result.rows) &&
            bcrypt.compareSync(password, result.rows[0].password)) {
            const { userid, isadmin } = result.rows[0];
            return this.successResponse(res, 200, 'Aunthentication was successful', {
              /** 
               * Generate token for this user
               * Remember, user can sign up with email/username and password
               * So, we need to sign jwt with username and email coming from the database
               */
              token: jwt.sign({
                userid,
                isadmin,
                email: result.rows[0].email,
                username: result.rows[0].username
              }, process.env.SECRET_KEY, {
                  issuer: process.env.ISSUER,
                  subject: process.env.SUBJECT,
                  expiresIn: process.env.EXPIRATION
                })
            });
          }
          return this.errorResponse(res, 401, 'Invalid sign in credentials');
        });
      });
    };
  }

	/**
	 * Authenticate users
	 * @static
	 * @returns {function} Returns an expresss middleware function that handles user authentication
   * @method authenticateUser
	 * @memberof UserController
	 */
  static authenticateUser() {
    return (req, res, next) => {
      let message = 'Access denied! Token not provided';
      const error = new Error();
      let token = req.cookies.token || req.get('Authorization') || req.query.token
        || req.body.token || req.headers.token;
      if (token) {
        const regex = new RegExp('/^Bearer (\S+)$/');
        const match = regex.exec(token);
        token = (match) ? match[1] : token;
        let decoded;
        try {
          decoded = jwt.verify(token, process.env.SECRET_KEY, {
            issuer: process.env.ISSUER
          });
          if (decoded) {
            const sql = 'SELECT userid FROM users WHERE userid = $1';
            const { userid } = decoded;
            database.getPool().connect((err, client, done) => {
              if (err) {
                error.code = 500;
                message = database.getConnectionError(err);
              }
              client.query(sql, [userid], (e, result) => {
                done();
                if (e) {
                  error.code = 500;
                  return this.errorResponse(res, 500, database.getQueryError());
                } else if (_.isEmpty(result.rows[0])) {
                  return this.errorResponse(res, 500, 'Sorry, user does not exist');
                }
                req.body.decoded = decoded;
                return next();
              });
            });
          }
        } catch (err) {
          if (err.message === 'jwt expired') {
            message = 'Access denied! Token has expired';
          } else {
            message = 'Access denied! Invalid authentication token';
          }
          return this.errorResponse(res, 401, message);
        }
      } else {
        return this.errorResponse(res, 401, message);
      }
    };
  }

  /**
   * Authorizes a user
   * @static
   * @param {string} privilege the privilege level of the user
   * @returns {function} Returns an express middleware function that handles the authorization
   * @method authorizeUser
   * @memberof UserController
   */
  static authorizeUser(privilege) {
    return (req, res, next) => {
      let message;
      const { decoded, status } = req.body;
      const defaults = this.defaultAdminCredentials();
      if (decoded.isadmin && req.method !== 'PATCH') {
        database.getPool().connect((err, client, done) => {
          if (err) {
            return this.errorResponse(res, 500, database.getConnectionError());
          }
          const sql = `SELECT email, username, password FROM users 
          WHERE email = $1 OR username = $2 AND isadmin = $3`;
          client.query(sql, [defaults.email, defaults.username, true], (err, result) => {
            done();
            if (err) {
              this.errorResponse(res, 500, database.getQueryError());
            } else if (!_.isEmpty(result.rows[0]) 
            || decoded.email === defaults.email 
            || decoded.username === defaults.username) {
              message = 'You must change the default admin authentication credentials!';
              this.errorResponse(res, 403, message);
            } else if (privilege && !privilege.isAdmin) {
              message = 'Unsupported route for a user with admin privilege';
              this.errorResponse(res, 403, message);         
            } else {
              return next();
            }
          });
        });
      } else if (!decoded.isadmin) {
        if (status) {
          message = 'Sorry, you are not authorized to update request status!';
        } else if ((privilege && privilege.isAdmin) || req.method === 'PATCH') {
          message = 'You do not have the privilege to perform this operation';
        } 
        return message ? this.errorResponse(res, 401, message) : next();
      } else {
        next();
      }
    };
  }

  /**
   * Creates admin with default credentials
   * @static
   * @method createAdmin
   * @memberof UserController
   */
  static createAdmin() {
    const moment = new Date();
    const adminCredentials = this.defaultAdminCredentials();
    const credentials = [
      adminCredentials.email, // Email address
      adminCredentials.username, // Default username
      this.hashPassword(adminCredentials.password), // Default password
      true, // admin privilege (isadmin)
      moment, // createdat
      moment, // updatedat
    ];
    const sql = 'SELECT * FROM users WHERE isadmin = $1';
    database.getPool().connect((err, client, done) => {
      if (err) {
        throw err;
      }
      client.query(sql, [true], (err, result) => {
        done();
        if (err) {
          throw err;
        } else if (_.isEmpty(result.rows[0])) {
          const createSQL = `INSERT INTO 
          users (email, username, password, isadmin, createdat, updatedat) 
          VALUES($1, $2, $3, $4, $5, $6)`;
          client.query(createSQL, credentials, (err) => {
            if (err) {
              throw err;
            }
          });
        }
      });
    });
  }

  /**
   * Update admin defaults authentication credentials
   * @static
   * @returns {function} Returns an express middleware function that handles the PATCH request
   * @method updateAdminCredentials
   * @memberof UserController
   */
  static updateAdminCredentials() {
    return (req, res) => {
      let { email, username, password } = req.body;
      password = this.hashPassword(password);
      const newCredentials = [
        email, username, password, new Date(), true
      ];
      const sql = `UPDATE users 
      SET email = $1, username = $2, password = $3, updatedat = $4
      WHERE isadmin = $5
      RETURNING userid, email, username, isadmin, createdat, updatedat`;
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError(err));
        }
        client.query(sql, newCredentials, (err, update) => {
          done();
          if (err) {
            this.errorResponse(res, 500, database.getQueryError());
          } else if (!_.isEmpty(update.rows[0])) {
            let message = 'Authentication credentials successfully updated';
            this.successResponse(res, 202, message, update.rows[0]);
          }
        });
      });
    };
  }

  /**
   * Confirms email address
   * @static
   * @returns {function} Returns an express middleware function that handles the GET request
   * @method confirmEmail
   * @memberof UserController
   */
  static confirmEmail() {
    return (req, res) => {
      const { email } = req.params;
      const sql = 'SELECT userid, username FROM users WHERE email = $1';
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError(err));
        }
        client.query(sql, [email.toLowerCase()], (err, result) => {
          done();
          if (err) {
            this.errorResponse(res, 500, database.getQueryError(err));
          } else if (_.isEmpty(result.rows[0])) {
            this.errorResponse(res, 404, 'Sorry, email address does not exist');
          } else {
            this.successResponse(res, 200, undefined, {
              ...result.rows[0],
              email
            });
          }
        });
      });
    };
  }

  /**
   * Reset user's password
   * @static
   * @returns {function} Returns an express middleware function that handles the PUT request
   * @method resetPassword
   * @memberof UserController
   */
  static resetPassword() {
    return (req, res) => {
      const { decoded, password } = req.body;
      const sql = 'UPDATE users SET password = $1 WHERE userid = $2 RETURNING *';
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError(err));
        }
        client.query(sql, [this.hashPassword(password), decoded.userid], (err, update) => {
          done();
          if (err) {
            this.errorResponse(res, 500, database.getQueryError(err));
          } else if (update.rowCount > 0) {
            this.successResponse(res, 202, 'New password saved successfully');
          }
        });
      });
    };
  }

  /**
   * Hashes user's password
   * @static
   * @param {any} password 
   * @returns {string} Returns the hashed password
   * @method hashPassword
   * @memberof UserController
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  /**
   * Gets the default admin authentication credentials
   * @static
   * @returns {Array} Returns an object with default admin authentication 
   * credential as properties
   * @method defaultAdminCredentials
   * @memberof UserController
   */
  static defaultAdminCredentials() {
    return {
      email: 'admin.wae@gmail.com', 
      username: 'admin.wae', 
      password: 'Password1'
    };
  }
}