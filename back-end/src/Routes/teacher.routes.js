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
// check apply to gig functinality both from frontend and backend and also decide whether to fetch gig details here or a separate route
teacherRouter.route('/post/apply-to-gig').post(teacherController.applyToGig)

export default teacherRouter;