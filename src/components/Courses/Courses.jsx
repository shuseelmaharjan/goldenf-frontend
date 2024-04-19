import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Courses.css';
import apiClient from '../apiClient';
import unknown from '../assets/unknown-banner.jpg';
import slugify from 'slugify'; 

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('api/computercourses/');
        const modifiedData = response.data.map(course => {
          const slug = slugify(course.title, { lower: true });
          return {
            ...course,
            slug: slug, 
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
    <div style={{ marginTop: '120px' }}>
      <div className="container py-3">
        <div className="row text-center mb-3">
          <h3>Courses We Offer</h3>
          <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
        </div>
        <div className="wrapper">
          {courses.map((course, index) => (
            <Link key={index} to={`/courses/${slugify(course.title, { lower: true })}`} className="card-item mb-3 mx-2"> {/* Link to course details page */}
              <div className="image-item">
                <img className='card-img-top' src={course.image || unknown} alt={course.title} />
              </div>
              <div className="content-item px-2 mt-3">
                <h5>{course.title}</h5>
                <p><b><i className="fa-regular fa-clock"></i> Duration: </b>{course.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Courses;
