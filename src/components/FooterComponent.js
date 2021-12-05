import React from 'react';
import { Link } from 'react-router-dom';


function Footer(props) {
    return (
        <footer className="site-footer mb-auto">
            <div className="container">
                <div className="row">
                    <div className="col-4 col-sm-2 offset-1">
                        <h5 className="text-light">Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to='/home'>Home</Link></li>
                            <li><Link to='/menu'>Menu</Link></li>
                            <li><Link to='/burgerbuilder'>Burger Builder</Link></li>
                            <li><Link to='/requeststop'>Request a Stop</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 col-sm-3 text-center">
                        <h5 className="text-light">Social</h5>
                        <a className="btn btn-social-icon btn-instagram text-light" href="http://instagram.com/"><i className="fa fa-instagram" /></a>{' '}
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/"><i className="fa fa-facebook" /></a>{' '}
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter" /></a>{' '}
                        <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube" /></a>
                    </div>
                    <div className="col-sm-4 text-center">
                        <h5 className="text-light">Contact</h5>
                        <a role="button" class="btn btn-link" href="mailto:chris.t@pattyplate.com">
                            <i class="fa fa-envelope-o fa-lg text-primary"></i>
                            chris.t@pattyplate.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;