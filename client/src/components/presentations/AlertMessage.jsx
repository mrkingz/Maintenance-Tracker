import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';

const AlertMessage = ({message, alertType}) => {
    return (
        <div 
            className={
            classnames("form-group alert alert-message text-center", 
                {"alert-danger": alertType === "Fail", "alert-success": alertType === "Success"}
            )}
        >
            {
                map(message, (mssge, key) => {
                    return <span className="info" key={key}>
                                {mssge}
                                { (message.length - key > 1)  ? < br/> : ''}
                            </span>
                })
            }
        </div>
    )
}
export default AlertMessage;