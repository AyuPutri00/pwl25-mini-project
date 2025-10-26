CREATE DATABASE IF NOT EXISTS `uts_students_db`;
USE `uts_students_db`;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nim VARCHAR(20) UNIQUE NOT NULL,
    major VARCHAR(255) NOT NULL,
    gpa DECIMAL(3, 2) NOT NULL,
    birthdate DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO students (name, nim, major, gpa, birthdate) VALUES
('Ahmad Rizki Pratama', '2021001001', 'Teknik Informatika', 3.85, '2003-05-15'),
('Siti Nurhaliza', '2021001002', 'Sistem Informasi', 3.92, '2003-08-22'),
('Budi Santoso', '2021001003', 'Teknik Komputer', 3.67, '2002-12-10'),
('Dewi Sartika', '2021001004', 'Teknik Informatika', 3.78, '2003-03-18'),
('Eko Prasetyo', '2021001005', 'Sistem Informasi', 3.45, '2003-07-25'),
('Fitri Handayani', '2021001006', 'Teknik Komputer', 3.89, '2002-11-08'),
('Gilang Ramadhan', '2021001007', 'Teknik Informatika', 3.56, '2003-01-30'),
('Hana Pertiwi', '2021001008', 'Sistem Informasi', 3.94, '2003-09-12');