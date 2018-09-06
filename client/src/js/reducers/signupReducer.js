import actionTypes from '../actions/actionTypes';

const intitialState = {
    success: false,
}

const signupReducer = (state = intitialState, action) => {
    switch(action.type) {
        case actionTypes.SIGNUP_SUCCESSFUL:
            return {
                ...state,
                success: true
            };
        case actionTypes.SIGNUP_UNSUCCESSFUL:
            return {
                ...state,
                success: false,
            }
        default: 
            return state;
    }
}
export default signupReducer;