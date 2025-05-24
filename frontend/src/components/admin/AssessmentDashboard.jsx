// src/pages/AssessmentDashboard.jsx

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar"; // ✅ Adjust path if necessary

const AssessmentDashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("assessments") || "[]");
    setAssessments(stored);
  }, []);

  return (
    <>
      <Navbar /> {/* ✅ Add Navbar at the top */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Assessments</h1>
          <Button onClick={() => navigate("/create-assessment")}>Create New</Button>
        </div>
        {assessments.length === 0 ? (
          <p className="text-gray-600">No assessments created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessments.map((a) => (
              <div
                key={a.id}
                onClick={() => navigate(`/admin/assessments/${a.id}`)}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <Card>
                  <CardContent className="p-6 space-y-2">
                    <h2 className="text-xl font-semibold">{a.title}</h2>
                    <p className="text-gray-600 text-sm">{a.description}</p>
                    <p className="text-sm text-gray-500">{a.questions.length} questions</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AssessmentDashboard;
