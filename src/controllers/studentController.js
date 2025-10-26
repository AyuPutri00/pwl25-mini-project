const StudentModel = require('../models/studentModel');

class StudentController {
    // GET /students - Get all students
    static async getAllStudents(req, res) {
        try {
            const students = await StudentModel.getAllStudents();
            res.json({
                status: 'success',
                message: 'Students retrieved successfully',
                data: students,
                count: students.length
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error retrieving students',
                error: error.message
            });
        }
    }

    // GET /students/:id - Get student by ID
    static async getStudentById(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid student ID'
                });
            }

            const student = await StudentModel.getStudentById(id);

            if (!student) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Student not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Student retrieved successfully',
                data: student
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error retrieving student',
                error: error.message
            });
        }
    }

    // POST /students - Create new student
    static async createStudent(req, res) {
        try {
            const { name, nim, major, gpa, birthdate } = req.body;

            const newStudentId = await StudentModel.createStudent({
                name: name.trim(),
                nim: nim.trim(),
                major: major.trim(),
                gpa: parseFloat(gpa),
                birthdate: birthdate
            });

            res.status(201).json({
                status: 'success',
                message: 'Student created successfully',
                data: {
                    id: newStudentId,
                    name: name.trim(),
                    nim: nim.trim(),
                    major: major.trim(),
                    gpa: parseFloat(gpa),
                    birthdate: birthdate
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error creating student',
                error: error.message
            });
        }
    }

    // PUT /students/:id - Update student
    static async updateStudent(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid student ID'
                });
            }

            // Check if student exists
            const existingStudent = await StudentModel.getStudentById(id);
            if (!existingStudent) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Student not found'
                });
            }

            const { name, nim, major, gpa, birthdate } = req.body;

            const affectedRows = await StudentModel.updateStudent(id, {
                name: name.trim(),
                nim: nim.trim(),
                major: major.trim(),
                gpa: parseFloat(gpa),
                birthdate: birthdate
            });

            if (affectedRows === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Student not found or no changes made'
                });
            }

            res.json({
                status: 'success',
                message: 'Student updated successfully',
                data: {
                    id: parseInt(id),
                    name: name.trim(),
                    nim: nim.trim(),
                    major: major.trim(),
                    gpa: parseFloat(gpa),
                    birthdate: birthdate
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error updating student',
                error: error.message
            });
        }
    }

    // DELETE /students/:id - Delete student
    static async deleteStudent(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid student ID'
                });
            }

            // Check if student exists
            const existingStudent = await StudentModel.getStudentById(id);
            if (!existingStudent) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Student not found'
                });
            }

            const affectedRows = await StudentModel.deleteStudent(id);

            if (affectedRows === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Student not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Student deleted successfully',
                data: {
                    deletedStudentId: parseInt(id)
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error deleting student',
                error: error.message
            });
        }
    }
}

module.exports = StudentController;