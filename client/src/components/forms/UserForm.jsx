import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { 
    TextField,
    UserButtons
} from '../controls'
import {
    userFormAction,
    modalAction,
    signinAction,
    signupAction,
    verifyEmailAction,
    alertMessageAction,
    userFormStateAction,
    verifyUserPasswordAction
} from '../../js/actions';
import { 
    alertMessageReducer,
    userFormStateReducer 
} from '../../js/reducers';
import {
    AlertMessage
} from '../presentations';

import userFormValidations from '../../js/validations/userFormValidations';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleType = props.formType;
    }

    toggleForm(e) {
        e.preventDefault();

        $('input').val('');
        this.toggleType = e.target.getAttribute('data-id');
    
        this.props.userFormAction({
            formType: this.toggleType,
        })

        this.props.modalAction({
            title: this.toggleType,
            contentType: 'userForm'
        })

        this.props.userFormStateAction({})
        if (this.props.isShown)
            this.props.alertMessageAction();
    }

    isValid() {
        
        const { errors, formType, ...fields } = this.props;
        const { error, isValid } = userFormValidations({
            email: fields.email,
            username: fields.username,
            password: fields.password
        }, formType );
        if ( !isValid ) {
            this.props.userFormStateAction({ 
                ...this.props,
                errors: error,
            })
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault()
        const {errors, formType, ...fields} = this.props;
        if (this.isValid()) {
            this.props.userFormStateAction({
                ...this.props,
                isLoading: true
            })
            if(formType === 'Signin') {
                this.props.signinAction({
                    email: fields.email,
                    password: fields.password
                })
                .then(() => {
                    this.props.userFormStateAction({
                        ...this.props,
                        errors: {}
                    });
                })
            } else if (formType === 'Signup') {
                this.props.signupAction({
                    email: fields.email,
                    username: fields.username,
                    password: fields.password,
                })
                .then(response => {
                    if(response) {
                        $('input[name="password"]').val('');
                        this.toggleType = 'Signin';
                        this.props.modalAction({
                             title: this.toggleType,
                             contentType: 'userForm'
                        });
                        this.props.userFormAction({formType: this.toggleType});
                        this.props.userFormStateAction({
                            email: this.props.username,
                            isLoading: false
                        });
                    }
                })
            } else if (this.toggleType === "Recover") {
                this.props.verifyEmailAction(fields.email)
                .then(response  => {
                    if (response) {
                        $("input").val('');
                        this.props.userFormStateAction({});
                    }
                })
            } else if (this.toggleType === "Reset") {
                this.props.verifyUserPasswordAction({
                    password: fields.password,
                    userId: this.props.user.userId,
                    email: this.props.user.email
                })
                .then(response  => {
                    //if (response) {
                        $("input").val('');
                        this.props.userFormStateAction({});
                    //}
                })
            }
        }
        if (this.props.isShown)
            this.props.alertMessageAction();
    }

    onChange(e) {
        this.props.userFormStateAction({
            ...this.props,
            [e.target.name]: e.target.value,
            isLoading: false,
            errors: {},
        })
        if (this.props.isShown)
            this.props.alertMessageAction();
    }

    render () {
        const { 
            formType, 
            isEditPassword,
            isAuthenticated,
            alertMessage, 
            alertType, 
            email, 
            username, 
            password, 
            errors, 
            isLoading
        } = this.props;

        let isSignup = formType === "Signup",
            isSignin = formType ==="Signin",
            isRecover = formType === "Recover",
            isReset = formType === "Reset";

        return (
            <form className="user-form" onSubmit={this.onSubmit}>
                <div className="outter-wrap">
                    <div className="inner-wrap">
                    {
                         isReset ? "" : 
                            <TextField 
                                placeholder = { isSignup  || isRecover ? "" : "username" }
                                label = "Email address"
                                name = "email"
                                error ={errors.email}
                                value={email}
                                onChange={this.onChange}
                            />
                    }
                    { 
                        isSignup && !isRecover ?
                            <TextField 
                                label="Username"
                                name="username"
                                error={errors.username}
                                value={username}
                                onChange={this.onChange}
                            />
                        : ""
                    }
                    { 
                        !isRecover ? 
                        <TextField 
                            label={(isReset ? "Current " : "") +"Password"}
                            name="password"
                            type="password"
                            error={errors.password}
                            value={password}
                            onChange={this.onChange}
                        />
                        : ""
                    }
                    </div>
                    { 
                        !isEmpty(alertMessage) ? <AlertMessage message={alertMessage} alertType={alertType} /> : "" 
                    }
                    <div className="form-group">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <button 
                                    type="submit" 
                                    disabled={ isLoading }
                                    className="btn btn-info btn-sm w-100"
                                >
                                    { isRecover || isReset ? "Send" : formType }
                                </button>
                            </div>
                            {
                                isAuthenticated ? ''
                                : <div className="col-lg-8 col-md-8 col-sm-12">
                                    <div className="info user-buttons text-right">
                                        <span className="info">
                                            { isSignup ? "Already" : "Don't" } have account?
                                        </span>
                                        <button 
                                            className="btn btn-link btn-sm toggle"
                                            data-id = {isSignup ? "Signin" : "Signup"}
                                            onClick={this.toggleForm.bind(this)}
                                        >
                                            { isSignup ? "Signin" : "Signup" }
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {
                    (isSignup || isAuthenticated || isRecover) ? ''
                    :   <div className={"form-group text-right "+(isReset ? "user-buttons" : "")}>
                            <button 
                                className={
                                    "btn btn-link btn-sm "+(isReset ? "toggle" : "forgot-password" )
                                }
                                data-id = {isReset ? "Signin" : "Recover"}
                                onClick={this.toggleForm.bind(this)}
                            >
                                { isReset ? "Signin" : "Forgot password" }
                            </button>
                        </div>
                }
            </form>
        )
    }
}

const mapStateToProps = ({ userFormReducer, alertMessageReducer, userFormStateReducer, signinReducer }) => {
    return {
        formType: userFormReducer.formType,
        isEditPassword: userFormReducer.isEditPassword,
        email:userFormStateReducer.email,
        username: userFormStateReducer.username,
        password: userFormStateReducer.password,
        errors: userFormStateReducer.errors,
        isLoading: userFormStateReducer.isLoading,
        alertMessage: alertMessageReducer.message,
        alertType: alertMessageReducer.alertType,
        isShown: alertMessageReducer.isShown,
        user: signinReducer.user,
        isAuthenticated: signinReducer.isAuthenticated
    };
}

export default connect(mapStateToProps, { 
    modalAction,
    signupAction,
    signinAction,
    userFormAction,
    verifyEmailAction, 
    alertMessageAction,
    userFormStateAction,
    verifyUserPasswordAction
 })(UserForm);