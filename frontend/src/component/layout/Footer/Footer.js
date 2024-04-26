import React from 'react'
import './Footer.css';

const Footer = () => {
	return (
		<>
			<footer className="footer">
				<div className="container1 row1">
					<div className="footer-col">
						<h4>company</h4>
						<ul>
							<li><a href="/about">about us</a></li>
							<li><a href="/contact">contact us</a></li>
							<li><a href="#">privacy policy</a></li>
							<li><a href="#">visit website</a></li>
						</ul>
					</div>
					<div className="footer-col">
						<h4>get help</h4>
						<ul>
							<li><a href="/registration">Register</a></li>
							<li><a href="/login">Login</a></li>
							<li><a href="#">order history</a></li>
							<li><a href="#">payment methods</a></li>
						</ul>
					</div>
					<div className="footer-col">
						<h4>online shop</h4>
						<ul>
							<li><a href="#">download</a></li>
							<li><a href="#">changelog</a></li>
							<li><a href="#">github</a></li>
							<li><a href="#">all version</a></li>
						</ul>
					</div>
					<div className="footer-col">
						<h4>follow us</h4>
						<div className="social-links">
							<a href="#"><i className="fa-brands fa-facebook-f"></i></a>
							<a href="#"><i className="fa-brands fa-x-twitter"></i></a>
							<a href="#"><i className="fa-brands fa-instagram"></i></a>
							<a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
						</div>
					</div>
				</div>
			</footer>
		</>


	)
}

export default Footer