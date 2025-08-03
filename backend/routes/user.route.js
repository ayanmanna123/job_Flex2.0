import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  updateProfilePhoto,
} from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUplode } from "../middlewares/multer.js";

const router = express.Router();
import { verifyEmail } from "../controllers/user.controllers.js";

router.route("/verify-email").post(verifyEmail);

router.route("/register").post(singleUplode, register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// ✅ Fix applied here:
router
  .route("/profile/updateProfile")
  .post(isAuthenticated, singleUplode, updateProfile);
router
  .route("/upload-profile-photo")
  .put(isAuthenticated, singleUplode, updateProfilePhoto);
export default router;
