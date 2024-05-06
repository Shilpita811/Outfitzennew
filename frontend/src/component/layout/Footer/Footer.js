import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container9">
                    <div className="row9">
                        {/* <div className="col-lg-4 col-md-6 col-sm-7">
                            <div className="footer__about">
                                <div className="footer__logo">
                                    <Link to="./index.html"><img src="img/logo.png" alt=""/></Link>
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    cilisis.</p>
                                
                            </div>
							
                        </div> */}
						<div className="col-lg-2 col-md-3 col-sm-5">
                            <div className="footer__widget">
                                <h6>Quick links</h6>
                                <ul>
                                    <li><Link to="/about">About Us</Link></li>
                                    <li><Link to="/contact">Contact Us</Link></li>
                                    <li><Link to="#">Blogs</Link></li>
                                    <li><Link to="#">FAQ</Link></li>
                                </ul>
                            </div>
                        </div>
						<div className="col-lg-2 col-md-3 col-sm-4">
                            <div className="footer__widget">
                                <h6>Account</h6>
                                <ul>
                                    <li><Link to="/account">My Account</Link></li>
                                    <li><Link to="/registration">Register</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="#">Wishlist</Link></li>
                                </ul>
                            </div>
                        </div>
						<div className="col-lg-2 col-md-3 col-sm-5">
                            <div className="footer__widget">
                                <h6>Online Shop</h6>
                                <ul>
                                    <li><Link to="/about">Download</Link></li>
                                    <li><Link to="/contact">Changelog</Link></li>
                                    <li><Link to="#">Github</Link></li>
                                    <li><Link to="#">All Version</Link></li>
                                </ul>
                            </div>
                        </div>
                        
                        
                        <div className="col-lg-4 col-md-8 col-sm-8">
                            <div className="footer__newslatter">
                                <h6>FOLLOW US</h6>
                                {/* <form action="#" className="pbt">
                                    <input type="text" placeholder="Email"/>
                                        <button type="submit" className="site-btn">Subscribe</button>
                                </form> */}
                                <div className="footer__social">
                                    <Link to="#"><i className="fa-brands fa-facebook-f"></i></Link>
                                    <Link to="#"><i className="fa-brands fa-x-twitter"></i></Link>
                                    <Link to="#"><i className="fa-brands fa-instagram"></i></Link>
                                    <Link to="#"><i className="fa-brands fa-linkedin-in"></i></Link>
                                    {/* <Link to="#"><i className="fa fa-pinterest"></i></Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer__copyright__text">
                                <p>Copyright &copy; All rights reserved 2024 | Outfitzen</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;