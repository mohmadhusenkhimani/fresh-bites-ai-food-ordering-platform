// import { useNavigate } from "react-router-dom";
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

//  const handleGoogleLogin = async () => {
//   try {
//     // Login with Firebase
//     const result = await signInWithPopup(auth, googleProvider);

//     // Get Firebase ID Token
//     const idToken = await result.user.getIdToken();

//     // Send token to backend
//     const response = await fetch("http://localhost:5000/api/auth/google", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         idToken,
//       }),
//     });

//     const data = await response.json();

//     if (!data.success) {
//       alert(data.message);
//       return;
//     }

//     // Save Backend JWT
//     localStorage.setItem("token", data.token);
//     localStorage.setItem(
//       "currentUser",
//       JSON.stringify(data.user)
//     );

//     alert("Google Login Successful");

//     window.location.href = "/";
//   } catch (error) {
//     console.error(error);
//     alert("Google Login Failed");
//   }
// };
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

//           <button
//             onClick={handleGoogleLogin}
//             className="w-full bg-white border border-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-100 transition"
//           >
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
    <div>
      <Image title="Login" />

      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="bg-red-100 rounded-lg px-12 py-10 w-full max-w-md text-center">

          <div className="mb-8 text-left">
            <label className="block text-gray-600 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-red-500 py-1"
            />
          </div>

          <div className="mb-10 text-left">
            <label className="block text-gray-600 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-red-500 py-1"
            />
          </div>

          <div className="flex justify-end mb-5">
            <Link
              to="/forgot-password"
              className="text-sm text-red-500 hover:text-red-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p className="text-red-600 mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="my-4">
            <p className="text-gray-500">
              ─────── OR ───────
            </p>
          </div>

          {/* ✅ Updated Google Button UI */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md shadow-sm hover:bg-gray-100 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

        </div>

        <p className="mt-6 text-gray-800">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-red-500 cursor-pointer font-medium"
          >
            Create an account
          </span>
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Login;