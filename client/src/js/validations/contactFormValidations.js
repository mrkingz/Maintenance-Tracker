import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';

const contactFormValidations = fields => {
    const error = {};

    if (isEmpty(fields.fullName)) 
        error.fullName = 'Full name is required';
    else if (isEmpty(fields.email)) 
        error.email = 'Email address is required';
    else if (isEmpty(fields.message))
        error.message = 'Message is required';
    else if (!Validator.isEmail(fields.email)) 
        error.email = 'Not a valid email address';

    return {
        error: error,
        isValid: isEmpty(error)
    }
}
export default contactFormValidations;