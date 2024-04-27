import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import apiClient from '../apiClient';
import AnswerText from './AnswerText';
import './ExamPage.css';
import AnswerImage from './AnswerImage';
import AnswerAudio from './AnswerAudio';

const Questions = ({ userId, examId, setId, selectedButton }) => {
  const [questionData, setQuestionData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await apiClient.get(`/api/fetch-question/${setId}/${selectedButton}/`);
        setQuestionData(response.data);
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    if (setId && selectedButton) {
      fetchQuestionData();
    }
  }, [setId, selectedButton]);

  const handlePlayPause = () => {
    if (!audioRef) return;
    if (isPlaying) {
      audioRef.pause();
    } else {
      audioRef.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="container">
      <div className="box">
      <div className="row">
        {questionData && questionData.label && <div dangerouslySetInnerHTML={{ __html: questionData.label }} />}
        <div className="col-md-6">
          <p>{questionData ? questionData.question_number : 'Loading...'}</p>
          {questionData && questionData.question_type === 'text' && (
            <p>{questionData.question_text}</p>
          )}
          {questionData && questionData.question_type === 'audio' && (
            <div className="audio-wrapper">
              <audio
                src={apiClient.defaults.baseURL + questionData.question_audio}
                ref={audio => setAudioRef(audio)}
                onEnded={handleAudioEnded}
              />
              <button onClick={handlePlayPause} className="play-pause-button">
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          )}
          {questionData && questionData.question_type === 'image' && (
            <img src={apiClient.defaults.baseURL + questionData.question_image} alt="" className="img-fluid" />
          )}
        </div>
        <div className="col-md-6">
          {questionData && (questionData.answer_type === 'text') && (
            <AnswerText userId={userId} examId={examId} setId={setId} selectedButton={selectedButton} />
          )}
        {questionData && (questionData.answer_type === 'image') && (
            <AnswerImage userId={userId} examId={examId} setId={setId} selectedButton={selectedButton} />
          )}

        {questionData && (questionData.answer_type === 'audio') && (
            <AnswerAudio userId={userId} examId={examId} setId={setId} selectedButton={selectedButton} />
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Questions;
