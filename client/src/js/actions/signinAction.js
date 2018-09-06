import actionTypes from '../actions/actionTypes';
import axios from 'axios';
import decode from 'jwt-decode';
import setAthorizationToken from '../../utils/setAuthorizationToken';

const signinAction = userDetails => dispatch => {
    return axios.post('http://localhost:8000/api/v1/users/signin', userDetails)
    .then(response => {
        const { status, message, token } = response.data;
        localStorage.setItem('token', token);
        setAthorizationToken(token);
        const user = decode(token).user;
        $('#modal').modal('hide');
        dispatch({
            type: actionTypes.SIGNIN_SUCCESSFUL,
            payload: { status, user }
        });
    })
    .catch((error) => {
        const {status, message } = error.response.data;
        dispatch({
            type: actionTypes.SHOW_ALERT_MESSAGE,
            payload: { 
                alertType: status,
                message:  [(error.response && error.response.status === 400) 
                            ? message : 'An error occured!']
            }
        });
    })
}

export default signinAction;