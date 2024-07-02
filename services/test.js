var testModel = require('../models/test');
var answersheetModel = require('../models/answersheet');
const testRegistrationModel = require('../models/testRegistration');

var createTest = async (req, res, next) => {
    var creator = req.user || null;
    if (creator == null || req.user.usertype != 'TEACHER') {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    req.check('title', 'Empty Title').notEmpty();
    req.check('questions', 'Invalid length of list of subjects').isArray({ min: 1 })
    req.check('questions.*', 'Invalid Null Subject').notEmpty();
    req.check('duration', 'Invalid duration').notEmpty();


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
    const tempdata = new testModel({
        title: req.body.title,
        questions: req.body.questions,
        duration: req.body.duration,
        createdBy: creator._id
    });

    try {
        const result = await tempdata.save();
        res.json({
            success: true,
            message: 'Test created successfully!'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Unable to create test"
        });
    }
}


var getAllTest = (req, res, next) => {
    var creator = req.user || null;
    if (creator == null) {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    try {
        testModel.find({ createdBy: creator?._id }).sort({ createdAt: -1 })
            .then((result) => {
                res.json({
                    success: true,
                    testlist: result.map(v => ({ _id: v._id, title: v.title , date:v.createdAt , total:v.questions.length , duration : v.duration }))
                })
            })

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            testlist: []
        })
    }

}

var getTestDetailsFromId = (req, res, next) => {
    var creator = req.user || null;
    if (creator == null) {
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

    testModel.findById({ _id: req.body.testid })
        .then(test => {
            if (test) {
            res.json({
            success: true,
            test: {
            _id: test._id,
            title: test.title,
            duration: test.duration,
            questions:test.questions
                    }
                })
            } else {
                res.json({
                    success: false,
                    message: 'test id not found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.json({
                success: false,
                message: 'Internal server error'
            });
            return;
        });


}

var testRegistration = (req, res, next) => {
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

    testModel.findById({ _id: req.body.testid })
        .then(result => {
                testRegistrationModel.find({ user: creator._id, test: req.body.testid })
                    .then(testRegFind => {
                        if (testRegFind.length > 0) {
                            console.log(testRegFind);
                            res.json({
                                success: false,
                                message: 'your registration for test is done'
                            })
                        } else {
                            var tempdata = new testRegistrationModel({
                                test: req.body.testid,
                                user: creator._id
                            })
                            tempdata.save().then(() => {
                                res.json({
                                    success: true,
                                    message: 'Test Registration success'
                                })
                            })
                                .catch(err => {
                                    res.json({
                                        success: false,
                                        message: 'Test Registration failed'
                                    })
                                })

                        }
                    })

        }).catch(err => {
            console.log(err);
            res.json({
                success: false
            })
        })
}

var getAllTestWithStudentRegisterCheck = async (req, res, next) => {
    var creator = req.user || null;
    if (creator == null || req.user.usertype != 'STUDENT') {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    var tests = await testModel.find().sort({ createdAt: -1 }).catch(err => {
        console.log(err);
        res.json({
            success: false,
            message: 'Internal server error'
        });
        return;
    });

    var testlist = new Array(tests.length);
    var registeredList = await testRegistrationModel.find({ user: creator._id }, { test: 1 }).catch(err => {
        console.log(err);
        res.json({
            success: false,
            message: 'Internal server error'
        });
        return;
    });
    for (x in tests) {
        var isReg = registeredList.find((test, index) => (test.test.toString() == tests[x]._id.toString()));
        testlist[x] = {
            _id: tests[x]._id,
            title: tests[x].title,
            isRegistered: (isReg !== undefined),
            duration: tests[x].duration
        };
    }


    res.json({
        success: true,
        testlist: testlist
    })

}

var getUpcomingTestforStudent = async (req, res, next) => {
    var creator = req.user || null;
    if (creator == null || req.user.usertype != 'STUDENT') {
        res.status(401).json({
            success: false,
            message: "Permissions not granted!"
        })
        return;
    }

    var tests = await testModel.find().catch(err => {
        console.log(err);
        res.json({
            success: false,
            message: 'Internal server error'
        });
        return;
    });

    var testlist = [];
    var registeredList = await testRegistrationModel.find({ user: creator._id }, { test: 1 }).catch(err => {
        console.log(err);
        res.json({
            success: false,
            message: 'Internal server error'
        });
        return;
    });
    var completedList = await answersheetModel.find({ student: creator._id }, { test: 1 }).catch(err => {
        console.log(err);
        res.json({
            success: false,
            message: 'Internal server error'
        });
        return;
    });
    for (x in tests) {
        var completed = completedList.find((test,index)=>(test.test.toString() == tests[x]._id.toString()));
        var isReg = registeredList.find((test, index) => (test.test.toString() == tests[x]._id.toString()));
        if (isReg && !completed) {
            testlist.push({
                _id: tests[x]._id,
                title: tests[x].title,
                duration: tests[x].duration,
            });
        }
    }
    res.json({
        success: true,
        upcomingtestlist: testlist
    })

}

module.exports = {
    createTest,
    getAllTest,
    getTestDetailsFromId,
    testRegistration,
    getAllTestWithStudentRegisterCheck,
    getUpcomingTestforStudent,
}