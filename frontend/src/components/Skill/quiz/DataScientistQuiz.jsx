import React, { useState, useEffect } from "react";

const DataScientistQuiz = () => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [currentSet, setCurrentSet] = useState(1); // Track the current set of 5 questions
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

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
      options: ["Principal Component Analysis", "Primary Component Analysis", "Probabilistic Component Analysis", "Partial Component Analysis"],
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
      question: "Which of the following is a popular data visualization library in Python?",
      options: ["NumPy", "Pandas", "Matplotlib", "SciPy"],
      answer: "Matplotlib",
    },
    {
      question: "What does 'normalization' refer to in data preprocessing?",
      options: [
        "Scaling data to a specific range",
        "Removing outliers from the dataset",
        "Converting categorical variables to numerical values",
        "Handling missing values",
      ],
      answer: "Scaling data to a specific range",
    },
    {
      question: "Which of the following methods can be used to prevent overfitting in a model?",
      options: ["Increase model complexity", "Use cross-validation", "Use a larger learning rate", "Reduce training data"],
      answer: "Use cross-validation",
    },
    {
      question: "Which of the following is a supervised learning algorithm?",
      options: ["K-Means", "KNN", "DBSCAN", "PCA"],
      answer: "KNN",
    },
    {
      question: "Which machine learning library is commonly used in Python?",
      options: ["SciPy", "Scikit-learn", "PyTorch", "TensorFlow"],
      answer: "Scikit-learn",
    },
    {
      question: "Which function in Python is used to compute the mean of an array?",
      options: ["mean()", "sum()", "average()", "numpy.mean()"],
      answer: "numpy.mean()",
    },
    {
      question: "What is the purpose of cross-validation in machine learning?",
      options: [
        "To evaluate the model's performance on different subsets of data",
        "To speed up the training process",
        "To prevent underfitting",
        "To tune hyperparameters",
      ],
      answer: "To evaluate the model's performance on different subsets of data",
    },
    {
      question: "Which of the following is a hyperparameter tuning technique?",
      options: ["Grid Search", "Gradient Descent", "Backpropagation", "Cross-Validation"],
      answer: "Grid Search",
    },
    {
      question: "What does the 'train-test split' refer to in data science?",
      options: [
        "Splitting the dataset into two halves",
        "Using data augmentation techniques",
        "Dividing data into training and testing subsets",
        "Handling missing values",
      ],
      answer: "Dividing data into training and testing subsets",
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
      <h1 className="text-center text-3xl font-bold text-left mb-6">
        Data Scientist Quiz
      </h1>
      <p className="mb-4 text-left">
        Test your knowledge of data science with this interactive quiz. Answer
        questions across multiple sets and track your progress! You must answer
        all the questions in one set to move to the next set.
      </p>
      <p className="text-center font-bold text-3xl">Best Of luck!</p>
      <br />
      {!showResult ? (
        <>
          <div className="timer text-xl font-semibold text-red-500 mb-6 bg-gray-100 border border-red-400 rounded-lg p-4 w-fit mx-auto text-center">
            Time Left: {formatTime()}
          </div>

          <div className="question-container">
            {currentQuestions.map((question, index) => {
              const globalIndex = (currentSet - 1) * questionsPerSet + index;

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
                          onClick={() => handleAnswerClick(option, globalIndex)}
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

export default DataScientistQuiz;
