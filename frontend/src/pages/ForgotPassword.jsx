import { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../image";
import Footer from "../footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      } else {
        setMessage(data.message);
        setEmail("");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Image title="Forgot Password" />

      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="bg-red-100 rounded-xl shadow-md w-full max-w-md p-8">

          <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
            Forgot Password
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Enter your registered email address to receive a password reset link.
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
              Email Address
            </label>

            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-red-500 hover:underline"
            >
              Back to Login
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;