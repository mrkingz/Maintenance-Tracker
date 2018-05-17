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
   * Gets all user's requests
   * @static
   * @returns {function} Returns an express middleware function that handles the GET request
   * @memberof RequestController
   */
  static getUsersRequests() {
    return (req, res) => {
      const { userId } = req.body.decoded;
      const userRequests = [];
      const length = requests.length;
      for (let i = 0; i < length; i++) {
        if (parseInt(requests[i].userId, 10) === parseInt(userId, 10)) {
          userRequests.push(requests[i]);
        }
      }

      if (userRequests.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: {
            requests: userRequests
          }
        });
      }
      return res.status(404).json({
        status: 'fail',
        message: 'Requests not found'
      });
    };
  }

  /**
   * Gets a signle user's request
   * @static
   * @returns {function} Returns an express middleware function that handles the GET request
   * @memberof RequestController
   */
  static getUserRequest() {
    return (req, res) => {
      let request;
      const { userId } = req.body.decoded;
      const length = requests.length;
      for (let i = 0; i < length; i++) {
        if (parseInt(requests[i].userId, 10) === parseInt(userId, 10) 
            && parseInt(requests[i].requestId, 10) === parseInt(req.params.requestId, 10)) {
              request = requests[i];
              break;
        }
      }
      if (request) {
        return res.status(200).json({
          status: 'fail',
          data: {
            request
          }
        });
      }
      return res.status(404).json({
        status: 'fail',
        message: 'Request not found'
      });
    };
  }
}
