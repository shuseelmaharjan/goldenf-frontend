import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import apiClient from '../apiClient';
import AnswerText from './AnswerText';
import './ExamPage.css';
import AnswerImage from './AnswerImage';
import AnswerAudio from './AnswerAudio';

const Questions = ({ userId, examId, setId, selectedButton }) => {
  const [questionData, setQuestionData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        if (selectedButton) {
          const response = await apiClient.get(`/api/fetch-question/${setId}/${selectedButton}/`);
          setQuestionData(response.data);
          // Reset play count and button state when new question is fetched
          setPlayCount(0);
          setIsButtonDisabled(false);
          setIsPlaying(false);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    if (setId && selectedButton) {
      fetchQuestionData();
    }
  }, [setId, selectedButton]);

  const handlePlayPause = () => {
    if (!audioRef.current || isButtonDisabled) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setPlayCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= 2) {
        setIsButtonDisabled(true);
        setIsPlaying(false);
      } else {
        audioRef.current.play();
      }
      return newCount;
    });
  };

  const handleAudioPlay = () => {
    // Pause any other playing audio
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
      if (audio !== audioRef.current) {
        audio.pause();
      }
    });

    // Ensure the play count and button state are accurate for the current audio
    if (playCount >= 2) {
      audioRef.current.pause();
      setIsButtonDisabled(true);
    }
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
                  ref={audioRef}
                  onEnded={handleAudioEnded}
                  onPlay={handleAudioPlay}
                />
                <button 
                  onClick={handlePlayPause} 
                  className="play-pause-button"
                  disabled={isButtonDisabled}
                >
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
