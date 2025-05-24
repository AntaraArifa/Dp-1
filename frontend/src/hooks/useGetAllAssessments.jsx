import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAssessments, setAssessmentLoadingStatus, setAssessmentError } from "@/redux/assessmentSlice";
import { ASSESSMENT_API_END_POINT } from "@/utils/constant"; // Define this in your constants

const useGetAllAssessments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAssessments = async () => {
      dispatch(setAssessmentLoadingStatus("loading"));
      try {
        const response = await axios.get(`${ASSESSMENT_API_END_POINT}/all`, {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setAssessments(response.data.assessments));
          dispatch(setAssessmentLoadingStatus("succeeded"));
        } else {
          dispatch(setAssessmentLoadingStatus("failed"));
          dispatch(setAssessmentError(response.data.message || "Failed to load assessments"));
        }
      } catch (err) {
        dispatch(setAssessmentLoadingStatus("failed"));
        dispatch(setAssessmentError(err.message || "Error fetching assessments"));
      }
    };

    fetchAssessments();
  }, [dispatch]);
};

export default useGetAllAssessments;
