import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../apiClient';
import unknown from '../assets/bg.jpeg'; // Import default image
import { Link } from 'react-router-dom';
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Slug.css';
const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiClient.get(`/api/courses/${slug}/`);
        setCourse(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
    window.scrollTo(0, 0); 
  }, [slug]);

  if (loading) {
    return (
      <>
        <AppNavbar/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <h2>Loading...</h2>
        </div>
        <Footer/>
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>No data found for this course.</div>;
  }

  return (
    <>
    <AppNavbar/>
    
    <div style={{ marginTop: '120px', position: 'relative', textAlign: 'center' }}>
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120px',
          background: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      {/* Image */}
      <img
        src={`${apiClient.defaults.baseURL}${course.image}` || unknown} 
        alt={course.title}
        style={{
          width: '100%',
          height: '120px', 
          objectFit: 'cover',
          marginBottom: '20px', 
        }}
      />
      <div className="container">
      <div className='breadcrumb'>
          <Link to="/">Home</Link> / <Link to="/courses">Courses</Link> / {course.title}
        </div>
      </div>
      <div className="container" style={{textAlign:'left'}}>

        <h2 style={{ color: '#333', zIndex: 1 }}>{course.title}</h2>

        <p style={{ color: '#666', marginBottom: '20px', zIndex: 1 }}><strong><i class="fa-regular fa-clock"></i> Duration:</strong>{course.duration}</p>

        <div dangerouslySetInnerHTML={{ __html: course.description }}S style={{ zIndex: 1 }}/>
      </div>

    </div>
    <Footer/>
    </>
  );
};

export default CourseDetails;
