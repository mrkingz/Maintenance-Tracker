import React from 'react';

const Footer = () => {
    return (
        <footer className="container-fluid">
            <div className="row footer upper-footer">
                <div className="container">
                    <h3 className="footer-title">Services</h3>
                    <div className="services">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12"><br/>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <ul className="list nexted">
                                            <li><p>Radio</p></li>
                                            <li><p>Magazines</p></li>
                                            <li><p>Television</p></li>
                                            <li><p>Newspaper</p></li>
                                            <li><p>New media</p></li>
                                            <li><p>Social media</p></li>
                                            <li><p>Media</p></li>
                                            <li><p>Advertising</p></li>
                                            <li><p>Trends</p></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <ul className="list nexted">
                                            <li><p>Marketing</p></li>
                                            <li><p>Customer</p></li>
                                            <li><p>Product</p></li>
                                            <li><p>Survey</p></li>
                                            <li><p>Social Development Trends</p></li>
                                            <li><p>Public Opinion </p></li>
                                            <li><p>Democracy</p></li>
                                            <li><p>Reports</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12"><br/>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                                        <ul className="list nexted">
                                            <li><p>Essays</p></li>   
                                            <li><p>Term Papers</p></li>   
                                            <li><p>Thesis</p></li> 
                                            <li><p>Dissertations </p></li> 
                                            <li><p>Assignment</p></li> 
                                            <li><p>Data Gathering/Analysis</p></li> 
                                            <li><p>Reports</p></li>
                                            <li><p>Editing</p></li>
                                            <li><p>Speeches</p></li>
                                            <li><p>Reviews</p></li>
                                        </ul> 
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <ul className="list nexted">
                                            <li><p>Plagiarism</p></li>
                                            <li><p>Presentations</p></li>
                                            <li><p>Projects</p></li>
                                            <li><p>Case Studies</p></li>
                                            <li><p>Course/Homeworks</p></li>
                                            <li><p>Critical Thinking</p></li>
                                            <li><p>Annotated Bibliography</p></li>
                                            <li><p>Capstone projects</p></li>
                                            <li><p>Grant proposals</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row footer lower-footer">
                <div className="container">                
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h3 className="footer-title">Attention!</h3>
                            <p className="lighter">Using this service is LEGAL and IS NOT prohibited by any university/college policies.</p>
                            <p>You are allowed to use the original model paper you will receive in the following ways:</p>
                            <ol>
                                <li>As a source for additional understanding of the subject</li>
                                <li>As a source of ideas / reasoning for your own research (if properly referenced)</li>
                                <li>For proper paraphrasing (see your educational institution's definition of plagiarism and acceptable paraphrase)</li>
                                <li>Direct citing (if referenced properly)</li>
                            </ol>
                                <p>Thank you very much for respecting our authors' copyrights.
                                <br/>Site Management</p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h3 className="footer-title">Disclaimer</h3>
                            <p>
                                Center for media research and communication (CMRC): a custom writing service that provides online custom-written papers, 
                                such as term papers, research papers, thesis papers, essays, dissertations, 
                                and other custom writing services inclusive of research materials for assistance purposes only. 
                                These custom papers should be used with proper references.
                            </p>
                            <h3 className="f-title">Cookie Policy</h3>
                            <p>
                                We use cookies to give you the best possible experience on our website.
                                By continuing to browse this site, you give consent for cookies to be used. 
                                For more details, including how you can amend your preferences, please read our 
                            </p>
                        </div>
                    </div>
                    <div className="copyright-block">
                        <p>&copy; 2008&mdash;
                            { new Date().getFullYear() } Center for media research and communication. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;