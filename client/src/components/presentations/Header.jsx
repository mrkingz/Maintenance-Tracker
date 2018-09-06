import React, { Component }  from 'react'
import NavBar from './NavBar';
import logo from '../../../assets/uploads/logo.png';

const Header = (props) => {

    return (
        <div className="container-fluid header-container">
            <div className="container">
                <div className="row banner-div">
                    <div className="col-3"> 
                        <img className="card-img-top" src={logo} alt="" style={{width: "9em", height: "7em"}}/>
                    </div>
                    <div className="col-9">
                    </div>
                </div>
            </div>
            <div className="row no-gutter">
                <div className="col no-gutter"> 
                    <NavBar />
                </div>        
            </div>
        </div>
    )
}

export default Header;