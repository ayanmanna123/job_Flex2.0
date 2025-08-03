import { Button } from "@/components/ui/button";
import Navbar from "./components/shared/Navbar.jsx";
import {
  Routes,
  Route,
  useNavigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home.jsx";
import Job from "./components/Job.jsx";
import Brouse from "./components/Brouse.jsx";
import Profile from "./components/profile.jsx";
import Jobdescription from "./components/Jobdescription.jsx";
import Companies from "./components/admin/Companies.jsx";
import CompantCreat from "./components/admin/CompantCreat.jsx";
import Companysetup from "./components/admin/Companysetup.jsx";
import AdminJobs from "./components/admin/AdminJobs.jsx";
import PostJob from "./components/admin/PostJob.jsx";
import Applicants from "./components/admin/Applicants.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import ProtectedRouteStudent from "./components/admin/ProtectedRouteStudent.jsx";
import VerifyEmail from "./components/VerifyEmail.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/user/varify",
    element: <VerifyEmail />,
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRouteStudent>
        <Job />
      </ProtectedRouteStudent>
    ),
  },
  {
    path: "/browse",
    element: (
      <ProtectedRouteStudent>
        <Brouse />
      </ProtectedRouteStudent>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRouteStudent>
        <Profile />,
      </ProtectedRouteStudent>
    ),
  },
  {
    path: "/discription/:id",
    element: (
      <ProtectedRouteStudent>
        <Jobdescription />
      </ProtectedRouteStudent>
    ),
  },
  // that is for admin only
  {
    path: "/admin/compnaies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admine/company/creat",
    element: (
      <ProtectedRoute>
        {" "}
        <CompantCreat />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admine/company/:id",
    element: (
      <ProtectedRoute>
        <Companysetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
