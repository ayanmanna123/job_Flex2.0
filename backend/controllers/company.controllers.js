import Company from "../model/Company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const regestercompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Plese enter company name",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "you can not ste this company name",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userid: req.id,
    });
    return res.status(200).json({
      message: "company regester successfuly",
      company,
      success: true,
    });
  } catch (error) {
    console.error("COMPANY REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getcompanis = async (req, res) => {
  try {
    const userid = req.id;
    const companys = await Company.find({ userid });
    if (companys.length == 0) {
      return res.status(404).json({
        message: "companies not find ",
        success: false,
      });
    }
    return res.status(200).json({
      companys,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCompanyId = async (req, res) => {
  try {
    const CompanyId = req.params.id;

    const company = await Company.findById(CompanyId);
    if (!company) {
      return res.status(404).json({
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  let logo
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    if (file) {
      const fileUri = getDataUri(file);

      // Fixed Cloudinary upload configuration
      const myCloud = await cloudinary.uploader.upload(fileUri.content);

        logo = myCloud.secure_url;
    }
    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404)({
        message: "company not find",
        success: false,
        company,
      });
    }
    return res.status(200).json({
      message: "COmpany detels update ",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
