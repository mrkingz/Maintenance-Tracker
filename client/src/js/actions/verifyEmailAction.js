import axios from 'axios';
import actionTypes from './actionTypes';

const verifyEmailAction = email => dispatch => {
    return axios.get(`http://localhost:8000/api/v1/users/${email}/verifyEmail`)
    .then(response => {
        dispatch({
            type: actionTypes.SHOW_ALERT_MESSAGE,
            payload: { 
                alertType: response.data.status,
                message: [
                    'A password reset link has been sent to your email', 
                ]
            }
        });
        return response.data
    })
    .catch(error => {
        const {status, message } = error.response.data;
        dispatch({
            type: actionTypes.SHOW_ALERT_MESSAGE,
            payload: { 
                alertType: status,
                message: [message]
            }
        })
    })
}
export default verifyEmailAction;