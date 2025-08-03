import React from "react";
import { LogOut } from "lucide-react";
import { User } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setuser } from "@/Redux/authSilce";
function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const naviget = useNavigate();
  const logouthandelar = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setuser(null));
        naviget("/");
        toast.success(res.data.message || "Logged out successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between mx-auto max-w-full p-3 h-13">
        <div className="flex justify-start ">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Flux</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <ul className="flex front-medium items-center gap-5">
            {user && user.role === "requiter" ? (
              <>
                <li>
                  <Link to="/admin/compnaies">Company</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/Home">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/Browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="items-center gap-2 flex">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Sign up
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    className="object-cover"
                    src={
                      user?.profile?.profilephoto ||
                      `https://api.dicebear.com/6.x/initials/svg?seed=${user?.fullname}`
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <ThemeToggle />
              <PopoverContent className="w-80">
                <div className="flex items-center ">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      className="object-cover"
                      src={
                        user?.profile?.profilephoto ||
                        `https://api.dicebear.com/6.x/initials/svg?seed=${user?.fullname}`
                      }
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    {user && user.role === "student" && (
                      <>
                        <User />
                        <Button variant="link">
                          <Link to={"/profile"}>view profile</Link>
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logouthandelar} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Navbar;
