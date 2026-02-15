import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated authentication (replace with backend later)
    setTimeout(() => {
      setLoading(false);
      navigate("/"); // Redirect to home after login
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      
      {/* Auth Container */}
      <div className="w-full max-w-md">
        
        {/* Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-sm text-emerald-600 hover:underline"
        >
          ← Back to home
        </button>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8">
          
          {/* Title */}
          <h1 className="text-2xl font-semibold text-slate-900 text-center">
            Welcome back
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 mt-2 mb-6 text-center text-sm">
            Sign in using your email to continue
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-5"
          >
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                name="user_email"
                required
                autoComplete="off"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="user_password"
                required
                autoComplete="new-password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-emerald-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-70"
            >
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>

          {/* Registration Navigation (UPDATED) */}
          <p className="text-center text-sm text-slate-600 mt-6">
            Don’t have an account?
            <button
              type="button"
              onClick={() => navigate("/RegistrationPage")}
              className="ml-2 text-emerald-600 font-semibold hover:underline"
            >
              Register
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
