import React from 'react';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  const currentDate = new Date().getFullYear(); 

  return (
    <footer className='footer' style={{ background:'#F5F5F3', borderTop:'2px solid #ddd' }}>
      <div className="container mt-3">
        <div className="row d-flex justify-content-between">
          <div className="col-md-3">
            <h5>About Golden Future Institute</h5>
            <p style={{ color: '#333' }}>Golden Future Institute, nestled in the heart of Chandragiri-11, Satungal Kathmandu, stands as a beacon of educational excellence. Our institute... <br /><Link to={'/about-us'} style={{ color: '#333' }}>Read More</Link></p>
          </div>
          <div className="col-md-3">
            <h5>Links</h5>
            <hr className="underl" />
            <ul className="list-unstyled">
              <li><Link to={`/`} style={{ color: '#333' }}>Home</Link></li>
              <li><Link to={`/courses`} style={{ color: '#333' }}>Courses</Link></li>
              <li><Link to={`/downloads`} style={{ color: '#333' }}>Downloads</Link></li>
              <li><Link to={`/events`} style={{ color: '#333' }}>Blogs</Link></li>
              <li><Link to={`/contact`} style={{ color: '#333' }}>Contact</Link></li>
              <li><Link to={`/online-application`} style={{ color: '#333' }}>Online Application</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <hr className="underl" />
            <ul className="list-unstyled">
              <li><i className="fa fa-phone"></i> <span style={{ color: '#333' }}>
              <a href="tel:+977-01-5108166" style={{ textDecoration: 'none', color: 'black',  marginLeft:'10px' }}>01-5108166</a>,
                <a href="tel:+977-9813940696" style={{ textDecoration: 'none', color: 'black'}}>9813940696</a>
                </span></li>
              <li><i className="fa fa-envelope"></i> <span style={{ color: '#333' }}><a href="mailto:goldenfutureinstitute1@gmail.com" style={{ textDecoration: 'none', color: 'black', marginLeft:'10px' }}>goldenfutureinstitute1@gmail.com</a></span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ background:'#EAEAEA', borderTop:'2px solid #ddd' }}>
        <div className="container mt-3 d-flex align-items-center">
          <p style={{ color: '#333' }}>&copy; Copyright Golden Future Institute 2023 - {currentDate}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
