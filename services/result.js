const answersheetModel = require("../models/answersheet");
const testModel = require("../models/test");
const subjectModel = require("../models/subject");
const testService = require("./test");
const userModel = require("../models/user")

const getAllCompletedTest = (req, res, next) => {
    var creator = req.user || null;
    if (creator == null || req.user.usertype != 'STUDENT') {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    answersheetModel.find({ student: creator._id, completed: true }, { test: 1 })
        .then(result => {
            var testids = result.map(x => (x.test))
            testModel.find({ _id: { $in: testids } }).sort()
                .then(tests => {
                    res.json({
                        success: true,
                        completedtestlist: tests.map(t => ({
                            _id: t._id,
                            title: t.title,
                        }))
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        success: false,
                        message: 'Internal server error in test'
                    })
                })
        }).catch(err => {
            console.log(err);
            res.json({
                success: false,
                message: 'Internal server error in answersheet'
            })
        })
}

const getResultMainDetailsByTestId = (req, res, next) => {
    var creator = req.user || null;
    if (creator == null || req.user.usertype != 'STUDENT') {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    req.check('testid', 'Test id not found').notEmpty();

    var errors = req.validationErrors()
    if (errors) {
        console.log(errors);
        res.json({
            success: false,
            message: 'Invalid inputs',
            errors: errors
        })
        return;
    }

    answersheetModel.find({ student: creator._id, test: req.body.testid, completed: true })
        .then(answersheets => {
            if (answersheets[0]) {
                testModel.findById({ _id: req.body.testid })
                    .then(test => {
                        if (test) {
                                    res.json({
                                        success: true,
                                        result: {
                                            title: test.title,
                                            score: answersheets[0].score,
                                            questions: test.questions,
                                            answers: answersheets[0].answers
                                        }
                                    })
                        } else {
                            res.json({
                                success: false,
                                message: 'Answer sheet not found'
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                        res.json({
                            success: false,
                            message: 'Internal server error'
                        })
                    })
            } else {
                res.json({
                    success: false,
                    message: 'Answer sheet not found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.json({
                success: false,
                message: 'Internal server error'
            })
            return;
        })

}




const getResultByTeacherByTestId = (req, res, next) => {
    var creator = req.user || null;
    if (creator == null || req.user.usertype != 'TEACHER') {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    req.check('testid', 'Test id not found').notEmpty();

    var errors = req.validationErrors()
    if (errors) {
        console.log(errors);
        res.json({
            success: false,
            message: 'Invalid inputs',
            errors: errors
        })
        return;
    }

    answersheetModel.find({ student: req.body.userid , test: req.body.testid, completed: true })
        .then(answersheets => {
            if (answersheets[0]) {
                testModel.findById({ _id: req.body.testid })
                    .then(test => {
                        if (test) {
                            res.json({
                                success: true,
                                result: {
                                    title: test.title,
                                    score: answersheets[0].score,
                                    questions: test.questions,
                                    answers: answersheets[0].answers
                                }
                            })
                        } else {
                            res.json({
                                success: false,
                                message: 'Answer sheet not found'
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                        res.json({
                            success: false,
                            message: 'Internal server error'
                        })
                    })
            } else {
                res.json({
                    success: false,
                    message: 'Answer sheet not found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.json({
                success: false,
                message: 'Internal server error'
            })
            return;
        })

}






const getRankListByTestId = async (req, res, next) => {
    var creator = req.user || null;
    if (creator == null || req.user.usertype != 'TEACHER') {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    req.check('testid', 'Test id not found').notEmpty();

    var errors = req.validationErrors()
    if (errors) {
        console.log(errors);
        res.json({
            success: false,
            message: 'Invalid inputs',
            errors: errors
        })
        return;
    }
    try {
    const answerSheets = await answersheetModel.find({ test: req.body.testid });
    const studentScores = await Promise.all(answerSheets.map(async (answerSheet) => {
        const user = await userModel.findById(answerSheet.student);
        return {
            username: user.username,
            score: answerSheet.score
        };
    }));

    studentScores.sort((a, b) => b.score - a.score);
    res.json({
        success: true,
        ranklist:studentScores
    })
    }  catch (err) {
        res.json({
            success: false,
            message: 'Internal server error'
        })
    }
}

module.exports = {
    getAllCompletedTest,
    getResultMainDetailsByTestId,
    getRankListByTestId,
    getResultByTeacherByTestId
}