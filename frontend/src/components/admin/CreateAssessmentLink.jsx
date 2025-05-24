// components/admin/CreateAssessmentLink.jsx
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CreateAssessmentLink = () => {
  return (
    <Link
      to="/admin/AssessmentCreator"  // Make sure this matches exactly
      className="hover:text-[#F83002] cursor-pointer"
      onClick={() => toast.success("Redirecting to Assessment Creator")}
    >
      Create Assessment
    </Link>
  );
};

export default CreateAssessmentLink;