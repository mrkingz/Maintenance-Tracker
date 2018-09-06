import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    Header,
    Carousel,
    Modal,
} from '../presentations';
import { 
    Home,
    About,
    Services,
    Contact,
    Clients,
    Order,
    NotFoundPage,
} from '../pages';

import {
    showModal,
    toggleUserForm
} from '../../js/actions';

import Footer from '../footers';
import scrollPage from '../../utils/scrollPage';

class HomePage extends Component {
    constructor(props){
        super(props)
        this.isValidURL = true;
        this.state = {
            shouldRenderPage: true,
            isOrderPage: false
        }
        this.onClick = this.onClick.bind(this);
    }

    getPage(page) {
        switch(page) {
            case 'about':
                return <About />
            case 'services': 
                return <Services />
            case 'contact':
                return <Contact />
            case 'clients':
                return <Clients />
            case 'order': 
                return <Order />
            case 'home':
                return <Home />
            default: 
                this.isValidURL = false
                return;
        }
    }

    componentDidMount(){
        if(!this.isValidURL){
            this.renderPage(false)
        }
    }

    componentDidUpdate() {
        scrollPage(this.props.match.params.page || "home");
    }

    renderPage(status) {
        this.setState({shouldRenderPage: status})
    }

    onClick(e) {
        const { match: { params : { page } }  } = this.props;
        this.setState({
            isOrderPage: true
        })  
    }

    render() {
        const { title } = this.props;
        const { isOrderPage } = this.state;
        const page = this.props.match.params.page || "home";
        if (this.state.shouldRenderPage) {
            return (
                <div id="home">
                    <Header />
                    { page === "home" && !this.props.isAuthenticated ? <Carousel /> : "" }
                    <div className="container">
                        <div className="row no-gutters section">
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <div className="right-section">
                                { this.getPage(page) }
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12"><br/><br/><br/>
                                <div className="left-section">
                                    <div className="btn-wrap">
                                        {
                                        <Link className="btn btn-info btn-lg form-control" 
                                            style={{fontSize: "1em"}}
                                            onClick={this.onClick}
                                            to="/order"
                                        >
                                            Place Order
                                        </Link>
                                        } 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal />
                    <Footer />
                </div>
            );
        }
        else {
            return <NotFoundPage renderPage={this.renderPage}/>;
        }
    }
}
const mapStateToProps = ({signinReducer}) => {
    return {
        isAuthenticated: signinReducer.isAuthenticated
    }
}
export default connect(mapStateToProps)(HomePage);


