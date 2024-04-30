import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Syllabus.css';
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import apiClient from '../apiClient';

const Syllabus = () => {
  const [syllabusItems, setSyllabusItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/get-all-syllabus/');
        setSyllabusItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AppNavbar />
      <div style={{ marginTop: '120px', overflow: 'hidden' }}>
        <div className="container py-3">
          <div className="row text-center mb-3">
            <h3>Syllabus</h3>
            <div
              className="underline"
              style={{
                width: '50px',
                height: '5px',
                margin: '0 auto',
                backgroundColor: '#f29200',
                gap: '20px',
              }}
            ></div>
          </div>

          <div className="row d-flex justify-content-start mt-3">
            <h5>Courses Syllabus</h5>
          </div>
          <div className="syllabus-row">
            {syllabusItems.map((item) => (
              <Link
                key={item.id}
                to={`/syllabus/${item.slug}`}
                className="syllabus-item"
              >
                {item.coursetitle}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Syllabus;
