import actionTypes from './actionTypes';

const removeFileInputAction = (timeStamp) => dispatch => {
    dispatch({
        type: actionTypes.REMOVE_FILE_INPUT,
        payload: { timeStamp: timeStamp }
    })
}
export default removeFileInputAction;