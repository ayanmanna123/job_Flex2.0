import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyjob, getapplicationjob, getapplidejob, updatestatus } from "../controllers/aplication.controllers.js";
 
const applicationroute = express.Router();
applicationroute.route("/get").get(isAuthenticated, getapplidejob);              // Static first ✅
applicationroute.route("/apply/:id").get(isAuthenticated, applyjob);             // Dynamic after ✅
applicationroute.route("/:id/applicants").get(isAuthenticated, getapplicationjob);
applicationroute.route("/status/:id/update").post(isAuthenticated, updatestatus);

export default applicationroute;
