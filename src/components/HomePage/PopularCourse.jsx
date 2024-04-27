import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom'; 
import './PopularCourse.css';
import apiClient from '../apiClient';
import unknown from '../assets/unknown-banner.jpg';

const PopularCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/computercourses/popular/');
        const modifiedData = response.data.map(course => {
          return {
            ...course,
            image: course.image ? `${apiClient.defaults.baseURL}${course.image}` : null
          };
        });
        setCourses(modifiedData);
      } catch(error) {
        console.error('Error fetching data', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="container mt-3 py-3">
      <div className="row text-center mb-3 mt-3">
        <h5>Start Now</h5>
        <h3>Popular Courses</h3>
        <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
      </div>
      <div className="row justify-content-center">
        {courses.map((course, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6">
            <Link to={`/courses/${course.slug}`} className="card-item mb-3 mx-2">
              <div className="image-item">
                <img className='card-img-top' src={course.image || unknown} alt={course.title} />
              </div>
              <div className="content-item px-2 mt-3">
                <h5>{course.title}</h5>
                <p><b><i className="fa-regular fa-clock"></i> Duration: </b>{course.duration}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularCourse;
