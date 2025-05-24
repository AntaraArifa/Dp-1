import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Groq from "groq-sdk";

const AssessmentCreator = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [
      {
        text: "",
        type: "multiple_choice",
        options: [""],
        correctAnswer: ""
      }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const navigate = useNavigate();

  const generateQuestionsWithAI = async () => {
    if (!formData.title) {
      toast.error("Please enter an assessment title first");
      return;
    }

    setLoadingSuggestions(true);
    try {
      const groq = new Groq({
        apiKey: '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',
        dangerouslyAllowBrowser: true,
      });

      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1000,
        messages: [
          {
            role: "system",
            content:
              'You are an expert assessment creator. Generate 5 professional assessment questions about ' +
              formData.title + 
              '. For each question, provide:\n' +
              '- question text\n' +
              '- question type (multiple_choice/text/coding)\n' +
              '- options (if multiple choice)\n' +
              '- correct answer\n' +
              'Return as JSON in this format:\n' +
              '{\n' +
              '  "questions": [\n' +
              '    {\n' +
              '      "text": "question text",\n' +
              '      "type": "question type",\n' +
              '      "options": ["option1", "option2", ...],\n' +
              '      "correctAnswer": "correct answer"\n' +
              '    }\n' +
              '  ]\n' +
              '}'
          },
          {
            role: "user",
            content: `Create assessment questions about ${formData.title} with description: ${formData.description}`
          }
        ]
      });

      const aiResponse = response.choices[0]?.message?.content.trim();
      if (aiResponse) {
        const jsonMatch = aiResponse.match(/\{.*\}/s);
        if (jsonMatch && jsonMatch[0]) {
          const parsedData = JSON.parse(jsonMatch[0]);
          setAiSuggestions(parsedData.questions || []);
          toast.success("AI-generated questions ready!");
        }
      }
    } catch (error) {
      toast.error("Failed to generate questions");
      console.error("AI generation error:", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setFormData({
      ...formData,
      questions: [...formData.questions, suggestion]
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          text: "",
          type: "multiple_choice",
          options: [""],
          correctAnswer: ""
        }
      ]
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.push("");
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleChange = (e, field, questionIndex, optionIndex = null) => {
    const updatedQuestions = [...formData.questions];
    
    if (optionIndex !== null) {
      // Updating an option
      updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    } else if (field === "type") {
      // Changing question type
      updatedQuestions[questionIndex][field] = e.target.value;
      // Reset options if changing from multiple choice
      if (e.target.value !== "multiple_choice") {
        updatedQuestions[questionIndex].options = [];
      } else if (updatedQuestions[questionIndex].options.length === 0) {
        updatedQuestions[questionIndex].options = [""];
      }
    } else {
      // Updating other fields
      updatedQuestions[questionIndex][field] = e.target.value;
    }
    
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Here you would typically save to your backend
      toast.success("Assessment created successfully!");
      navigate("/assessments");
    } catch (error) {
      toast.error("Failed to save assessment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      {/* You can reuse your same Header component */}
      
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Create New Assessment</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Assessment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="border rounded-lg p-3 w-full"
                placeholder="Enter assessment title"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <Input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="border rounded-lg p-3 w-full"
                placeholder="Enter assessment description"
              />
            </div>
          </div>

          {/* AI Generation Section */}
          <div className="mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={generateQuestionsWithAI}
              className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-500 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
              disabled={loadingSuggestions}
            >
              {loadingSuggestions ? 'Generating...' : 'Generate Questions with AI'}
            </motion.button>

            {/* Display AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="mt-6 mb-8 p-4 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">AI Suggestions</h3>
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                      <p className="font-medium">{suggestion.text}</p>
                      {suggestion.type === "multiple_choice" && (
                        <ul className="mt-2 ml-4 list-disc">
                          {suggestion.options.map((opt, i) => (
                            <li key={i}>{opt}</li>
                          ))}
                        </ul>
                      )}
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Correct Answer:</span> {suggestion.correctAnswer}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSelectSuggestion(suggestion)}
                        className="mt-2 bg-teal-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Add to Assessment
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Questions Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Questions</h3>
            
            {formData.questions.map((question, qIndex) => (
              <div key={qIndex} className="mb-6 p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Question {qIndex + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Question Text</label>
                  <Input
                    value={question.text}
                    onChange={(e) => handleChange(e, "text", qIndex)}
                    placeholder="Enter question text"
                    className="w-full"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Question Type</label>
                  <select
                    value={question.type}
                    onChange={(e) => handleChange(e, "type", qIndex)}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="text">Text Answer</option>
                    <option value="coding">Coding Challenge</option>
                  </select>
                </div>
                
                {question.type === "multiple_choice" && (
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Options</label>
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center mb-2">
                        <Input
                          value={option}
                          onChange={(e) => handleChange(e, "options", qIndex, oIndex)}
                          placeholder={`Option ${oIndex + 1}`}
                          className="flex-grow"
                          required
                        />
                        {oIndex === question.options.length - 1 && (
                          <button
                            type="button"
                            onClick={() => addOption(qIndex)}
                            className="ml-2 bg-gray-200 px-2 py-1 rounded"
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div>
                  <label className="block text-gray-700 mb-2">Correct Answer</label>
                  <Input
                    value={question.correctAnswer}
                    onChange={(e) => handleChange(e, "correctAnswer", qIndex)}
                    placeholder="Enter correct answer"
                    className="w-full"
                    required
                  />
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addQuestion}
              className="bg-black text-white text-sm px-4 py-2 rounded"
            >
              Add Question
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-500 transition-all duration-300 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Assessment'}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default AssessmentCreator;