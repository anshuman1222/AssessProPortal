const subjectModel = require("../models/subject")
async function getAllSubject(req, res, next) {
    try {
        const subjects = await subjectModel.find({});

        const formattedSubjects = subjects.map((subject) => ({
            id: subject._id,
            subject: subject.name,
            status: subject.status,
        }));

        res.json({
            success: true,
            subjects: formattedSubjects,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
async function getAllActiveSubject(req, res, next) {
    try {
        const subjects = await subjectModel.find({ status: true });

        const formattedSubjects = subjects.map((subject) => ({
            id: subject._id,
            subject: subject.name,
            status: subject.status,
        }));

        res.json({
            success: true,
            subjects: formattedSubjects,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

var getStatusCount = (req, res, next) => {
    subjectModel.aggregate(
        [
            { $match: {} },
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

module.exports = {
    getAllSubject,
    getStatusCount,
    getAllActiveSubject
}