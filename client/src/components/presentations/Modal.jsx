import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    Message,
    ModalButtons,
} from '../presentations'
import {
    UserForm,
} from '../Forms';

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    getModalContent() {
        switch(this.props.contentType) {
            case 'userForm':
                return <UserForm />
            default: 
                return "";
        }
    }

    render() {
        const { title, size, isDoubleButton, message, messageType } = this.props
        return (
            <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className={ "modal-dialog "+size} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" >
                                { 
                                    title === "Recover" || title === "Reset"
                                    ? title+ " Password" : title
                                }
                            </h5>
                        </div>
                        <div className="modal-body">
                            { 
                                _.isEmpty(message) ? "" : <Message message={ message } messageType={messageType}/>
                            }
                            <div className="row no-gutter">
                                <div className="cols col-8 offset-2 no-gutter">
                                    { this.getModalContent() }
                                </div>
                            </div>
                        </div>
                        <ModalButtons isDoubleButton={isDoubleButton}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ modalReducer, signinReducer }) => {
    return {
        size: modalReducer.size,
        title: modalReducer.title,
        message: modalReducer.message,
        messageType: modalReducer.messageType,
        contentType: modalReducer.contentType,
        isDoubleButton: modalReducer.isDoubleButton,
    }
}
export default connect(mapStateToProps)(Modal);