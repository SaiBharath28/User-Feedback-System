import { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackList from '../components/FeedbackList';

// Get backend URL from environment variable
const API_BASE = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeedback = async (params = {}) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/api/feedback`, { params });
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

  const handleFilterChange = (filters) => {
    fetchFeedback(filters);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <FeedbackList 
      feedback={feedback} 
      onFilterChange={handleFilterChange} 
    />
  );
};

export default Dashboard;
