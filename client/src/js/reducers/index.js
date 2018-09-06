import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import modalReducer from './modalReducer';
import userFormReducer from './userFormReducer';
import fileInputReducer from './fileInputReducer';
import removeButtonReducer from './removeButtonReducer';
import alertMessageReducer from './alertMessageReducer';
import userFormStateReducer from './userFormStateReducer'
import orderFormStateReducer from './orderFormStateReducer';

const rootReducer = combineReducers({
    form,
    signupReducer,
    signinReducer,
    modalReducer,
    userFormReducer,
    fileInputReducer,
    removeButtonReducer,
    alertMessageReducer,
    userFormStateReducer,
    orderFormStateReducer
});

export default rootReducer;
