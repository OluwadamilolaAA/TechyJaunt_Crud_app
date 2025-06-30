const express = require('express');
const router = express.Router();
const { addStudent, getAllStudents, countStudents, updateStudents, deleteStudent, searchStudent } = require('../controller/admin.controller');
const {isAuthenticated} = require('../middlewares/isAuth');


router.get('/get-student', getAllStudents);
router.get('/search-students', searchStudent);
router.get('/count-students', countStudents);
router.post('/add-student',isAuthenticated, addStudent);
router.put('/update-students/:studentId',isAuthenticated, updateStudents);
router.delete('/delete-student/:studentId',isAuthenticated, deleteStudent);


module.exports = router;