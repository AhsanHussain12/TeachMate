import { Router } from "express";
import StudentController from "../Controllers/student.controller.js";
import authenticate from "../Middlewares/authentication.js";

const studentRouter = Router();
const studentController = new StudentController();

studentRouter.route('/get/my-profile').get(authenticate, studentController.getProfile);

studentRouter.route('/get/my-tuition-counts').get(authenticate, studentController.getTuitionCounts);

studentRouter.route('/get/gigs').get(authenticate, studentController.getGigs);

studentRouter.route('/post/gig').post(authenticate, studentController.postGig);

studentRouter.route('/post/my-profile/change-password').post(authenticate, studentController.changePassword);

studentRouter.route('/post/my-profile/edit-profile-information').post(authenticate, studentController.editProfileInformation);

studentRouter.route('/get/student-name').get(authenticate, studentController.getName);

studentRouter.route('/register-user').post(studentController.studentSignup);

export default studentRouter;
