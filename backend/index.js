import connectToMongo from "./utils/db.js";
import cookieParser from "cookie-parser";
import express, { json, Router } from "express";
import router from "./routes/user.route.js";
import companyroute from "./routes/company.route.js";
import jobroute from "./routes/job.route.js";
import applicationroute from "./routes/application.route.js"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
connectToMongo();
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello from backend",
  });
});
//Middlewere
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use("/api/v1/user", router);
app.use("/api/v2/company", companyroute);
app.use("/api/v3/job", jobroute);
app.use("/api/v4/application", applicationroute)
// "http://localhost:5000/api/v1/user/register"
// "http://localhost:5000/api/v1/user/login"
// "http://localhost:5000/api/v1/user/profile/updateProfile"
// "http://localhost:5000/api/v1/user/logout"

// company route

// "http://localhost:5000/api/v2/company/regestercompany"
// "http://localhost:5000/api/v2/company/getcompanis"
// "http://localhost:5000/api/v2/company/get/:id"
// "http://localhost:5000/api/v2/company/update/:id"

//job routes

// "http://localhost:5000/api/v3/post"
// "http://localhost:5000/api/v3/job/getalljob"
// "http://localhost:5000/api/v3/job/getadminjob"
// "http://localhost:5000/api/v3/jobget/:id"

app.listen(port, () => {
  console.log(`Website is running at http://localhost:${port}`);
});
