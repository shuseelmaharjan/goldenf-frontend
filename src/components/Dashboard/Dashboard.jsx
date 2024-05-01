import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { FaClipboardCheck } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import apiClient from '../apiClient';

const Dashboard = () => {
  const [examAttend, setExamAttend] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [activeExams, setActiveExams] = useState('');
  const [dueFee, setDueFee] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/user-auth/user/`);
        setUsername(response.data.username);
        setUserId(response.data.user_id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();

    const fetchDashboardData = async () => {
      try {
        const response1 = await apiClient.get(`api/count-modal-rows/${userId}/`);
        setExamAttend(response1.data.modal_count);

        const response2 = await apiClient.get(`/api/count-user-courses/${userId}/`);
        setSelectedCourse(response2.data.user_count);

        const response3 = await apiClient.get(`/api/count-ongoing-exams/`);
        setActiveExams(response3.data.ongoing_count);

        const response4 = await apiClient.get(`/api/only-due/${userId}/`);
        setDueFee(response4.data.due_amount);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    if (userId) {
      fetchDashboardData();
    }
  }, [userId]);

  return (
    <div className='main d-flex' style={{ width: '100%', height: '100vh' }}>
      <Sidebar />
      <div className="wrapper">
        <Topbar username={username} />
        <div className="main-content">
          <div className="container">
            <div className="row">
              <h5>Dashboard</h5>
            </div>
            <div className="box">
              <div className="row" id='dashboard'>
                <div className="col" id='exam-attended'>
                  <div className="row">
                    <div className="col-3">
                      <span id='exam-attended'><IoNewspaperOutline /></span>
                    </div>
                    <div className="col-9">
                      <h5>Exam Attended</h5>
                      <h6>{examAttend}</h6>
                    </div>
                  </div>
                </div>
                <div className="col" id='course-selected'>
                  <div className="row">
                    <div className="col-3">
                      <span id='course-selected'><IoBookSharp /></span>
                    </div>
                    <div className="col-9">
                      <h5>Courses Selected</h5>
                      <h6>{selectedCourse}</h6>
                    </div>
                  </div>
                </div>
                <div className="col" id='active-exams'>
                  <div className="row">
                    <div className="col-3">
                      <span id='active-exams'><FaClipboardCheck /></span>
                    </div>
                    <div className="col-9">
                      <h5>Active Exams</h5>
                      <h6>{activeExams}</h6>
                    </div>
                  </div>
                </div>
                <div className="col" id='latest-score'>
                  <div className="row">
                    <div className="col-3">
                      <span id='latest-score'><CiMoneyBill  /></span>
                    </div>
                    <div className="col-9">
                      <h5>Due Fees</h5>
                      <h6>Rs. {dueFee}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
