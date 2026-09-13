// import { useNavigate } from "react-router-dom";
// import Footer from "./footer";
// import Image from "./image";
// import { useDispatch, useSelector } from "react-redux";
// import { signupUser } from "./authSlice";
// import { useState } from "react";

// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "./firebase";

// function Signup() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { error, loading, isAuthenticated } = useSelector(
//     (state) => state.auth
//   );

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

 

//   const handleSignup = async () => {
//   if (!fullName || !email || !password) {
//     alert("Please fill all fields");
//     return;
//   }

//   const resultAction = await dispatch(
//     signupUser({
//       fullName,
//       email,
//       password,
//     })
//   );

//   if (signupUser.fulfilled.match(resultAction)) {
//     alert(
//       "✅ Account created successfully!\n\nPlease check your email to verify your account."
//     );

//     navigate("/login");
//   } else {
//     alert(resultAction.payload || "Signup failed");
//   }
// };

//   const handleGoogleSignup = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);

//       const user = {
//         fullName: result.user.displayName,
//         email: result.user.email,
//         photoURL: result.user.photoURL,
//       };

//       localStorage.setItem("currentUser", JSON.stringify(user));
//       localStorage.setItem("token", "google-login");

//       alert("Google Signup Successful");

//       window.location.href = "/";
//     } catch (error) {
//       console.error(error);
//       alert("Google Signup Failed");
//     }
//   };

//   return (
//     <div>
//       <Image title="Signup" />

//       <div className="min-h-screen flex flex-col items-center justify-center bg-white">
//         <div className="bg-red-100 rounded-lg px-14 py-12 w-full max-w-md">

//           <div className="mb-8">
//             <label className="block text-gray-600 mb-2">
//               Full Name
//             </label>

//             <input
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-red-500 py-1"
//             />
//           </div>

//           <div className="mb-8">
//             <label className="block text-gray-600 mb-2">
//               Email
//             </label>

//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-red-500 py-1"
//             />
//           </div>

//           <div className="mb-8">
//             <label className="block text-gray-600 mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-red-500 py-1"
//             />
//           </div>

//           <div className="text-center">
//             <button
//               onClick={handleSignup}
//               disabled={loading}
//               className="w-full bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-60"
//             >
//               {loading ? "Signing Up..." : "Sign Up"}
//             </button>
//           </div>

//           <div className="my-4 text-center">
//             <p className="text-gray-500">
//               ────── OR ──────
//             </p>
//           </div>

//           <button
//             onClick={handleGoogleSignup}
//             className="w-full bg-white border border-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-100 transition"
//           >
//             Continue with Google
//           </button>

//           {error && (
//             <p className="text-red-600 mt-4 text-center">
//               {error}
//             </p>
//           )}
//         </div>

//         <p className="mt-10 text-gray-800">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-red-500 cursor-pointer font-medium"
//           >
//             Login
//           </span>
//         </p>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Signup;

import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import Image from "./image";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "./authSlice";
import { useState } from "react";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading } = useSelector(
    (state) => state.auth
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const resultAction = await dispatch(
      signupUser({
        fullName,
        email,
        password,
      })
    );

    if (signupUser.fulfilled.match(resultAction)) {
      alert(
        "✅ Account created successfully!\n\nPlease check your email to verify your account."
      );

      navigate("/login");
    } else {
      alert(resultAction.payload || "Signup failed");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      const user = {
        fullName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      localStorage.setItem("token", "google-login");

      alert("Google Signup Successful");

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Google Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#080d16] text-white">

      {/* Page Banner */}
      <Image title="Signup" />

      {/* Signup Section */}
      <section className="relative min-h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-14 sm:py-20 overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Signup Card */}
        <div className="relative w-full max-w-md">

          <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">

            {/* Header */}
            <div className="text-center mb-8">

              <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FaUser className="text-red-500 text-xl" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Create <span className="text-red-500">Account</span>
              </h1>

              <p className="text-gray-400 text-sm mt-2">
                Join Fresh Bites and start ordering
              </p>

            </div>

            {/* Full Name */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>

              <div className="relative">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full bg-[#0b111b] border border-white/10 text-white placeholder-gray-600 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                />

              </div>

            </div>

            {/* Email */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full bg-[#0b111b] border border-white/10 text-white placeholder-gray-600 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                />

              </div>

            </div>

            {/* Password */}
            <div className="mb-6">

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
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

              <p className="text-xs text-gray-500 mt-2">
                Password should be at least 6 characters.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Signup Button */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-500/10"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing Up...
                </>
              ) : (
                <>
                  Create Account
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-7">

              <div className="flex-1 h-px bg-white/10" />

              <span className="text-xs text-gray-500 uppercase">
                OR
              </span>

              <div className="flex-1 h-px bg-white/10" />

            </div>

            {/* Google Signup */}
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 rounded-xl transition duration-300"
            >
              <FaGoogle className="text-red-500" />

              Continue with Google
            </button>

          </div>

          {/* Login Link */}
          <div className="text-center mt-7">

            <p className="text-gray-400 text-sm">
              Already have an account?{" "}

              <span
                onClick={() => navigate("/login")}
                className="text-red-500 hover:text-red-400 font-semibold cursor-pointer transition"
              >
                Login
              </span>
            </p>

          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Signup;