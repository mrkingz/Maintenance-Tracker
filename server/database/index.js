import pg from 'pg';
import { 
  devConfig, 
  testConfig, 
  prodConfig
} from '../configs';

let configs;
const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : process.env.NODE_ENV;
if (env === 'test') {
  configs = testConfig;
} else {
  configs = env === 'development' ? devConfig : prodConfig;
} 

/**
 * @class Database
 */
class Database {
  /**
   * Creates an instance of Database.
   * @param {object} config - the database configuration object
   * @memberof Database
   */
  constructor(config) {
    this.pool = new pg.Pool(config);
  }

  /**
   * Gets an error message if database connection fails
   * @param {any} err error object thrown
   * @returns {string} Returns the error message
   * @method getConnectionError
   * @memberof Database
   */
  getConnectionError(err) {
    const string = `Database connection fail ${err || ''}`;
    return string.trim();
  }

  /**
   * Returns an error message if querry fails
   * @param {string} err the error returned from database
   * @returns {string} the error message
   * @method getQueryError
   * @memberof Database
   */
  getQueryError(err) {
    const error = `Sorry, an error occured ${err || ''}`;
    return error.trim();
  }

  /**
   * Gets the connection pool instance
   * @return {object} Returns the connection pool object
   * @method getPool
   * @memberof Database
   */
  getPool() {
    return this.pool;
  }
}
export default new Database(configs);
