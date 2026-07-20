import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../image";
import Footer from "../footer";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      } else {
        setMessage(data.message);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Image title="Reset Password" />

      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="bg-red-100 rounded-xl shadow-md w-full max-w-md p-8">

          <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
            Reset Password
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Enter your new password below.
          </p>

          {message && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label className="block mb-2 text-gray-700">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="block mb-2 text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition disabled:opacity-60"
            >
              {loading ? "Updating Password..." : "Reset Password"}
            </button>

          </form>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ResetPassword;