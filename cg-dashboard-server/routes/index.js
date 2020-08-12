const express = require('express')
const loginController  = require('../controllers/loginController');
const syncingController = require('../controllers/syncingController');
const enrollmentController = require('../controllers/enrollmentController');
const utilisationController = require('../controllers/utilisationController');
const learningController = require('../controllers/learningController');
const pretestStudentController = require('../controllers/pretestStudentController');
const posttestStudentController = require('../controllers/posttestStudentController');
const learningWithGradeFilterController = require('../controllers/learningWithGradeFilterController');
const learningWithSubjectFilterController = require('../controllers/learningWithSubjectFilterController');
const learningWithChapterFilterController = require('../controllers/learningWithChapterFilterController');
const improvementController = require('../controllers/improvementController');
const improvementWithSchoolFilterController = require('../controllers/improvementWithSchoolFilterController');
const improvementWithGradeFilterController = require('../controllers/improvementWithGradeFilterController');
const improvementWithSubjectFilterController = require('../controllers/improvementWithSubjectFilterController');
const regularityController = require('../controllers/regularityController');
const regularityWithMonthFilterController = require('../controllers/regularityWithMonthFilterController');
const regularityWithWeekFilterController = require('../controllers/regularityWithWeekFilterController');
const gradeListController = require('../controllers/gradeListController');
const regularityWithParameterController = require('../controllers/regularityWithParameterController');
const regularityWithParameterWithMonthFilterController = require('../controllers/regularityWithParameterWithMonthFilterController');
const regularityWithParameterWithWeekFilterController = require('../controllers/regularityWithParameterWithWeekFilterController');
const usageGradeWiseController = require('../controllers/usageGradeWiseController');
const usageFromRegularityController = require('../controllers/usageFromRegularityController');
const subjectCompletionWithGradeFilterController = require('../controllers/subjectCompletionWithGradeFilterController');
const chapterCompletionWithSubjectFilterController = require('../controllers/chapterCompletionWithSubjectFilterController');
const chapterProgressWithChapterFilterController = require('../controllers/chapterProgressWithChapterFilterController');
const chapterProgressStudentListController = require('../controllers/chapterProgressStudentListController');
const commonErrorReportController = require('../controllers/commonErrorReportController');
const questionDetailsController = require('../controllers/questionDetailsController');
const learningOnProjectLevelController = require('../controllers/learningOnProjectLevelController');
const improvementOnProjectLevelController = require('../controllers/improvementOnProjectLevelController');
const feedController  = require('../controllers/feedController');
const syncingMaxController = require('../controllers/syncingMaxController');
const utilisationMaxController = require('../controllers/utilisationMaxController');
const utilisationWithWeekFilterController = require('../controllers/utilisationWithWeekFilterController');
const usageWithWeekFilterController = require('../controllers/usageWithWeekFilterController');



var app = express();
//const { blogpost } = require('../controllers')

const router = express.Router()

router.post('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});//route to handle user registration
//router.post('/register',login.register);
//router.post('/login',login.login)
app.use('/api', router);
//console.log('12');
router.post('/login',loginController.loginController);
router.post('/feed',feedController.feedController);
router.post('/syncing',syncingController.syncingController);
router.post('/enrollment',enrollmentController.enrollmentController);
router.post('/utilisation',utilisationController.utilisationController);
router.post('/learning',learningController.learningController);
router.post('/pretestStudents',pretestStudentController.pretestStudentController);
router.post('/posttestStudents',posttestStudentController.posttestStudentController);
router.post('/learningWithGradeFilter',learningWithGradeFilterController.learningWithGradeFilterController);
router.post('/learningWithSubjectFilter',learningWithSubjectFilterController.learningWithSubjectFilterController);
router.post('/learningWithChapterFilter',learningWithChapterFilterController.learningWithChapterFilterController);
router.post('/improvement',improvementController.improvementController);
router.post('/improvementWithSchoolFilter',improvementWithSchoolFilterController.improvementWithSchoolFilterController);
router.post('/improvementWithGradeFilter',improvementWithGradeFilterController.improvementWithGradeFilterController);
router.post('/improvementWithSubjectFilter',improvementWithSubjectFilterController.improvementWithSubjectFilterController);
router.post('/regularity',regularityController.regularityController);
router.post('/regularityWithMonthFilter',regularityWithMonthFilterController.regularityWithMonthFilterController);
router.post('/regularityWithWeekFilter',regularityWithWeekFilterController.regularityWithWeekFilterController);
router.post('/gradelist',gradeListController.gradeListController);
router.post('/regularityWithParameters',regularityWithParameterController.regularityWithParameterController);
router.post('/regularityWithParameterWithMonthFilter',regularityWithParameterWithMonthFilterController.regularityWithParameterWithMonthFilterController);
router.post('/regularityWithParameterWithWeekFilter',regularityWithParameterWithWeekFilterController.regularityWithParameterWithWeekFilterController);
router.post('/usageGradeWise',usageGradeWiseController.usageGradeWiseController);
router.post('/usageFromRegularity',usageFromRegularityController.usageFromRegularityController);
router.post('/subjectCompletionWithGradeFilter',subjectCompletionWithGradeFilterController.subjectCompletionWithGradeFilterController);
router.post('/chapterCompletionWithSubjectFilter',chapterCompletionWithSubjectFilterController.chapterCompletionWithSubjectFilterController);
router.post('/chapterProgressWithChapterFilter',chapterProgressWithChapterFilterController.chapterProgressWithChapterFilterController);
router.post('/chapterProgressStudentList',chapterProgressStudentListController.chapterProgressStudentListController);
router.post('/commonErrorReport',commonErrorReportController.commonErrorReportController);
router.post('/questionDetails',questionDetailsController.questionDetailsController);
router.post('/learningOnProjectLevel',learningOnProjectLevelController.learningOnProjectLevelController);
router.post('/improvementOnProjectLevel',improvementOnProjectLevelController.improvementOnProjectLevelController);
router.post('/syncingMax',syncingMaxController.syncingMaxController);
router.post('/utilisationMax',utilisationMaxController.utilisationMaxController);
router.post('/utilisationWithWeekFilter',utilisationWithWeekFilterController.utilisationWithWeekFilterController);
router.post('/usageWithWeekFilter',usageWithWeekFilterController.usageWithWeekFilterController);





//router.post('/blogpost', blogpost.postBlogpost)

module.exports = router
