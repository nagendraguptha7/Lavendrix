import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Auto redirect to login after success
  useEffect(() => {
    if (registered) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registered, navigate]);

  // Strong password regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const validateForm = () => {
    let newErrors = {};

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, and a number.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Backend API call (sends email)
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRegistered(true);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please ensure backend is running.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        
        {/* Back to Login */}
        <button
          onClick={() => navigate("/login")}
          className="mb-6 text-sm text-emerald-600 hover:underline"
        >
          ← Back to login
        </button>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8">

          {!registered ? (
            <>
              {/* Title */}
              <h1 className="text-2xl font-semibold text-slate-900 text-center">
                Create your account
              </h1>

              {/* Subtitle */}
              <p className="text-slate-500 mt-2 mb-6 text-center text-sm">
                Register with your email to start using Lavendrix platform
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
                
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:ring-emerald-500"
                    } focus:outline-none focus:ring-2`}
                  />

                  {/* Bullet Password Rules */}
                  <ul className="mt-3 text-xs space-y-1">
                    <li
                      className={
                        password.length >= 8
                          ? "text-green-600"
                          : "text-slate-500"
                      }
                    >
                      • Minimum 8 characters
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(password)
                          ? "text-green-600"
                          : "text-slate-500"
                      }
                    >
                      • At least one uppercase letter
                    </li>
                    <li
                      className={
                        /[a-z]/.test(password)
                          ? "text-green-600"
                          : "text-slate-500"
                      }
                    >
                      • At least one lowercase letter
                    </li>
                    <li
                      className={
                        /\d/.test(password)
                          ? "text-green-600"
                          : "text-slate-500"
                      }
                    >
                      • At least one number
                    </li>
                  </ul>

                  {errors.password && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Re-enter your password"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:ring-emerald-500"
                    } focus:outline-none focus:ring-2`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition disabled:opacity-70"
                >
                  Create Account
                </button>
              </form>

              {/* Bottom Navigation */}
              <p className="text-center text-sm text-slate-600 mt-6">
                Already have an account?
                <button
                  onClick={() => navigate("/login")}
                  className="ml-2 text-emerald-600 font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                Account created successfully
              </h2>

              <p className="text-slate-600 mt-3 text-sm">
                A confirmation email has been sent to your registered email address.
              </p>

              <p className="text-emerald-600 font-medium mt-2 break-all">
                {email}
              </p>

              <p className="text-slate-500 mt-4 text-sm">
                Redirecting to login page...
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
