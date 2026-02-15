import React from "react";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-screen">
      
      {/* FULL PAGE Gradient Background (Blue → Black) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-800 to-black -z-10" />

      {/* Soft Glow Effects (matching theme) */}
      <div className="pointer-events-none absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
      <div className="pointer-events-none absolute bottom-10 right-10 w-80 h-80 bg-cyan-400 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-4xl mx-auto text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
          <span className="text-sm font-semibold text-white">
            AI-Powered Visual Testing Platform
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Detect UI Issues Faster with
          <span className="block bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            AI Visual Testing & Smart Insights
          </span>
        </h1>

        {/* Action Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row justify-center gap-5">
          
          {/* Primary Button */}
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-black text-white font-semibold text-lg shadow-xl hover:scale-105 transition duration-300"
          >
            Analyze UI with AI
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold text-lg hover:bg-white/20 transition duration-300"
          >
            Generate Test Cases
          </button>

        </div>
      </div>
    </section>
  );
}
