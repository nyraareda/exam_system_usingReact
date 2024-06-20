import React, { useState, useEffect } from 'react';
import { fetchAllResults } from '../../api';
import './ResultsList.css'; // Import the CSS file
import Sidebar from '../Dashboard/Sidebar'
const AdminViewAllResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultsData = await fetchAllResults();
        setResults(resultsData);
      } catch (error) {
        console.error('Error fetching results:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchResults();
  }, []);

  return (
    <>
    <div className="exam-details">
      <h2 className="title">All Students' Results</h2>
      <div className="card-container">
        {results.map((result) => (
          <div key={result._id} className="card">
            <div className="card-body">
              <h3 className="card-title">Student: {result.user?.name || 'Unknown'}</h3>
              <div className="card-text">
                <p>Exam: {result.exam?.name || 'Unknown'}</p>
                <p>Score: {result.score}</p>
                <p>Date: {new Date(result.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AdminViewAllResults;
