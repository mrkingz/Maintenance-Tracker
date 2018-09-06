import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    modalAction,
    signoutAction,
    alertMessageAction,
    userFormStateAction
} from '../../js/actions';
import {
    Dropdown
} from '../controls'

class AuthenticatedUserMenu extends Component {
    constructor(props) {
        super(props);
        this.signout = this.signout.bind(this);
        this.displayModal = this.displayModal.bind(this);
    }

    signout(e) {
        //e.prventDefault();
        this.props.signoutAction();
    }

    displayModal() {
        this.props.modalAction({
            title: 'Reset',
            message: ['A password reset link will be sent to your mail'],
            contentType: 'userForm',
        })
        $('#modal').modal();
        $('input').val('');
        this.props.alertMessageAction();
        this.props.userFormStateAction({});
    }

    render() {
        const { user } = this.props;
        return (
            <div className="dropdown" style={{float: 'right'}}>
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {`Hi, ${user.username}`}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <button className="dropdown-item" onClick={this.displayModal}>Change Password</button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={this.signout} >Signout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({signinReducer}) => {
    return {
        user: signinReducer.user
    }
}
export default connect(mapStateToProps, { 
    signoutAction,
    modalAction,
    alertMessageAction, 
    userFormStateAction
})(AuthenticatedUserMenu);