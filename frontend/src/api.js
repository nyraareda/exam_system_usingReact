import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  };
  

export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

export const fetchExams = async () => {
  try {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    const response = await axios.get(`${API_URL}/exams`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const takeExam = async (examId, userId, answers) => {
    try {
        const response = await axios.post(`${API_URL}/student/exams/${examId}/take`, { user: userId, answers });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// api.js



export const createExam = async (examData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/exams`, examData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const createQuestion = async (questionData) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from local storage or any other storage
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    const response = await axios.post(`${API_URL}/questions`, questionData, config);

    console.log('Response Data:', response.data); // Log response data upon successful response

    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error creating question:', error); // Log any errors that occur
    throw error; // Rethrow the error to handle it in the component or caller function
  }
};

export const updateExam = async (examId, examData) => {
    try {
        const response = await axios.put(`${API_URL}/exams/${examId}`, examData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteExam = async (examId) => {
    try {
        const response = await axios.delete(`${API_URL}/exams/${examId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchQuestions = async () => {
    try {
        const response = await axios.get(`${API_URL}/questions`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateQuestion = async (questionId, questionData) => {
    try {
        const response = await axios.put(`${API_URL}/questions/${questionId}`, questionData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteQuestion = async (questionId) => {
    try {
        const response = await axios.delete(`${API_URL}/questions/${questionId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchResults = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/student/results?user=${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getToken = () => {
  return localStorage.getItem('token');
};

export const fetchExamDetails = async (examId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/exams/${examId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitExam = async (examId, userId, answers, score) => {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/student/exams/${examId}/take`, 
      { user: userId, answers, score }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
