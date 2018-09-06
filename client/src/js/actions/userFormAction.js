import actionTypes from './actionTypes';

const userFormAction = (props) => dispatch => {
    const { formType, isEditPassword } = props
    if( formType === "Signup")
        dispatch({
                type: actionTypes.SIGNUP_FORM,
                payload: {
                    formType: formType,
                }
            })
    else if (formType === "Signin")
        dispatch({
                type: actionTypes.SIGNIN_FORM,
                payload: {
                    formType: formType,
                }
            })
    else if (formType === "Recover")
        dispatch({
            type: actionTypes.PASSWORD_RECOVERY_FORM,
            payload: {
                formType: formType,
            }
        })
        else if (formType === "Reset")
        dispatch({
            type: actionTypes.PASSWORD_RESET_FORM,
            payload: {
                formType: formType,
            }
        })
}
export default userFormAction;