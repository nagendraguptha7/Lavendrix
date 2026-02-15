import React, { useState } from "react";
import {
  FiActivity,
  FiUpload,
  FiAlertTriangle,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiLock,
  FiUsers,
  FiShield
} from "react-icons/fi";

const HealthcareDashboard = () => {
  const [files, setFiles] = useState([]);
  const [scanResult] = useState({
    phiSecurityScore: 84,
    vulnerabilityAreas: ["Encryption Gaps", "Access Control Risks"],
    mitigations: ["Advanced Encryption", "Role-Based Access Control"],
    dataBreachImpact: "Severe",
    securityInsights:
      "High PHI security score, but identified vulnerabilities in encryption and access controls. Immediate action needed to enhance patient data protection.",
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleScan = () => {
    // In a real app, you'd send files to backend
    console.log("Scanning with files:", files);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 md:p-6 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/60">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="bg-gradient-to-br from-emerald-700 to-teal-700 p-3 rounded-xl shadow-lg">
              <FiActivity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
              Healthcare Risk & Compliance Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-full px-5 py-2 shadow-sm">
            <span className="font-semibold text-emerald-800">Patient Data Management Platform</span>
            <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium border-l-4 border-purple-600">
              High Sensitivity
            </span>
          </div>
        </div>

        {/* Upload Section - Multiple files */}
        <div className="bg-emerald-50/70 rounded-2xl p-6 border-2 border-dashed border-emerald-300 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FiUpload className="w-5 h-5 text-emerald-700" />
            <h2 className="font-semibold text-emerald-800">Upload Specifications</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 w-full">
              <label className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1 block">
                EHRSystem_Requirements.pdf / multiple files
              </label>
              <div className="flex items-center bg-white rounded-full border border-emerald-200 hover:border-emerald-500 transition-colors overflow-hidden">
                <div className="pl-4">
                  <FiFileText className="w-5 h-5 text-emerald-500" />
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="flex-1 py-3 px-3 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-700 file:text-white hover:file:bg-emerald-800"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100 px-4 py-2 rounded-full whitespace-nowrap">
              <FiUpload className="w-4 h-4" />
              <span>{files.length ? `${files.length} file(s) selected` : "Upload .pdf, .doc, .txt"}</span>
            </div>
          </div>

          {/* File list preview */}
          {files.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium mb-1 text-emerald-800">Selected files:</p>
              <ul className="list-disc list-inside">
                {files.map((file, idx) => (
                  <li key={idx} className="text-emerald-700">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Patient Data Risk Scanner Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FiShield className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-semibold text-gray-800">Patient Data Risk Scanner</h2>
          </div>
          
          <div className="bg-emerald-50 rounded-xl p-4 mb-6">
            <p className="text-emerald-800">
              <span className="font-semibold">Input Details:</span> Patient Data Management Platform that stores and manages sensitive Electronic Health Record (EHR) data.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleScan}
              className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-3"
            >
              <FiActivity className="w-5 h-5" />
              Run Scan
            </button>
          </div>
        </div>

        {/* Analysis Results - Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - PHI Security Score & Vulnerabilities */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <FiLock className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-semibold text-gray-800">PHI Security Analysis</h2>
            </div>

            {/* Security Score */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">PHI Security Score</span>
                <span className="text-2xl font-bold text-emerald-600">{scanResult.phiSecurityScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-emerald-600 h-2.5 rounded-full"
                  style={{ width: `${scanResult.phiSecurityScore}%` }}
                ></div>
              </div>
            </div>

            {/* Vulnerability Areas */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Vulnerability Areas</h3>
              <div className="flex flex-wrap gap-2">
                {scanResult.vulnerabilityAreas.map((area, idx) => (
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
                {scanResult.mitigations.map((mit, idx) => (
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
                {scanResult.dataBreachImpact}
              </span>
            </div>
          </div>

          {/* Right Column - Compliance & Security Insights */}
          <div className="space-y-6">
            {/* HIPAA Compliance Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FiCheckCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-semibold text-gray-800">HIPAA Compliance Status</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Privacy Rule</span>
                  <span className="text-emerald-600 font-medium">Partial</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Security Rule</span>
                  <span className="text-yellow-600 font-medium">Gap Identified</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Breach Notification</span>
                  <span className="text-green-600 font-medium">Compliant</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Omnibus Rule</span>
                  <span className="text-emerald-600 font-medium">In Progress</span>
                </div>
              </div>
            </div>

            {/* Security Insights Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FiAlertTriangle className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-semibold text-gray-800">Security Insights</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{scanResult.securityInsights}</p>
              <div className="mt-4 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500">
                <p className="text-sm text-amber-800">
                  <span className="font-bold">Recommendation:</span> Implement Advanced Encryption (AES-256) and strengthen Role-Based Access Controls immediately.
                </p>
              </div>
            </div>

            {/* Access Control Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FiUsers className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-semibold text-gray-800">Access Control Summary</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Users with Access</p>
                  <p className="text-xl font-bold text-emerald-700">1,284</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Privileged Users</p>
                  <p className="text-xl font-bold text-amber-700">43</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center col-span-2">
                  <p className="text-sm text-gray-500">RBAC Implementation</p>
                  <p className="text-lg font-semibold text-emerald-700">65% Complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Results */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Scan Results</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">PHI Security Score</p>
              <p className="text-2xl font-bold text-emerald-600">{scanResult.phiSecurityScore}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Vulnerability Areas</p>
              <p className="font-medium text-gray-800">{scanResult.vulnerabilityAreas.join(", ")}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Suggested Mitigations</p>
              <p className="font-medium text-gray-800">{scanResult.mitigations.join(", ")}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Data Breach Impact</p>
              <p className="font-medium text-red-600">{scanResult.dataBreachImpact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareDashboard;