import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useNavigate } from "react-router-dom";

const SkillAssessment = () => {
  const navigate = useNavigate();

  const quizzes = [
    { title: "Front End Developer", path: "/quiz/frontend" },
    { title: "Back End Developer", path: "/quiz/backend" },
    { title: "Full Stack Developer", path: "/quiz/fullstack" },
    { title: "Data Scientist", path: "/quiz/datascientist" },
    { title: "Business Analyst", path: "/quiz/businessanalyst" },
    { title: "UI/UX Designer", path: "/quiz/uiux" },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-extrabold mb-6">
          Want to assess your skill? Why not try giving a quiz?
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Explore a range of skill assessments designed to challenge your knowledge and boost your confidence.
          Select a role that aligns with your career goals, and let the quiz guide you on your journey to professional growth.
        </p>
        <div className="flex flex-col items-center gap-6 mt-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.title}
              onClick={() => navigate(quiz.path)}
              className="w-60 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition-all text-center"
            >
              {quiz.title}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SkillAssessment;
