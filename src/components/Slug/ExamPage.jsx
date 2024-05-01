import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import apiClient from '../apiClient';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Questions from './Questions';

const ExamPage = () => {
  const location = useLocation();
  const examSlug = location.pathname.split('/').pop();
  const [examId, setExamId] = useState('');
  const [setId, setSetId] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [examData, setExamData] = useState('');
  const [selectedButton, setSelectedButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [result, setResult] = useState('');
  const [timeLeft, setTimeLeft] = useState(60*60);
  const [nullCount, setNullCount] = useState('');

  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`/user-auth/user/`);
        setUserId(response.data.user_id);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchUserData();
  }, []); 
  

  const fetchExamData = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/fetch-modal-data/${examId}/${userId}/`);
      setExamData(response.data);
    } catch (error) {
      console.error('Error fetching exam data:', error);
    }
  }, [examId, userId]);

  const submitForm = useCallback(async () => {
    try {
      const formData = {
        is_active: false
      };
      const response = await apiClient.put(`/api/end-exam/${examId}/${userId}/`, formData);

      console.log('Form submitted successfully:', response.data);
      setIsActive(false);

      const updatedResult = await apiClient.get(`/api/validate_answer/${examId}/${setId}/${userId}/`);
      setResult(updatedResult.data);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }, [examId, setId, userId]);

  const fetchNullCount = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/fetch-null-count/${userId}/${examId}/`);
      setNullCount(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }, [examId, userId]); 

  useEffect(() => {
    if (examId && userId) {
      fetchExamData();
    }
  }, [examId, userId, isModalOpen, fetchExamData]);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        if (userId) {
        const response = await apiClient.get(`/api/fetch-schedule-details/${examSlug}/`);
        setExamId(response.data.id);
        setSetId(response.data.set_id);

        const userResponse = await apiClient.get(`/api/check-exam-status/${userId}/${response.data.id}/`);
        setIsActive(userResponse.data.is_active);
        }
      } catch (error) {
        console.error('Error fetching exam details:', error);
      }
      
    };

    fetchExamDetails();
  }, [examSlug, userId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1); 
      } else {
        submitForm();
      }
    }, 1000); 
  
    return () => clearTimeout(timer);
  }, [timeLeft, submitForm]);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  const handlePreviousButton = () => {
    if (selectedButton > 1) {
      setSelectedButton(selectedButton - 1);
    }
  };

  const handleCloseModal = () => {
    setSelectedButton(null);
    setIsModalOpen(false);
    fetchNullCount();
    fetchExamData(); 
  };

  const handleNextButton = () => {
    if (selectedButton < 40) {
      setSelectedButton(selectedButton + 1);
    }
  };

  useEffect(() => {
    const validateAnswer = async () => {
      try {
        const response = await apiClient.get(`/api/validate_answer/${examId}/${setId}/${userId}/`);
        setResult(response.data);
      } catch (error) {
        console.error('Error', error);
      }
    };

    if (examId && userId && setId) {
      validateAnswer();
    }
  }, [examId, userId, setId]);

  return (
    <>
      {isActive ? (
        <>
          <div className='container-fluid'>
            <div className="row px-3 py-3 text-white" style={{ background: '#16A085' }}>
              <div className="col-auto"><h3>EPS TOPIK Trial Exam</h3></div>
            </div>
          </div>
          <div className="container my-3 mt-3">
            <div className="row d-flex justify-content-between py-2" style={{ background: '#16A085', color: 'white' }}>
              <div className="col-auto">
                <strong>Total Questions: 40</strong>
              </div>
              <div className="col-auto">
              <strong>Remaining Questions: {nullCount.null_counts}</strong>
              </div>

              <div className="col-auto">
                <strong>Time Left: {minutes} minutes, {seconds} seconds</strong>
              </div>
            </div>
          </div>
          <div className="container py-3">
            <div className="box">
              <div className="row">
                <div className="col-md-6 mt-3">
                  <div className="row">
                    <div className="col" style={{background:'#F5B041', textAlign:'center', alignItems:'center', marginRight:'5px' }}>
                      <p style={{fontSize:'1.1rem', fontWeight:'600',}} className='mt-3'>Listening Questions</p>
                    </div>
                    <div className="button-container" style={{ border:'1px solid #ccc', padding:'5px', display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:'10px'}}>
                      {Array.from({ length: 20 }, (_, index) => index + 1).map((number) => (
                        <button 
                          key={number} 
                          className="question-button py-2" 
                          style={{
                            background: examData[`qn${number}`] !== null ? '#45B39D' : 'none',
                            border:'1px solid #99A3A4', 
                            borderRadius:'5px'
                          }}
                          onClick={() => handleButtonClick(number)}
                        >
                          {number}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="row">
                    <div className="col" style={{background:'#F5B041', textAlign:'center', alignItems:'center', marginLeft:'5px' }}>
                      <p style={{fontSize:'1.1rem', fontWeight:'600'}} className='mt-3'>Reading Questions</p>
                    </div>
                    <div className="button-container" style={{ border:'1px solid #ccc', padding:'5px', display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:'10px'}}>
                      {Array.from({ length: 20 }, (_, index) => index + 21).map((number) => (
                        <button 
                          key={number} 
                          className="question-button py-2" 
                          style={{
                            background: examData[`qn${number}`] !== null ? '#45B39D' : 'none',
                            border:'1px solid #99A3A4', 
                            borderRadius:'5px'
                          }}
                          onClick={() => handleButtonClick(number)}
                        >
                          {number}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3 d-flex justify-content-end">
                <div className="col-auto">
                  <button className='btn btn-primary' onClick={submitForm}>Submit Answers</button>
                </div>
              </div>
            </div>

            <Modal show={selectedButton !== null} onHide={handleCloseModal} size='xl' keyboard={false} backdrop="static" style={{ height: '100vh' }}>
              <Modal.Header className='d-flex justify-content-between'>

                    <div className="col-auto">
                    Question: {selectedButton}
                    </div>
                  <div className="col-auto">
                  Time Left: {minutes} minutes, {seconds} seconds
                  </div>
              </Modal.Header>
              <Modal.Body>
                <Questions userId={userId} examId={examId} setId={setId} selectedButton={selectedButton}/>
              </Modal.Body>
              <Modal.Footer className='d-flex justify-content-between'>
                <Button variant="primary" onClick={handlePreviousButton}>
                  Previous
                </Button>
                <Button variant="primary" onClick={handleCloseModal}>
                  Total Questions
                </Button>
                <Button variant="primary" onClick={handleNextButton}>
                  Next
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      ) : (
        <>
        <div className="container-fluid py-3 d-flex justify-content-between" style={{background:'#117A65'}}>
        <div className="col-auto" style={{color:'#fff', fontWeight:'600'}}>Golden Future Institute</div>
        <div className="col-auto" style={{color:'#fff', fontWeight:'600'}}>
              {username}
            </div>
        </div>
        <div className="container mt-3">
          <div className="row py-3 px-3" style={{background:'#117A65', color:'#fff'}}>
            <div className="col-auto">
            View Result
            </div>
          </div>
          <div className="box">
            <div className="row">
              <div className="col-auto">
              <span>You Scored {result.total_true_count} </span>
              </div>
            </div>
            <div className="row">
              <Link to={'/dashboard'}>Back to Dashboard</Link>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}

export default ExamPage;
