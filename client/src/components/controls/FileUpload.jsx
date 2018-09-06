import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileInput from './FileInput';
import _ from 'lodash';
import { 
    fileInputAction,
    removeFileInputAction,
    orderFormStateAction,
} from '../../js/actions'

class FileUpload extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        let count = this.getFileInpoutCount();
        let timeStamp = parseInt($(e.target).parents('.files').attr("id"));
        this.props.removeFileInputAction(timeStamp);
        this.props.orderFormStateAction({
            ...this.props.orderFormState,
            files: _.omit(this.props.files, timeStamp)
        })    
    }

    createFileInput(timeStamp) {
        return <FileInput 
                    name= "file" 
                    onClick={ this.onClick } 
                    onChange={ this.onChange }
                    key={ timeStamp } 
                    timeStamp={ timeStamp }
                />
    }

    displayFileInput() {
        return <div className="file-div">
                {
                    Object.keys(this.props.inputs).sort((a, b)=>{
                            return a - b
                        }).map((key) => {
                        return this.props.inputs[key]
                    })
                }
                </div>
    }

    onChange(e){
        let fileName = e.target.files[0];
        let timeStamp = $(e.target).parents('.files').attr("id");
        if ( fileName !== null ) {
            $("#btn"+timeStamp).show();
            this.addFileInput(this.getFileInpoutCount());
            this.props.orderFormStateAction({
                ...this.props.orderFormState,
                files: {
                    ...this.props.files,
                    [timeStamp]: fileName
                }
            })
        }
    }

    addFileInput() {
        const timeStamp = Date.now();
        this.props.fileInputAction({
            fileInput: this.createFileInput(timeStamp),
            timeStamp: timeStamp
        });  
    }

    getFileInpoutCount() {
        return Object.keys(this.props.inputs).length;
    }

    componentWillMount() {
        const count = this.getFileInpoutCount();
        if (count === 0)
            this.addFileInput();
    }

    componentDidUpdate() {
        const count = this.getFileInpoutCount();
        if (count  === 0)
          this.addFileInput()
    }

    render() {
        const { name, placeholder } = this.props;
        return (
            <div className="form-group">
                <label htmlFor="">{ placeholder }</label>
                    { this.displayFileInput() }
            </div>
        )
    }
}
const mapStateToProps = ({ fileInputReducer, orderFormStateReducer }) => {
    return {
        inputs: fileInputReducer,
        files: orderFormStateReducer.files,
        orderFormState: orderFormStateReducer
    }
}
export default connect(mapStateToProps, { 
    fileInputAction,
    removeFileInputAction,
    orderFormStateAction,
})(FileUpload);