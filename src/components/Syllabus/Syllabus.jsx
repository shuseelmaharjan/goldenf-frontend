import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Syllabus.css';
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
const Syllabus = () => {
  const [syllabusItems, setSyllabusItems] = useState([]);

  // Simulating fetching syllabus items from an API using useEffect
  useEffect(() => {
    // Simulated syllabus data
    const syllabusData = [
      { id: 1, title: 'Syllabus Item 1', slug: 'syllabus-item-1' },
      { id: 2, title: 'Syllabus Item 2', slug: 'syllabus-item-2' },
      { id: 3, title: 'Syllabus Item 3', slug: 'syllabus-item-3' },
      { id: 4, title: 'Syllabus Item 4', slug: 'syllabus-item-4' },
      { id: 5, title: 'Syllabus Item 5', slug: 'syllabus-item-5' }
    ];

    setSyllabusItems(syllabusData);
  }, []);

  return (
    <>
    <AppNavbar/>
    <div style={{ marginTop: '120px', overflow: 'hidden' }}>
      <div className="container py-3">
        <div className="row text-center mb-3">
          <h3>Syllabus</h3>
          <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200', gap: '20px' }}></div>
        </div>
        <div className="row d-flex justify-content-start mt-3">
          <h5>Colleges by Course</h5>
        </div>
        <div className="syllabus-row">
          {syllabusItems.map(item => (
            <Link key={item.id} to={`/syllabus/${item.slug}`} className="syllabus-item">
              {item.title}
            </Link>
          ))}
        </div>
        <div className="row d-flex justify-content-start mt-3">
          <h5>Courses Syllabus</h5>
        </div>
        <div className="syllabus-row">
          {syllabusItems.map(item => (
            <Link key={item.id} to={`/syllabus/${item.slug}`} className="syllabus-item">
              {item.title}
            </Link>
          ))}
        </div>
        
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Syllabus;
