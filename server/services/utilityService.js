/**
 * @export UtilityService
 * @class UtilityService
 */
export default class UtilityService {
	/**
	 * Converts the first character of a string to upper case
	 * If an object is passed, the method only convert its string propeties
	 * @static
	 * @method upperCaseFirst
	 * @memberof UtilityService
	 * @param {(object|string)} attributes The object whose string properties
	 * are to be converted or the string to be converted
	 * @param {Boolean} options
	 * Note: options.bool: if true, first character of every word will be
	 * capitalize; if false (default), only the first character of the sentence 
	 * will be capitalize
	 * options.skip: array of words to skip
	 * @returns {(object|string)} An object with converted string attributes or a 
	 * converted string
	 */
  static upperCaseFirst(attributes, options) {
    let attr = null;
    const bool = (options && typeof options.bool !== 'undefined')
      ? options.bool : false;
    const skip = (options && typeof options.skip !== 'undefined')
      ? options.skip : [];
    if (typeof attributes === 'object') {
      attr = {};
      for (let key in attributes) {
        if (typeof key !== 'undefined') {
          if (typeof attributes[key] === 'string') {
            if (bool) {
              const array = attributes[key].split(' ');
              attr[key] = array.map((str) => {
                str = str.toString().trim();
                return (skip.includes(str))
                  ? str
                  : str.charAt(0).toUpperCase() + str.substr(1);
              }).join(' ');
            } else {
              const str = attributes[key].toString().trim();
              attr[key] = (skip.includes(str))
                ? str
                : str.charAt(0).toUpperCase() + str.substr(1);
            }
          } else attr[key] = attributes[key];
        }
      }
    } else if (typeof attributes === 'string') {
      if (bool) {
        const array = attributes.split(' ');
        attr = array.map((str) => {
          str = str.toString().trim();
          return (skip.includes(str))
            ? str
            : str.charAt(0).toUpperCase() + str.substr(1);
        }).join(' ');
      } else {
        const str = attributes.toString().trim();
        attr = (skip.includes(str))
          ? str
          : str.charAt(0).toUpperCase() + str.substr(1);
      }
    } else attr = attributes;
    return attr;
  }

	/**
	 * Removes all white space character, if any
	 * @static
	 * @method trimWhiteSpace
	 * @memberof UtilityService
	 * @param {Strng} string The string to remove white space(s)
	 * @param {Boolean} removeAll:  if false, multiple white space will reduced to single;
	 * otherwise all white space(s) will be removed
	 * @returns {Object} An object with trimed attributes
	 */
  static trimWhiteSpace(string, removeAll) {
    let str = typeof string === 'undefined' ? '' : string;
    let all = typeof removeAll !== 'undefined' ? removeAll : true;
    return (all) ? str.trim().replace(/[ ]+/g, '') : str.trim().replace(/[ ]+/g, ' ');
  }

  /**
   * Return an error message from the server
   * @static
   * @param {any} response the reponse object
   * @param {any} code the error code
   * @param {any} message the error message
   * @return {object} Returns the error response
   * @method errorResponse
   * @memberof UtilityService
   */
  static errorResponse(response, code, message) {
    return response.status(code).json({
      status: 'fail',
      message
    });
  }

  /**
   * 
   * 
   * Return an error message from the server
   * @static
   * @param {object} response the reponse object
   * @param {number} code the error code
   * @param {string} message the error message
   * @param {object} data the json object to return
   * @return {object} Returns the error response
   * @method successResponse
   * @memberof UtilityService
   */
  static successResponse(response, code, message, data) {
    return response.status(code).json({
      status: 'success',
      message,
      data
    });
  }

  /**
   * Text if a string is alphabetic
   * @static
   * @param {any} string the string to text
   * @returns {boolean} Returns true is string is alphabetic; false, if otherwise
   * @method isAlpabetic
   * @memberof UtilityService
   */
  static isAlpabetic(string) {
    const exp = /^[a-zA-Z\s]+$/;
    return string.match(exp);
  }
}