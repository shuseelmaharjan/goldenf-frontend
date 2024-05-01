import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom'; 
import './PopularCourse.css';
import apiClient from '../apiClient';
import unknown from '../assets/unknown-banner.jpg';
import Slider from "react-slick";

const PopularCourse = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/computercourses/');
        const modifiedData = response.data.map(course => {
          return {
            ...course,
            image: course.image ? `${apiClient.defaults.baseURL}${course.image}` : null
          };
        });
        setCourses(modifiedData);
        setIsLoading(false);
        window.scrollTo(0, 0); // Scroll to the top when data is loaded
      } catch(error) {
        console.error('Error fetching data', error);
        setIsLoading(false);
      }
    };
  
    fetchData();
    
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000, 
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };

  return (
    <div className="container py-3 mt-3">
      <div className="row text-center mb-3">
        <h5>Certificate</h5>
        <h3>Courses We Offer</h3>
        <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
      </div>

      {isLoading ? (
        <div className="preloader">
          <div className="preloader-item" style={{ background: '#ddd', height: '180px' }}></div>
          <div className="preloader-item" style={{ background: '#3e3e3e', height: '60px' }}></div>
          <div className="preloader-item" style={{ background: '#3e3e3e', height: '60px' }}></div>
        </div>
      ) : (
        <div className="slider-container" style={{ overflow: 'hidden' }}>
          <Slider {...settings}>
            {courses.map((course, index) => (
              <div key={index} className="card-item mb-3">
                <Link to={`/courses/${course.slug}`} className="link" style={{ textDecoration: 'none', color: '#000' }}>
                  <div className="image-item" style={{ height: '180px', overflow: 'hidden' }}>
                    <img src={course.image || unknown} alt={course.title} style={{ width:'100%', height: '100%', objectFit: 'cover' }}/>
                  </div>
                  <div className="content-item px-2 mt-3">
                    <h5 className='text-center'>{course.title}</h5>
                    <p><b><i className="fa-regular fa-clock"></i> Duration: </b>{course.duration}</p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}

export default PopularCourse;
