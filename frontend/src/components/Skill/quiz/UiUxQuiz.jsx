import React, { useState, useEffect } from "react";

const UiUxQuiz = () => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200);
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
      🎨 UI/UX Designer Quiz
    </h1>
    <p className="text-center text-gray-600 text-lg mb-8">
      Test your knowledge in timed sets of <strong>10 questions</strong>. You must complete all questions in a set before moving forward. Good design is intentional — so are these questions!
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
                              ? "bg-purple-600 text-white hover:bg-purple-700"
                              : "bg-gray-100 hover:bg-purple-100"
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
          <span className="text-purple-600 font-semibold">
            {score}/{questions.length}
          </span>
        </p>
        <button
          onClick={resetQuiz}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          🔁 Retake Quiz
        </button>
      </div>
    )}
  </div>
);

};

export default UiUxQuiz;
