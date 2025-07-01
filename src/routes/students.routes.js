const express = require('express');
const router = express.Router();
const { addStudent, getAllStudents, countStudents, updateStudents, deleteStudent, searchStudent } = require('../controller/admin.controller');
const {isAuthenticated} = require('../middlewares/isAuth');


router.get('/get-student', getAllStudents);
router.get('/search-students', searchStudent);
router.get('/count-students', countStudents);
router.post('/add-student', addStudent);
router.put('/update-students/:studentId', updateStudents);
router.delete('/delete-student/:studentId', deleteStudent);


module.exports = router;