import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createQuestion } from '../../api';
import './QuestionForm.css';

const QuestionForm = ({ index, question, onQuestionChange, onQuestionRemove }) => {
  const [loading, setLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState('');
  const [postError, setPostError] = useState('');

  const handleOptionChange = (optionIndex, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[optionIndex] = value;
    onQuestionChange({ ...question, options: updatedOptions });
  };

// const handlePostQuestion = async () => {
//   setLoading(true);
//   try {
//     const createdQuestion = await createQuestion({
//       question: question.question,
//       options: question.options,
//       correctOption: question.correctOption,
//     });

//     // Log the question object for debugging
//     console.log('fffffffffff', {
//       question: question.question,
//       options: question.options,
//       correctOption: question.correctOption,
//     });

//     setPostSuccess('Question posted successfully!');
//     setPostError('');
//     console.log('Created question:', createdQuestion);
//   } catch (error) {
//     setPostSuccess('');
//     setPostError(error.message);
//     console.error('Error posting question:', error);
//   } finally {
//     setLoading(false);
//   }
// };


const handlePostQuestion = async () => {
    setLoading(true);
    try {
      const createdQuestion = await createQuestion({
        question: question.question,
        options: question.options,
        correctOption: question.correctOption,
      });
      
      console.log('Created question:', createdQuestion); // Log the created question object
      
      setPostSuccess('Question posted successfully!');
      setPostError('');
    } catch (error) {
      console.error('Error posting question:', error);
      setPostSuccess('');
      setPostError('Failed to post question. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="question-form">
      <div className="question-text">Question {index + 1}</div>
      <input
        type="text"
        placeholder="Enter your question"
        value={question.question}
        onChange={(e) => onQuestionChange({ ...question, question: e.target.value })}
        className="input-field"
      />
      <ul className="option-list">
        {question.options.map((option, optionIndex) => (
          <li key={optionIndex} className="option-item">
            <input
              type="text"
              placeholder={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
              className="input-field"
            />
          </li>
        ))}
      </ul>
      <label className="correct-answer-label">
        Correct Answer:
        <select
          value={question.correctOption}
          onChange={(e) => onQuestionChange({ ...question, correctOption: e.target.value })}
          className="input-field"
        >
          <option value="">Select Correct Answer</option>
          {question.options.map((option, optionIndex) => (
            <option key={optionIndex} value={optionIndex}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <div className="add-remove-btn">
        <button type="button" onClick={onQuestionRemove}>
          Remove Question
        </button>
        <button type="button" onClick={handlePostQuestion} disabled={loading}>
          {loading ? 'Posting...' : 'Post Question'}
        </button>
      </div>
      {postError && <p className="error">{postError}</p>}
      {postSuccess && <p className="success">{postSuccess}</p>}
    </div>
  );
};

QuestionForm.propTypes = {
  index: PropTypes.number.isRequired,
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctOption: PropTypes.string.isRequired,
  }).isRequired,
  onQuestionChange: PropTypes.func.isRequired,
  onQuestionRemove: PropTypes.func.isRequired,
};

export default QuestionForm;
