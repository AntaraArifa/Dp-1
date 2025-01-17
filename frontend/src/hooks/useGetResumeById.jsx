//useGetResumeById

import { setSingleResume } from '@/redux/resumeSlice'; // Replace with the actual action
import { RESUME_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function useGetResumeById(resumeId) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleResume = async () => {
      try {
        const res = await axios.get(`${RESUME_API_END_POINT}/${resumeId}`, { withCredentials: true });

                console.log(res.data)
          dispatch(setSingleResume(res.data.resume)); // Replace with the actual action to update Redux state
        
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    fetchSingleResume();
  }, [resumeId, dispatch]); // Dependencies: re-fetch if resumeId changes
}