/**
 * 
 * @export
 * @class Collection
 */
class Collections {
  /**
   * Creates an instance of Collection.
   * @memberof Collection
   */
  constructor() {  
    this.users = [];
    this.requests = [];
  }

  /**
   * Adds new user to user collection
   * @param {any} user
   * @memberof Collections
   */
  addUsers(user) {
    this.users.push(user);
  }

  /**
   * Gets the number of users 
   * @returns {number} Returns the number of users
   * @memberof Collections
   */
  getUsersCount() {
    return this.users.length;
  }

  /**
   * Gets users collection
   * @returns {Array} Returns an array of users
   * @memberof Collection
   */
  getUsers() {
    return this.users;
  }

  /**
   * Adds a new mentainance request to the collection
   * @param {object} request new maintenance request
   * @memberof Collection
   */
  setRequests(request) {
    this.requests.push(request);
  }

  /**
   * Gets the number of maintenance requests
   * @returns {number} Returns the number of maintenance requests
   * @memberof Collections
   */
  getRequestsCount() {
    return this.requests.length;
  }

  /**
   * Gets request collection
   * @returns {Array} Returns an array of maintenance requests
   * @memberof Collection
   */
  getRequests() {
    return this.requests;
  }
}
export default new Collections();