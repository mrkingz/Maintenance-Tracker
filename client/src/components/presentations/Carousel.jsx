import React from 'react';
import hand from '../../../assets/uploads/hand.png';
import books from '../../../assets/uploads/books.jpg';
import book from '../../../assets/uploads/book.jpg';
import book3 from '../../../assets/uploads/book3.jpg';

const Carousel = props => {
    return (
            <div id="myCarousel" className="carousel slide no-gutter" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner no-gutter" role="listbox">
                    <div className="carousel-item active">
                        <img className="first-slide" src={hand} style={{height: "100%"}}/>
                            <div className="container">
                            <div className="carousel-caption d-none d-md-block text-right">
                                <h1>Confidentiality & Authenticity Guaranteed!</h1>
                                <p>
                                    Won't you rather book with us?
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="second-slide" src={book} style={{height: "100%"}} />
                        <div className="container">
                            <div className="carousel-caption d-none d-md-block text-right">
                                <h1>You deserve a perfect presentation? </h1>
                                <p> Place your order </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="third-slide" src={book3} style={{height: "100%"}} />
                        <div className="container">
                            <div className="carousel-caption d-none d-md-block text-right">
                                <h1>Expiriencing writer's block?</h1>
                                <p>Place your order
                                    <br/>our seasoned writers will deliver to you a perfect paper
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
}
export default Carousel;