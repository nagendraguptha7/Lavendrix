import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword: password }),
    });

   
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold">Create new password</h1>
        <p className="text-sm text-slate-500 mt-2">
          Reset password for: {email}
        </p>

        <form onSubmit={handleReset} className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-4 py-3 border rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
