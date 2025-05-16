import React, { useState, useEffect } from "react";

const BackEndQuiz = () => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [currentSet, setCurrentSet] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = [
    {
      question: "What is Node.js?",
      options: [
        "A JavaScript library",
        "A JavaScript runtime",
        "A JavaScript framework",
        "None of the above",
      ],
      answer: "A JavaScript runtime",
    },
    {
      question: "Which of the following is a backend framework for Node.js?",
      options: ["Angular", "React", "Express", "Vue"],
      answer: "Express",
    },
    {
      question: "What is an API?",
      options: [
        "Application Programming Interface",
        "Automated Program Interface",
        "Application Process Interface",
        "None of the above",
      ],
      answer: "Application Programming Interface",
    },
    {
      question: "Which HTTP method is used to update a resource?",
      options: ["GET", "POST", "PUT", "DELETE"],
      answer: "PUT",
    },
    {
      question: "What is the default port number for HTTP?",
      options: ["8080", "443", "80", "3000"],
      answer: "80",
    },
    {
      question: "Which database is commonly used with Node.js?",
      options: ["MongoDB", "MySQL", "SQLite", "PostgreSQL"],
      answer: "MongoDB",
    },
    {
      question: "What is middleware in Express?",
      options: [
        "A database management system",
        "A layer of code that executes between the request and response",
        "A component that handles HTTP requests",
        "A client-side framework",
      ],
      answer: "A layer of code that executes between the request and response",
    },
    {
      question: "What is the purpose of the 'require()' function in Node.js?",
      options: [
        "To import external modules",
        "To execute a script",
        "To declare a variable",
        "None of the above",
      ],
      answer: "To import external modules",
    },
    {
      question: "Which of the following is a NoSQL database?",
      options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
      answer: "MongoDB",
    },
    {
      question: "What is CORS?",
      options: [
        "Cross-Origin Resource Sharing",
        "Cross-Origin Request Security",
        "Core-Origin Request Security",
        "None of the above",
      ],
      answer: "Cross-Origin Resource Sharing",
    },
    {
      question: "Which method is used to handle HTTP requests in Express?",
      options: ["get()", "post()", "all()", "use()"],
      answer: "get()",
    },
    {
      question: "What is the purpose of JSON in a backend application?",
      options: [
        "To store and retrieve data",
        "To authenticate users",
        "To represent data in a text format",
        "To format CSS files",
      ],
      answer: "To represent data in a text format",
    },
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Standard Query Language",
        "Sequential Query Language",
        "Simple Query Language",
      ],
      answer: "Structured Query Language",
    },
    {
      question:
        "Which of the following is an HTTP response status code for successful requests?",
      options: ["404", "500", "200", "301"],
      answer: "200",
    },
    {
      question:
        "Which of the following is used for server-side routing in Express?",
      options: ["router()", "route()", "path()", "server()"],
      answer: "router()",
    },
    {
      question: "What is a RESTful API?",
      options: [
        "A type of API based on REST architecture",
        "A type of API using GraphQL",
        "A type of database management API",
        "None of the above",
      ],
      answer: "A type of API based on REST architecture",
    },
    {
      question: "What is the purpose of the 'next()' function in Express?",
      options: [
        "To move to the next middleware function",
        "To end the request-response cycle",
        "To log the request data",
        "None of the above",
      ],
      answer: "To move to the next middleware function",
    },
    {
      question: "What does CRUD stand for?",
      options: [
        "Create, Read, Update, Delete",
        "Create, Remove, Use, Delete",
        "Copy, Read, Update, Delete",
        "Create, Run, Use, Delete",
      ],
      answer: "Create, Read, Update, Delete",
    },
    {
      question: "What is the purpose of JWT (JSON Web Tokens)?",
      options: [
        "To authenticate API requests",
        "To format data",
        "To store user information",
        "None of the above",
      ],
      answer: "To authenticate API requests",
    },
    {
      question: "Which tool is commonly used to manage Node.js dependencies?",
      options: ["npm", "yarn", "git", "docker"],
      answer: "npm",
    },
  ];

  const questionsPerSet = 10;

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setShowResult(true);
    }
  }, [timeLeft, showResult]);

  const handleAnswerClick = (selectedOption, questionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));

    if (selectedOption === questions[questionIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const moveToNextSet = () => {
    const startIndex = (currentSet - 1) * questionsPerSet;
    const endIndex = startIndex + questionsPerSet;

    const allAnswered = questions
      .slice(startIndex, endIndex)
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
        🔧 Back End Developer Quiz
      </h1>
      <p className="text-center text-gray-600 text-lg mb-8">
        Test your backend knowledge in timed sets of{" "}
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
                      const isSelected =
                        selectedAnswers[globalIndex] === option;

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

export default BackEndQuiz;
