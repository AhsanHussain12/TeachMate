import { Router } from "express";
import StudentController from "../Controllers/student.controller.js";
import authenticate from "../Middlewares/authentication.js";

const studentRouter = Router();
const studentController = new StudentController();

studentRouter.route('/get/my-profile').get(authenticate, studentController.getProfile); // working

studentRouter.route('/get/my-tuition-counts').get(authenticate, studentController.getTuitionCounts);

studentRouter.route('/get/student-gigs').get(authenticate, studentController.getStudentGigs); //working

studentRouter.route('/get/mygigs/applied-tutors/:gigId').get(authenticate, studentController.getAppliedTutors); // working

studentRouter.route('/get/student-name').get(authenticate, studentController.getName); //working

studentRouter.route('/get/teachers').get(authenticate, studentController.getTeachers); // working

studentRouter.route('/post/gig').post(authenticate, studentController.postGig); //working

studentRouter.route('/post/my-profile/change-password').post(authenticate, studentController.changePassword);

studentRouter.route('/post/my-profile/edit-profile-information').post(authenticate, studentController.editProfileInformation); // working



studentRouter.route('/register-user').post(studentController.studentSignup);

export default studentRouter;
