import React from 'react';
import './CeoMessage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CEO from '../assets/admin.jpg'

const CeoMessage = () => {
  return (
    <div className="ceo-message-container" style={{ overflow: 'hidden' }}>
      <div className="container-fluid py-3 mt-3">
        <div className="container">
          <div className="row ceo-row">
            <div className="col-lg-6 d-flex justify-content-end mb-3">
              <img src={CEO} style={{ maxWidth: '100%', height: 'auto' }} alt="ceo" />
            </div>
            <div className="col-lg-6 d-flex flex-column align-items-center">
              <h3 style={{ textAlign: 'left', color: '#000' }}>Sanat Basnet</h3>
              <div className='underline'></div>
              <h6 style={{ color: '#000' }}>CEO | Golden Future Institute</h6>
              <p className='text-center' style={{ color: '#000' }}>“With a passion for technology and a dedication to teaching, Golden Future Institute has helped countless students achieve their goals in the field of computer training.”</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeoMessage;
