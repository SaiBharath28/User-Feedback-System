import FeedbackForm from '../components/FeedbackForm';
import axios from 'axios';

const SubmitFeedback = () => {
  const submitFeedback = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/feedback', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to submit feedback');
    }
  };

  return <FeedbackForm onSubmit={submitFeedback} />;
};

export default SubmitFeedback;