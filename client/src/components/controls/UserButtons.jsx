import React, { Component } from 'react';
import { modalAction } from '../../js/actions'
import { connect } from 'react-redux';
import { 
    Modal,
} from '../presentations';
import {
    alertMessageAction,
    userFormStateAction
} from '../../js/actions';

class UserButtons extends Component {
    constructor(props) {
        super(props);
    }

    displayModal(e) {
        this.props.modalAction({
            title: e.target.getAttribute('data-id'),
            contentType: 'userForm'
        })
        $('#modal').modal();
        $('input').val('');
        this.props.alertMessageAction();
        this.props.userFormStateAction({});
    }

    render() {
        return(
            <div className="text-right user-buttons">
                <button 
                    className="btn btn-link btn-sm" 
                    data-id="Signin" 

                    onClick={ this.displayModal.bind(this) } 
                    style={{ textDecoration: "none" }}
                >
                    Signin
                </button>
                <span style={{ color: "#16667D" }}>|</span>
                <button 
                    className="btn btn-link btn-sm" 
                    data-id="Signup" 
                    onClick={ this.displayModal.bind(this) } 
                    style={{ textDecoration: "none" }} 
                >
                    Signup
                </button>
            </div>
        );  
    }
}

export default connect(null, { 
    modalAction, 
    alertMessageAction,
    userFormStateAction 
})(UserButtons);