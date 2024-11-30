import { Router } from "express";
import TeacherController from "../Controllers/teacher.controller.js";

// intialize a router
const teacherRouter = Router();
const teacherController =  new TeacherController()




teacherRouter.route('/get/students').get(teacherController.getAllstudents)

teacherRouter.route('/get/applied-gigs').get(teacherController.getAllappliedGigs)

teacherRouter.route('/get/my-profile').get(teacherController.getProfile)

teacherRouter.route('/get/my-student-counts').get(teacherController.getStudentCounts)

teacherRouter.route('/get/gigs').get(teacherController.getGigs)

teacherRouter.route('/post/my-profile/change-password').post(teacherController.changePassword)

teacherRouter.route('/post/my-profile/edit-profile-information').post(teacherController.editProfileInformation)

teacherRouter.route('/post/apply-to-gig/:gigId').post(teacherController.applyToGig)

teacherRouter.route('/get/teacher-name').get(teacherController.getName)


export default teacherRouter;