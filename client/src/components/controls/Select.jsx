import React from 'react';
import classnames from 'classnames';

const Select = ({options, label, name, error, onChange}) => {
    return (
        <div className="form-group row">
            <div className="col-lg-4 col-md-4 col-sm-12">
                <label data-for={name}>{label}</label>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12">
                <select 
                    className="form-control form-control-sm"
                    data-id={name}
                    name={name}
                    onChange={onChange}
                    className={classnames("form-control form-control-sm", { "is-invalid": error })} 
                >
                    <option value="" >--Select--</option>
                    {
                        options.map((val, index) => {
                            return <option key={ index } value={ val }>{ val }</option>
                        })
                    }
                </select>
                { error && <span className="info error"> {error} </span>}
            </div>
        </div>
    )
}

export default Select;