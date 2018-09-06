import actionTypes from '../actions/actionTypes';

const initialState  = {
    title: "",
    size: "",
    message: [],
    messageType: 'info',
    isDoubleButton: false,
    contentType: ''
}

export default (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.MODAL_CONTENT:
            return {
                ...state,
                contentType: action.payload.contentType,
                title: action.payload.title,
                size: action.payload.size,
                message: action.payload.message,
                messageType: action.payload.messageType,
                isDoubleButton: action.payload.isDoubleButton
            }
        default: 
            return state;
    }

}
