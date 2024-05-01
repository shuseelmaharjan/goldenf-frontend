import React from 'react';
import './Preloader.css'; 
import image from '../assets/logo.webp';

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={image} alt="Loading..." />
    </div>
  );
};

export default Preloader;
