import React, { Component } from 'react';
import { 
    TextField, 
    EditableDiv
} from '../controls'
import contactFormValidations from '../../js/validations/contactFormValidations';

class ContactForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            fullName: '',
            email: '',
            message: '',
            isLoading: false,
            errors: {}
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ 
            errors: {},
            [e.target.name]: e.target.value
        });
    }

    onKeyUpHandler(e) {
        this.setState({
            errors: {},
            [ $(e.target).data('name') ]: $("div[contentEditable]").html() 
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({isLoading: true})
            alert("ufgvyfgyg")
        }
    }

    isValid() {    
        const { errors, isLoading, ...fields } = this.state;
        const { error, isValid } = contactFormValidations(fields);
        if ( !isValid ) {
            this.setState({errors: error})
        }
        return isValid;
    }

    render() {
        const { errors } = this.state;
        return (
            <form className="contact-form" onSubmit={this.onSubmitHandler}> 
                <TextField 
                    label="Full name"
                    name="fullName"
                    error ={errors.fullName}
                    value={this.state.fullName}
                    onChange={ this.onChangeHandler }
                />
                <TextField 
                    label="Email address"
                    name="email"
                    error ={errors.email}
                    value={this.state.email}
                    onChange={ this.onChangeHandler }
                />
                <EditableDiv 
                    label="Message"
                    name="message"
                    error ={errors.message}
                    placeholder="Type your message here"
                    onKeyUp={ this.onKeyUpHandler }
                />
                <div className="form-group">
                    <button 
                        type="submit" 
                        className="btn btn-info btn-sm"

                    >Send</button>
                </div>
            </form>
        )
    }
}
export default ContactForm;