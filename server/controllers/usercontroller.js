import _ from 'lodash';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import collections from '../collections';
import database from '../database';
import UtilityService from '../services/utilityService';

dotenv.load();

/**
 * 
 * 
 * @export
 * @class UserController
 * @extends {UtilityService}
 */
export default class UserController extends UtilityService {
  /**
   * 
   * @static
   * @returns {function} aA middleware function that handles the POST request
   * @memberof UserController
   */
  static signup() {
    return (req, res) => {
      const hashSalt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, hashSalt);
      const error = new Error();
      error.code = 500;
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
              const message = 'Sorry, something went wrong! Could not create account';
              return this.errorResponse(res, 400, message);
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
	 * @memberof UserController
	 */
  static signin() {
    return (req, res) => {
      const { username, email, password } = req.body;

      if ((_.isUndefined(username) && _.isUndefined(email)) || _.isUndefined(password)) {
        return this.errorResponse(res, 400, 'Username/email and password are required!');
      }
      const sql = 'SELECT * FROM users WHERE email = $1 OR username = $2 LIMIT 1';
      database.getPool().connect((err, client, done) => {
        if (err) {
          return this.errorResponse(res, 500, database.getConnectionError(err));
        }
        client.query(sql, [email, username], (err, result) => {
          done();
          if (err) {
            return this.errorResponse(res, 500, 'Sorry, an error occured');
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
	 * @memberof UserController
	 */
  static authenticateUser() {
    return (req, res, next) => {
      let message = 'Access denied! Token not provided';
      const error = new Error();
      let token = req.cookies.token || req.getAuthorization || req.query.token ||
        req.body.token || req.headers.token;
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
                  return this.errorResponse(res, 500, database.getQuerryError());
                } else if (_.isEmpty(result.rows[0])) {
                  return this.errorResponse(res, 500, 'Sorry, user does not exist')
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
   * @returns {function} Returns an express middleware that handles the authorization
   * @memberof UserController
   */
  static authorizeUser() {
    return (req, res, next) => {
      if (!req.body.decoded.isAdmin && req.body.status) {
        const message = 'Sorry, you do not have the privilege to update request status';
        return this.errorResponse(res, 309, message);
      }
      return next();
    };
  }
}