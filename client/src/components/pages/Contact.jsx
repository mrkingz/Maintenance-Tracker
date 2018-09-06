import React from 'react';
import { ContactForm } from '../Forms';

const Contact = () => {
    return (
        <div className="block" id="contact">
            <h1 className="text-left">Contact us</h1>
            <div className="row desc">
                <div className="col-10 offset-1">
                    <h5 className="sub-heading">Our contacts</h5>
                    <div className="row address segment">
                        <blockquote>
                            <blockquote>
                                <h5 className="sub-heading">Address: </h5>
                                <b>Communication and Media Research Center</b>
                            </blockquote>
                            <p><strong className="sub-heading">Email: </strong> info@cmrc.com</p>
                            <p><strong className="sub-heading">Phone: </strong> +234 80 3164 4795</p>
                        </blockquote>
                    </div>
                    <h5 className="sub-heading">Direct message</h5>
                    <div className="row">
                        <div className="col segment">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;