// 404 Error Handler - for routes not found
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`,
        error: 'Not Found'
    });
};

// 500 Error Handler - for internal server errors
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        status: 'error',
        message: message,
        error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.stack
    });
};

module.exports = {
    notFoundHandler,
    errorHandler
};