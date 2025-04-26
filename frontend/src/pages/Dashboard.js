import { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackList from '../components/FeedbackList';

const Dashboard = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeedback = async (params = {}) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/feedback', {
        params
      });
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