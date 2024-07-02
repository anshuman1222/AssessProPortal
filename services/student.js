const userModel = require("../models/user")
async function getAllStudents(req, res, next) {
    try {
        const students = await userModel.find({ usertype: "STUDENT" });

        const formattedStudents = students.map((student) => ({
            id: student._id,
            name: student.username,
            status: student.status,
        }));

        res.json({
            success: true,
            students: formattedStudents,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

module.exports = {
    getAllStudents
}