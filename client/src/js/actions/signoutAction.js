import actionTypes from '../actions/actionTypes';
import setAthorizationToken from '../../utils/setAuthorizationToken';

const signoutAction = () => dispatch => {
    setAthorizationToken(false);
    localStorage.removeItem('token');
    dispatch({
        type: actionTypes.SIGNOUT_USER
    })
}
export default signoutAction;