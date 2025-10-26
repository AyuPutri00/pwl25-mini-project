const db = require('../config/database');

// Get all students
const getAllStudents = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM students ORDER BY created_at DESC');
        return rows;
    } catch (error) {
        console.error('Error fetching students:', error.message);
        throw new Error(`Could not fetch students: ${error.message}`);
    }
};

// Get student by ID
const getStudentById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching student by ID:', error.message);
        throw new Error(`Could not fetch student by ID: ${error.message}`);
    }
};

// Create new student
const createStudent = async (studentData) => {
    try {
        const { name, nim, major, gpa, birthdate } = studentData;
        const [result] = await db.query(
            'INSERT INTO students (name, nim, major, gpa, birthdate) VALUES (?, ?, ?, ?, ?)',
            [name, nim, major, gpa, birthdate]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating student:', error.message);
        throw new Error(`Could not create student: ${error.message}`);
    }
};

// Update student
const updateStudent = async (id, studentData) => {
    try {
        const { name, nim, major, gpa, birthdate } = studentData;
        const [result] = await db.query(
            'UPDATE students SET name = ?, nim = ?, major = ?, gpa = ?, birthdate = ? WHERE id = ?',
            [name, nim, major, gpa, birthdate, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating student:', error.message);
        throw new Error(`Could not update student: ${error.message}`);
    }
};

// Delete student
const deleteStudent = async (id) => {
    try {
        const [result] = await db.query ('DELETE FROM students WHERE id = ?', [id]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error deleting student: ', error.message);
        throw new error(`Could not delete student: ${error.message}`)
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};