import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Card } from 'react-bootstrap';
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
      <div className="row">
        {courses.map((course, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <Card style={{ paddingBottom:'15px'}} className="popular-course-card">
            <span style={{margin:'0px', position:'absolute', zIndex:'1', right:'0', padding:'10px 15px', background:'#f29200', color:'#fff', fontSize:'1rem', fontWeight:'600'}}>Popular</span>
              <Link to={`/courses/${course.slug}`} className="card-link" style={{textDecoration:'none', color:'#000'}}>
                <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                  <Card.Img variant="top" src={course.image || unknown} alt={course.title} style={{ width: '100%',  }} />
                </div>
                <Card.Body style={{ height: '100px', overflow: 'hidden' }}>
                  <Card.Title style={{ height: '50px', overflow: 'hidden', textAlign:'center' }}>{course.title}</Card.Title>
                  <Card.Text>
                    <b><i className="fa-regular fa-clock"></i> Duration: </b>{course.duration}
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularCourse;
