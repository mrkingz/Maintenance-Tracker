import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';

export default ({message, messageType}) => {
    return (
        <div className="row ">
            <div className={
                    classnames("cols col-8 offset-2 text-center alert", 
                    {"alert-info": messageType === "info", "alert-success": messageType  === "success"})
                } 
                style={{fontSize: '12px'}}
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
        </div>
    )
}