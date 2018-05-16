import data from '../data';

const users = data.users;
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
			users.push(req.body);
			res.status(201).json({
				status: 'success',
				message: 'Sign up was successful',
				data: {
					userId: users.length,
					username: req.body.username,
					email: req.body.email,
					isAdmin: false,
					createdAt: new Date()
				}
			});
		};
	}
}