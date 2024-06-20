import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ExamList from './components/Exams/ExamList';
import ExamDetails from './components/Exams/ExamDetails';
import QuestionList from './components/Questions/QuestionList';
import ResultsList from './components/Results/ResultsList';
import Login from './components/Auth/login/Login';
import GoToBoard from './components/Home/GoToBoard';
import Register from './components/Auth/register/Register';
import StudentDashboard from './components/Dashboard/student/StudentDashboard';
import TeacherDashboard from './components/Dashboard/teacher/TeacherDashboard';
import ExamForm from "./components/Exams/ExamForm";

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = (token, userId) => {
    setLoggedIn(true);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  };

  return (
    <Routes>
      <Route path="/" element={<GoToBoard />} />
      <Route path="/exams" element={<ExamList />} />
      <Route path="/exams/:id" element={<ExamDetails />} />
      <Route path="/questions" element={<QuestionList />} />
      <Route path="/results" element={<ResultsList />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/create-exam" element={<ExamForm />} />
    </Routes>
  );
};

export default App;
