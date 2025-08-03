import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import usegetCompanybyid from "@/Hooks/usegetCompanybyid";

const Companysetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const singlecompany = useSelector((store) => store.company.singlecompany);

  const [loading, setLoading] = useState(false);
  const params = useParams();
  usegetCompanybyid(params.id);
  const navigate = useNavigate();

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/v2/company/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setInput({
      name: singlecompany?.name || "",
      description: singlecompany?.description || "",
      website: singlecompany?.website || "",
      location: singlecompany?.location || "",
      file: null, // never directly assign a file from Redux
    });
  }, [singlecompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <Button
          variant={"outline"}
          className={"flex items-center gap-2 text-gray-500"}
          onClick={() => navigate("/admin/compnaies")}
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <form onSubmit={submitHandler}>
          <div className="flex items-center justify-between p-8">
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 px-8">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div className="col-span-2">
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {loading ? (
            <Button>
              {" "}
              <Loader2 className={"w-full my-4 animate-spin"} />{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Companysetup;
