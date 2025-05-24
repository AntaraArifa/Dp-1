import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Groq from "groq-sdk";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Plus, Trash2, Send } from "lucide-react";



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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Create New Assessment
            </h1>
            <p className="text-gray-600">Build and customize your evaluation process</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Assessment Metadata */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assessment Title
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="h-12 rounded-lg text-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Senior Developer Skills Evaluation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="min-h-[120px] rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the purpose and scope of this assessment..."
                  />
                </div>
              </div>

              {/* AI Assistant Panel */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <BrainCircuit className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">AI Assistant</h3>
                </div>
                <p className="text-sm text-blue-800 mb-6">
                  Generate relevant questions using our AI-powered assistant. 
                  Simply provide a title and description to get started.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={generateQuestionsWithAI}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition-all"
                  disabled={loadingSuggestions}
                >
                  {loadingSuggestions ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">🌀</span>
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <BrainCircuit className="w-5 h-5" />
                      Generate Questions
                    </span>
                  )}
                </motion.button>
              </div>
            </div>

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  AI Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors shadow-sm"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                          {suggestion.type.replace(/_/g, ' ')}
                        </span>
                        <button
                          onClick={() => handleSelectSuggestion(suggestion)}
                          className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Add Question
                        </button>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{suggestion.text}</h4>
                      {suggestion.type === "multiple_choice" && (
                        <div className="space-y-2">
                          {suggestion.options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <span className="text-gray-400">{i + 1}.</span>
                              <span className="text-gray-700">{opt}</span>
                              {opt === suggestion.correctAnswer && (
                                <span className="ml-2 px-1.5 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                  Correct
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Questions List */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold text-gray-900">Assessment Questions</h3>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Question
                </button>
              </div>

              <div className="space-y-6">
                {formData.questions.map((question, qIndex) => (
                  <motion.div
                    key={qIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-sm font-medium text-gray-500">
                        Question {qIndex + 1}
                      </span>
                      <button
                        onClick={() => removeQuestion(qIndex)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Question Text
                        </label>
                        <Input
                          value={question.text}
                          onChange={(e) => handleChange(e, "text", qIndex)}
                          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your question here..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Question Type
                        </label>
                        <select
                          value={question.type}
                          onChange={(e) => handleChange(e, "type", qIndex)}
                          className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="multiple_choice">Multiple Choice</option>
                          <option value="text">Text Answer</option>
                          <option value="coding">Coding Challenge</option>
                        </select>
                      </div>

                      {question.type === "multiple_choice" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">
                              Options
                            </label>
                            <button
                              type="button"
                              onClick={() => addOption(qIndex)}
                              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                            >
                              <Plus className="w-4 h-4" />
                              Add Option
                            </button>
                          </div>
                          <div className="space-y-2">
                            {question.options.map((option, oIndex) => (
                              <div key={oIndex} className="flex items-center gap-2">
                                <Input
                                  value={option}
                                  onChange={(e) => handleChange(e, "options", qIndex, oIndex)}
                                  className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                                  placeholder={`Option ${oIndex + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Correct Answer
                        </label>
                        <Input
                          value={question.correctAnswer}
                          onChange={(e) => handleChange(e, "correctAnswer", qIndex)}
                          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter the correct answer..."
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="border-t pt-8 mt-12">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">🌀</span>
                    Saving Assessment...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Save & Publish Assessment
                  </span>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCreator