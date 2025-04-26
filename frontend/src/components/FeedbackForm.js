import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  Alert
} from '@mui/material';

const FeedbackForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    feedbackText: '',
    category: 'suggestion'
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.userName || !formData.email || !formData.feedbackText) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await onSubmit(formData);
      setSubmitted(true);
      setFormData({
        userName: '',
        email: '',
        feedbackText: '',
        category: 'suggestion'
      });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Submit Your Feedback
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {submitted && <Alert severity="success" sx={{ mb: 2 }}>Feedback submitted successfully!</Alert>}
      
      <TextField
        fullWidth
        margin="normal"
        label="Your Name"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formData.category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="suggestion">Suggestion</MenuItem>
          <MenuItem value="bug">Bug Report</MenuItem>
          <MenuItem value="feature">Feature Request</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      
      <TextField
        fullWidth
        margin="normal"
        label="Your Feedback"
        name="feedbackText"
        multiline
        rows={4}
        value={formData.feedbackText}
        onChange={handleChange}
        required
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        sx={{ mt: 2 }}
      >
        Submit Feedback
      </Button>
    </Box>
  );
};

export default FeedbackForm;