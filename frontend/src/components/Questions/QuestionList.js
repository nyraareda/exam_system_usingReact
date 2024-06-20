
import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../../api';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    getQuestions();
  }, []);

  return (
    <div>
      <h2>Question List</h2>
      <ul>
        {questions.map(question => (
          <li key={question._id}>{question.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
