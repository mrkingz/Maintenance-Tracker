import React from 'react';

const RadioButton = ({ prompt, name, value, onClick, checked}) => {
    return (
        <div className="form-check form-check-inline">
            <label className="form-check-label">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name={name} 
                    value={value} 
                    defaultChecked={checked || false}
                    onClick={onClick}
                />{prompt}
            </label>
        </div>
    )
}

export default RadioButton;