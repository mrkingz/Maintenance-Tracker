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
	 * @returns {function} Return an express middleware function that handles the POST request
	 * @memberof RequestController
	 */
	static createRequest() {
		return (req, res) => {
			const { decoded, ...requestDetails } = req.body;
			const moment = new Date();
      requestDetails.requestId = requests.length + 1;
      requestDetails.userId = decoded.userId;
			requestDetails.createdAt = moment;
			requestDetails.updatedAt = moment;
			requests.push(requestDetails);
			return res.status(201).json({
				status: 'success',
				data: {
					...requests[requests.length - 1],
				}
			});
		};
  }
  
  /**
   * 
   * 
   * @static
   * @returns {function} Returns an express middleware function that handles the GET request
   * @memberof RequestController
   */
  static getUsers() {
    return (req, res) => {
      const { userId } = req.body.decoded;
      const userRequests = [];
      let code = 404;
      const length = requests.length;
      for (let i = 0; i < length; i++) {
        if (parseInt(requests[i].userId, 10) === parseInt(userId, 10)) {
          userRequests.push(requests[i]);
          code = 200;
        }
      }
      res.status(code).json({
        status: 'success',
        requests: userRequests.length === 0 
          ? 'Requests not found'
          : userRequests
      });
    };
  }
}
