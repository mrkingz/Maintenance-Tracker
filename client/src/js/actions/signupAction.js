import actionTypes from '../actions/actionTypes';
import axios from 'axios';
import decode from 'jwt-decode';
import setAthorizationToken from '../../utils/setAuthorizationToken';

const signUpAction = userDetails => dispatch => {
    return axios.post('http://localhost:8000/api/v1/users/signup', userDetails)
    .then((response) => {
        const { status, message } = response.data;
        dispatch({
            type: actionTypes.SHOW_ALERT_MESSAGE,
            payload: { 
                alertType: status,
                message:[message, 'Signin to continue...']
            }
        });
        return true;
    })
    .catch((error) => {
        const {status, message } = error.response.data;
        dispatch({
            type: actionTypes.SHOW_ALERT_MESSAGE,
            payload: { 
                alertType: status,
                message: [(error.response && error.response.status < 500) 
                            ? message : 'An error occured! Please, try again.']
            }
        });
    })
}

export default signUpAction;