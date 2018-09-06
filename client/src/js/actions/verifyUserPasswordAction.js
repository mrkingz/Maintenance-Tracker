import axios from 'axios';
import actionTypes from './actionTypes';

const verifyUserPasswordAction = data => dispatch => {
    return axios.post(`http://localhost:8000/api/v1/users/${data.userId}/verifyPassword`, { 
        password: data.password 
    })
    .then(response => {
        dispatch({
            type: actionTypes.MODAL_CONTENT,
            payload: {
                title: 'Message',
                messageType: 'success',
                message: [`A password reset link has been sent to ${data.email}`]
            }
        })
        return true;
    })
    .catch((error) => {
        dispatch({
            type: actionTypes.SHOW_ALERT_MESSAGE,
            payload: { 
                alertType: 'Fail',
                message:  ['Sorry, authorization failed.']
            }
        })
    })
}
export default verifyUserPasswordAction;