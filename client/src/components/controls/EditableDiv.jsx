import React from 'react';
import classnames from 'classnames';

const EditableDiv = ({ onKeyUp, label, name, error, placeholder }) => {
    return (
        <div className="form-group">
            <label className="col-form-label"> { label }</label>
            <div 
                className={classnames("editable-div form-control", { "is-invalid": error })} 
                contentEditable="true" 
                data-name={ name } 
                id={name}
                placeholder={ placeholder }
                onKeyUp={ onKeyUp }
            >
            </div>
            { error && <span className="info error"> {error} </span>}
        </div>
    )
}
export default EditableDiv;