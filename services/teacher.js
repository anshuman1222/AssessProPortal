const userModel = require("../models/user")
var questionModel = require('../models/question');
var testModel = require('../models/test');

async function getAllTeacher(req, res, next) {
    try {
        const teachers = await userModel.find({ usertype: "TEACHER" });

        const formattedTeachers = teachers.map((teacher) => ({
            id: teacher._id,
            name: teacher.username,
            status: teacher.status,
        }));

        res.json({
            success: true,
            teachers: formattedTeachers,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

var getTeacherStatusCount = (req, res, next) => {
    userModel.aggregate(
        [
            { $match: { usertype: "TEACHER" } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]
    )
        .then((result) => {
            var trueCount = 0
            var falseCount = 0
            result.forEach((x) => {
                if (x._id == true) {
                    trueCount = x.count
                }
                if (x._id == false) {
                    falseCount = x.count
                }
            })
            res.json({
                success: true,
                active: trueCount,
                blocked: falseCount
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        })
}

var getDashboardCount = (req, res, next) => {
    errors = 0

    let activeStudents = 0
    let activeTests = 0
    let activeQuestions = 0
    let blockedQuestions = 0
    questionModel.aggregate(
        [
            { $match: { createdBy: req?.user?._id } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]
    )
        .then((result) => {
            result.forEach((x) => {
                if (x._id == true) {
                    activeQuestions = x.count
                }
                if (x._id == false) {
                    blockedQuestions = x.count
                }

            })
            userModel.aggregate(
                [
                    { $match: { usertype: "STUDENT" } },
                    { $group: { _id: "$status", count: { $sum: 1 } } }
                ]
            )
                .then((result) => {
                    result.forEach((x) => {
                        if (x._id == true) {
                            activeStudents = x.count
                        }
                    })
                    testModel.aggregate(
                        [
                            { $match: { createdBy: req?.user?._id } },
                            { $group: { _id: "$status", count: { $sum: 1 } } }
                        ]
                    )
                        .then((result) => {
                            result.forEach((x) => {
                                    activeTests = x.count
                            })
                            res.json({
                                success: true,
                                activeStudents,
                                activeTests,
                                activeQuestions,
                                blockedQuestions
                            })
                        })
                        .catch((err) => {
                            res.status(500).json({
                                success: false,
                                message: 'Internal Server Error'
                            })
                        })
                })
                .catch((err) => {
                    res.status(500).json({
                        success: false,
                        message: 'Internal Server Error'
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        })

}

module.exports = {
    getTeacherStatusCount,
    getAllTeacher,
    getDashboardCount
}