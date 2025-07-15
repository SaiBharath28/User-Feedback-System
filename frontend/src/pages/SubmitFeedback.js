import FeedbackForm from '../components/FeedbackForm';
import axios from 'axios';

// Get backend URL from environment variable
const API_BASE = import.meta.env.VITE_API_URL;

const SubmitFeedback = () => {
  const submitFeedback = async (data) => {
    try {
      const response = await axios.post(`${API_BASE}/api/feedback`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to submit feedback');
    }
  };

  return <FeedbackForm onSubmit={submitFeedback} />;
};

export default SubmitFeedback;
