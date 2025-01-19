import React, { useState, useEffect } from "react";

const FrontEndQuiz = () => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [currentSet, setCurrentSet] = useState(1); // Track the current set of 5 questions
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

  const questions = [
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
      question:
        "Which JavaScript function is used to select an element by its ID?",
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
      question: "Which tag is used to define an unordered list?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      answer: "<ul>",
    },
    {
      question: "What is the default display value of a <div> element?",
      options: [ "inline", "inline-block","block", "none"],
      answer: "block",
    },
    {
      question: "Which company developed JavaScript?",
      options: [ "Microsoft", "Netscape", "Google", "Apple"],
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
      question: "Which CSS property is used to change the background color?",
      options: ["background-color", "color", "bg-color", "background"],
      answer: "background-color",
    },
    {
      question:
        "Which JavaScript method is used to add a new element to the end of an array?",
      options: ["pop()", "shift()","push()", "unshift()"],
      answer: "push()",
    },
    {
      question: "What is the purpose of the z-index property in CSS?",
      options: [
        "Changes the font size",
        "Defines margins between elements",
        "Aligns text vertically",
        "Controls the stacking order of elements",
      ],
      answer: "Controls the stacking order of elements",
    },
    {
      question: "What is the correct HTML tag for inserting an image?",
      options: ["<image>", "<img>", "<src>", "<picture>"],
      answer: "<img>",
    },
    {
      question:
        "In JavaScript, what will the following expression return: `typeof '42'`?",
      options: ["string", "number", "undefined", "boolean"],
      answer: "string",
    },
    {
      question:
        "What is the purpose of the 'use strict' directive in JavaScript?",
      options: [
        "Optimizes code performance",
        "Enforces stricter parsing and error handling",
        "Defines variables globally",
        "Makes functions run faster",
      ],
      answer: "Enforces stricter parsing and error handling",
    },
    {
      question: "What does the `display: flex;` property do in CSS?",
      options: [
        "Makes the container inline",
        "Aligns items vertically",
        "Creates a flex container",
        "Defines element size",
      ],
      answer: "Creates a flex container",
    },
    {
      question: "What is the purpose of the 'this' keyword in JavaScript?",
      options: [
        "Refers to the current function",
        "Refers to the global object",
        "Refers to the object that is executing the current function",
        "Refers to the last executed function",
      ],
      answer: "Refers to the object that is executing the current function",
    },
    {
      question: "Which of the following is not a valid JavaScript data type?",
      options: ["null", "undefined", "NaN", "objectType"],
      answer: "objectType",
    },
    {
      question: "What is JSX in React?",
      options: [
        "A syntax extension for JavaScript",
        "A type of component",
        "A state management tool",
        "A CSS preprocessor",
      ],
      answer: "A syntax extension for JavaScript",
    },
    {
      question:
        "Which of the following methods is used to prevent the default action of an event in JavaScript?",
      options: [
        "stopPropagation()",
        "preventDefault()",
        "return false",
        "blockEvent()",
      ],
      answer: "preventDefault()",
    },
    {
      question:
        "Which of the following CSS properties is used to control the space between words in a paragraph?",
      options: ["word-spacing", "letter-spacing", "line-height", "text-indent"],
      answer: "word-spacing",
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
        Front End Developer Quiz
      </h1>
      <p className="mb-4 text-left">
        Test your knowledge of front-end development with this interactive quiz.
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

export default FrontEndQuiz;
