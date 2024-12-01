import { Router } from "express";
import TeacherController from "../Controllers/teacher.controller.js";
import authenticate from "../Middlewares/authentication.js";

// intialize a router
const teacherRouter = Router();
const teacherController =  new TeacherController()




teacherRouter.route('/get/students').get(authenticate,teacherController.getAllstudents)

teacherRouter.route('/get/applied-gigs').get(authenticate,teacherController.getAllappliedGigs)

teacherRouter.route('/get/my-profile').get(authenticate,teacherController.getProfile)

teacherRouter.route('/get/my-student-counts').get(authenticate,teacherController.getStudentCounts)

teacherRouter.route('/get/gigs').get(authenticate,teacherController.getGigs)

teacherRouter.route('/post/my-profile/change-password').post(authenticate,teacherController.changePassword)

teacherRouter.route('/post/my-profile/edit-profile-information').post(authenticate,teacherController.editProfileInformation)

teacherRouter.route('/post/apply-to-gig/:gigId').post(authenticate,teacherController.applyToGig)

teacherRouter.route('/get/teacher-name').get(authenticate,teacherController.getName)

teacherRouter.route('/register-user').post(teacherController.teacherSignup)

export default teacherRouter;