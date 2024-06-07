import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import apiClient from '../apiClient';
import './AnswerAudio.css';

const AnswerAudio = ({ userId, examId, setId, selectedButton }) => {
  const [answerData, setAnswerData] = useState(null);
  const [answers, setAnswers] = useState('');
  const [playCounts, setPlayCounts] = useState({});
  const [isPlaying, setIsPlaying] = useState({});
  const audioRefs = useRef({});

  const fetchExamData = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/fetch-modal-data/${examId}/${userId}/`);
      setAnswers(response.data[`qn${selectedButton}`]);
    } catch (error) {
      console.error('Error fetching exam data:', error);
    }
  }, [examId, userId, selectedButton]);

  useEffect(() => {
    const fetchAnswerData = async () => {
      try {
        const response = await apiClient.get(`/api/fetch-question/${setId}/${selectedButton}/`);
        setAnswerData(response.data);
        setPlayCounts({});
        setIsPlaying({});
      } catch (error) {
        console.error('Error fetching answer data:', error);
      }
    };

    fetchAnswerData();
  }, [setId, selectedButton]);

  const handleOptionClick = async (option) => {
    try {
      const response = await apiClient.put(`/api/modal/${examId}/${userId}/`, {
        [`qn${selectedButton}`]: option
      });
      console.log('Response:', response.data);
      fetchExamData();
    } catch (error) {
      console.error('Error updating answer option:', error);
    }
  };

  useEffect(() => {
    if (examId && userId) {
      fetchExamData();
    }
  }, [examId, userId, selectedButton, fetchExamData]);

  const handlePlayPause = (option) => {
    if (!audioRefs.current[option] || playCounts[option] >= 2) return;

    if (isPlaying[option]) {
      audioRefs.current[option].pause();
      setIsPlaying(prev => ({ ...prev, [option]: false }));
    } else {
      audioRefs.current[option].play();
      setIsPlaying(prev => ({ ...prev, [option]: true }));
    }
  };

  const handleAudioEnded = (option) => {
    setPlayCounts(prev => {
      const newCount = (prev[option] || 0) + 1;
      if (newCount < 2) {
        audioRefs.current[option].play();
      } else {
        setIsPlaying(prev => ({ ...prev, [option]: false }));
      }
      return { ...prev, [option]: newCount };
    });
  };

  const handleAudioPlay = (option) => {
    const audios = Object.values(audioRefs.current);
    audios.forEach(audio => {
      if (audio !== audioRefs.current[option]) {
        audio.pause();
      }
    });
  };

  return (
    <div className="answer-wrapper">
      {answerData ? (
        <div className="answer-content">
          {['a', 'b', 'c', 'd'].map((option, index) => (
            <div key={option} className="row my-2">
              <div className="col d-flex mr-2">
              <div className="audio-wrapper">
                  <audio
                    src={apiClient.defaults.baseURL + answerData[`option${index + 1}_audio`]}
                    ref={el => (audioRefs.current[option] = el)}
                    onEnded={() => handleAudioEnded(option)}
                    onPlay={() => handleAudioPlay(option)}
                  />
                  <button
                    onClick={() => handlePlayPause(option)}
                    className="play-pause-button"
                    disabled={playCounts[option] >= 2}
                    style={{
                      backgroundColor: playCounts[option] >= 2 ? '#ccc' : 'initial',
                      color: playCounts[option] >= 2 ? '#fff' : 'initial'
                    }}
                  >
                    {isPlaying[option] ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
                <button
                  className="btn-answer"
                  onClick={() => handleOptionClick(option)}
                  style={{
                    background: answers === option ? '#45B39D' : 'transparent',
                  }}
                >
                  {option}
                </button>
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading answer...</p>
      )}
    </div>
  );
};

export default AnswerAudio;
