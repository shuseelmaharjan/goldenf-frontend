import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './PopularCourse.css';

const IconsCarousel = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 8, 
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000, 
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }
    ],

  };

  return (
    <div className="container py-3 mt-3" style={{ overflow: 'hidden' }}>
      <div className="row text-center mb-3">
        <h5>Get Ahead With Our Master</h5>
        <h3>Master Programs</h3>
        <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
      </div>
      <Slider {...settings}>
        {data.map((course, index) => (
          <div  key={index} className="software-logo mb-3 mt-3" style={{border:'1px solid #ccc'}}>
            <div className="image-item">
                <img className='card-img-top' src={course.image} alt={course.title} style={{ height: '100px', width:'100px', objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const data = [
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/2101px-Adobe_Photoshop_CC_icon.svg.png',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/2101px-Adobe_Illustrator_CC_icon.svg.png',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Word_%282019%E2%80%93present%29.svg.png',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/1101px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png',
  }, 
  {
    image:'https://1000logos.net/wp-content/uploads/2020/08/Microsoft-PowerPoint-Logo-2013-2018.jpg',
  }, 
  {
    image:'https://www.bhphotovideo.com/images/images2000x2000/corel_esdcdgssub1yama_coreldraw_graphics_suite_365_day_1774925.jpg',
  }, 
  {
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/2101px-Adobe_Premiere_Pro_CC_icon.svg.png',
  }
];

export default IconsCarousel;
