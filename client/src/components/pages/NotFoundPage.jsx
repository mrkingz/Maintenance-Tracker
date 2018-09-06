import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';
import sad from '../../../assets/uploads/sad.png';


class NotFoundPage extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
    }

    navigateBack(){
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="container text-center">
                <div className="not-found text-center">
                    <h1 className="alert-danger"> 404 Error! </h1>
                    <img
                        src={sad}
                        alt=""
                        style={{width: "14em", height: "12em"}}
                    />
                    <h3>
                        Sorry, page not found.
                    </h3>
                    <Link to="/" onClick={this.props.renderPage}>
                        <h6> <span><i className="fa fa-home" /></span> Go to home</h6>
                    </Link>
                 </div>
            </div>
        )
    }
}

export default NotFoundPage;
