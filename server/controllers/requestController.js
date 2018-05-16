import data from '../data';

const { requests } = data;

/** 
 * @export
 * @class RequestController
 */
export default class RequestController {
	/**
	 * Creates a maintenance/repair request
	 * @static
	 * @returns {function} Return an express middleware function that handles the post request
	 * @memberof RequestController
	 */
	static createRequest() {
		return (req, res) => {
			requests.push(req.body);
			return res.status(201).json({
				status: 'success',
				data: {
					requestId: requests.length,
					...requests[requests.length - 1],
					createdAt: new Date()
				}
			});
		};
	}
}
