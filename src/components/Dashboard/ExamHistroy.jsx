import './Dashboard.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import apiClient from '../apiClient';
import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const ExamHistory = () => {
  const [attendedExams, setAttendedExams] = useState([]);
  const [examStatusList, setExamStatusList] = useState([]);
  const [examResultsList, setExamResultsList] = useState([]);
  const [userId, setUserId] = useState('');

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
        console.log('Fetching exam results for examId:', examId, 'and setId:', setId);
        const response = await apiClient.get(`/api/validate_answer/${examId}/${setId}/${userId}/`);
        console.log('Exam results response:', response.data);
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
                  </tr>
                </thead>
                <tbody>
                  {attendedExams.map((exam, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{exam.ended_date ? formatDates(exam.ended_date) : 'N/A'}</td>
                      <td>{examStatusList[index]}</td>
                      <td>{examResultsList[index] && examResultsList[index].total_true_count}</td>
                      <td>{examResultsList[index] && examResultsList[index].total_false_count}</td>
                      <td>
                        {examResultsList[index] && `${((examResultsList[index].total_true_count / 40) * 100).toFixed(2)}%`}
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

export default ExamHistory;
