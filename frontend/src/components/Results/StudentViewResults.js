import React, { useState, useEffect } from 'react';
import { fetchUserResults } from '../../api';
import './Results.css'; // Import the CSS file

const UserResults = () => {
  const [results, setResults] = useState([]);
  const userId = localStorage.getItem('userId'); // Ensure this matches the key used in local storage

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (userId) {
          const resultsData = await fetchUserResults(userId);
          setResults(resultsData);
        } else {
          console.error('No user ID found in local storage');
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [userId]);

  return (
    <div className="exam-details">
      <h2 className="title">My Results</h2>
      <div className="card-container">
        {results.map((result) => (
          <div key={result._id} className="card">
            <div className="card-body">
              <h3 className="card-title">Exam: {result.exam?.name || 'Unknown'}</h3>
              <div className="card-text">
                <p>Score: {result.score}</p>
                <p>Date: {new Date(result.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserResults;
