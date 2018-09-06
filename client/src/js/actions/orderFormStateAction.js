import actionTypes from './actionTypes';

const orderFormStateAction = (form) => dispatch => {
    dispatch({
        type: actionTypes.ORDER_FORM,
        payload: {
            topic: form.topic || '',
            academicLevel: form.academicLevel || '',
            discipline: form.discipline || '',
            paperType: form.paperType || '',
            format: form.format || '',
            instruction: form.instruction || '',
            isLoading: form.isLoading || false,
            files: form.files || {},
            errors: form.errors || {}
        }
    })
}

export default orderFormStateAction;