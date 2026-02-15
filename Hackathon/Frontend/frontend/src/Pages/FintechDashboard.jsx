import React, { useState } from "react";
import { 
  FiShield, 
  FiUpload, 
  FiAlertTriangle, 
  FiFileText, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle 
} from "react-icons/fi";

const FintechDashboard = () => {
  const [files, setFiles] = useState([]);
  const [analysisResult] = useState({
    fraudRiskScore: 85,
    vulnerabilityAreas: ["Transaction Integrity", "Account Takeover"],
    mitigations: ["Implement Multi-factor Authentication", "Real-Time Alerts"],
    dataBreachImpact: "Severe",
    riskInsights:
      "Elevated fraud risk due to high transaction volume and credit scoring integrations. Strengthen security protocols to mitigate potential threats.",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-4 md:p-6 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/60">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-3 rounded-xl shadow-lg">
              <FiShield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              FinTech Risk & Compliance Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-full px-5 py-2 shadow-sm">
            <span className="font-semibold text-blue-900">Real-Time Loan Approval System</span>
            <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-medium border-l-4 border-orange-600">
              High Risk
            </span>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-blue-50/70 rounded-2xl p-6 border-2 border-dashed border-blue-300 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FiUpload className="w-5 h-5 text-blue-700" />
            <h2 className="font-semibold text-blue-900">Upload Requirements</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 w-full">
              <label className="text-xs font-semibold uppercase tracking-wider text-blue-800 mb-1 block">
                LoanSystem_Requirements.pdf / multiple files
              </label>
              <div className="flex items-center bg-white rounded-full border border-blue-200 hover:border-blue-500 transition-colors overflow-hidden">
                <div className="pl-4">
                  <FiFileText className="w-5 h-5 text-blue-500" />
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="flex-1 py-3 px-3 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-white hover:file:bg-blue-800"
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
              <p className="font-medium mb-1">Selected files:</p>
              <ul className="list-disc list-inside">
                {files.map((file, idx) => (
                  <li key={idx} className="text-blue-800">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleAnalyze}
            className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-3"
          >
            <FiAlertTriangle className="w-5 h-5" />
            Run Analysis
          </button>
        </div>

        {/* Analysis Results - Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Fraud Risk Analyzer */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <FiShield className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-800">Fraud Risk Analyzer</h2>
            </div>

            {/* Risk Score */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Fraud Risk Score</span>
                <span className="text-2xl font-bold text-red-600">{analysisResult.fraudRiskScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: `${analysisResult.fraudRiskScore}%` }}
                ></div>
              </div>
            </div>

            {/* Vulnerability Areas */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Vulnerability Areas</h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.vulnerabilityAreas.map((area, idx) => (
                  <span key={idx} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <FiAlertCircle className="w-4 h-4" />
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested Mitigations */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Suggested Mitigations</h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.mitigations.map((mit, idx) => (
                  <span key={idx} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <FiCheckCircle className="w-4 h-4" />
                    {mit}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Breach Impact */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Data Breach Impact</h3>
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-medium inline-flex items-center gap-2">
                <FiXCircle className="w-5 h-5" />
                {analysisResult.dataBreachImpact}
              </span>
            </div>
          </div>

          {/* Right Column - Compliance Validator & Risk Insights */}
          <div className="space-y-6">
            {/* Compliance Validator Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FiCheckCircle className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-800">Compliance Validator</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">GDPR</span>
                  <span className="text-green-600 font-medium">Compliant</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">PCI DSS</span>
                  <span className="text-yellow-600 font-medium">Partial</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">SOC2</span>
                  <span className="text-red-600 font-medium">Review Needed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">KYC/AML</span>
                  <span className="text-green-600 font-medium">Automated</span>
                </div>
              </div>
            </div>

            {/* Risk Insights Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FiAlertTriangle className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-800">Risk Insights</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{analysisResult.riskInsights}</p>
              <div className="mt-4 p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                <p className="text-sm text-orange-800">
                  <span className="font-bold">Recommendation:</span> Immediate security hardening required due to high-risk profile.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Duplicate Analysis Results (as per design) */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Results (Detailed View)</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Fraud Risk Score</p>
              <p className="text-2xl font-bold text-red-600">{analysisResult.fraudRiskScore}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Vulnerability Areas</p>
              <p className="font-medium text-gray-800">{analysisResult.vulnerabilityAreas.join(", ")}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Suggested Mitigations</p>
              <p className="font-medium text-gray-800">{analysisResult.mitigations.join(", ")}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Data Breach Impact</p>
              <p className="font-medium text-red-600">{analysisResult.dataBreachImpact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FintechDashboard;