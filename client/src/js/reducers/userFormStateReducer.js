import actionTypes from '../actions/actionTypes';

const initialState = {
    email: '',
    username: '',
    password: '',
    isLoading: false,
    errors: {}
}

const userFormStateReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.USER_FORM:
            return {
                ...state,
                email: action.payload.email,
                username: action.payload.username,
                password: action.payload.password,
                errors: action.payload.errors,
                isLoading: action.payload.isLoading
            }
        default: 
            return state;
    }
}
export default userFormStateReducer;