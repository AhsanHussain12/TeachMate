import { Router } from "express";
import AdminController from "../Controllers/admin.controller.js";
import authenticate from "../Middlewares/authentication.js";

const adminRouter = Router();
const adminController = new AdminController()

adminRouter.route('/get/assigned-gigs').get(authenticate,adminController.getAssignedGigs)

adminRouter.route('/get/pending-gigs').get(authenticate,adminController.getPendingGigs)

adminRouter.route('/get/assigned-gigs/applied-tutors/:gigId').get(authenticate,adminController.getAppliedTutors)

adminRouter.route('/get/pending-gigs/get/admins').get(authenticate,adminController.getAdmins)

adminRouter.route('/get/admin-info').get(authenticate,adminController.getAdminName)

adminRouter.route('/post/gig-to-admin').post(authenticate,adminController.AssignGigToAdmin)

adminRouter.route('/post/gig-to-tutor').post(authenticate,adminController.setGigStatus)

adminRouter.route('/remove/admin/:adminId').delete(authenticate,adminController.removeAdmin)

adminRouter.route('/add/admin').post(authenticate,adminController.AddAdmin)

export default adminRouter;