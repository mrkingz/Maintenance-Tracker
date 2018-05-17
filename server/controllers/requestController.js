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
			const { decoded, ...requestDetails } = req.body;
			const moment = new Date();
			requestDetails.requestId = requests.length + 1;
			requestDetails.createdAt = moment;
			requestDetails.updatedAt = moment;
			requestDetails.userId = decoded.userId;
			requests.push(requestDetails);
			return res.status(201).json({
				status: 'success',
				data: {
					...requests[requests.length - 1],
				}
			});
		};
	}
}
