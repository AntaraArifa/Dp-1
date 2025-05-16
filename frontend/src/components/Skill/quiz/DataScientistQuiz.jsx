import React, { useState, useEffect } from "react";

const DataScientistQuiz = () => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [currentSet, setCurrentSet] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = [
  {
    question: "What is the primary programming language for data science?",
    options: ["Java", "Python", "C++", "Ruby"],
    answer: "Python",
  },
  {
    question: "Which of the following is a data manipulation library in Python?",
    options: ["TensorFlow", "NumPy", "Pandas", "Matplotlib"],
    answer: "Pandas",
  },
  {
    question: "What does the term 'overfitting' mean in machine learning?",
    options: [
      "The model performs poorly on training data",
      "The model performs well on training data but poorly on new data",
      "The model performs equally well on training and testing data",
      "The model has too few features",
    ],
    answer: "The model performs well on training data but poorly on new data",
  },
  {
    question: "Which of the following is an unsupervised learning technique?",
    options: ["Linear Regression", "Decision Trees", "K-Means Clustering", "Logistic Regression"],
    answer: "K-Means Clustering",
  },
  {
    question: "Which machine learning algorithm is used for classification problems?",
    options: ["K-Means", "SVM", "PCA", "Linear Regression"],
    answer: "SVM",
  },
  {
    question: "What is the purpose of the 'train-test split' in data science?",
    options: [
      "To improve model accuracy",
      "To separate data for training and testing the model",
      "To handle missing data",
      "To reduce the number of features",
    ],
    answer: "To separate data for training and testing the model",
  },
  {
    question: "Which evaluation metric is most commonly used for classification tasks?",
    options: ["Mean Squared Error", "Accuracy", "R-Squared", "Log Loss"],
    answer: "Accuracy",
  },
  {
    question: "What does PCA stand for in machine learning?",
    options: [
      "Principal Component Analysis",
      "Primary Component Analysis",
      "Probabilistic Component Analysis",
      "Partial Component Analysis",
    ],
    answer: "Principal Component Analysis",
  },
  {
    question: "Which of the following is a type of deep learning model?",
    options: ["Random Forest", "Logistic Regression", "Convolutional Neural Networks", "Naive Bayes"],
    answer: "Convolutional Neural Networks",
  },
  {
    question: "Which function in Pandas is used to load a CSV file?",
    options: ["read_csv()", "load_csv()", "import_csv()", "parse_csv()"],
    answer: "read_csv()",
  },
  {
    question: "What is the purpose of the 'confusion matrix' in machine learning?",
    options: [
      "To measure model accuracy",
      "To visualize the distribution of data",
      "To evaluate the performance of a classification model",
      "To calculate feature importance",
    ],
    answer: "To evaluate the performance of a classification model",
  },
  {
    question: "Which Python library is primarily used for data visualization?",
    options: ["Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
    answer: "Matplotlib",
  },
  {
    question: "Which concept involves reducing the number of input variables?",
    options: ["Feature Engineering", "Feature Scaling", "Dimensionality Reduction", "Normalization"],
    answer: "Dimensionality Reduction",
  },
  {
    question: "What does 'NaN' stand for in data science?",
    options: ["New and Null", "Not a Node", "Not a Number", "None as Null"],
    answer: "Not a Number",
  },
  {
    question: "Which algorithm is best for detecting anomalies in data?",
    options: ["Linear Regression", "Isolation Forest", "KNN", "Naive Bayes"],
    answer: "Isolation Forest",
  },
  {
    question: "Which Python package is used for statistical modeling and tests?",
    options: ["Matplotlib", "NumPy", "SciPy", "Statsmodels"],
    answer: "Statsmodels",
  },
  {
    question: "Which metric is best for imbalanced classification problems?",
    options: ["Accuracy", "Precision", "Recall", "F1 Score"],
    answer: "F1 Score",
  },
  {
    question: "What is cross-validation used for?",
    options: [
      "Improving data quality",
      "Preventing overfitting",
      "Cleaning missing values",
      "Feature extraction",
    ],
    answer: "Preventing overfitting",
  },
  {
    question: "Which plot is best for visualizing the correlation between two variables?",
    options: ["Histogram", "Pie Chart", "Scatter Plot", "Box Plot"],
    answer: "Scatter Plot",
  },
  {
    question: "Which keyword is used to create a virtual environment in Python?",
    options: ["create", "python -m venv", "env_create", "venv_init"],
    answer: "python -m venv",
  },
];


  const questionsPerSet = 10;

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setShowResult(true);
    }
  }, [timeLeft, showResult]);

  const handleAnswerClick = (selectedOption, questionIndex) => {
    const alreadyAnswered = selectedAnswers[questionIndex] !== undefined;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));

    // Only score if this is the first time answering correctly
    if (!alreadyAnswered && selectedOption === questions[questionIndex].answer) {
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
        setCurrentSet((prev) => prev + 1);
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
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const currentQuestions = questions.slice(
    (currentSet - 1) * questionsPerSet,
    currentSet * questionsPerSet
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        🧠 Data Scientist Quiz
      </h1>
      <p className="text-center text-gray-600 text-lg mb-8">
        Test your data science knowledge with <strong>10-question sets</strong>.
        Complete a set before moving forward. Let’s see how much you know!
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
                <div key={globalIndex} className="bg-white p-6 rounded-xl shadow-md">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Quiz Completed!</h2>
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

export default DataScientistQuiz;
