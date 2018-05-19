import collections from '../collections';

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
      requestDetails.requestId = collections.getRequests().length + 1;
      requestDetails.userId = decoded.userId;
      requestDetails.createdAt = moment;
      requestDetails.updatedAt = moment;
      collections.setRequests(requestDetails);
      return res.status(201).json({
        status: 'success',
        data: {
          ...collections.getRequests()[collections.getRequests().length - 1],
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
      const length = collections.getRequests().length;
      for (let i = 0; i < length; i++) {
        if (parseInt(collections.getRequests()[i].userId, 10) === parseInt(userId, 10)) {
          userRequests.push(collections.getRequests()[i]);
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
      const requestId = req.params.requestId;
      const { userId } = req.body.decoded;
      const length = collections.getRequests().length;
      for (let i = 0; i < length; i++) {
        if (parseInt(collections.getRequests()[i].userId, 10) === parseInt(userId, 10)
          && parseInt(collections.getRequests()[i].requestId, 10) === parseInt(requestId, 10)) {
          request = collections.getRequests()[i];
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

  /**
   * Updates a request
   * @static
   * @returns {function} An express middleware function that handles the PUT request
   * @memberof RequestController
   */
  static updateRequest() {
    return (req, res) => {
      const requestId = req.params.requestId;
      const { decoded, ...updates } = req.body;
      const length = collections.getRequestsCount();

      let j = -1;
      for (let i = 0; i < length; i++) {
        if (parseInt(collections.getRequests()[i].requestId, 10) === parseInt(requestId, 10)) {
          j = i;
          break;
        }
      }

      if (j !== -1) {
        const request = collections.getRequests()[j];
        let message;
        if (decoded.isAdmin) {
          request.status = updates.status;
          message = `Request status successfully marked as ${updates.status}`;
        } else if (parseInt(request.userId, 10) === parseInt(decoded.userId, 10)) {
          request.subject = updates.subject || request.subject;
          request.priority = updates.priority || request.priority;
          request.description = updates.description || request.description;
          request.department = updates.department || request.department;
          message = 'Request successfully updated';
        }

        if (message) {
          return res.status(202).json({
            status: 'success',
            message,
            data: {
              request: {
                ...request
              }
            }
          });
        }
      }
      return res.status(404).json({
        status: 'fail',
        message: 'Sorry, request not found'
      });
    };
  }

  /**
   * Deletets a request
   * @static
   * @returns {function} Returns an express middleware function that handles the POST request
   * @memberof RequestController
   */
  static deleteRequest() {
    return (req, res) => {
      let request;
      const { userId } = req.body.decoded;
      const requestId = req.params.requestId;
      const length = collections.getRequestsCount();
      
      for (let i = 0; i < length; i++) {
        request = collections.getRequests()[i];
        if (parseInt(request.requestId, 10) === parseInt(requestId, 10)
            && parseInt(request.userId, 10) === parseInt(userId, 10)) {
            collections.getRequests().splice(i, 1);
          return res.status(200).json({
            status: 'success',
            message: 'Request successfully deleted'
          });
        }
      }
      return res.status(404).json({
        status: 'fail',
        message: 'Request not found'
      });
    };
  }
}