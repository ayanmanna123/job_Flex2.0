import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getadminjob,
  getAlljobs,
  getjobById,
  jobPortal,
} from "../controllers/job.controllers.js";
const jobroute = express.Router();
jobroute.route("/post").post(isAuthenticated, jobPortal);

jobroute.route("/getalljob").get(isAuthenticated, getAlljobs);

jobroute.route("/getadminjob").get(isAuthenticated, getadminjob);

jobroute.route("/get/:id").get(isAuthenticated, getjobById);

export default jobroute;
