import React, { useState, useEffect } from 'react';
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './BridgeCourse.css';
import apiClient from '../apiClient';
import { Link } from 'react-router-dom';

const BridgeCourse = () => {
  const [showDescription, setShowDescription] = useState({});
  const [bridgeCourseData, setBridgeCourseData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/bridge-courses/');
        setBridgeCourseData(response.data);
        const initialShowDescriptionState = {};
        response.data.forEach(item => {
          initialShowDescriptionState[item.id] = false;
        });
        setShowDescription(initialShowDescriptionState);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
    window.scrollTo(0, 0); 
  }, []);

  const toggleDescription = id => {
    setShowDescription(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/get-random-ads2/');
        setAdData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <AppNavbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <h2>Loading...</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AppNavbar />
      <div style={{ marginTop: '120px' }}>
        <div className="container py-3">
          <div className="row text-center mb-3">
            <h3>Bridge Course</h3>
            <div
              className="underline"
              style={{
                width: '50px',
                height: '5px',
                margin: '0 auto',
                backgroundColor: '#f29200'
              }}
            ></div>
          </div>
          <div className="row">
            <div className="col-lg-9">
              {bridgeCourseData.map(course => (
                <div key={course.id} className="mb-3">
                  <div
                    className={`shadow bridge-course-card ${
                      showDescription[course.id] ? 'expanded' : ''
                    }`}
                  >
                    <div
                      className="row d-flex justify-content-between align-items-center"
                      onClick={() => toggleDescription(course.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="col-auto">
                        <h4>{course.title}</h4>
                      </div>
                      <div className="col-auto">
                        <i
                          className={`fa-solid fa-arrow-${
                            showDescription[course.id] ? 'down' : 'up'
                          }`}
                        ></i>
                      </div>
                    </div>
                    {showDescription[course.id] && (
                      <div className="row mt-3">
                        <div className="col">
                          <p dangerouslySetInnerHTML={{ __html: course.description }}></p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-3">
              {adData.map((item, index) => (
                <div key={index} className="row mb-3">
                  <Link to={item.link}>
                    <img src={`${apiClient.defaults.baseURL}${item.image}`} alt={item.title} className="img-fluid" style={{ width: '100%' }}/>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BridgeCourse;
