import React, { useState, useEffect } from 'react';
import { fetchResults } from '../../api';
const ResultsList = ({ userId }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        const resultsData = await fetchResults(userId);
        setResults(resultsData);
      } catch (error) {
        console.error('Error fetching results:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchUserResults();
  }, [userId]);

  return (
    <div>
      <h2>Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result._id}>
            <p>Exam: {result.exam.name}</p>
            <p>Score: {result.score}</p>
            <p>Date: {new Date(result.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsList;

