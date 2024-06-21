import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchExamDetails, submitResult } from '../../api';
import "./TakeExamForm.css";

const TakeExamForm = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadExam = async () => {
      try {
        const examData = await fetchExamDetails(examId);
        if (examData && examData.questions) {
          setExam(examData);
          setAnswers(Array(examData.questions.length).fill(''));
        } else {
          setError('Exam data is not available.');
        }
      } catch (error) {
        setError('Failed to load exam. Please try again later.');
      }
    };

    loadExam();
  }, [examId]);

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    exam.questions.forEach((question, index) => {
      if (question.correctOption === answers[index]) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const score = calculateScore();
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    try {
      await submitResult({
        user: userId,
        exam: examId,
        score
      });
      if (score === 0) {
        setError(`Not good degree. Your score is ${score}.`);
        setSuccess('');
      } else {
        setSuccess(`Exam submitted successfully! Your score is ${score}.`);
        setError('');
      }
    } catch (error) {
      setError('Failed to submit exam results. Please try again.');
      console.error('Error submitting exam results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!exam) {
    return <div>Loading...</div>;
  }

  return (
    <div className="take-exam-form">
      <h2 className="title">{exam.name}</h2>
      {error && <p className={`error ${error.includes('Not good degree') ? 'Error' : ''}`}>{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        {exam.questions && exam.questions.map((question, index) => (
          <div key={question._id} className="hero">
            <div className="hero-description-bk"></div>
            <div className="hero-description">
              <p>{question.question}</p>
            </div>
            <ul className="option-list">
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex} className="option-item">
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={optionIndex}
                      checked={answers[index] === optionIndex}
                      onChange={() => handleAnswerChange(index, optionIndex)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Exam'}
        </button>
      </form>
    </div>
  );
};

export default TakeExamForm;
