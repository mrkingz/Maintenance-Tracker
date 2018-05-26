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
                    VALUES($1, $2, $3, $4, $5, $6)`;

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
            userId: result.rows.userId, username, email, isAdmin, createdAt: moment
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
      let message = 'Invalid sign in credentials';

      if ((_.isUndefined(username) && _.isUndefined(email)) || _.isUndefined(password)) {
        message = 'Username/email and password not provided';
      } else {
        const length = collections.getUsersCount();
        for (let i = 0; i < length; i++) {
          if (collections.getUsers()[i].email === email
            || collections.getUsers()[i].username === username) {
            if (!bcrypt.compareSync(password, collections.getUsers()[i].password)) {
              message = 'Invalid sign in credentials';
            } else {
              const { userId, isAdmin } = collections.getUsers()[i];
              return res.status(200).json({
                status: 'success',
                message: 'Successfully signed in',
								/**
								 * Generate token for user
								 */
                data: {
                  token: jwt.sign({
                    userId, email, username, isAdmin,
                  }, process.env.SECRET_KEY, {
                      issuer: process.env.ISSUER,
                      subject: process.env.SUBJECT,
                      expiresIn: process.env.EXPIRATION
                    })
                }
              });
            }
            break;
          }
        }
      }
      return res.status(401).json({
        status: 'fail',
        message
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
            const length = collections.getUsersCount();
            for (let i = 0; i < length; i++) {
              if (parseInt(collections.getUsers()[i].userId, 10) === parseInt(decoded.userId, 10)) {
                req.body.decoded = decoded;
                return next();
              }
            }
            message = 'Sorry, user does not exist';
          }
        } catch (error) {
          if (error.message === 'jwt expired') {
            message = 'Access denied! Token has expired';
          } else {
            message = 'Access denied! Invalid authentication token';
          }
        }
      }
      return res.status(401).json({
        status: 'fail',
        message
      });
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
        return res.status(309).json({
          status: 'fail',
          message: 'Sorry, you do not have the privilege to update request status'
        });
      }

      return next();
    };
  }
}