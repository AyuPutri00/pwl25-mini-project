require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import middleware
const logger = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

// Import routes
const studentRoutes = require('./routes/studentRoutes');

// Apply middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to UTS Students API',
        version: '1.0.0',
        endpoints: {
            'GET /students': 'Get all students',
            'GET /students/:id': 'Get student by ID',
            'POST /students': 'Create new student',
            'PUT /students/:id': 'Update student',
            'DELETE /students/:id': 'Delete student'
        }
    });
});

// API routes
app.use('/students', studentRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`🚀 UTS Students API running on http://localhost:${port}`);
    console.log(`🎓 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🗄️  Database: ${process.env.DB_NAME}`);
});