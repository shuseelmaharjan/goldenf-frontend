import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import apiClient from '../apiClient';
import unknown from '../assets/unknown-banner.jpg';
import slugify from 'slugify';
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Language = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/languagecourses/');
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
      <AppNavbar/>
      <div style={{ marginTop: '120px' }}>
        <div className="container py-3">
          <div className="row text-center mb-3">
            <h3>Language Classes</h3>
            <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
          </div>
          <div className="row justify-content-center">
            {courses.map((course, index) => (
              <div key={index} className="col-md-4 mb-3">
                <Link 
                  to={`/languages/${slugify(course.title, { lower: true })}`} 
                  className="card-item" 
                  style={{ textDecoration: 'none', color: '#000', border: '1px solid #ccc', display: 'block', borderRadius: '10px' }}
                >
                  <div className="image-item">
                    <img 
                      className="card-img-top" 
                      src={course.image || unknown} 
                      alt={course.title} 
                      style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} 
                    />
                  </div>
                  <div className="content-item px-2 mt-3">
                    <h5 className='text-center'>{course.title}</h5>
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

export default Language;
