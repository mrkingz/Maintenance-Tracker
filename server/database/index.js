import pg from 'pg';
import { 
  devConfig, 
  testConfig 
} from '../configs';

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
   * @param {any} err 
   * @returns {string} The error message
   * @memberof Database
   */
  getConnectionError(err) {
    return `Database connection fail ${err}`;
  }

  /**
   * 
   * @return {oject} Returns the connection pool object
   * @memberof Database
   */
  getPool() {
    return this.pool;
  }
}
export default new Database( 
  process.env.NODE_ENV === 'test' ? testConfig : devConfig
);
