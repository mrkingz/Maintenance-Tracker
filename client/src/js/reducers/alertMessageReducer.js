import actionTypes from '../actions/actionTypes';
const initialState = {
    alertType: '',
    message: [],
    isShown: false
}

const alertMessageReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SHOW_ALERT_MESSAGE: 
            return {
                ...state,
                isShown: true,
                alertType: action.payload.alertType,
                message: action.payload.message,
            };
        case actionTypes.HIDE_ALERT_MESSAGE: 
            return {
                ...state,
                message: [],
                alertType: '',
                isShown: false,
            }           
        default:
            return state;
    }
    return state;
}
export default alertMessageReducer;