import React, { useState, useEffect } from "react";

const UiUxQuiz = () => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [currentSet, setCurrentSet] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = [
    {
      question: "What does UI stand for?",
      options: [
        "User Information",
        "User Interaction",
        "User Interface",
        "Unique Identification",
      ],
      answer: "User Interface",
    },
    {
      question: "What does UX stand for?",
      options: [
        "User Experience",
        "Universal Experience",
        "User Exchange",
        "Unique Exploration",
      ],
      answer: "User Experience",
    },
    {
      question: "Which of these is a key principle of UX design?",
      options: ["Aestheticism", "Functionality", "Usability", "Originality"],
      answer: "Usability",
    },
    {
      question: "What is the main focus of UI design?",
      options: [
        "Structuring data for backend systems",
        "Designing user interaction experiences",
        "Creating visually appealing interfaces",
        "Coding website functionality",
      ],
      answer: "Creating visually appealing interfaces",
    },
    {
      question: "Which tool is commonly used for wireframing?",
      options: ["Photoshop", "Figma", "Excel", "Premiere Pro"],
      answer: "Figma",
    },
    {
      question: "What is a user persona?",
      options: [
        "A fictional representation of a user",
        "A database entry of users",
        "A UI feature",
        "A marketing strategy",
      ],
      answer: "A fictional representation of a user",
    },
    {
      question: "What does usability testing involve?",
      options: [
        "Testing system functionality",
        "Observing users interacting with a product",
        "Checking software performance",
        "Debugging code errors",
      ],
      answer: "Observing users interacting with a product",
    },
    {
      question: "Which tool is not typically used in UI/UX design?",
      options: ["Figma", "Sketch", "Adobe XD", "PyCharm"],
      answer: "PyCharm",
    },
    {
      question: "What is the purpose of a wireframe?",
      options: [
        "To illustrate the product's visual design",
        "To define the basic layout and structure",
        "To add animations to the interface",
        "To simulate user interactions",
      ],
      answer: "To define the basic layout and structure",
    },
    {
      question: "What is the goal of prototyping?",
      options: [
        "To finalize the product design",
        "To test design concepts and interactions",
        "To develop the backend code",
        "To gather user data for analysis",
      ],
      answer: "To test design concepts and interactions",
    },
    {
      question: "What is the importance of accessibility in design?",
      options: [
        "To ensure products are usable by people with disabilities",
        "To make interfaces visually appealing",
        "To reduce development costs",
        "To enhance marketing efforts",
      ],
      answer: "To ensure products are usable by people with disabilities",
    },
    {
      question: "Which of these is a design principle?",
      options: [
        "Consistency",
        "Randomness",
        "Unpredictability",
        "Irregularity",
      ],
      answer: "Consistency",
    },
    {
      question: "What does 'responsive design' mean?",
      options: [
        "Adapting the layout to different screen sizes",
        "Improving website loading speed",
        "Adding animations to the design",
        "Reducing the number of UI components",
      ],
      answer: "Adapting the layout to different screen sizes",
    },
    {
      question: "What is the purpose of a heuristic evaluation?",
      options: [
        "To identify usability issues",
        "To create user personas",
        "To measure system performance",
        "To finalize the visual design",
      ],
      answer: "To identify usability issues",
    },
    {
      question: "What is an example of microinteraction?",
      options: [
        "A button changing color on hover",
        "The overall layout of a webpage",
        "The design of a navigation bar",
        "The typography of the text",
      ],
      answer: "A button changing color on hover",
    },
    {
      question: "What is a user journey map?",
      options: [
        "A step-by-step representation of user interactions",
        "A visual representation of the system architecture",
        "A layout of the UI components",
        "A roadmap for the development team",
      ],
      answer: "A step-by-step representation of user interactions",
    },
    {
      question: "Which of these is a common UX deliverable?",
      options: ["Sitemap", "Database schema", "CSS stylesheet", "Server logs"],
      answer: "Sitemap",
    },
    {
      question: "What is the purpose of A/B testing?",
      options: [
        "To compare two versions of a design",
        "To create user personas",
        "To test website performance",
        "To measure accessibility standards",
      ],
      answer: "To compare two versions of a design",
    },
    {
      question: "What is the importance of a design system?",
      options: [
        "To maintain consistency across products",
        "To create backend workflows",
        "To test user interactions",
        "To debug frontend issues",
      ],
      answer: "To maintain consistency across products",
    },
    {
      question: "Which of the following is a principle of material design?",
      options: [
        "Depth and shadows",
        "Flat elements",
        "Overloading content",
        "Random layouts",
      ],
      answer: "Depth and shadows",
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
        UI/UX Designer Quiz
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
