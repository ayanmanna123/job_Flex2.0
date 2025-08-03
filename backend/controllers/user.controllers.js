import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
// #1 Create user
export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;

    if (!fullname || !email || !password || !phonenumber || !role) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const existingPhone = await User.findOne({ phonenumber });
    if (existingPhone) {
      return res.status(400).json({
        message: "This phone number is already registered.",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "A user already exists with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = crypto.randomBytes(3).toString("hex");
    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      verificationCode,
      role,
      profile: {
        profilephoto: cloudResponse.secure_url,
      },
    });
    await sendEmail(
      email,
      "Email Verification Code",
      `Your code is: ${verificationCode}`
    );
    return res.status(200).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Internal server error while registering.",
      success: false,
    });
  }
};

// #2 Login route
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found with this email.",
        success: false,
      });
    }

    // ✅ Check if user is verified
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials.",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(400).json({
        message: "Invalid credentials.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.jwt_Secret, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login successful.",
        success: true,
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phonenumber: user.phonenumber,
          role: user.role,
          profile: user.profile,
        },
      });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Internal server error during login.",
      success: false,
    });
  }
};

// #3 Logout route
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    return res.status(500).json({
      message: "Internal server error during logout.",
      success: false,
    });
  }
};

// #4 Update profile route
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;
    const userId = req.id; // Set by auth middleware

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "Please log in to update your profile.",
        success: false,
      });
    }

    // Update basic fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map((s) => s.trim());

    // File upload (resume)
    const file = req.file;
    if (file) {
      const fileUri = getDataUri(file);
      const myCloud = await cloudinary.uploader.upload(fileUri.content);

      if (myCloud) {
        user.profile.resume = myCloud.secure_url;
        user.profile.resumeOriginalName = file.originalname;
      }
    }

    await user.save();

    return res.json({
      message: "Profile updated successfully.",
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return res.status(500).json({
      message: "Internal server error while updating profile.",
      success: false,
    });
  }
};

export const updateProfilePhoto = async (req, res) => {
  try {
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const file = req.file;
    if (!file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    const fileUri = getDataUri(file);
    const upload = await cloudinary.uploader.upload(fileUri.content);

    user.profile.profilephoto = upload.secure_url;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile photo updated",
      profilephoto: upload.secure_url,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.verificationCode !== code) {
    return res.status(400).json({
      message: "Invalid verification code.",
      success: false,
    });
  }

  user.isVerified = true;
  user.verificationCode = undefined; // clear the code
  await user.save();

  return res.status(200).json({
    message: "Email verified successfully.",
    success: true,
  });
};
