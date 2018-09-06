import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const userFormValidations = (data, formType) => {
    let error = {}
    
    if (formType === "Signin") {
        if (isEmpty(data.email))
            error.email = "Email address/Username is required!";
        else if (isEmpty(data.password))
            error.password = "Password is required!";
    }
    else if (formType === "Signup") {
        if (isEmpty(data.email)) 
            error.email = "Email address is required!";
        else if (isEmpty(data.username)) 
            error.username = "Username is required!";
        else if (isEmpty(data.password)) 
            error.password = "Password is required!";
        else if (!Validator.isEmail(data.email))
            error.email = 'Not a valid email address'
        // else if (ValidationService.isValidPassword(data.password)) 
        //     error.password = 'Password must contain at least 1 upper and lower case letter, 1 digit, and special characters (optional)';
    }
    else if (formType === 'Recover' && isEmpty(data.email))
        error.email = "Email address is required";
    else if (formType === 'Reset' && isEmpty(data.password))
        error.password = "Current password is required";

    return {
        error: error,
        isValid: isEmpty(error)
    };
}
export default userFormValidations;