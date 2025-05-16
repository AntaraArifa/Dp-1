import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import {
  CodeBracketIcon,
  CpuChipIcon,
  PaintBrushIcon,
  ServerStackIcon,
  PresentationChartBarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const SkillAssessment = () => {
  const navigate = useNavigate();

  const quizzes = [
    {
      title: "Front End Developer",
      path: "/skillAssessment/quiz/frontend",
      icon: <CodeBracketIcon className="h-10 w-10 text-indigo-500" />,
      bg: "from-indigo-100 to-white",
    },
    {
      title: "Back End Developer",
      path: "/skillAssessment/quiz/backend",
      icon: <ServerStackIcon className="h-10 w-10 text-purple-500" />,
      bg: "from-purple-100 to-white",
    },
    {
      title: "Full Stack Developer",
      path: "/skillAssessment/quiz/fullstack",
      icon: <CpuChipIcon className="h-10 w-10 text-blue-500" />,
      bg: "from-blue-100 to-white",
    },
    {
      title: "Data Scientist",
      path: "/skillAssessment/quiz/datascientist",
      icon: <PresentationChartBarIcon className="h-10 w-10 text-emerald-500" />,
      bg: "from-emerald-100 to-white",
    },
    {
      title: "Business Analyst",
      path: "/skillAssessment/quiz/businessanalyst",
      icon: <AcademicCapIcon className="h-10 w-10 text-pink-500" />,
      bg: "from-pink-100 to-white",
    },
    {
      title: "UI/UX Designer",
      path: "/skillAssessment/quiz/uiux",
      icon: <PaintBrushIcon className="h-10 w-10 text-orange-500" />,
      bg: "from-orange-100 to-white",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 min-h-screen py-16">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 leading-snug">
            Ready to flex your skills? <br className="hidden sm:inline" />
            Jump into a quiz and find out!
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Dive into a variety of fun and challenging quizzes designed to test your knowledge
            and supercharge your confidence. Pick the role that fits your vibe — and let the
            questions lead you to growth and greatness!
            <span className="text-red-600 text-base font-semibold block mt-4">
              ⏱️ 20 questions · 20 minutes · The timer starts once you begin!
            </span>
          </p>

          {/* Quiz Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {quizzes.map((quiz) => (
              <div
                key={quiz.title}
                onClick={() => navigate(quiz.path)}
                className={`cursor-pointer bg-gradient-to-br ${quiz.bg} rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200`}
              >
                <div className="flex items-center justify-center mb-4">
                  {quiz.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {quiz.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SkillAssessment;
