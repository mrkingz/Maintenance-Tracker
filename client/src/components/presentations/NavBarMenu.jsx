import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const NavBarMenu = () => {

    return (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" data-value="about" to="/about">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link> 
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/clients">Clients</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/testimonials">Testimonials</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/reports">Reports</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/polls">Polls</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
            </li>
        </ul>
    )
}

export default NavBarMenu;