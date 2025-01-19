import React, { useState, useEffect } from "react";

const FullStackQuiz = () => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [currentSet, setCurrentSet] = useState(1); // Track the current set of 5 questions
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

  const questions = [
    
    {
      question: "Which JavaScript function is used to select an element by its ID?",
      options: [
        "getElementByClass",
        "getElementById",
        "querySelector",
        "queryById",
      ],
      answer: "getElementById",
    },
    {
      question: "What is React primarily used for?",
      options: [
        "Developing Operating Systems",
        "Database Management",
        "Machine Learning",
        "Building User Interfaces",
      ],
      answer: "Building User Interfaces",
    },
    {
      question: "Which HTML element is used for the largest heading?",
      options: ["<h1>", "<h6>", "<header>", "<head>"],
      answer: "<h1>",
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Creative Style System",
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      question: "What does REST stand for?",
      options: [
        "Representational State Transfer",
        "Resource State Transfer",
        "Rapid State Transfer",
        "Request State Transfer",
      ],
      answer: "Representational State Transfer",
    },
    {
      question: "Which Node.js method is used to read a file?",
      options: ["readFileSync", "fs.readFile", "fs.read", "readFileAsync"],
      answer: "readFileSync",
    },
    {
      question: "What is the purpose of CORS in web development?",
      options: [
        "To control how resources are fetched",
        "To protect data from unauthorized access",
        "To allow cross-origin requests",
        "To parse JSON data",
      ],
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
      options: [
        "For managing database connections",
        "For user authentication and authorization",
        "For data storage",
        "For running background tasks",
      ],
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
        Full Stack Developer Quiz
      </h1>
      <p className="mb-4 text-left">
        Test your knowledge of full-stack development with this interactive quiz.
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

export default FullStackQuiz;
