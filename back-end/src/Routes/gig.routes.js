import { Router } from "express";
import GigController from "../Controllers/gig.controller.js";

const GigRouter =Router()
const gigController = new GigController()


GigRouter.route('/get-details/:gigId').get(gigController.getGigDetails)

export default GigRouter;