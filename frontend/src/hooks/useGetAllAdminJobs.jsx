import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setAllAdminJobs } from "@/Redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v3/job/getadminjob",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
          console.log(res.data.jobs);
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllAdminJobs;
