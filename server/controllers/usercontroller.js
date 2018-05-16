import _ from 'lodash';

const users = [];
/**
 * 
 * 
 * @export
 * @class UserController
 */
export default class UserController {
  /**
   * 
   * @static
   * @returns {function} aA middleware function that handles the POST request
   * @memberof UserController
   */
  static signup() {
    return (req, res) => {
      users.push(res.body);
      res.status(201).json({
        status: 'success',
        message: 'Recipe successfully created',
        data: req.body
      });
    };
  }
}