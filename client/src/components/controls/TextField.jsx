import React from 'react';
import propTypes from 'proptypes'
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

const TextField = ({type, label, error, name, placeholder, value, onChange, onBlur}) => {
    placeholder = isEmpty(placeholder) ? "" :" or "+placeholder
    return (
        <div className="form-group">
            <label data-for={name}>{label + placeholder}</label>
            <input 
                autoComplete="off"
                onChange={onChange}
                onBlur={onBlur}
                type={type} 
                name={name}
                data-id={name} 
                className={classnames("form-control form-control-sm", { "is-invalid": error })} 
                placeholder={"Enter "+label.toLowerCase() +placeholder}
                defaultValue={value}
            />
            { error && <span className="info error"> {error} </span>}
        </div>
    )
}


TextField.defaultProps = {
  type: 'text'
}

export default TextField;
