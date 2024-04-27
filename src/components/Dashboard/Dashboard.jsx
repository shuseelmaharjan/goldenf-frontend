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
  const userId = localStorage.getItem('userId');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [activeExams, setActiveExams] = useState('');
  const [dueFee, setDueFee] = useState('');
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`api/count-modal-rows/${userId}/`);
        setExamAttend(response.data.modal_count);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();


    const userSelectedCourse = async() =>{
      try{
        const courses = await apiClient.get(`/api/count-user-courses/${userId}/`);
        setSelectedCourse(courses.data.user_count);
      }catch(error){
        console.error('Error', error);
      }
    };
    userSelectedCourse();

    const ongoingExams = async() =>{
      try{
        const examActive = await apiClient.get(`/api/count-ongoing-exams/`);
        setActiveExams(examActive.data.ongoing_count);
      }catch(error){
        console.error('Error', error);
      }
    };
    ongoingExams();

    const dueFees =async() =>{
      try{
        const dueResponse = await apiClient.get(`/api/only-due/${userId}/`);
        setDueFee(dueResponse.data.due_amount);
      }catch(error){
        console.error('error', error);

      }
    };
    dueFees();

  }, [userId]);


  return (
    <div className='main d-flex' style={{ width: '100%', height: '100vh' }}>
      <Sidebar />
      <div className="wrapper">
        <Topbar />
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
