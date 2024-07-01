var express = require('express');
var router = express.Router();
var loginService = require('../services/login');
var subjectService = require('../services/subject');
var questionService = require('../services/question');
var testService = require('../services/test');
var taketestService = require('../services/taketest');
var resultService = require('../services/result');

router.get('/details', loginService.userDetails);
router.get('/getAllSubjects', subjectService.getAllActiveSubject);
router.post('/changepassword', loginService.changePassword);


//questions
router.post('/addQuestion', questionService.addQuestion);
router.post('/searchQuestion', questionService.searchQuestion);
router.post('/updateQuestion', questionService.updateQuestion);
router.post('/getQuestion', questionService.getQuestionById);
router.get('/getAllQuestion', questionService.getAllQuestions);
router.get('/getActiveQuestions',questionService.getAllActiveQuestions);
router.post('/changeQuestionStatus', questionService.changeQuestionStatus);
router.post('/getAnswer', questionService.getAnsByQuestionId);
router.post('/getQuestionAnswer', questionService.getQuestionAnswerById);
router.post('/getTestQuestion',questionService.getQuestionAnswerByIds);

//test
router.post('/createTest', testService.createTest);
router.get('/getAllTest', testService.getAllTest);
router.post('/getTestById', testService.getTestDetailsFromId);
router.post('/testRegistration', testService.testRegistration);
router.get('/getAllTestStudent', testService.getAllTestWithStudentRegisterCheck);
router.get('/getUpcomingTests', testService.getUpcomingTestforStudent);
router.post('/startTest', taketestService.startTestForStudent);
router.post('/getQuenStarttime', taketestService.getQuestionsAndSetStartTime);
router.post('/saveAnswer', taketestService.saveAnswer);
router.post('/endTest', taketestService.saveAnswerandEndTest);
router.get('/getAllCompletedTest', resultService.getAllCompletedTest);
router.post('/getResultMainDetailsByTestId', resultService.getResultMainDetailsByTestId);
router.post('/getResultByTeacher', resultService.getResultByTeacherByTestId);
router.post('/getRankListByTestId', resultService.getRankListByTestId);
module.exports = router;