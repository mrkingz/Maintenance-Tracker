import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Select,
    FileUpload,
    TextField, 
    EditableDiv,
    RadioButton,
} from '../controls';
import {
    orderAction,
    userFormAction,
    userFormStateAction,
    orderFormStateAction,
    fileInputAction,
} from '../../js/actions';
import orderFormValidations from '../../js/validations/orderFormValidations';

class OrderForm extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onChange(e) {
        this.props.orderFormStateAction({
            ...this.props,
            [e.target.name]: e.target.value,
            errors: {}
        });
    }

    onKeyUp(e) {
        this.props.orderFormStateAction({
            ...this.props,
            errors: {},
            [ $(e.target).data('name') ]: $("div[contentEditable]").html() 
        });
    }

    onClickHandler(e) {
        this.props.orderFormStateAction({
            ...this.props,
            [e.target.name]: e.target.value
        });  
    }

    isValid() {
        const { instruction, isLoading, files, errors, ...fields } = this.props;
        const { error, isValid } = orderFormValidations(fields);
        if ( !isValid ) {
            this.props.orderFormStateAction({ 
                ...this.props,
                errors: error,
            })
        }
        return isValid;
    }

    onSubmitHandler(e) {
        e.preventDefault();
        if (this.isValid()) {
            const { instruction, isLoading, files, errors, ...fields } = this.props;
            this.props.orderFormStateAction({
                ...this.props,
                isLoading: true
            })
            this.props.orderAction(fields)
            .then((response) => {
                if (!response) {
                    this.props.orderFormStateAction({
                        ...this.props,
                        isLoading: false
                    })
                    this.props.userFormStateAction({});
                    this.props.userFormAction({formType: 'Signin'});
                }
                else {
                    this.props.orderFormStateAction({});
                    $('select').val('');
                    $('input').val('');
                    $('input[type="radio"]:eq(0)').prop({'checked':'checked'})
                    $('div #instruction').html('');
                    this.props.fileInputAction({});
                }
                $('#modal').modal();
            })
        }
    }

    componentWillMount() {
        this.props.orderFormStateAction({
            format: 'APA'
        });
    }

    render() {
        const academicLevel = [
            "Master's",
            "Doctoral",
            "Undergraduate",
            "Secondary School",
        ]
        const discipline = [
            "Mass Communication",
            "Economics",
            "Business Administration",
            "Public Administration",
        ]
        const { errors } = this.props;
        return (
            <form className="order-form" onSubmit={this.onSubmitHandler}>
                <Select
                    label="Academic level"
                    name="academicLevel"
                    options={academicLevel}
                    onChange={this.onChange}
                    error={errors.academicLevel}
                />
                <Select
                    label="Discipline"
                    name="discipline"
                    options={discipline}
                    onChange={this.onChange}
                    error={errors.discipline}
                />
                <Select
                    label="Type of paper"
                    name="paperType"
                    options={['Presentation', 'Research', 'Project']}
                    onChange={this.onChange}
                    error={errors.paperType}
                />
                <hr/>
                <TextField 
                    label="Topic"
                    name="topic"
                    autoComplete="off"
                    onChange={this.onChange}
                    error={errors.topic}
                />
                <div className="form-group">
                    <label htmlFor="">Paper format</label>
                    <div className="radio-div">
                        <RadioButton onClick={this.onClickHandler} prompt="APA" name="format" value="APA" checked={true}/>
                        <RadioButton onClick={this.onClickHandler} prompt="MLA" name="format" value="MLA" />
                        <RadioButton onClick={this.onClickHandler} prompt="Chicago/Turabian" name="format" value="Chicago/Turabian" />
                        <RadioButton onClick={this.onClickHandler} prompt="Others" name="format" value="Others" />
                    </div>
                </div>
                <EditableDiv 
                    label="Paper instruction (Optional)"
                    name="instruction"
                    placeholder="May include paper structure and/or outline, types and number of references to be used, grading scale or any other requirement."
                    onKeyUp={ this.onKeyUp }
                />
                <hr/>
                <FileUpload 
                    name="file"
                    placeholder="Attach file(s) (Optional)"
                />
                <div className="form-group text-right">
                    <button className="btn btn-info btn-md w-10">Submit</button>
                </div>
            </form>                                
        )
    }
}

const mapStateToProps = ({orderFormStateReducer}) => {
    return {
        topic: orderFormStateReducer.topic,
        academicLevel: orderFormStateReducer.academicLevel,
        discipline: orderFormStateReducer.discipline,
        paperType: orderFormStateReducer.paperType,
        format: orderFormStateReducer.format,
        instruction: orderFormStateReducer.instruction,
        isLoading: orderFormStateReducer.isLoading,
        files: orderFormStateReducer.files,
        errors: orderFormStateReducer.errors
    }
}
export default connect(mapStateToProps, { 
    orderAction,
    userFormAction,
    userFormStateAction,
    orderFormStateAction,
    fileInputAction
 })(OrderForm);