import actionTypes from './actionTypes';
import userFormAction from './userFormAction';

const modalAction = (props) => dispatch => {
    dispatch(userFormAction({ formType: props.title, isEditPassword: props.isEditPassword}))
    dispatch({
        type: actionTypes.MODAL_CONTENT,
        payload: {
            contentType: props.contentType,
            title: props.title,
            size: props.size,
            message: props.message || [],
            messageType: props.messageType || 'info',
            isDoubleButton: props.isDoubleButton || false 
        }
    })
}

export default modalAction;