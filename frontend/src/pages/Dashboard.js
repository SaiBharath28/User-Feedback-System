import { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackList from '../components/FeedbackList';

const Dashboard = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedback`);
      setFeedback(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch feedback');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <FeedbackList feedback={feedback} />;
};

export default Dashboard;
