import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((store) => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                // Check if searchedQuery is valid and not empty
                if (!searchedQuery || typeof searchedQuery !== 'string' || searchedQuery.trim() === "") {
                    console.error("Invalid or empty search query.");
                    return;
                }

                // Ensure JOB_API_END_POINT is correct
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${encodeURIComponent(searchedQuery)}`,  // Properly encode the query for URL
                    { withCredentials: true }  // Send cookies if needed
                );

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));  // Store the jobs in Redux state
                } else {
                    console.error("No jobs found.");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);  // Log any errors
            }
        };

        if (searchedQuery) {  // Only fetch if searchedQuery is valid
            fetchAllJobs();
        }
    }, [dispatch, searchedQuery]);  // Re-fetch when searchedQuery changes
};

export default useGetAllJobs;
