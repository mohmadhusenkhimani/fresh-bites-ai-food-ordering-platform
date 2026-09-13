// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Image from "../image";
// import Footer from "../footer";

// const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setError("");

//     if (!password || !confirmPassword) {
//       setError("Please fill all fields.");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(
//         `http://localhost:5000/api/auth/reset-password/${token}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             password,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message);
//       } else {
//         setMessage(data.message);

//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Image title="Reset Password" />

//       <div className="min-h-screen flex items-center justify-center bg-white px-4">
//         <div className="bg-red-100 rounded-xl shadow-md w-full max-w-md p-8">

//           <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
//             Reset Password
//           </h2>

//           <p className="text-gray-600 text-center mb-6">
//             Enter your new password below.
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
//               New Password
//             </label>

//             <input
//               type="password"
//               placeholder="Enter new password"
//               className="w-full border rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-red-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <label className="block mb-2 text-gray-700">
//               Confirm Password
//             </label>

//             <input
//               type="password"
//               placeholder="Confirm new password"
//               className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition disabled:opacity-60"
//             >
//               {loading ? "Updating Password..." : "Reset Password"}
//             </button>

//           </form>

//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default ResetPassword;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../image";
import Footer from "../footer";

import {
  FaLock,
  FaArrowRight,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <div className="min-h-screen bg-[#080d16] text-white">
      {/* Page Banner */}
      <Image title="Reset Password" />

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
                Reset <span className="text-red-500">Password</span>
              </h2>

              <p className="text-gray-400 text-sm mt-3">
                Enter your new password below.
              </p>
            </div>

            {/* Success Message */}
            {message && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-start gap-3">
                <FaCheckCircle className="mt-0.5 flex-shrink-0" />

                <span>{message}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* New Password */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0b111b] border border-white/10 text-white placeholder-gray-600 rounded-xl pl-11 pr-12 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    className="w-full bg-[#0b111b] border border-white/10 text-white placeholder-gray-600 rounded-xl pl-11 pr-12 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirement */}
              <div className="mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-xs text-gray-500">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* Reset Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-500/10"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    Reset Password
                    <FaArrowRight className="text-sm" />
                  </>
                )}
              </button>

            </form>

            {/* Login Link */}
            <div className="mt-7 text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm text-gray-400 hover:text-red-500 transition"
              >
                Back to Login
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResetPassword;