// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Image from "../image";
// import Footer from "../footer";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/auth/forgot-password",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message);
//       } else {
//         setMessage(data.message);
//         setEmail("");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       <Image title="Forgot Password" />

//       <div className="min-h-screen flex items-center justify-center bg-white px-4">
//         <div className="bg-red-100 rounded-xl shadow-md w-full max-w-md p-8">

//           <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
//             Forgot Password
//           </h2>

//           <p className="text-gray-600 text-center mb-6">
//             Enter your registered email address to receive a password reset link.
//           </p>

//           {message && (
//             <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
//               {message}
//             </div>
//           )}

//           {error && (
//             <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <label className="block mb-2 text-gray-700">
//               Email Address
//             </label>

//             <input
//               type="email"
//               required
//               placeholder="Enter your email"
//               className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
//             >
//               {loading ? "Sending..." : "Send Reset Link"}
//             </button>
//           </form>

//           <div className="text-center mt-6">
//             <Link
//               to="/login"
//               className="text-red-500 hover:underline"
//             >
//               Back to Login
//             </Link>
//           </div>

//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ForgotPassword;

import { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../image";
import Footer from "../footer";

import {
  FaEnvelope,
  FaArrowLeft,
  FaPaperPlane,
  FaLock,
} from "react-icons/fa";

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
    <div className="min-h-screen bg-[#080d16] text-white">
      {/* Page Banner */}
      <Image title="Forgot Password" />

      {/* Main Section */}
      <section className="relative min-h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-14 sm:py-20 overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card */}
        <div className="relative w-full max-w-md">

          <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FaLock className="text-red-500 text-xl" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Forgot <span className="text-red-500">Password?</span>
              </h2>

              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                Enter your registered email address and we'll send you a
                password reset link.
              </p>
            </div>

            {/* Success Message */}
            {message && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm leading-relaxed">
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm leading-relaxed">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0b111b] border border-white/10 text-white placeholder-gray-600 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-500/10"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-7 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition"
              >
                <FaArrowLeft className="text-xs" />
                Back to Login
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ForgotPassword;