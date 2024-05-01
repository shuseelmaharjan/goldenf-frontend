import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './CeoMessage.css';
import apiClient from '../apiClient';
import unknown from '../assets/user.avif';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await apiClient.get('/api/testimonial-list/');
      const modifiedTestimonialData = response.data.map(testimonial => ({
        ...testimonial,
        image: testimonial.image ? `${apiClient.defaults.baseURL}${testimonial.image}` : null
      }));
      setTestimonials(modifiedTestimonialData); 
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

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
    <section className="gradient-custom ceo-testimonial">
      <div className="container mb-2 py-3">
        <div className="row d-flex justify-content-center">
          <div className="row text-center mb-3 mt-3 text-white">
            <h5>Testimonials</h5>
            <h6>What Our Students says about us.</h6>
            <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: 'orange' }}></div>
            </div>

            <div className="card">
              <div className="card-body px-4 py-4">
                <Slider {...settings}>
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="carousel-item">
                      <div className="row d-flex justify-content-center">
                        <div className="col-lg-10 col-xl-8">
                          <div className="row">
                            <div className="col-lg-4 d-flex justify-content-center">
                              <img src={testimonial.image || unknown} className="rounded-circle shadow-1 mb-4 mb-lg-0" alt="testimonial avatar" width="150" height="150" />
                            </div>
                            <div className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
                              <p><i className="fas fa-quote-left fa-2x text-black"></i> {testimonial.message} <i className="fas fa-quote-right fa-2x text-black"></i></p>
                              <h4 className="mb-4">{testimonial.name}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
