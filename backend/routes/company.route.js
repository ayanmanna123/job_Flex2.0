import express from "express";
import { singleUplode } from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getcompanis,
  getCompanyId,
  regestercompany,
  updateCompany,
} from "../controllers/company.controllers.js";
const companyroute = express.Router();
companyroute.route("/regestercompany").post(isAuthenticated, regestercompany);
companyroute.route("/getcompanis").get(isAuthenticated, getcompanis);
companyroute.route("/get/:id").get(isAuthenticated, getCompanyId);
companyroute.route("/update/:id").put(isAuthenticated, singleUplode ,updateCompany);

export default companyroute;
