import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setLoding } from "@/Redux/authSilce.js";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button.jsx";
import { Loader2, LoaderIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import axios from "axios";

import { setSignupEmail } from "@/Redux/authSilce.js";
const signup = () => {
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const changeEventHandaler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  };
  const { loding, user } = useSelector((store) => store.auth); // Replace 'auth' with your actual slice name

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    const fromdata = new FormData();
    fromdata.append("fullname", input.fullname);
    fromdata.append("email", input.email);
    fromdata.append("phonenumber", input.phonenumber);
    fromdata.append("password", input.password);
    fromdata.append("role", input.role);
    if (input.file) {
      fromdata.append("file", input.file);
    }
    try {
      dispatch(setLoding(true));
      const res = await axios.post(
        `http://localhost:5000/api/v1/user/register`,
        fromdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setSignupEmail(input.email));

        toast.success(res.data.message);
        navigate("/user/varify");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoding(false));
    }
  };
  useEffect(() => {
    if (user) {
      toast.error("At first logout this page");
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-3xl mx-auto gap-2">
        <form
          onSubmit={submitHandler}
          className=" w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">signup</h1>
          <div className="my-2">
            <Label>Full name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandaler}
              placeholder="ayan manna"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandaler}
              placeholder="ayam@gmail.com"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phonenumber}
              name="phonenumber"
              onChange={changeEventHandaler}
              placeholder="+91 1234567890"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandaler}
              placeholder="123@example"
            />
          </div>
          <div className="flex justify-between items-center">
            <RadioGroup
              defaultValue="option-one"
              className={"flex items-center gap-4 my-4"}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandaler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="requiter"
                  checked={input.role === "requiter"}
                  onChange={changeEventHandaler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
            <div>
              {loding ? (
                <Button>
                  {" "}
                  <Loader2 className={"w-full my-4 animate-spin"} />{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Login
                </Button>
              )}
              <span className="text-sm">
                Already have an account?
                <Link to="/login" className="text-blue-600">
                  {" "}
                  login
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signup;
