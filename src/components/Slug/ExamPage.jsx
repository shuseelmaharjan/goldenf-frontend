import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../apiClient';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ExamPage.css';

const ExamPage = () => {
  const location = useLocation();
  const slug = location.pathname.split('/').pop(); 
  const [username, setUsername] = useState('');
  const [buttonNumber, setButtonNumber] = useState(null); 
  const [currentModalButton, setCurrentModalButton] = useState(null); 
  const [setNumber, setSetNumber] = useState(null); 
  const [examId, setExamId] = useState(null);
  const [questionData, setQuestionData] = useState(null); 
  const[examData, setExamData] = useState([]);

  const [isPlaying, setIsPlaying] = useState({
    audio1: false,
    audio2: false,
    audio3: false,
    audio4: false
  });
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const userId = localStorage.getItem('user_id');

  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  
    const fetchSetNumber = async () => {
      try {
        const response = await apiClient.get(`api/get-set/${slug}/`);
        setExamId(response.data.id);
        setSetNumber(response.data.set);
      } catch (error) {
        console.error('Error fetching set number:', error);
      }
    };
  
    fetchSetNumber();
  
  }, [slug]);



  const fetchExamData = async () => {
    try {
      const response = await apiClient.get(`api/fetch-modal-data/${examId}/${userId}/`);
      setExamData(response.data);
    } catch (error) {
      console.error('Error fetching exam data:', error);
    }
  };
  
  useEffect(() => {
    if (examId && userId) {

    }
  }, [examId, userId]);
  

  useEffect(() => {
    const fetchQuestionData = async () => {
      if (currentModalButton !== null) {
        try {
          const response = await apiClient.get(`api/fetch-question/${setNumber}/${currentModalButton}/`);
          setQuestionData(response.data);
        } catch (error) {
          console.error('Error fetching question data:', error);
        }
      }
    };

    fetchQuestionData();
  }, [currentModalButton, setNumber]);

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 20; i += 5) {
      const buttonGroup = [];
      for (let j = i; j < i + 5; j++) {
        const question = `qn${j}`;
        const isActive = examData && examData[question] !== null;
        const buttonStyle = {
          width: '100%',
          height: '100%',
          backgroundColor: isActive ? 'orange' : 'blue',
        };
        buttonGroup.push(
          <div key={j} className="col mt-3">
            <button
              className='btn btn-primary'
              style={buttonStyle}
              onClick={() => handleButtonClick(j)}
            >
              {j}
            </button>
          </div>
        );
      }
      buttons.push(<div key={i} className="row">{buttonGroup}</div>);
    }
    return buttons;
  };
  
  const renderListening = () => {
    const buttons = [];
    for (let i = 21; i <= 40; i += 5) {
      const buttonGroup = [];
      for (let j = i; j < i + 5; j++) {
        const question = `qn${j}`;
        const isActive = examData && examData[question] !== null;
        const buttonStyle = {
          width: '100%',
          height: '100%',
          backgroundColor: isActive ? 'orange' : 'blue',
        };
        buttonGroup.push(
          <div key={j} className="col mt-3">
            <button
              className='btn btn-primary'
              style={buttonStyle}
              onClick={() => handleButtonClick(j)}
            >
              {j}
            </button>
          </div>
        );
      }
      buttons.push(<div key={i} className="row">{buttonGroup}</div>);
    }
    return buttons;
  };
  
  
  const handleCloseModal = () => {
    setButtonNumber(null); 
    setCurrentModalButton(null); 
    fetchExamData(); 
    renderButtons();
    renderListening(); 
  };
  
  const handleButtonClick = (number) => {
    setButtonNumber(number); 
    setCurrentModalButton(number); 
  };

  const handleNextButton = () => {
    if (currentModalButton < 40) {
      setCurrentModalButton(currentModalButton + 1);
    }
  };

  const handlePreviousButton = () => {
    if (currentModalButton > 1) {
      setCurrentModalButton(currentModalButton - 1);
    }
  };

  function togglePlayPause(audioId) {
    const audio = document.getElementById(audioId);
    const allAudio = document.querySelectorAll('audio');
    
    allAudio.forEach((aud) => {
      if (aud !== audio) {
        aud.pause();
        setIsPlaying(prevState => ({ ...prevState, [aud.id]: false }));
      }
    });
  
    if (audio.paused) {
      audio.play();
      setIsPlaying(prevState => ({ ...prevState, [audioId]: true }));
    } else {
      audio.pause();
      setIsPlaying(prevState => ({ ...prevState, [audioId]: false }));
    }
  }
  
  function togglePlayPauseAudio() {
    const audioElement = document.getElementById('questionAudio');
    if (audioElement.paused) {
      audioElement.play();
      setIsPlayingAudio(true);
    } else {
      audioElement.pause();
      setIsPlayingAudio(false);
    }
  }
  
  const handleSubmitAnswers = async (questionNumber, selectedOption) => {
    try {
      const userId = localStorage.getItem('user_id');
      let data = {
        user: userId,
        exam: examId,
      };
  
      const questionIndex = Math.ceil(questionNumber / 4); 
      const questionKey = `qn${questionIndex}`;
  
      data[questionKey] = selectedOption;
  
      await apiClient.put(`api/modal/${examId}/${userId}/`, data);
      console.log(`Selected option for question ${questionIndex} updated successfully.`);
    } catch (error) {
      console.error('Error updating selected option:', error);
    }
  };
  
  
  return (
    <div>
      <div className="container-fluid">
        <div className="row d-flex justify-content-between align-items-center bg-primary text-white py-3 px-3">
          <div className="col-auto">
            <p className="mb-0">EPS | TOPIK EXAM</p>
          </div>
          <div className="col-auto">
            <p className="mb-0">Username: {username}</p>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row bg-primary d-flex justify-content-between text-white py-2">
          <div className="col-auto">
            Total Questions: 40 
          </div>
          <div className="col-auto">
            Solved: {userId}
          </div>
          <div className="col-auto">
            Unsolved: {examId}
          </div>
          <div className="col-auto">
            Time Remaining:
          </div>
        </div>
        <div className="row my-3">
          <div className="col-6 px-2" >
            <div className="col-12 py-3" style={{ border: '1px solid #ccc' }}>
              <div className="row text-center py-2">
                <p style={{ fontWeight: '600', color: 'blue' }}>Reading Questions</p>
              </div>
              <div className="row" style={{ margin: '0px 10px' }}>
              {renderButtons()}
              </div>
            </div>
          </div>

          <div className="col-6 px-2" >
            <div className="col-12 py-3" style={{ border: '1px solid #ccc' }}>
              <div className="row text-center py-2">
                <p style={{ fontWeight: '600', color: 'blue' }}>Listening Questions</p>
              </div>
              <div className="row" style={{ margin: '0px 10px' }}>
                {renderListening()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={buttonNumber !== null} onHide={handleCloseModal} size='xl' keyboard={false} backdrop="static" style={{ height: '100vh' }}>
        <Modal.Header className='d-flex justify-content-between'>
          <div className="col-auto">
            Question Number: {currentModalButton}
          </div>
          <div className="col-auto">
            Remaining Questions: 
          </div>
          <div className="col-auto">
            Time Remaining: 
          </div>
        </Modal.Header>
        <Modal.Body>
  <div className="row">
    <div className="col-6">
      <div className="col-12" style={{ padding: '10px' }}>
        <div className="row" style={{ border: '1px solid #ccc', padding: '10px'}}>
          {questionData && (
            <>
              <div dangerouslySetInnerHTML={{ __html: questionData.label }} />
              <p>{questionData.question_number}</p>

              {questionData.question_type === 'text' && (
                <p>{questionData.question_text}</p>
              )}

              {questionData.question_type === 'image' && (
                <img src={`${apiClient.defaults.baseURL}${questionData.question_image.startsWith('/') ? '' : '/'}${questionData.question_image}`} alt="" />
              )}

              {questionData.question_type === 'audio' && (
                <>
                  <div className="col-12">
                    <audio id="questionAudio" src={`${apiClient.defaults.baseURL}${questionData.question_audio.startsWith('/') ? '' : '/'}${questionData.question_audio}`} controls style={{display:'none'}}></audio>
                    <button onClick={togglePlayPauseAudio}>
                      {isPlayingAudio ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    <div className="col-6">
  <div className="col-12" style={{ padding: '10px' }}>
    <div className="row" style={{ border: '1px solid #ccc', padding: '10px'}}>
    <div className="col-6">
  <div className="col-12" style={{ padding: '10px' }}>
    <div className="row" style={{ border: '1px solid #ccc', padding: '10px'}}>
      {questionData && (
        <>
          {questionData.answer_type === 'text' && (
            <>
              {[1, 2, 3, 4].map((number) => (
                <div key={number} className="col-12">
                  <button
                    onClick={() => handleSubmitAnswers((questionData.question_number - 1) * 4 + number, String.fromCharCode(96 + number))}
                    className={`btn${questionData.question_number}-${number}`}
                    style={{ backgroundColor: examData[`qn${questionData.question_number}`] === String.fromCharCode(96 + number) ? 'orange' : 'blue' }}
                  >
                    <span>{number}</span>
                    {questionData[`option${number}_text`] || 'NULL'}
                  </button>
                </div>
              ))}
            </>
          )}

          {questionData.answer_type === 'audio' && (
            <>
              {[1, 2, 3, 4].map((number) => (
                <div key={number} className="col-12">
                  <button
                    onClick={() => handleSubmitAnswers((questionData.question_number - 1) * 4 + number, String.fromCharCode(96 + number))}
                    className={`btn${questionData.question_number}-${number}`}
                    style={{ backgroundColor: examData[`qn${questionData.question_number}`] === String.fromCharCode(96 + number) ? 'orange' : 'blue' }}
                  >
                    <span>{number}</span>
                    <audio id={`audio${number}`} src={`${apiClient.defaults.baseURL}${questionData[`option${number}_audio`] || 'NULL'}`}></audio>
                    <button onClick={() => togglePlayPause(`audio${number}`)} style={{width:'30px'}}>
                      {isPlaying[`audio${number}`] ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
                    </button>
                  </button>
                </div>
              ))}
            </>
          )}

          {questionData.answer_type === 'image' && (
            <>
              {[1, 2, 3, 4].map((number) => (
                <div key={number} className={`col-6${number > 1 ? ' mt-3' : ''}`}>
                  <button
                    onClick={() => handleSubmitAnswers((questionData.question_number - 1) * 4 + number, String.fromCharCode(96 + number))}
                    className={`btn${questionData.question_number}-${number}`}
                    style={{ backgroundColor: examData[`qn${questionData.question_number}`] === String.fromCharCode(96 + number) ? 'orange' : 'blue' }}
                  >
                    <span>{number}</span>
                    <img src={`${apiClient.defaults.baseURL}${questionData[`option${number}_image`] || 'NULL'}`} alt="" style={{width:'100%'}} />
                  </button>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  </div>
</div>


    </div>
  </div>
</div>

  </div>
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
  );
}
export default ExamPage;