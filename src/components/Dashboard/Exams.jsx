import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import apiClient from '../apiClient';
import { Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ExamData from './ExamData';

const Exams = () => {
  const [examSchedules, setExamSchedules] = useState([]);
  const [examExist, setExamExist] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [userId, setUserId] = useState('');
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [selectedSetId, setSelectedSetId] = useState(null);

  console.log(modalContent);
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

    const fetchExamSchedules = async () => {
      try {
        const response = await apiClient.get('/api/ongoing-exam-schedules/');
        setExamSchedules(response.data);
      } catch (error) {
        console.error('Error fetching exam schedules:', error);
      }
    };

    fetchExamSchedules();

    return () => {};
  }, []);

  useEffect(() => {
    const fetchExamExist = async () => {
      try {
        if (userId) {
          await Promise.all(
            examSchedules.map(async (exam) => {
              const response = await apiClient.get(`/api/check-attempt-exam/${exam.id}/${userId}/`);
              setExamExist((prevState) => ({
                ...prevState,
                [exam.id]: response.data.exists,
              }));
            })
          );
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchExamExist();
  }, [examSchedules, userId]);


  const handleJoinExam = async (examId, setId, True) => {
    try {
      await apiClient.post('/api/modal/exam-join/', {
        exam: examId,
        set: setId,
        user: userId,
        is_active: True,
      });
    } catch (error) {
      console.error('Error joining exam:', error);
    }
  };

  const handleCheckResult = async (examId, setId, userId) => {
    try {
      const [validateResponse, modalDateResponse] = await Promise.all([
        apiClient.get(`/api/validate_answer/${examId}/${setId}/${userId}/`),
        apiClient.get(`/api/modal-date/${userId}/${setId}/${examId}/`)
      ]);

      setModalContent({
        validateResponse: validateResponse.data,
        modalDateResponse: modalDateResponse.data
      });
      setSelectedExamId(examId);
      setSelectedSetId(setId);
      setModalShow(true);
    } catch (error) {
      console.error('Error checking result:', error);
    }
  };

  const formatDate = (dateString) => {
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
    <div className="main d-flex" style={{ width: '100%', height: '100vh' }}>
      <Sidebar />
      <div className="wrapper">
        <Topbar />
        <div className="main-content">
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="col-auto">
                <h5>Exams</h5>
              </div>
              <div className="col-auto">
                <Link className='btn btn-sm' to={'/exam/examhistory'}>View History</Link>
              </div>
            </div>
            <div className="box px-2 py-2 mt-3">
              <Table>
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Scheduled At</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {examSchedules.map((exam, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{formatDate(exam.schedule_date)}</td>
                      <td>{exam.status}</td>
                      <td>
                        {examExist[exam.id] ? (
                          <button className="btn btn-sm btn-info" onClick={() => handleCheckResult(exam.id, exam.set.id, userId)}>
                            Check Result
                          </button>
                        ) : (
                          <Link to={`/exam/${exam.slug}`} className="btn btn-success btn-sm" onClick={() => handleJoinExam(exam.id, exam.set.id, true)}>
                            Join Now
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExamId && selectedSetId && (
            <ExamData userId={userId} setId={selectedSetId} examId={selectedExamId} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Exams;
