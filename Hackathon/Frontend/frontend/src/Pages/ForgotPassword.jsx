import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-lg p-8">
        {!sent ? (
          <>
            <h1 className="text-2xl font-semibold">Reset your password</h1>
            <p className="text-slate-500 mt-2 text-sm">
              Enter your email and we’ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold">
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold">📧 Check your email</h2>
            <p className="text-slate-500 mt-2">
              A password reset link has been sent to {email}
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-6 w-full py-3 border rounded-xl"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
