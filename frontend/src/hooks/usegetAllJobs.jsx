 import { setAlljobs } from '@/Redux/jobSlice'
 
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v3/job/getalljob?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAlljobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs