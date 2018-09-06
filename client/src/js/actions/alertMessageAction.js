import actionTypes from '../actions/actionTypes';

const alertMessageAction = () => dispatch => {
    dispatch({
        type: actionTypes.HIDE_ALERT_MESSAGE,
    })
}
export default alertMessageAction;