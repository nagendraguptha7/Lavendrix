import React, { useState, useEffect } from "react";
import {
  FiTrendingUp,
  FiUpload,
  FiAlertTriangle,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiServer,
  FiCpu,
  FiBarChart2,
  FiZap,
  FiDownload,
  FiClock,
  FiActivity,
  FiRefreshCw
} from "react-icons/fi";

const EcommerceDashboard = () => {
  const [files, setFiles] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("analyze");
  const [predictions, setPredictions] = useState(null);
  const [userAnalyses, setUserAnalyses] = useState([]);
  const [infrastructure, setInfrastructure] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Get auth token from localStorage
  const getToken = () => localStorage.getItem('token');

  // Fetch user's analysis history on component mount
  useEffect(() => {
    fetchUserAnalyses();
    fetchInfrastructureStatus();
  }, []);

  const fetchUserAnalyses = async () => {
    setLoadingHistory(true);
    try {
      const response = await fetch('http://localhost:5000/api/ecommerce/my-analyses', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserAnalyses(data.analyses || []);
      }
    } catch (err) {
      console.error("Failed to fetch analyses:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const fetchInfrastructureStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ecommerce/infrastructure', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setInfrastructure(data.infrastructure);
      }
    } catch (err) {
      console.error("Failed to fetch infrastructure:", err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setError('Please select at least one file to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    // Add additional form data if needed
    formData.append('projectType', 'marketplace');
    formData.append('trafficPattern', 'high');

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('http://localhost:5000/api/ecommerce/analyze', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        body: formData
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please login to continue');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      setAnalysisResult(data.analysis);
      
      // Refresh analyses list
      await fetchUserAnalyses();
      
      // Show success message
      setTimeout(() => setUploadProgress(0), 1000);

    } catch (err) {
      setError(err.message);
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrediction = async () => {
    if (files.length === 0 && !analysisResult) {
      setError('Please upload files or run analysis first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    if (files.length > 0) {
      files.forEach(file => {
        formData.append('files', file);
      });
    }

    // Add prediction parameters
    formData.append('trafficPattern', 'peak');
    formData.append('season', 'holiday');

    try {
      const response = await fetch('http://localhost:5000/api/ecommerce/predict', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setPredictions(data.prediction);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ecommerce/generate-test', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ testType: 'checkout' })
      });

      if (!response.ok) throw new Error('Test generation failed');
      
      const data = await response.json();
      alert(`Test suite generated with ${data.test.scenarios} scenarios`);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/api/download/${filename}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Download failed: ' + err.message);
    }
  };

  const refreshData = () => {
    fetchUserAnalyses();
    fetchInfrastructureStatus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Refresh */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="bg-gradient-to-br from-amber-700 to-orange-600 p-3 rounded-xl shadow-lg">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
              E-Commerce Scalability Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={refreshData}
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all"
              title="Refresh data"
            >
              <FiRefreshCw className="w-5 h-5 text-amber-700" />
            </button>
            <div className="flex items-center gap-4 bg-white rounded-full px-5 py-2 shadow-sm">
              <span className="font-semibold text-amber-800">Online Marketplace Expansion</span>
              <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-medium border-l-4 border-orange-600">
                High Traffic
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white/50 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("analyze")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "analyze" 
                ? "bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-lg" 
                : "text-gray-600 hover:bg-white/50"
            }`}
          >
            Analyze
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "history" 
                ? "bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-lg" 
                : "text-gray-600 hover:bg-white/50"
            }`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab("infrastructure")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "infrastructure" 
                ? "bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-lg" 
                : "text-gray-600 hover:bg-white/50"
            }`}
          >
            Infrastructure
          </button>
        </div>

        {activeTab === "analyze" && (
          <>
            {/* Upload Section */}
            <div className="bg-amber-50/70 rounded-2xl p-6 border-2 border-dashed border-amber-300 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FiUpload className="w-5 h-5 text-amber-700" />
                <h2 className="font-semibold text-amber-800">Upload Specifications</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 w-full">
                  <label className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1 block">
                    Marketplace_Requirements.pdf / multiple files
                  </label>
                  <div className="flex items-center bg-white rounded-full border border-amber-200 hover:border-amber-500 transition-colors overflow-hidden">
                    <div className="pl-4">
                      <FiFileText className="w-5 h-5 text-amber-500" />
                    </div>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      disabled={loading}
                      className="flex-1 py-3 px-3 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-700 file:text-white hover:file:bg-amber-800 disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-100 px-4 py-2 rounded-full whitespace-nowrap">
                  <FiUpload className="w-4 h-4" />
                  <span>{files.length ? `${files.length} file(s) selected` : "Upload files"}</span>
                </div>
              </div>

              {/* Upload Progress */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* File list preview */}
              {files.length > 0 && (
                <div className="mt-4 text-sm text-gray-600">
                  <p className="font-medium mb-1 text-amber-800">Selected files:</p>
                  <ul className="space-y-1">
                    {files.map((file, idx) => (
                      <li key={idx} className="text-amber-700 flex items-center justify-between">
                        <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={handleAnalyze}
                disabled={loading || files.length === 0}
                className="bg-gradient-to-r from-amber-700 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiBarChart2 className="w-5 h-5" />
                    Analyze Project
                  </>
                )}
              </button>
              <button
                onClick={handlePrediction}
                disabled={loading || (files.length === 0 && !analysisResult)}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50"
              >
                <FiZap className="w-5 h-5" />
                Run Prediction
              </button>
            </div>

            {/* Predictions Display */}
            {predictions && (
              <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">📊 Prediction Results</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Peak Load</p>
                    <p className="text-xl font-bold text-purple-600">{predictions.peakLoad.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Est. Revenue</p>
                    <p className="text-xl font-bold text-green-600">{predictions.estimatedRevenue}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Recommended Instances</p>
                    <p className="text-xl font-bold text-blue-600">{predictions.recommendedInstances}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Response Time</p>
                    <p className="text-xl font-bold text-amber-600">{predictions.estimatedResponseTime || '245ms'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {analysisResult && (
              <>
                {/* Main Analysis Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Revenue Risk Analyzer */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center gap-2 mb-4">
                        <FiTrendingUp className="w-5 h-5 text-red-500" />
                        <h2 className="text-xl font-semibold text-gray-800">Revenue Risk Analyzer</h2>
                      </div>
                      <div className="bg-amber-50 rounded-xl p-4 mb-4">
                        <p className="text-amber-800 text-sm">
                          <span className="font-semibold">Input Details:</span> Online Marketplace platform with integrated payment gateways.
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Revenue Impact Score</span>
                          <span className="text-2xl font-bold text-purple-600">{analysisResult.revenueImpact}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                            style={{ width: `${analysisResult.revenueImpact}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Scalability Stress Predictor */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center gap-2 mb-4">
                        <FiCpu className="w-5 h-5 text-orange-500" />
                        <h2 className="text-xl font-semibold text-gray-800">Scalability Stress Predictor</h2>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Heavy Load Score</span>
                          <span className="text-2xl font-bold text-orange-600">{analysisResult.heavyLoadScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-orange-500 h-2.5 rounded-full"
                            style={{ width: `${analysisResult.heavyLoadScore}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Bottleneck Points</h3>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.bottleneckPoints.map((point, idx) => (
                            <span key={idx} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                              <FiAlertCircle className="w-4 h-4" />
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>

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
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Checkout Test Generator */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center gap-2 mb-4">
                        <FiZap className="w-5 h-5 text-blue-500" />
                        <h2 className="text-xl font-semibold text-gray-800">Checkout Test Generator</h2>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <p className="text-xs text-gray-500">Test Scenarios</p>
                          <p className="text-lg font-bold text-blue-700">{analysisResult.testScenarios || 24}</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <p className="text-xs text-gray-500">Success Rate</p>
                          <p className="text-lg font-bold text-green-600">{analysisResult.testSuccessRate || 92}%</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center col-span-2">
                          <p className="text-xs text-gray-500">Peak Concurrent Users</p>
                          <p className="text-lg font-bold text-purple-600">{analysisResult.peakUsers?.toLocaleString() || '15.2K'}</p>
                        </div>
                      </div>
                      <button 
                        onClick={handleGenerateTest}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        Generate New Test Suite
                      </button>
                    </div>

                    {/* Launch Feasibility Analyzer */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center gap-2 mb-4">
                        <FiServer className="w-5 h-5 text-green-500" />
                        <h2 className="text-xl font-semibold text-gray-800">Launch Feasibility Analyzer</h2>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center p-2">
                            <span className="text-gray-600">Infrastructure Readiness</span>
                            <span className="font-semibold text-amber-600">{analysisResult.infrastructure?.autoScaling || 74}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${analysisResult.infrastructure?.autoScaling || 74}%` }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center p-2">
                            <span className="text-gray-600">Payment Gateway Stability</span>
                            <span className="font-semibold text-green-600">{analysisResult.infrastructure?.paymentGateway || 88}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${analysisResult.infrastructure?.paymentGateway || 88}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center p-2">
                            <span className="text-gray-600">Auto-scaling Readiness</span>
                            <span className="font-semibold text-red-500">{analysisResult.infrastructure?.autoScaling || 45}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${analysisResult.infrastructure?.autoScaling || 45}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Scalability Insights Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center gap-2 mb-4">
                        <FiAlertTriangle className="w-5 h-5 text-amber-500" />
                        <h2 className="text-xl font-semibold text-gray-800">Scalability Insights</h2>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{analysisResult.scalabilityInsights}</p>
                      <div className="mt-4 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500">
                        <p className="text-sm text-amber-800">
                          <span className="font-bold">Critical Action:</span> Implement database caching and optimize load balancer configuration before peak season.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis Results */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Scalability Analysis Summary</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Heavy Load Score</p>
                      <p className="text-2xl font-bold text-orange-600">{analysisResult.heavyLoadScore}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Bottleneck Points</p>
                      <p className="font-medium text-gray-800">{analysisResult.bottleneckPoints.join(", ")}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Suggested Actions</p>
                      <p className="font-medium text-gray-800">{analysisResult.suggestedActions.join(", ")}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Revenue Impact</p>
                      <p className="text-2xl font-bold text-purple-600">{analysisResult.revenueImpact}%</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Analysis History</h2>
            {loadingHistory ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              </div>
            ) : userAnalyses.length > 0 ? (
              <div className="space-y-4">
                {userAnalyses.map((analysis) => (
                  <div key={analysis.id} className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Analysis #{analysis.id}</p>
                      <p className="text-sm text-gray-500">{new Date(analysis.date).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Load Score</p>
                        <p className="font-bold text-orange-600">{analysis.loadScore}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Revenue Impact</p>
                        <p className="font-bold text-purple-600">{analysis.revenueImpact}%</p>
                      </div>
                      <button className="text-amber-600 hover:text-amber-800">
                        <FiDownload className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No analyses found. Run your first analysis!</p>
            )}
          </div>
        )}

        {/* Infrastructure Tab */}
        {activeTab === "infrastructure" && infrastructure && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Infrastructure Status</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-4">Service Status</h3>
                <div className="space-y-3">
                  {infrastructure.services?.map((service, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{service.name}</span>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm ${
                          service.status === 'operational' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {service.status}
                        </span>
                        {service.latency && (
                          <span className="text-xs text-gray-500">{service.latency}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-4">Active Alerts</h3>
                {infrastructure.alerts?.length > 0 ? (
                  <div className="space-y-3">
                    {infrastructure.alerts.map((alert, idx) => (
                      <div key={idx} className={`p-3 rounded-lg ${
                        alert.severity === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                        alert.severity === 'critical' ? 'bg-red-50 border-l-4 border-red-500' :
                        'bg-blue-50 border-l-4 border-blue-500'
                      }`}>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">Severity: {alert.severity}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No active alerts</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcommerceDashboard;