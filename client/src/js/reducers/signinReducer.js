import actionTypes from '../actions/actionTypes';
import _ from 'lodash';
const initialState = {
    status: '',
    isAuthenticated: false,
    user: {}
}

const signinReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SIGNIN_SUCCESSFUL:
            return {
                ...state,
                isAuthenticated: true,
                status: action.payload.status,
                user: action.payload.user
            };
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                status: 'Success',
                isAuthenticated: true,
                user: action.payload.user
            };
        case actionTypes.SIGNIN_UNSUCCESSFUL: 
            return {
                ...state,
                isAuthenticated: false,
                status: '',
                user: {}
            };
        case actionTypes.SIGNOUT_USER:
            return {
                ...state,
                status: '',
                isAuthenticated: false,
                user: {}
            }      
        default:
            return state;
    }
    return state;
}
export default signinReducer;