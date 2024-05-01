import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../apiClient';

const AnswerImage = ({ userId, examId, setId, selectedButton }) => {
  const [answerData, setAnswerData] = useState(null);
  const [answers, setExamData] = useState('');

  const fetchExamData = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/fetch-modal-data/${examId}/${userId}/`);
      setExamData(response.data[`qn${selectedButton}`]); 
    } catch (error) {
      console.error('Error fetching exam data:', error);
    }
  }, [examId, userId, selectedButton]);

  useEffect(() => {
    const fetchAnswerData = async () => {
      try {
        const response = await apiClient.get(`/api/fetch-question/${setId}/${selectedButton}/`);
        setAnswerData(response.data);
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
  
  return (
    <div className="answer-wrapper">
      {answerData ? (
        <div className="answer-content">
          {['a', 'b', 'c', 'd'].map((option, index) => (
            <div key={option} className="row my-2">
              <div className="col">
                <button className="btn-answer" 
                  onClick={() => handleOptionClick(option)} 
                  style={{
                    background: answers === option ? '#45B39D' : 'transparent',
                  }}
                >
                  {option}. 
                  <img src={apiClient.defaults.baseURL + answerData[`option${index + 1}_image`]} alt="" className="img-fluid" />
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

export default AnswerImage;
