import Job from "../model/job.model.js";
import Company from "../model/Company.model.js";
import mongoose from "mongoose";

// #1 Create a job
export const jobPortal = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experiencelavel,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experiencelavel ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Invalid company ID format.",
        success: false,
      });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(" "),
      salary,
      location,
      jobType,
      experiencelavel,
      position,
      company: companyId,
      createdBy: userId,
    });

    return res.status(200).json({
      message: "New job created successfully.",
      success: true,
      job,
    });
  } catch (error) {
    console.error("JOB CREATE ERROR:", error);
    return res.status(500).json({
      message: "Internal server error while creating job.",
      success: false,
    });
  }
};

// #2 Get all jobs (with keyword filtering)
export const getAlljobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("GET ALL JOBS ERROR:", error);
    return res.status(500).json({
      message: "Internal server error while fetching jobs.",
      success: false,
    });
  }
};

// #3 Get job by ID
export const getjobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        message: "Invalid job ID format.",
        success: false,
      });
    }

    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("GET JOB BY ID ERROR:", error);
    return res.status(500).json({
      message: "Internal server error while fetching job.",
      success: false,
    });
  }
};

// #4 Get all jobs created by the current admin
export const getadminjob = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ createdBy: adminId })
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found for this admin.",
        success: true, // still true if request is valid but empty
      });
    }

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("GET ADMIN JOBS ERROR:", error);
    return res.status(500).json({
      message: "Internal server error while fetching admin jobs.",
      success: false,
    });
  }
};
