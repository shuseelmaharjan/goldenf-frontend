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
  const [loading, setLoading] = useState(true); 
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
        setLoading(false); 
      } catch(error) {
        console.error('Error fetching data', error);
      }
    };
  
    fetchData();
    window.scrollTo(0, 0); 
  }, []);

  if (loading) {
    return (
      <>
        <Navbar/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <h2>Loading...</h2>
        </div>
        <Footer/>
      </>
    );
  }

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
              <div key={index} className="col-md-4 mb-3">
                <Link 
                  to={`/courses/${course.slug}`} 
                  className="card-item" 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#000', 
                    border: '1px solid #ccc', 
                    display: 'block', 
                    borderRadius: '10px',
                    transition: 'box-shadow 0.3s',
                    boxShadow: hoveredIndex === index ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none' 
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="image-item">
                    <img 
                      className="card-img-top" 
                      src={course.image || unknown} 
                      alt={course.title} 
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} 
                    />
                  </div>
                  <div className="content-item px-2 mt-3">
                    <h5 className='text-center'>{course.title}</h5>
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
  );
}

export default Courses;
