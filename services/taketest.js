var answersheetModel = require('../models/answersheet');
const questionModel = require('../models/question');
var testModel = require('../models/test');
const testRegistrationModel = require('../models/testRegistration');
var testService = require('./test');

var getAttemptEndTime = (test, startAttemptTime) => {
    var regularEndTime = new Date(Date.parse(startAttemptTime) + (test.duration * 1000));
    return regularEndTime
}

var sortByIds = (questions, questionids) => {
    var result = [];
    for (var i in questionids) {
        for (var j in questions) {
            if (questionids[i].toString() === questions[j]._id.toString()) {
                result.push(questions[j]);
                break;
            }
        }
    }
    return result;
}

var getIndex = (questionDetail, questionids) => {
    for (var j in questionids) {
        if (questionDetail._id.toString() === questionids[j].toString())
            return j;
    }
    return -1;
}

var calculateMarks = async (questionids, answers, ansid) => {
    var marks = 0;
    var questionDetails = await questionModel.find({ _id: { $in: questionids } })
        .catch(err => {
            console.log(err);
        })
    if (questionDetails.length !== questionids.length) {
        console.log("not all questions found");
        return;
    }
    for (var i in questionDetails) {
        var index = getIndex(questionDetails[i], questionids);
        if (index != -1 && answers[index] != null) {
            if (questionDetails[i].answer.toString() === answers[index].toString()) {
                marks += questionDetails[i].marks;
            }
        }
    }

    answersheetModel.findOneAndUpdate({ _id: ansid, completed: true }, { score: marks })
        .then(result => {
            console.log("score is added in answersheet " + ansid);
        })
        .catch(err => {
            console.log(err);
        })

}



var startTestForStudent = async (req, res, next) => {
    var creator = req.user || null;
    if (creator == null || req.user.usertype != 'STUDENT') {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    req.check('testid', 'empty test id').notEmpty();

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
        const test = await testModel.findById({ _id: req.body.testid });
        if (!test) {
            res.json({
                success: false,
                message: "Unable to find test"
            })
            return;
        }
                const testRegFind = await testRegistrationModel.find({ user: creator._id, test: req.body.testid });
                if (testRegFind.length > 0) {
                    const answersheets = await answersheetModel.find({ student: creator._id, test: req.body.testid });
                    if (answersheets.length > 0) {
                        const answersheet = answersheets[0];
                            answersheet.completed = true;
                            await answersheetModel.findByIdAndUpdate({ _id: answersheet._id }, answersheet);
                            console.log("answer sheet marked compeleted for test " + test._id + " user " + creator._id);
                            calculateMarks(test.questions, answersheet.answers, answersheet._id);
                            res.json({
                                success: false,
                                message: 'you have taken this test'
                            })
                    } else {
                        const tempdata = new answersheetModel({
                            test: req.body.testid,
                            student: creator._id
                        });
                        const newdata = await tempdata.save();
                        res.json({
                            success: true,
                            message: 'Test started',
                            answersheet: newdata,
                            questions: test.questions
                        })
                    }
                } else {
                    res.json({
                        success: false,
                        message: "You are not registered"
                    })
                }
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Unable to start test"
        })
    }
}

var getQuestionsAndSetStartTime = async (req, res, next) => {
    var creator = req.user || null;
    if (creator == null || req.user.usertype != 'STUDENT') {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    req.check('addStartTime', 'boolean to add start time not found').isBoolean();
    req.check('answersheetid', 'answersheet id not found').notEmpty();
    req.check('questionid', 'Invalid length of list of question').isArray({ min: 1 });
    req.check('questionid.*', 'Invalid question id').notEmpty();

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

    var ques = await questionModel.find({ _id: { $in: req.body.questionid } });
    var questions = sortByIds(ques, req.body.questionid);

    var startTime = "";
    if (req.body.addStartTime) {
        startTime = new Date();
        var answersheet = await answersheetModel.findByIdAndUpdate({ _id: req.body.answersheetid }, { startTime: startTime })
            .catch((err => {
                res.json({
                    success: false,
                    message: "Internal server error"
                })
                return;
            }))
    } else {
        var answersheet = await answersheetModel.findById({ _id: req.body.answersheetid })
            .catch((err => {
                res.json({
                    success: false,
                    message: "Internal server error"
                })
                return;
            }))
        if (answersheet) {
            startTime = answersheet.startTime;
        }
    }
    console.log(startTime);
    if (startTime > 0) {
        res.json({
            success: true,
            startTime: startTime,
            questions: questions.map(x => ({
                _id: x._id,
                body: x.body,
                options: x.options,
                marks: x.marks,
                subject: x.subject
            }))
        })
    } else {
        res.json({
            success: false,
            message: "answersheet not found"
        })
    }

}

var saveAnswer = async (req, res, next) => {
    var creator = req.user || null;
    if (creator == null || req.user.usertype != 'STUDENT') {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    req.check('answersheetid', 'answersheet id not found').notEmpty();
    req.check('answers', 'Invalid length of list of answers').isArray({ min: 1 });

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

    var answersheet = await answersheetModel.findById({ _id: req.body.answersheetid })
        .catch((err => {
            res.json({
                success: false,
                message: "Internal server error"
            })
            return;
        }))
    if (answersheet) {
        if (answersheet.completed) {
            res.json({
                success: true,
                testDone: true,
                message: "Test is completed"
            })
            return;
        }
        var test = await testModel.findById({ _id: answersheet.test })
            .catch((err) => {
                console.log(err);
                console.log("could not mark answersheet completed");
            })

        if (Date.now() - getAttemptEndTime(test, answersheet.startTime) > 0) {
            answersheetModel.findByIdAndUpdate({ _id: req.body.answersheetid }, { answers: req.body.answers, completed: true })
                .then(() => {
                    res.json({
                        success: true,
                        testDone: true,
                        message: "answers updated"
                    })
                    calculateMarks(test.questions, req.body.answers, req.body.answersheetid);
                }).catch((err) => {
                    console.log(err);
                    console.log("could not update answers and complete test");
                })
        }
        else {
            answersheetModel.findByIdAndUpdate({ _id: req.body.answersheetid }, { answers: req.body.answers })
                .then(() => {
                    res.json({
                        success: true,
                        testDone: false,
                        message: "answers updated"
                    })
                }).catch((err) => {
                    console.log(err);
                    console.log("could not update answers");
                })
        }
    } else {
        res.json({
            success: false,
            message: "Answersheet not found"
        })
    }
}

const saveAnswerandEndTest = async (req, res, next) => {
    var creator = req.user || null;
    if (creator == null || req.user.usertype != 'STUDENT') {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    req.check('answersheetid', 'answersheet id not found').notEmpty();
    req.check('answers', 'Invalid length of list of answers').isArray({ min: 1 });

    var answersheet = await answersheetModel.findById({ _id: req.body.answersheetid })
        .catch((err => {
            res.json({
                success: false,
                message: "Internal server error"
            })
            return;
        }))

    if (answersheet) {
        if (answersheet.completed) {
            res.json({
                success: false,
                message: "Test is completed"
            })
            return;
        }
        var test = await testModel.findById({ _id: answersheet.test })
            .catch((err) => {
                console.log(err);
                console.log("could not mark answersheet completed");
            })

        if (Date.now() - getAttemptEndTime(test, answersheet.startTime) > 10 * 1000) {
            answersheet.completed = true;
            answersheetModel.findByIdAndUpdate({ _id: req.body.answersheetid }, answersheet)
                .then(() => {
                    console.log("answer sheet marked compeleted for test " + test._id + " user " + creator._id);
                    res.json({
                        success: true,
                        message: "Test is completed"
                    })
                    calculateMarks(test.questions, answersheet.answers, answersheet._id);
                })
                .catch((err) => {
                    console.log(err);
                    console.log("could not mark answersheet completed");
                })
        } else {
            answersheetModel.findByIdAndUpdate({ _id: req.body.answersheetid }, { answers: req.body.answers, completed: true })
                .then(() => {
                    res.json({
                        success: true,
                        message: "Test is completed"
                    })
                    calculateMarks(test.questions, req.body.answers, answersheet._id);
                }).catch((err) => {
                    console.log(err);
                    console.log("could not update answers and complete test");
                })
        }

    } else {
        res.json({
            success: false,
            message: "Answersheet not found"
        })
    }
}


module.exports = {
    startTestForStudent,
    getQuestionsAndSetStartTime,
    saveAnswer,
    saveAnswerandEndTest

}