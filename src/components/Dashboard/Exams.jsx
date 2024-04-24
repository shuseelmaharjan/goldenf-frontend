import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import apiClient from '../apiClient';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

const Exams = () => {
  const [examSchedules, setExamSchedules] = useState([]);
  const userId = localStorage.getItem('user_id'); // Retrieve userId from localStorage

  useEffect(() => {
    const fetchExamSchedules = async () => {
      try {
        const response = await apiClient.get('api/ongoing-exam-schedules/');
        setExamSchedules(response.data);
      } catch (error) {
        console.error('Error fetching exam schedules:', error);
      }
    };

    fetchExamSchedules();

    return () => {
    };
  }, []); 

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const handleJoinExam = async (examId, setId, True) => {
    try {
      await apiClient.post('api/modal/exam-join/', {
        exam: examId,
        set: setId,
        user: userId,
        is_active: True
      });
    } catch (error) {
      console.error('Error joining exam:', error);
    }
  };

  return (
    <div className='main d-flex' style={{ width: '100%', height: '100vh' }}>
      <Sidebar />
      <div className="wrapper">
        <Topbar />
        <div className="main-content">
          <div className="container" style={{ padding: '0' }}>
            <div className="row d-flex justify-content-between">
                <div className="col-auto">
                    <h5>Exams</h5>
                </div>
                <div className="col-auto">
                    <button className='btn btn-sm btn-primary'>View History</button>
                </div>
            </div>
            <div className="box px-2 py-2 mt-3">
              <Table>
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Scheduled At</th>
                    <th>Status</th>
                    <th>Set</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {examSchedules.map((exam, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{formatDate(exam.schedule_date)}</td> 
                      <td>{exam.status}</td>
                      <td>{exam.set.id}</td>
                      <td>
                        <Link to={`/exam/${exam.slug}`} className='btn btn-success btn-sm' onClick={() => handleJoinExam(exam.id, exam.set.id, true)}>Join Now</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exams;
