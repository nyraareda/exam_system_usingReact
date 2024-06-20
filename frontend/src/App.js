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
import ExamForm from './components/Exams/ExamForm';
import TakeExamForm from './components/Exams/TakeExamForm';
import AdminViewAllResults from './components/Results/ResultsList';
import UserResults from './components/Results/StudentViewResults';
import DashboardLayout from './components/Dashboard/layout/DashboardLayout'; // Adjust the import path as necessary

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userType, setUserType] = React.useState(localStorage.getItem('userType') || 'student');

  const handleLogin = (token, userId, userType) => {
    setLoggedIn(true);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType);
    setUserType(userType);
  };

  const userId = localStorage.getItem('userId');

  return (
    <Routes>
      <Route path="/" element={<GoToBoard />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route element={<DashboardLayout userType={userType} />}>
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/exams/:id" element={<ExamDetails />} />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/results" element={<ResultsList />} />
        <Route path="/create-exam" element={<ExamForm />} />
        <Route path="/take-exam/:examId" element={<TakeExamForm />} />
        <Route path="/admin-result" element={<AdminViewAllResults />} />
        <Route path="/user-result" element={<UserResults userId={userId} />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unmatched routes */}
    </Routes>
  );
};

export default App;
