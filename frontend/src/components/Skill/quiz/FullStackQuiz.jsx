import React, { useState, useEffect } from "react";

const FullStackQuiz = () => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [currentSet, setCurrentSet] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = [
    {
      question: "Which JavaScript function is used to select an element by its ID?",
      options: ["getElementByClass", "getElementById", "querySelector", "queryById"],
      answer: "getElementById",
    },
    {
      question: "What is React primarily used for?",
      options: ["Developing Operating Systems", "Database Management", "Machine Learning", "Building User Interfaces"],
      answer: "Building User Interfaces",
    },
    {
      question: "Which HTML element is used for the largest heading?",
      options: ["<h1>", "<h6>", "<header>", "<head>"],
      answer: "<h1>",
    },
    {
      question: "What does CSS stand for?",
      options: ["Creative Style System", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
      answer: "Cascading Style Sheets",
    },
    {
      question: "What does REST stand for?",
      options: ["Representational State Transfer", "Resource State Transfer", "Rapid State Transfer", "Request State Transfer"],
      answer: "Representational State Transfer",
    },
    {
      question: "Which Node.js method is used to read a file?",
      options: ["readFileSync", "fs.readFile", "fs.read", "readFileAsync"],
      answer: "readFileSync",
    },
    {
      question: "What is the purpose of CORS in web development?",
      options: ["To control how resources are fetched", "To protect data from unauthorized access", "To allow cross-origin requests", "To parse JSON data"],
      answer: "To allow cross-origin requests",
    },
    {
      question: "Which tag is used to define an unordered list?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      answer: "<ul>",
    },
    {
      question: "What is the default display value of a <div> element?",
      options: ["inline", "inline-block", "block", "none"],
      answer: "block",
    },
    {
      question: "What is the purpose of JWT in backend development?",
      options: ["For managing database connections", "For user authentication and authorization", "For data storage", "For running background tasks"],
      answer: "For user authentication and authorization",
    },
    {
      question: "Which of the following is a SQL database?",
      options: ["MongoDB", "PostgreSQL", "Redis", "Cassandra"],
      answer: "PostgreSQL",
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Netscape", "Google", "Apple"],
      answer: "Netscape",
    },
    {
      question: "What is the correct syntax for a JavaScript array?",
      options: [
        "var arr = [1, 2, 3];",
        "var arr = (1, 2, 3);",
        "var arr = {1, 2, 3};",
        "var arr = <1, 2, 3>;",
      ],
      answer: "var arr = [1, 2, 3];",
    },
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "HyperLoop Machine Language",
        "None of the above",
      ],
      answer: "HyperText Markup Language",
    },
    {
      question: "Which CSS property is used to change text color?",
      options: ["color", "background-color", "font-color", "text-color"],
      answer: "color",
    },
    {
      question: "Which HTTP method is used to send data to the server?",
      options: ["GET", "POST", "PUT", "DELETE"],
      answer: "POST",
    },
    {
      question: "Which of the following is used to interact with MongoDB in Node.js?",
      options: ["mongoose", "express", "react", "angular"],
      answer: "mongoose",
    },
    {
      question: "Which of the following frameworks is used for building APIs in Node.js?",
      options: ["Express", "React", "Vue", "Angular"],
      answer: "Express",
    },
    {
      question: "In MongoDB, which of the following stores the actual data?",
      options: ["Collections", "Databases", "Documents", "Tables"],
      answer: "Documents",
    },
    {
      question: "Which of the following is a Node.js event-driven module?",
      options: ["HTTP", "express", "socket.io", "path"],
      answer: "HTTP",
    },
  ];

  const questionsPerSet = 10;

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setShowResult(true);
    }
  }, [timeLeft, showResult]);

  const handleAnswerClick = (selectedOption, questionIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
    if (selectedOption === questions[questionIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const moveToNextSet = () => {
    const startIndex = (currentSet - 1) * questionsPerSet;
    const allAnswered = questions
      .slice(startIndex, startIndex + questionsPerSet)
      .every((_, index) => selectedAnswers[startIndex + index] !== undefined);

    if (allAnswered) {
      if (currentSet * questionsPerSet >= questions.length) {
        setShowResult(true);
      } else {
        setCurrentSet((prevSet) => prevSet + 1);
      }
    } else {
      alert("Please answer all questions in this set before proceeding.");
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setShowResult(false);
    setTimeLeft(1200);
    setCurrentSet(1);
    setSelectedAnswers({});
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        🧩 Full Stack Developer Quiz
      </h1>
      <p className="text-center text-gray-600 text-lg mb-8">
        Test your full-stack knowledge in timed sets of{" "}
        <strong>10 questions</strong>. You must complete all questions in a set
        before moving forward. Let’s see what you’ve got!
      </p>

      {!showResult ? (
        <>
          <div className="text-center mb-6">
            <div className="inline-block bg-red-100 text-red-600 font-semibold px-5 py-2 rounded-full shadow-sm border border-red-300">
              ⏱️ Time Left: {formatTime()}
            </div>
          </div>

          <div className="space-y-8">
            {currentQuestions.map((question, index) => {
              const globalIndex = (currentSet - 1) * questionsPerSet + index;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Q{globalIndex + 1}. {question.question}
                  </h3>
                  <div className="space-y-3">
                    {question.options.map((option, idx) => {
                      const isSelected = selectedAnswers[globalIndex] === option;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerClick(option, globalIndex)}
                          className={`block w-full text-left px-5 py-3 rounded-lg transition-all font-medium
                            ${
                              isSelected
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-100 hover:bg-blue-100"
                            }`}
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

          <div className="text-center mt-10">
            <button
              onClick={moveToNextSet}
              className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              ➡️ Next Set
            </button>
          </div>
        </>
      ) : (
        <div className="text-center bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎉 Quiz Completed!
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Your Score:{" "}
            <span className="text-blue-600 font-semibold">
              {score}/{questions.length}
            </span>
          </p>
          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            🔁 Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default FullStackQuiz;
