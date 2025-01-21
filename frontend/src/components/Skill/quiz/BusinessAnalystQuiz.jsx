import React, { useState, useEffect } from "react";

const UiUxQuiz = () => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [currentSet, setCurrentSet] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = [
    {
      question: "What is the primary role of a Business Analyst?",
      options: [
        "Write code for software development",
        "Analyze and document business requirements",
        "Design user interfaces",
        "Test software applications",
      ],
      answer: "Analyze and document business requirements",
    },
    {
      question: "Which tool is commonly used for creating process diagrams?",
      options: ["JIRA", "MS Visio", "Postman", "Tableau"],
      answer: "MS Visio",
    },
    {
      question: "What does 'SWOT' stand for in analysis?",
      options: [
        "Strengths, Weaknesses, Opportunities, Threats",
        "Systems, Workflows, Outputs, Timelines",
        "Strategies, Weaknesses, Objectives, Techniques",
        "Scenarios, Ways, Outcomes, Threats",
      ],
      answer: "Strengths, Weaknesses, Opportunities, Threats",
    },
    {
      question: "Which document outlines the scope of a project?",
      options: [
        "Business Requirements Document (BRD)",
        "Technical Design Document (TDD)",
        "Test Plan",
        "Project Charter",
      ],
      answer: "Project Charter",
    },
    {
      question:
        "What is the primary focus of the 'AS-IS' process in business analysis?",
      options: [
        "To identify potential risks",
        "To understand the current state of processes",
        "To create future state workflows",
        "To develop a project roadmap",
      ],
      answer: "To understand the current state of processes",
    },
    {
      question: "What does 'BRD' stand for?",
      options: [
        "Business Research Document",
        "Business Requirements Document",
        "Budget Review Document",
        "Baseline Reference Document",
      ],
      answer: "Business Requirements Document",
    },
    {
      question: "What is a key activity during requirements elicitation?",
      options: [
        "Code debugging",
        "Interviewing stakeholders",
        "Creating test cases",
        "Designing databases",
      ],
      answer: "Interviewing stakeholders",
    },
    {
      question: "Which of these is an example of a functional requirement?",
      options: [
        "System must load within 3 seconds",
        "System must allow users to reset passwords",
        "System must use a modern database",
        "System must have a professional UI",
      ],
      answer: "System must allow users to reset passwords",
    },
    {
      question: "What is the purpose of a Use Case diagram?",
      options: [
        "To illustrate system architecture",
        "To show the interaction between actors and the system",
        "To map database schemas",
        "To document project timelines",
      ],
      answer: "To show the interaction between actors and the system",
    },
    {
      question: "What is a key benefit of Agile methodology?",
      options: [
        "Fixed project scope",
        "Incremental delivery of features",
        "Elimination of documentation",
        "Rigid timelines",
      ],
      answer: "Incremental delivery of features",
    },
    {
      question: "What is a stakeholder in business analysis?",
      options: [
        "A person affected by the project's outcome",
        "A competitor in the industry",
        "A business analyst's assistant",
        "A project's financial sponsor",
      ],
      answer: "A person affected by the project's outcome",
    },
    {
      question: "What is the purpose of a requirements traceability matrix?",
      options: [
        "To track project timelines",
        "To link requirements to project objectives",
        "To document stakeholder communication",
        "To manage system testing",
      ],
      answer: "To link requirements to project objectives",
    },
    {
      question: "What does a Gantt chart typically display?",
      options: [
        "Project timelines and task dependencies",
        "Financial forecasts",
        "System architecture",
        "Stakeholder roles",
      ],
      answer: "Project timelines and task dependencies",
    },
    {
      question: "What is a non-functional requirement?",
      options: [
        "Features users can directly interact with",
        "System's performance, security, and reliability",
        "System's data entry forms",
        "Steps for completing a user workflow",
      ],
      answer: "System's performance, security, and reliability",
    },
    {
      question: "Which analysis technique is used to identify the root cause of a problem?",
      options: [
        "Root Cause Analysis",
        "Stakeholder Analysis",
        "Data Flow Analysis",
        "Risk Analysis",
      ],
      answer: "Root Cause Analysis",
    },
    {
      question: "What is the purpose of a feasibility study?",
      options: [
        "To evaluate technical and financial viability of a project",
        "To design system interfaces",
        "To document system architecture",
        "To train end users",
      ],
      answer: "To evaluate technical and financial viability of a project",
    },
    {
      question: "What does the term 'scope creep' refer to?",
      options: [
        "Adding features beyond the original scope",
        "Reducing project budget",
        "Completing tasks ahead of schedule",
        "Delaying stakeholder meetings",
      ],
      answer: "Adding features beyond the original scope",
    },
    {
      question: "Which tool is commonly used for project management?",
      options: ["JIRA", "Figma", "SQL Server", "Tableau"],
      answer: "JIRA",
    },
    {
      question: "What is the main focus of stakeholder analysis?",
      options: [
        "Identifying stakeholder interests and influence",
        "Creating a stakeholder communication plan",
        "Documenting stakeholder issues",
        "Assigning tasks to stakeholders",
      ],
      answer: "Identifying stakeholder interests and influence",
    },
    {
      question: "Which deliverable is created during process modeling?",
      options: [
        "Flowchart",
        "User Story",
        "Test Plan",
        "Database Schema",
      ],
      answer: "Flowchart",
    },
  ];

  const questionsPerSet = 5;

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup the timer
    } else if (timeLeft === 0) {
      setShowResult(true); // Show result if time runs out
    }
  }, [timeLeft, showResult]);

  const handleAnswerClick = (selectedOption, questionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));

    // Update score only if the selected answer is correct
    if (selectedOption === questions[questionIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const moveToNextSet = () => {
    const startIndex = (currentSet - 1) * questionsPerSet;
    const endIndex = startIndex + questionsPerSet;

    // Check if all questions in the current set have been answered
    const allAnswered = questions
      .slice(startIndex, endIndex)
      .every((_, index) => selectedAnswers[startIndex + index] !== undefined);

    if (allAnswered) {
      if (currentSet * questionsPerSet >= questions.length) {
        // If all sets are finished, show the result
        setShowResult(true);
      } else {
        // Move to the next set
        setCurrentSet((prevSet) => prevSet + 1);
      }
    } else {
      alert("Please answer all questions in this set before proceeding.");
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setShowResult(false);
    setTimeLeft(1200); // Reset timer to 20 minutes
    setCurrentSet(1);
    setSelectedAnswers({}); // Reset selected answers
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const currentQuestions = questions.slice(
    (currentSet - 1) * questionsPerSet,
    currentSet * questionsPerSet
  );

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/* Title */}
      <h1 className="text-center text-3xl font-bold text-left mb-6">
        Business Analyst Quiz
      </h1>
      <p className="mb-4 text-left">
        Test your knowledge of backend development with this interactive quiz.
        Answer questions across multiple sets and track your progress! You must
        answer all the questions of one set to move to the next set.
        <br />
      </p>
      <p className="text-center font-bold text-3xl">Best of luck!</p>
      <br />

      {!showResult ? (
        currentQuestions.length > 0 ? (
          <>
            {/* Timer in a box */}
            <div className="timer text-xl font-semibold text-red-500 mb-6 bg-gray-100 border border-red-400 rounded-lg p-4 w-fit mx-auto text-center">
              Time Left: {formatTime()}
            </div>

            <div className="question-container">
              {currentQuestions.map((question, index) => {
                const globalIndex = (currentSet - 1) * questionsPerSet + index; // Calculate global index

                return (
                  <div key={index} className="mb-6">
                    <h3 className="text-lg mb-3 text-left">
                      Q{globalIndex + 1}: {question.question}
                    </h3>
                    <div className="options flex flex-col gap-4">
                      {question.options.map((option, idx) => {
                        const isSelected =
                          selectedAnswers[globalIndex] === option;

                        return (
                          <button
                            key={idx}
                            onClick={() =>
                              handleAnswerClick(option, globalIndex)
                            }
                            className={`${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200"
                            } text-black px-6 py-3 rounded-lg hover:bg-blue-700 w-full text-left`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={moveToNextSet}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 mt-6"
            >
              Next Set
            </button>
          </>
        ) : (
          <p>No questions available for this quiz.</p>
        )
      ) : (
        <div className="result text-left">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="mb-4">
            Your Score: {score}/{questions.length}
          </p>
          <button
            onClick={resetQuiz}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default UiUxQuiz;
