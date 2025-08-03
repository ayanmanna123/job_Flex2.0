import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setuser } from "../Redux/authSilce";

const ProfileUpdateDialog = ({ open, setopen }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phonenumber: user?.phonenumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, file });
  };

  const handleImageClick = () => inputRef.current.click();

  const handleProfilePhotoUpload = async (file) => {
    setIsUploadingPhoto(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.put(
        "http://localhost:5000/api/v1/user/upload-profile-photo",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setuser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to upload profile photo");
    } finally {
      setIsUploadingPhoto(false); // ✅ Done
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/profile/updateProfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setuser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
      setopen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
          setopen(false);
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center mb-4">
          <div className="relative w-[120px] h-[120px] rounded-full cursor-pointer group">
            <img
              src={user?.profile?.profilephoto || "/default.png"}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-[3px] border-gradient-to-r from-red-500 via-yellow-500 to-purple-600"
              onClick={handleImageClick}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={(e) => handleProfilePhotoUpload(e.target.files[0])}
            />
            <div
              onClick={handleImageClick}
              className="absolute bottom-0 right-0 bg-black rounded-full p-1 group-hover:opacity-100 opacity-80"
            >
              <Camera className="text-white w-4 h-4" />
            </div>
          </div>
        </div>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={input.fullname}
                name="fullname"
                onChange={changeHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={input.email}
                name="email"
                onChange={changeHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Number
              </Label>
              <Input
                id="number"
                value={input.phonenumber}
                name="phonenumber"
                onChange={changeHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                value={input.bio}
                name="bio"
                onChange={changeHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                value={input.skills}
                name="skills"
                onChange={changeHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                name="file"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || isUploadingPhoto}>
              {loading || isUploadingPhoto ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploadingPhoto ? "Uploading photo..." : "Updating..."}
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateDialog;