import React, { useState } from 'react';
import { createExam, createQuestion } from '../../api';
import './ExamForm.css';
import QuestionForm from './QuestionForm';

const ExamForm = () => {
  const [examName, setExamName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleQuestionAdd = () => {
    setQuestions([...questions, { question: '', options: ['', '', ''], correctOption: '' }]);
  };

  const handleQuestionChange = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const handleQuestionRemove = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create questions first and get their IDs
      const createdQuestions = await Promise.all(
        questions.map(async (question) => {
          const createdQuestion = await createQuestion({
            question: question.question,
            options: question.options.filter((option) => option.trim() !== ''),
            correctOption: question.correctOption,
          });
          return createdQuestion._id;
        })
      );

      const examData = {
        name: examName,
        questions: createdQuestions, 
      };

      await createExam(examData);
      setSuccess('Exam created successfully!');
      setError('');
      setExamName('');
      setQuestions([]);
    } catch (error) {
      setSuccess('');
      setError(error.message);
    }
  };

  return (
    <div className="exam-form">
      <h2 className="title">Create Exam</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Exam Name"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          required
          className="input-field"
        />

        {questions.map((question, index) => (
          <div key={index}>
            <QuestionForm
              index={index}
              question={question}
              onQuestionChange={(updatedQuestion) => handleQuestionChange(index, updatedQuestion)}
              onQuestionRemove={() => handleQuestionRemove(index)}
            />
          </div>
        ))}

        <button type="button" onClick={handleQuestionAdd} className='ButtonPrimary'>
          Add Question
        </button>

        <button type="submit" className="submit-btn">
          Create Exam
        </button>
      </form>
    </div>
  );
};

export default ExamForm;
