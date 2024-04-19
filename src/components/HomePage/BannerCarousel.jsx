import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.jpg';
import banner3 from '../assets/images/banner3.jpg';
import './BannerCarousel.css'; 

const BannerCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, 
    adaptiveHeight: true,
    centerPadding: '0px', // Add center padding
  };
  

  return (
    <div className="banner-carousel-container"> {/* Add a container div */}
      <Slider {...settings}>
        <div className="slide-item">
          <img src={banner1} alt="Banner 1" />
          <div className="overlay-text">Your Overlay Text Here</div>
        </div>
        <div className="slide-item">
          <img src={banner2} alt="Banner 2" />
          <div className="overlay-text">Your Overlay Text Here</div>
        </div>
        <div className="slide-item">
          <img src={banner3} alt="Banner 3" />
          <div className="overlay-text">Your Overlay Text Here</div>
        </div>
      </Slider>
    </div>
  );
};

export default BannerCarousel;
