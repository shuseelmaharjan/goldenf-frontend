import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap'; 
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import apiClient from '../apiClient';
import ExamData from './ExamData'; 

const ExamHistory = () => {
  const [attendedExams, setAttendedExams] = useState([]);
  const [examStatusList, setExamStatusList] = useState([]);
  const [examResultsList, setExamResultsList] = useState([]);
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`/user-auth/user/`);
        setUserId(response.data.user_id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();

    const fetchExamStatus = async (examId) => {
      try {
        const response = await apiClient.get(`/api/exam/${examId}/status/`);
        return response.data.status;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const fetchExamResults = async (examId, setId) => {
      try {
        const response = await apiClient.get(`/api/validate_answer/${examId}/${setId}/${userId}/`);
        return response.data;
      } catch (error) {
        console.error('Error fetching exam results:', error);
        return null;
      }
    };

    const fetchExamHistory = async () => {
      try {
        if (userId) {
          const response = await apiClient.get(`/api/get-attended-exams/${userId}/`);
          setAttendedExams(response.data.modals);

          const statusPromises = response.data.modals.map(exam => fetchExamStatus(exam.exam));
          const statuses = await Promise.all(statusPromises);
          setExamStatusList(statuses);

          const resultsPromises = response.data.modals.map(exam => fetchExamResults(exam.exam, exam.set));
          const results = await Promise.all(resultsPromises);
          setExamResultsList(results);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchExamHistory();
  }, [userId]);

  const formatDates = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      const options = { hour12: true, hour: 'numeric', minute: 'numeric' };
      const time = date.toLocaleTimeString('en-US', options);
      return `Today at ${time}`;
    } else {
      const options = { month: 'long', day: 'numeric', year: 'numeric', hour12: true, hour: 'numeric', minute: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  };

  const handleViewReport = (index) => {
    setSelectedExam(attendedExams[index]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='main d-flex' style={{ width: '100%', height: '100vh' }}>
      <Sidebar />
      <div className="wrapper">
        <Topbar />
        <div className="main-content">
          <div className="container">
            <div className="row">
              <h5>View Exam History</h5>
            </div>
            <div className="box">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>S.N.</th>
                    <th>Exam Date</th>
                    <th>Status</th>
                    <th>Total Correct</th>
                    <th>Total Incorrect</th>
                    <th>Score</th>
                    <th>Report</th>
                  </tr>
                </thead>
                <tbody>
                  {[...attendedExams].reverse().map((exam, index) => (
                    <tr key={index}>
                      <td>{attendedExams.length - index}</td> 
                      <td>{exam.ended_date ? formatDates(exam.ended_date) : 'N/A'}</td>
                      <td>{examStatusList[attendedExams.length - 1 - index]}</td>
                      <td>{examResultsList[attendedExams.length - 1 - index] && examResultsList[attendedExams.length - 1 - index].total_true_count}</td>
                      <td>{examResultsList[attendedExams.length - 1 - index] && examResultsList[attendedExams.length - 1 - index].total_false_count}</td>
                      <td>
                        {examResultsList[attendedExams.length - 1 - index] && `${((examResultsList[attendedExams.length - 1 - index].total_true_count / 40) * 100).toFixed(2)}%`}
                      </td>
                      <td>
                        <Button variant="primary" onClick={() => handleViewReport(attendedExams.length - 1 - index)}>View Report</Button> 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>View Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExamData userId={userId} setId={selectedExam.set} examId={selectedExam.exam} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ExamHistory;
