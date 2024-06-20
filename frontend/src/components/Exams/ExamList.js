// src/components/Exams/ExamList.js
import React, { useState, useEffect } from 'react';
import { fetchExams } from '../../api'; // Adjust the import path as necessary
import './ExamList.css';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExams = async () => {
      try {
        const data = await fetchExams();
        setExams(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || 'Error fetching exams');
      }
    };

    getExams();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="exam-list-wrap">
      <div className="exam-list">
        <h2 className="title">Available Exams</h2>
        <ul>
          {exams.map((exam) => (
            <li key={exam._id} className="exam-item">
              <h3>{exam.name}</h3>
              <p>Total Questions: {exam.questions.length}</p>
              {/* Add other exam details or actions */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExamList;
