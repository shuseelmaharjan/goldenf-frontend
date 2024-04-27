import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Courses.css';
import apiClient from '../apiClient';
import unknown from '../assets/unknown-banner.jpg';
import slugify from 'slugify'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/computercourses/');
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
    <>
    <Navbar/>
    <div style={{ marginTop: '120px' }}>
      <div className="container py-3">
        <div className="row text-center mb-3">
          <h3>Courses We Offer</h3>
          <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
        </div>
        <div className="row">
          {courses.map((course, index) => (
            <div key={index} className="col-md-4" style={{border:'1px solid #ccc'}}>
              <Link to={`/courses/${course.slug}`} className="card-item mb-3">
                <div className="image-item">
                  <img className='card-img-top' src={course.image || unknown} alt={course.title} />
                </div>
                <div className="content-item px-2 mt-3">
                  <h5>{course.title}</h5>
                  <p><b>Duration:</b> {course.duration}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Courses;
