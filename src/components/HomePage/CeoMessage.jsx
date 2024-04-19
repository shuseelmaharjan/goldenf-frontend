import React from 'react';
import './CeoMessage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CEO from '../assets/admin.jpg'

const CeoMessage = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000, 
    cssEase: "linear",
    centerMode: true, 
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="ceo-message-container" style={{ overflow: 'hidden' }}>
      <div className="container-fluid py-3 mt-3">
      <div className="container">
        <div className="row ceo-row">
          <div className="col-lg-6 d-flex justify-content-end mb-3">
            <img src={CEO} style={{ maxWidth: '100%', height: 'auto' }} alt="ceo" />
          </div>
          <div className="col-lg-6 d-flex flex-column align-items-center">
            <h3 style={{textAlign:'left', color:'#000'}}>Sanat Basnet</h3>
            <div className='underline'></div>
            <h6 style={{color:'#000'}}>CEO | Golden Future Institute</h6>
            <p className='text-center' style={{color:'#000'}}>“With a passion for technology and a dedication to teaching, Golden Future Institute has helped countless students achieve their goals in the field of computer training.”</p>
          </div>
        </div>
      </div>
      </div>
      <div className="container py-4">
        <div className="row text-center">
          <h2 style={{fontSize:'4rem'}}><i className="fa-solid fa-users-line"></i></h2>
          <h3 className='text-center'>Testimonials</h3>
          <p className='text-center'>What our students say about our institute.</p>
        </div>
        <Slider {...settings}>
          {data.map((testimonial, index) => (
            <div key={index} className="testimonial my-3 d-flex">
              <span className="open quote">“</span>
              <div className="image">
                <div className="clip"></div>
                <img src={testimonial.image} alt='testimonial' />
              </div>
              <p>{testimonial.message}</p>
              <div className="source">		
                <span>{testimonial.name}</span>
              </div>
              <span className="close quote">”</span>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const data = [
  {
    name: 'Mr. Manish Kumar Tamang',
    image: 'https://broadwayinfosys.com/uploads/testimonials/1712827974.jpg',
    message:'However, if someone isn’t happy with you using their full name, they might consent to their initials being used. ',
  },
  {
    name: 'Ms. Manisha Tamang',
    image: 'https://www.shutterstock.com/shutterstock/photos/1554086789/display_1500/stock-photo-close-up-portrait-of-yong-woman-casual-portrait-in-positive-view-big-smile-beautiful-model-posing-1554086789.jpg',
    message:'The problem with testimonial pages is that they (quite understandably) stink of marketing. ',
  }
];

export default CeoMessage;
