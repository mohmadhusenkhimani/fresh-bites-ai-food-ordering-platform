import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import Image from "./image";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "./authSlice";
import { useState } from "react";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 

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
      const result = await signInWithPopup(auth, googleProvider);

      const user = {
        fullName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("token", "google-login");

      alert("Google Signup Successful");

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Google Signup Failed");
    }
  };

  return (
    <div>
      <Image title="Signup" />

      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="bg-red-100 rounded-lg px-14 py-12 w-full max-w-md">

          <div className="mb-8">
            <label className="block text-gray-600 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-red-500 py-1"
            />
          </div>

          <div className="mb-8">
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

          <div className="mb-8">
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

          <div className="text-center">
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-60"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          <div className="my-4 text-center">
            <p className="text-gray-500">
              ────── OR ──────
            </p>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full bg-white border border-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Continue with Google
          </button>

          {error && (
            <p className="text-red-600 mt-4 text-center">
              {error}
            </p>
          )}
        </div>

        <p className="mt-10 text-gray-800">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-500 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;