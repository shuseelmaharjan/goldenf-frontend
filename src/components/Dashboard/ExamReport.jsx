import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import './ExamReport.css';

const ExamReport = ({ userId, setId, examId }) => {
  const [examData, setExamData] = useState({ questions: [], user_answers: {} });

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const setUserResponse = await apiClient.get(`/api/report/set/${setId}/user/${userId}/exam/${examId}/`);
        setExamData(setUserResponse.data);
      } catch (error) {
        console.error('Error fetching exam data:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    };

    fetchExamData();
  }, [setId, userId, examId]);

  const getClassNameForOption = (question, option) => {
    const userAnswer = examData.user_answers[`qn${question.qn}`];
    const correctAnswer = question.answer;

    if (!userAnswer) {
      return correctAnswer === option ? 'unanswered' : '';
    }

    if (userAnswer === option) {
      return userAnswer === correctAnswer ? 'correct' : 'incorrect';
    }

    return correctAnswer === option ? 'correct' : '';
  };

  return (
    <div className="container">
      <div className="row">
        {examData.questions.map((question) => (
          <div key={question.id} className="col-12 box">
            <div className="row">
              <div className="col-md-6">
                <div><strong>QN: {question.qn}</strong></div>
                {question.label && (
                  <div dangerouslySetInnerHTML={{ __html: question.label }} />
                )}
                {question.question_type === 'text' && (
                  <div>{question.question_text}</div>
                )}
                {question.question_type === 'image' && question.question_image && (
                <img
                    src={apiClient.defaults.baseURL + question.question_image}
                    alt={`Question ${question.qn}`}
                    className="img-responsive"
                />
                )}

                {question.question_type === 'image' && question.question_image && (
                <img
                    src={apiClient.defaults.baseURL + question.question_image}
                    alt={`Question ${question.qn}`}
                    className="img-responsive"
                />
                )}

              </div>
              <div className="col-md-6">
                {question.answer_type === 'text' && (
                  <div className='d-block'>
                    <div className={getClassNameForOption(question, 'a')}>Option 1: {question.option1_text}</div>
                    <div className={getClassNameForOption(question, 'b')}>Option 2: {question.option2_text}</div>
                    <div className={getClassNameForOption(question, 'c')}>Option 3: {question.option3_text}</div>
                    <div className={getClassNameForOption(question, 'd')}>Option 4: {question.option4_text}</div>
                  </div>
                )}
                {question.answer_type === 'image' && (
                  <div className='d-block justify-content-between'>
                    {question.option1_image && (
                      <img src={apiClient.defaults.baseURL + question.option1_image} alt="Option 1" className={`img-fluid ${getClassNameForOption(question, 'a')}`} />
                    )}
                    {question.option2_image && (
                      <img src={apiClient.defaults.baseURL + question.option2_image} alt="Option 2" className={`img-fluid ${getClassNameForOption(question, 'b')}`} />
                    )}
                    {question.option3_image && (
                      <img src={apiClient.defaults.baseURL + question.option3_image} alt="Option 3" className={`img-fluid ${getClassNameForOption(question, 'c')}`} />
                    )}
                    {question.option4_image && (
                      <img src={apiClient.defaults.baseURL + question.option4_image} alt="Option 4" className={`img-fluid ${getClassNameForOption(question, 'd')}`} />
                    )}
                  </div>
                )}
                {question.answer_type === 'audio' && (
                  <div>
                    {question.option1_audio && (
                      <div className={`audio-wrapper ${getClassNameForOption(question, 'a')}`}>
                        <audio controls>
                          <source src={apiClient.defaults.baseURL + question.option1_audio} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                    {question.option2_audio && (
                      <div className={`audio-wrapper ${getClassNameForOption(question, 'b')}`}>
                        <audio controls>
                          <source src={apiClient.defaults.baseURL + question.option2_audio} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                    {question.option3_audio && (
                      <div className={`audio-wrapper ${getClassNameForOption(question, 'c')}`}>
                        <audio controls>
                          <source src={apiClient.defaults.baseURL + question.option3_audio} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                    {question.option4_audio && (
                      <div className={`audio-wrapper ${getClassNameForOption(question, 'd')}`}>
                        <audio controls>
                          <source src={apiClient.defaults.baseURL + question.option4_audio} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3">
                <strong>You Answered:</strong> {examData.user_answers[`qn${question.qn}`] ? examData.user_answers[`qn${question.qn}`].toUpperCase() : <span className="unanswered">Not Answered</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamReport;
