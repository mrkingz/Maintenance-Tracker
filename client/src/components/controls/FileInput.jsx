import React, { Component } from 'react';
import { connect } from 'react-redux';
import removeButtonAction from '../../js/actions';

const FileInput = ({onChange, onClick, name, timeStamp}) => {
    return (
        <div className="files" id={ timeStamp } >
            <div className="row">
                <div className="col-lg-11 col-md-11 col-sm-12">
                    <input 
                        type="file" 
                        name={ name }
                        onChange={onChange}
                    /> 
                </div>
                <div className="col-lg-1 col-md-1 col-sm-12">
                    <div className="row">
                        {
                            true ? <button 
                                    className="btn btn-link btn-sm clear-file "
                                    onClick={ onClick }
                                    id={"btn"+timeStamp}
                                >
                                    &times;
                                </button> : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FileInput;