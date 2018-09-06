import actionTypes from '../actions/actionTypes';
import omit from 'lodash/omit';

export default (state = {}, action) => {
    switch(action.type) {
        case actionTypes.ADD_FILE_INPUT:
            return {
                ...state,
               [action.payload.timeStamp]: action.payload.fileInput
            }
        case actionTypes.REMOVE_FILE_INPUT:
            return omit(state, action.payload.timeStamp);
        case actionTypes.REMOVE_ALL_FILE_INPUT:
            return {}
        default:
            return state;
    }  
}