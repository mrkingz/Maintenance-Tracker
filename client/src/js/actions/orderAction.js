import actionTypes from '../actions/actionTypes';
import axios from 'axios';

const orderAction = orderDetails => dispatch => {
    return axios.post('http://localhost:8000/api/v1/orders', orderDetails)
    .then(response => {
        dispatch({
            type: actionTypes.MODAL_CONTENT,
            payload: {
                size: 'modal-sm',
                title: 'Message',
                message: 'Order submitted successfully'
            }
        })
        return response.data.status
    })
    .catch(error => {
        if (error.response.status === 401) {
            dispatch({
                type: actionTypes.ACTIVATE_MODAL,
                payload: {
                    title: 'Signin',
                    contentType: 'userForm',
                    message: 'Please, sign in to place your order'
                }
            });
            dispatch({
                type: actionTypes.SIGNIN_FORM,
                payload: {
                    formType: 'Signin',
                }
            })
        }
    })
}
export default orderAction;