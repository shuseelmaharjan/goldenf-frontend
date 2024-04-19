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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae consequuntur, quaerat doloribus, eligendi hic eius numquam, error aperiam pariatur amet ullam sunt harum aspernatur. Debitis odit fuga in aliquam repellat!</p>
          </div>
          <div className="col-md-3">
            <h5>Links</h5>
            <hr className="underl" />
            <ul className="list-unstyled">
              <li><Link to={`/courses`}>Courses</Link></li>
              <li><Link to={`/courses`}>Downloads</Link></li>
              <li><Link to={`/events`}>Blogs</Link></li>
              <li><Link to={`/contact`}>Contact</Link></li>
              <li><Link to={`/online-application`}>Online Application</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <hr className="underl" />
            <ul className="list-unstyled">
              <li><i className="fa fa-phone"></i> 01-5108166</li>
              <li><i className="fa fa-envelope"></i> info@goldenfutureinstitute.com.np</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ background:'#EAEAEA', borderTop:'2px solid #ddd' }}>
        <div className="container mt-3 d-flex align-items-center">
          <p>&copy; Copyright Golden Future Institute 2023 - {currentDate}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
