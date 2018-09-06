import actionTypes from '../actions/actionTypes';

const removeButtonReducer = (state = {
    showButton: false
}, action) => {
    switch(action.type) {
        case actionTypes.SHOW_REMOVE_BUTTON:
            return {
                ...state,
                show: action.payload.showButton
            }
        default: 
            return state;
    }
}

export default removeButtonReducer;