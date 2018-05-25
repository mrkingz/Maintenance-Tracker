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
    this.error = new Error();
    this.error.message = '';
    this.pool = new pg.Pool(config);
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
