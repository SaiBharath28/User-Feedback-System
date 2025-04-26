# User Feedback System

A full-stack application for collecting and managing user feedback with React, Node.js, and MongoDB.

![User Feedback System Interface](frontend/screenshots/Screenshot%202025-04-27%20013849.png)

## Features
- Submit feedback via form
- View feedback in admin dashboard
- Filter by category (bug/suggestion/feature)
- Sort by newest/oldest entries
- User authentication and role-based access
- Real-time notifications for new feedback

## Prerequisites
- Node.js v16+
- MongoDB v5+
- Git

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/SaiBharath28/User-Feedback-System.git
cd User-Feedback-System
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/feedback-system
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

Start backend:
```bash
npm run server
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Start frontend:
```bash
npm start
```

## Access the Application
* Frontend: http://localhost:3000
* Backend API: http://localhost:5000/api/feedback

## API Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|-------------|----------|
| `/api/feedback` | POST | Submit feedback | `{title, description, category, priority}` | Created feedback object |
| `/api/feedback` | GET | Get all feedback | - | Array of feedback objects |
| `/api/feedback/:id` | GET | Get feedback by ID | - | Single feedback object |
| `/api/feedback/:id` | PUT | Update feedback | `{title, description, category, priority}` | Updated feedback object |
| `/api/feedback/:id` | DELETE | Delete feedback | - | Success message |

## Project Structure
```
/backend
  /controllers
    feedback.controller.js
  /models
    feedback.model.js
    user.model.js
  /routes
    feedback.routes.js
    auth.routes.js
  /middleware
    auth.middleware.js
  app.js
  server.js
/frontend
  /public
  /src
    /components
      /feedback
      /auth
      /common
    /pages
      Dashboard.js
      Login.js
      FeedbackForm.js
    /services
      api.service.js
    App.js
```

## Troubleshooting

### MongoDB Connection Issues
Ensure MongoDB service is running:
```bash
mongod --version
net start MongoDB  # Windows
sudo systemctl start mongod  # Linux/Mac
```

### Port Conflicts
Change ports in `.env` (backend) or `.env.local` (frontend)

### Missing Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

## Deployment

### Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create user-feedback-system

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret_key

# Deploy
git push heroku main
```

### Deploy to Netlify (Frontend)
1. Create a `netlify.toml` file in your frontend directory:
```
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Connect your GitHub repository to Netlify and configure build settings.

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow ESLint configuration
- Write tests for new features
- Keep components modular and reusable
- Document API endpoints and component props

