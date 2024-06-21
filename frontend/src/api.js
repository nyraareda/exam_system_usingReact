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

export const updateExam = async (examId, examData, token) => {
  try {
    const response = await axios.put(`${API_URL}/exams/${examId}`, examData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExam = async (examId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/exams/${examId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const submitResult = async ({ user, exam, score }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await axios.post(
      `${API_URL}/results/submit`, 
      { user, exam, score },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error submitting results:', error.response || error);
    throw error;
  }
};
export const fetchAllResults = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/results`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserResults = async (userId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/results/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchQuestions = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateQuestion = async (questionId, questionData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/questions/${questionId}`, questionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};