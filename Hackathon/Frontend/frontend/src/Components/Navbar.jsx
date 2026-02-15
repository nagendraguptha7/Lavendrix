import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent cursor-pointer"
          >
            Lavendrix
          </h1>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Login */}
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 rounded-xl bg-white/60 border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition"
            >
              Login
            </button>

            {/* Sign Up (UPDATED TO RegistrationPage) */}
            <button
              onClick={() => navigate("/RegistrationPage")}  // 🔥 FIXED
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 flex flex-col gap-3 border-t border-emerald-200">
            
            {/* Mobile Login */}
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2.5 rounded-xl bg-white border border-emerald-200 text-emerald-700 font-semibold"
            >
              Login
            </button>

            {/* Mobile Sign Up (UPDATED) */}
            <button
              onClick={() => navigate("/RegistrationPage")} // 🔥 FIXED
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 text-white font-semibold"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
