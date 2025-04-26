import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Chip,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { useState } from 'react';

const categoryColors = {
  suggestion: 'primary',
  bug: 'error',
  feature: 'success',
  other: 'warning'
};

const FeedbackList = ({ feedback, onFilterChange }) => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryFilter(value);
    onFilterChange({ category: value, sort: sortOrder });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    onFilterChange({ category: categoryFilter, sort: value });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Feedback Dashboard</Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="suggestion">Suggestion</MenuItem>
              <MenuItem value="bug">Bug</MenuItem>
              <MenuItem value="feature">Feature</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedback.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No feedback found
                </TableCell>
              </TableRow>
            ) : (
              feedback.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={item.category} 
                      color={categoryColors[item.category] || 'default'} 
                    />
                  </TableCell>
                  <TableCell>{item.feedbackText}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FeedbackList;