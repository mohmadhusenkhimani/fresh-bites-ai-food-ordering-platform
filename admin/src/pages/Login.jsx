// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await axios.post(
//         "http://localhost:5000/api/admin/login",
//         {
//           email,
//           password,
//         }
//       );

//       if (response.data.success) {
//         localStorage.setItem("token", response.data.token);
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//         "Login Failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

//         <h1 className="text-3xl font-bold text-center mb-6">
//           Admin Login
//         </h1>

       

//         <div className="mb-4">
//           <label className="block mb-2">
//             Email
//           </label>

//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border p-3 rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">
//             Password
//           </label>

//           <input
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border p-3 rounded"
//           />
//         </div>

//         {error && (
//           <p className="text-red-500 mb-4">
//             {error}
//           </p>
//         )}

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 disabled:bg-gray-400"
//         >
//           {loading ? "Logging In..." : "Login"}
//         </button>

//       </div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login Failed");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080d16] text-white flex items-center justify-center px-4 py-8 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="relative w-full max-w-md">

        <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

          {/* Top Accent */}
          <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-700" />

          <div className="p-6 sm:p-8">

            {/* Logo / Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-lg shadow-red-500/10">

                <div className="w-11 h-11 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                  <span className="text-white text-xl font-bold">
                    F
                  </span>
                </div>

              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-8">

              <p className="text-red-500 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                Fresh Bites
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Admin Login
              </h1>

              <p className="text-gray-400 text-sm mt-2">
                Sign in to access the admin dashboard
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20">

                <div className="flex items-start gap-2">

                  <span className="text-red-400 text-sm">
                    ⚠
                  </span>

                  <p className="text-red-400 text-sm">
                    {error}
                  </p>

                </div>

              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div>

                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ✉
                  </span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    disabled={loading}
                    autoComplete="email"
                    className="
                      w-full
                      bg-[#0b111b]
                      border border-white/10
                      text-white
                      placeholder-gray-600
                      rounded-xl
                      py-3.5
                      pl-11
                      pr-4
                      outline-none
                      transition
                      focus:border-red-500/60
                      focus:ring-2
                      focus:ring-red-500/10
                      disabled:opacity-50
                    "
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    🔒
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    disabled={loading}
                    autoComplete="current-password"
                    className="
                      w-full
                      bg-[#0b111b]
                      border border-white/10
                      text-white
                      placeholder-gray-600
                      rounded-xl
                      py-3.5
                      pl-11
                      pr-12
                      outline-none
                      transition
                      focus:border-red-500/60
                      focus:ring-2
                      focus:ring-red-500/10
                      disabled:opacity-50
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      w-9
                      h-9
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      text-gray-500
                      hover:text-white
                      hover:bg-white/5
                      transition
                    "
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>

                </div>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-red-500
                  hover:bg-red-600
                  active:scale-[0.98]
                  disabled:bg-red-500/50
                  disabled:cursor-not-allowed
                  text-white
                  py-3.5
                  rounded-xl
                  font-bold
                  transition-all
                  shadow-lg
                  shadow-red-500/20
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Logging In...
                  </>
                ) : (
                  <>
                    <span>→</span>
                    Login to Dashboard
                  </>
                )}

              </button>

            </form>

            {/* Security Info */}
            <div className="mt-7 pt-5 border-t border-white/10">

              <div className="flex items-center justify-center gap-2 text-gray-500">

                <span className="text-green-500">
                  ●
                </span>

                <p className="text-xs">
                  Secure Admin Authentication
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-600 text-xs mt-5">
          © {new Date().getFullYear()} Fresh Bites. Admin Portal.
        </p>

      </div>

    </div>
  );
}

export default Login;