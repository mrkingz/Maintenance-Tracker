import actionTypes from '../actions/actionTypes';

export default (state = {
    formType: '',
    isEditPassword: false
}, action) => {
    switch( action.type ) {
        case actionTypes.SIGNIN_FORM:
            return {
                ...state,
                isEditPassword: false,
                formType: action.payload.formType,
            }
        case actionTypes.SIGNUP_FORM:
            return {
                ...state,
                isEditPassword: false,
                formType: action.payload.formType,
            }
        case actionTypes.PASSWORD_RESET_FORM:
            return {
                ...state,
                formType:action.payload.formType,
                isEditPassword: true
            }
        case actionTypes.PASSWORD_RECOVERY_FORM:
            return {
                ...state,
                formType:action.payload.formType,
                isEditPassword: false
            }
        default:
            return state;
    }
}