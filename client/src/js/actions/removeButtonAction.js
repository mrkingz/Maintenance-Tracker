import actionTypes from '../actions/actionTypes';

const removeButtonAction = value => dispatch => {
    dispatch({
        type: actionTypes.SHOW_REMOVE_BUTTON,
        payload: {
            showButton: value
        }
    })
}
export default removeButtonAction;