const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');
const { validateStudent } = require('../middleware/validate');

// GET /students - Get all students
router.get('/', StudentController.getAllStudents);

// GET /students/:id - Get student by ID
router.get('/:id', StudentController.getStudentById);

// POST /students - Create new student (with validation)
router.post('/', validateStudent, StudentController.createStudent);

// PUT /students/:id - Update student (with validation)
router.put('/:id', validateStudent, StudentController.updateStudent);

// DELETE /students/:id - Delete student
router.delete('/:id', StudentController.deleteStudent);

module.exports = router;