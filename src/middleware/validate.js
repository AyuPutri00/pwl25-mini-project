const validateStudent = (req, res, next) => {
    // Check if request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Request body is required. Please provide name, nim, major, gpa, and birthdate'
        });
    }

    // Validate required fields
    const { name, nim, major, gpa, birthdate } = req.body;

    if (!name || !nim || !major || gpa === undefined || !birthdate) {
        return res.status(400).json({
            status: 'error',
            message: 'All fields are required: name, nim, major, gpa, and birthdate'
        });
    }

    // Validate data types
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            status: 'error',
            message: 'Name must be a non-empty string'
        });
    }

    if (typeof nim !== 'string' || nim.trim() === '') {
        return res.status(400).json({
            status: 'error',
            message: 'NIM must be a non-empty string'
        });
    }

    if (typeof major !== 'string' || major.trim() === '') {
        return res.status(400).json({
            status: 'error',
            message: 'Major must be a non-empty string'
        });
    }

    if (isNaN(gpa) || gpa < 0 || gpa > 4.0) {
        return res.status(400).json({
            status: 'error',
            message: 'GPA must be a number between 0.0 and 4.0'
        });
    }

    // Validate birthdate format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthdate)) {
        return res.status(400).json({
            status: 'error',
            message: 'Birthdate must be in YYYY-MM-DD format'
        });
    }

    const birthdateObj = new Date(birthdate);
    if (isNaN(birthdateObj.getTime())) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid birthdate'
        });
    }

    next();
};

module.exports = { validateStudent };