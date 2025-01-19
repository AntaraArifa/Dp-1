import React, { useState, useEffect } from "react";

const BackEndQuiz = () => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [currentSet, setCurrentSet] = useState(1); // Track the current set of 5 questions
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

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
      question: "Which of the following is an HTTP response status code for successful requests?",
      options: ["404", "500", "200", "301"],
      answer: "200",
    },
    {
      question: "Which of the following is used for server-side routing in Express?",
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
        Back End Developer Quiz
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

export default BackEndQuiz;
