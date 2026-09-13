// import { Link, useNavigate } from "react-router-dom";
// import Image from "./image";
// import Footer from "./footer";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "./authSlice";
// import { useState, useEffect } from "react";

// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "./firebase";

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { error, loading, isAuthenticated } = useSelector(
//     (state) => state.auth
//   );

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token && isAuthenticated) {
//       navigate("/");
//     }
//   }, [isAuthenticated, navigate]);

//   const handleLogin = () => {
//     if (!email || !password) {
//       alert("Please enter email and password");
//       return;
//     }

//     dispatch(loginUser({ email, password }));
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);

//       const idToken = await result.user.getIdToken();

//       const response = await fetch(
//         "http://localhost:5000/api/auth/google",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             idToken,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!data.success) {
//         alert(data.message);
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem(
//         "currentUser",
//         JSON.stringify(data.user)
//       );

//       alert("Google Login Successful");

//       window.location.href = "/";
//     } catch (error) {
//       console.error(error);
//       alert("Google Login Failed");
//     }
//   };

//   return (
//     <div>
//       <Image title="Login" />

//       <div className="min-h-screen flex flex-col items-center justify-center bg-white">
//         <div className="bg-red-100 rounded-lg px-12 py-10 w-full max-w-md text-center">

//           <div className="mb-8 text-left">
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

//           <div className="mb-10 text-left">
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

//           <div className="flex justify-end mb-5">
//             <Link
//               to="/forgot-password"
//               className="text-sm text-red-500 hover:text-red-600 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           {error && (
//             <p className="text-red-600 mb-4">
//               {error}
//             </p>
//           )}

//           <button
//             onClick={handleLogin}
//             disabled={loading}
//             className="w-full bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-60"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <div className="my-4">
//             <p className="text-gray-500">
//               ─────── OR ───────
//             </p>
//           </div>

//           {/* ✅ Updated Google Button UI */}
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md shadow-sm hover:bg-gray-100 transition"
//           >
//             <img
//               src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//               alt="Google"
//               className="w-5 h-5"
//             />
//             Continue with Google
//           </button>

//         </div>

//         <p className="mt-6 text-gray-800">
//           Don't have an account?{" "}
//           <span
//             onClick={() => navigate("/signup")}
//             className="text-red-500 cursor-pointer font-medium"
//           >
//             Create an account
//           </span>
//         </p>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Login;

import { Link, useNavigate } from "react-router-dom";
import Image from "./image";
import Footer from "./footer";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
import { useState, useEffect } from "react";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaArrowRight,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const idToken = await result.user.getIdToken();

      const response = await fetch(
        "http://localhost:5000/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
      );

      alert("Google Login Successful");

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#080d16] text-white">
      {/* Page Banner */}
      <Image title="Login" />

      {/* Login Section */}
      <section className="relative min-h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-14 sm:py-20 overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md">

          {/* Login Card */}
          <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FaLock className="text-red-500 text-xl" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome <span className="text-red-500">Back!</span>
              </h1>

              <p className="text-gray-400 text-sm mt-2">
                Login to continue to Fresh Bites
              </p>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#0b111b] border border-white/10 text-white placeholder-gray-600 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#0b111b] border border-white/10 text-white placeholder-gray-600 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mb-6">
              <Link
                to="/forgot-password"
                className="text-sm text-red-500 hover:text-red-400 hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-500/10"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
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

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 rounded-xl transition duration-300"
            >
              <FaGoogle className="text-red-500" />

              Continue with Google
            </button>

          </div>

          {/* Signup */}
          <div className="text-center mt-7">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-red-500 hover:text-red-400 font-semibold cursor-pointer transition"
              >
                Create an account
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

export default Login;