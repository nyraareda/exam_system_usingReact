// src/components/Exams/ExamDetails.js
import React, { useState, useEffect } from 'react';
import './ExamDetails.css'; // Import the CSS file
import { takeExam } from '../../api';

const ExamDetails = ({ examId }) => {
  const [exam, setExam] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const examData = await takeExam(examId);
        setExam(examData);
      } catch (error) {
        console.error(`Error fetching exam with ID ${examId}:`, error);
        // Handle error (e.g., show error message)
      }
    };

    fetchExamDetails();
  }, [examId]);

  if (!exam) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <div className="exam-details">
      <h2 className="title">Exam Details</h2>
      <h3>{exam.name}</h3>
      <p>Total Questions: {exam.questions.length}</p>
      <ul>
        {exam.questions.map((question) => (
          <li key={question._id}>
            <p>{question.text}</p>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamDetails;
