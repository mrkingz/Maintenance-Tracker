import actionTypes from './actionTypes';

const fileInputAction = ({fileInput, timeStamp}) => dispatch => {
    if(fileInput && timeStamp) {
        dispatch({
            type: actionTypes.ADD_FILE_INPUT,
            payload: { 
                fileInput,
                timeStamp
            } 
        })
    } else {
        dispatch({type: actionTypes.REMOVE_ALL_FILE_INPUT});
    }
}
export default fileInputAction;