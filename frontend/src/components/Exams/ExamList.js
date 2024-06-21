import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchExams, deleteExam, updateExam } from '../../api'; // Import API functions
import './ExamList.css';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [editingExamId, setEditingExamId] = useState(null);
  const [editedExam, setEditedExam] = useState({ name: '', questions: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExams();
        setExams(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || 'Error fetching exams');
      }
    };

    const fetchUserRole = () => {
      const role = localStorage.getItem('userRole');
      setUserRole(role);
    };

    fetchData();
    fetchUserRole();
  }, []);

  const handleDelete = async (examId) => {
    try {
      await deleteExam(examId);
      setExams(exams.filter(exam => exam._id !== examId));
    } catch (error) {
      setError(error.message || 'Error deleting exam');
    }
  };

  const handleEdit = (exam) => {
    setEditedExam({
      name: exam.name,
      questions: [...exam.questions]
    });
    setEditingExamId(exam._id);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await updateExam(editingExamId, editedExam, token);
      const updatedExams = exams.map(exam =>
        exam._id === editingExamId ? { ...exam, ...editedExam } : exam
      );
      setExams(updatedExams);
      setEditingExamId(null); // Exit edit mode
      setEditedExam({ name: '', questions: [] }); // Reset edited exam state
    } catch (error) {
      setError(error.message || 'Error updating exam');
    }
  };

  const cancelEdit = () => {
    setEditingExamId(null);
    setEditedExam({ name: '', questions: [] });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="exam-list-wrap">
      <h2 className="title">Available Exams</h2>
      <div className="exam-list">
        {exams.length === 0 ? (
          <div className="no-exams-message">No exams found.</div>
        ) : (
          <ul>
            {exams.map((exam) => (
              <li key={exam._id} className="exam-item">
                {editingExamId === exam._id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editedExam.name}
                      onChange={(e) => setEditedExam({ ...editedExam, name: e.target.value })}
                    />
                    {/* Additional fields for editing exam details */}
                    <div className="button-group">
                      <button className="save-button" onClick={handleSubmit}>Save</button>
                      <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    <h3>{exam.name}</h3>
                    {exam.questions.length === 0 ? (
                      <p className="error-message">No questions found for this exam.</p>
                    ) : (
                      <p>Total Questions: {exam.questions.length}</p>
                    )}
                    <div className="exam-item-buttons">
                      {userRole === 'user' && (
                        <Link to={`/take-exam/${exam._id}`}>
                          <button className="start-exam-btn" disabled={exam.questions.length === 0}>Take Exam</button>
                        </Link>
                      )}
                      {userRole === 'admin' && (
                        <React.Fragment>
                          <button className="edit-exam-btn" onClick={() => handleEdit(exam)}>Edit Exam</button>
                        </React.Fragment>
                      )}
                    </div>
                  </React.Fragment>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExamList;
