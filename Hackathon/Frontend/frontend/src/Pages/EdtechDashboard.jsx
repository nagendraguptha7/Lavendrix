import React, { useState } from "react";
import {
  FiTrendingUp,
  FiUpload,
  FiAlertTriangle,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiUsers,
  FiActivity,
  FiBarChart2,
  FiStar,
  FiEye,
  FiClock
} from "react-icons/fi";

const EdtechDashboard = () => {
  const [files, setFiles] = useState([]);
  const [analysisResult] = useState({
    engagementDropProbability: 72,
    dropFactors: ["Content Fatigue", "Interaction Gaps"],
    suggestedActions: ["Gamification Features", "Personalized Recommendations"],
    userActivityLossImpact: "Moderate",
    engagementInsights:
      "Moderate engagement drop probability detected. Enhance interactive elements and personalization features to boost user engagement.",
    accessibilityScore: 6.8,
    performanceScore: 84,
    engagementRisk: "Moderate"
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleAnalyze = () => {
    // In a real app, you'd send files to backend
    console.log("Analyzing with files:", files);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/60">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="bg-gradient-to-br from-blue-700 to-indigo-700 p-3 rounded-xl shadow-lg">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
              EdTech Engagement & Accessibility Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-full px-5 py-2 shadow-sm">
            <span className="font-semibold text-blue-800">Online Learning Platform Enhancement</span>
            <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium border-l-4 border-purple-600">
              High Traffic
            </span>
          </div>
        </div>

        {/* Upload Section - Multiple files */}
        <div className="bg-blue-50/70 rounded-2xl p-6 border-2 border-dashed border-blue-300 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FiUpload className="w-5 h-5 text-blue-700" />
            <h2 className="font-semibold text-blue-800">Upload Specifications</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 w-full">
              <label className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1 block">
                LMS_System_Requirements.pdf / multiple files
              </label>
              <div className="flex items-center bg-white rounded-full border border-blue-200 hover:border-blue-500 transition-colors overflow-hidden">
                <div className="pl-4">
                  <FiFileText className="w-5 h-5 text-blue-500" />
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="flex-1 py-3 px-3 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-800"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-100 px-4 py-2 rounded-full whitespace-nowrap">
              <FiUpload className="w-4 h-4" />
              <span>{files.length ? `${files.length} file(s) selected` : "Upload .pdf, .doc, .txt"}</span>
            </div>
          </div>

          {/* File list preview */}
          {files.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium mb-1 text-blue-800">Selected files:</p>
              <ul className="list-disc list-inside">
                {files.map((file, idx) => (
                  <li key={idx} className="text-blue-700">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Project Analysis Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Engagement Risk</p>
                <p className="text-xl font-bold text-yellow-600">{analysisResult.engagementRisk}</p>
              </div>
              <FiUsers className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Accessibility Score</p>
                <p className="text-xl font-bold text-green-600">{analysisResult.accessibilityScore}/10</p>
              </div>
              <FiEye className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Performance</p>
                <p className="text-xl font-bold text-blue-600">{analysisResult.performanceScore}%</p>
              </div>
              <FiActivity className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleAnalyze}
            className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-3"
          >
            <FiBarChart2 className="w-5 h-5" />
            Analyze Project
          </button>
        </div>

        {/* Main Analysis Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Engagement Drop Predictor */}
          <div className="space-y-6">
            {/* Engagement Drop Predictor */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FiTrendingUp className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-800">Engagement Drop Predictor</h2>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <p className="text-blue-800 text-sm">
                  <span className="font-semibold">Input Details:</span> Online Learning Platform focused on interactive courses and high user engagement.
                </p>
              </div>

              {/* Engagement Drop Probability */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Engagement Drop Probability</span>
                  <span className="text-2xl font-bold text-orange-600">{analysisResult.engagementDropProbability}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-orange-500 h-2.5 rounded-full"
                    style={{ width: `${analysisResult.engagementDropProbability}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">Moderate Risk</p>
              </div>

              {/* Drop Factors */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Drop Factors</h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.dropFactors.map((factor, idx) => (
                    <span key={idx} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggested Actions */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Suggested Actions</h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.suggestedActions.map((action, idx) => (
                    <span key={idx} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FiCheckCircle className="w-4 h-4" />
                      {action}
                    </span>
                  ))}
                </div>
              </div>

              {/* User Activity Loss Impact */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">User Activity Loss Impact</h3>
                <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-medium inline-flex items-center gap-2">
                  <FiXCircle className="w-5 h-5" />
                  {analysisResult.userActivityLossImpact}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Engagement Metrics & Insights */}
          <div className="space-y-6">
            {/* Accessibility Score Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FiEye className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-800">Accessibility Metrics</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">WCAG Compliance</p>
                  <p className="text-lg font-bold text-green-700">AA</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Screen Reader</p>
                  <p className="text-lg font-bold text-green-700">87%</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Color Contrast</p>
                  <p className="text-lg font-bold text-green-700">92%</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Keyboard Nav</p>
                  <p className="text-lg font-bold text-amber-600">78%</p>
                </div>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FiUsers className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Engagement Metrics</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Daily Active Users</span>
                    <span className="font-semibold">12.4K</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Avg. Session Duration</span>
                    <span className="font-semibold">24 min</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Course Completion Rate</span>
                    <span className="font-semibold">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Insights Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FiAlertTriangle className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-semibold text-gray-800">Engagement Insights</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{analysisResult.engagementInsights}</p>
              <div className="mt-4 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500">
                <p className="text-sm text-amber-800">
                  <span className="font-bold">Recommendation:</span> Introduce gamification elements and AI-powered personalized course recommendations to reduce content fatigue.
                </p>
              </div>
            </div>

            {/* Time-Based Metrics */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FiClock className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-semibold text-gray-800">Peak Usage Times</h2>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Morning (6-12)</span>
                <span className="text-sm font-semibold">2.4K users</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">Afternoon (12-18)</span>
                <span className="text-sm font-semibold">5.8K users</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">Evening (18-24)</span>
                <span className="text-sm font-semibold">4.2K users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Results */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Engagement Analysis Summary</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Engagement Drop</p>
              <p className="text-2xl font-bold text-orange-600">{analysisResult.engagementDropProbability}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Drop Factors</p>
              <p className="font-medium text-gray-800">{analysisResult.dropFactors.join(", ")}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Suggested Actions</p>
              <p className="font-medium text-gray-800">{analysisResult.suggestedActions.join(", ")}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Impact Level</p>
              <p className="font-medium text-yellow-600">{analysisResult.userActivityLossImpact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdtechDashboard;