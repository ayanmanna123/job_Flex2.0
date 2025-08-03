import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
  // you can prefill if you store email in localStorage
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.signupEmail);
  const { loding ,user } = useSelector((store) => store.auth);
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/verify-email",
        {
          email,
          code,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login"); // or wherever you want to send after verification
      } else {
        toast.error(res.data.message || "Verification failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };
   useEffect(() => {
      if (user) {
        toast.error("At first logout this page ")
        navigate("/");
      }
    }, []);
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>

        <div>
          <label className="block mb-1 font-medium">Verification Code</label>
          <Input
            type="text"
            value={code}
            placeholder="Enter the code sent to your email"
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Verifying..." : "Verify Email"}
        </Button>
      </form>
    </div>
  );
};

export default VerifyEmail;
