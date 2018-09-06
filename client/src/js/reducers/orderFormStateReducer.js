import actionTypes from '../actions/actionTypes';

const initialState = {
    topic: '',
    academicLevel: '',
    discipline: '',
    paperType: '',
    format: '',
    instruction: '',
    isLoading: false,
    files: {},
    errors: {}
}

const orderFormStateReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ORDER_FORM: 
            return {
                ...state,
                topic: action.payload.topic,
                academicLevel: action.payload.academicLevel,
                discipline: action.payload.discipline,
                paperType: action.payload.paperType,
                format: action.payload.format,
                instruction: action.payload.instruction,
                isLoading: action.payload.isLoading,
                files: action.payload.files,
                errors: action.payload.errors
            }
        default: 
            return state
    }
}

export default orderFormStateReducer;