import React from 'react';

const ModalButtons = ({isDoubleButton}) => {
    return (
        <div className="modal-footer btn-group" role="group">
            {
                isDoubleButton ?
                    <button 
                    type="button" 
                    className="btn btn-danger btn-sm" 
                    data-dismiss="modal"
                >
                    Yes
                </button> 
                : ""
            }
            <button type="button" className="btn btn-info btn-sm" data-dismiss="modal">
                {
                    isDoubleButton ? "No" : "Close"
                }
            </button>   
        </div>
    )
}

export default ModalButtons;