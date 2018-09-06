import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { 
    NavBarMenu,
    AuthenticatedUserMenu,
} from '../presentations'
import { 
    UserButtons,
    Dropdown,
} from '../controls'

class NavBar extends Component { 
    constructor(props) {
        super(props);
    }  
    render() {
        return (  
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse" aria-controls="collapse" aria-expanded="false">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapse">
                        <NavBarMenu />
                        {
                            this.props.isAuthenticated 
                                ? <AuthenticatedUserMenu />
                                : <UserButtons />
                        }
                    </div>
                </div>
            </nav>  
        );
    }
}
const mapStateToProps = ({signinReducer}) => {
    return {
        isAuthenticated: signinReducer.isAuthenticated
    }
}
export default connect(mapStateToProps)(NavBar);
