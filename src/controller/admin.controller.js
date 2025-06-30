const Student = require('../models/student.schema');

// Create new student
const addStudent = async (req, res) => {
    const{firstName, lastName, email, age} = req.body;
    //validate input
    if(!firstName || !lastName || !email || !age ) {
        return res.status(400).json({message: 'All fields are required'});
    }
    try{
// Create new student
const newStudent = new Student({
    firstName, 
    lastName,
    email,
    age
});
await newStudent.save();
return res.status(200).json({message: 'Student added successfully'})
} catch(error){
    console.error("Error creating student:", error);
    return res.status(500).json({message: 'Internal Server Error'})
}
}

// get all students
const getAllStudents = async(req, res) => {
    try{
         const students = await Student.find();
         return res.status(200).json({ students });
    } catch(error){
        console.error("Error fetching students:", error);
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

// Count students
const countStudents = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    return res.status(200).json({ count });
  } catch (error) {
    console.error('Error counting students:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update students
const updateStudents = async (req, res) => {
    const { studentId } = req.params;
    const { firstName, lastName, email, age } = req.body;

    //check if student with the given ID exit
    try{
        const student = await Student.findById(studentId);
        if(!student) {
            return res.status(404).json({message: 'Student not found'})
        }
        // Update student details
        student.firstName = firstName || student.firstName;
        student.lastName = lastName || student.lastName;
        student.email = email || student.email;
        student.age = age || student.age;
        await student.save();
        return res.status(200).json({message: 'Student updated successfully'});
    } catch(error){
        console.error("Error updating a student:", error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

// Delete a student
const deleteStudent = async(req, res) => {
    const {studentId} = req.params;
    try{
        const student = await Student.findByIdAndDelete(studentId);
        if(!student){
            return res.status(404).json({message: 'Student Not Found'})
        }
        return res.status(200).json({message: 'Student Deleted Successfully'});
    } catch(error){
        console.error("Error deleting Student:", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

// SearchStudent 
const searchStudent = async (req, res) => {
    const {lastName} = req.query;
    try{
        const student = await Student.findOne({ lastName : lastName });
        if(!student) {
            return res.status(404).json({message: 'Student Not Found'});
        }
        return res.status(200).json({ student });
    } catch(error){
        console.error("Error searching student:", error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = {
    addStudent,
    getAllStudents,
    countStudents,
    updateStudents,
    deleteStudent,
    searchStudent

};