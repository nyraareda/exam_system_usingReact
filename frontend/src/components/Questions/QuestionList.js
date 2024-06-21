import React, { useEffect, useState } from 'react';
import { fetchQuestions, deleteQuestion, updateQuestion } from '../../api'; // Assuming updateQuestion is implemented
import './QuestionList.css'; // Import your CSS file for styling

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({ question: '', options: [], correctOption: 0 });

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

  const handleDelete = async (questionId) => {
    try {
      await deleteQuestion(questionId);
      setQuestions(questions.filter(question => question._id !== questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleEdit = (question) => {
    setEditedQuestion({
      question: question.question,
      options: [...question.options],
      correctOption: question.correctOption
    });
    setEditingQuestionId(question._id);
  };

  const handleSubmit = async () => {
    try {
      await updateQuestion(editingQuestionId, editedQuestion);
      // Update the questions array after successful update
      const updatedQuestions = questions.map(question =>
        question._id === editingQuestionId ? { ...question, ...editedQuestion } : question
      );
      setQuestions(updatedQuestions);
      setEditingQuestionId(null); // Exit edit mode
      setEditedQuestion({ question: '', options: [], correctOption: 0 }); // Reset edited question state
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const cancelEdit = () => {
    setEditingQuestionId(null);
    setEditedQuestion({ question: '', options: [], correctOption: 0 });
  };

  return (
    <div className="question-list">
      <h2>Question List</h2>
      {questions.map(question => (
        <div key={question._id} className="question-card">
          {editingQuestionId === question._id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editedQuestion.question}
                onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
              />
              <ul>
                {editedQuestion.options.map((option, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...editedQuestion.options];
                        newOptions[index] = e.target.value;
                        setEditedQuestion({ ...editedQuestion, options: newOptions });
                      }}
                    />
                  </li>
                ))}
              </ul>
              <input
                type="number"
                value={editedQuestion.correctOption}
                onChange={(e) => setEditedQuestion({ ...editedQuestion, correctOption: parseInt(e.target.value) })}
              />
              <div className="button-group">
                <button className="save-button" onClick={handleSubmit}>Save</button>
                <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <p>{question.question}</p>
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
              <p>Correct Option: {question.options[question.correctOption]}</p>
              <div className="button-group">
                <button className="edit-button" onClick={() => handleEdit(question)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(question._id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
