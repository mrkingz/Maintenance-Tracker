import actionTypes from './actionTypes';

const userFormStateAction = (form) => dispatch => {
    dispatch({
        type: actionTypes.USER_FORM,
        payload: {
            email: form.email || '',
            username: form.username || '',
            password: form.password || '',
            errors: form.errors || {},
            isLoading: form.isLoading || false,
        }
    })
}

export default userFormStateAction;