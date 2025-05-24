import React, { useState } from "react";
import useCreateAssessment from "../../hooks/useGetAllAssessments";

const SubmitAssessmentForm = ({ jobId }) => {
  const [formLink, setFormLink] = useState("");
  const [message, setMessage] = useState("");
  const { createAssessment, loading } = useCreateAssessment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAssessment({ jobId, link: formLink });
      setMessage("✅ Assessment link submitted!");
      setFormLink("");
    } catch {
      setMessage("❌ Failed to submit assessment link.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="url"
        required
        placeholder="Paste Google Form link"
        value={formLink}
        onChange={(e) => setFormLink(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Submitting..." : "Submit Assessment"}
      </button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
};

export default SubmitAssessmentForm;
