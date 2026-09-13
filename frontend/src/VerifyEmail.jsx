// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import Image from "./image";
// // import Footer from "./footer";

// // function VerifyEmail() {
// //   const { token } = useParams();
// //   const navigate = useNavigate();

// //   const [message, setMessage] = useState("Verifying your email...");
// //   const [success, setSuccess] = useState(false);

// //   useEffect(() => {
// //     const verify = async () => {
// //       try {
// //         const response = await fetch(
// //           `http://localhost:5000/api/auth/verify-email/${token}`
// //         );

// //         const data = await response.json();

// //         if (data.success) {
// //           setSuccess(true);
// //           setMessage("✅ Email verified successfully!");

// //           setTimeout(() => {
// //             navigate("/login");
// //           }, 3000);
// //         } else {
// //           setSuccess(false);
// //           setMessage(data.message);
// //         }
// //       } catch (error) {
// //         setSuccess(false);
// //         setMessage("Something went wrong.");
// //       }
// //     };

// //     verify();
// //   }, [token, navigate]);

// //   return (
// //     <>
// //       <Image title="Verify Email" />

// //       <div className="min-h-screen flex justify-center items-center bg-white">
// //         <div className="bg-red-100 p-10 rounded-lg shadow-lg w-full max-w-lg text-center">

// //           <h2 className="text-3xl font-bold mb-6">
// //             Email Verification
// //           </h2>

// //           <p
// //             className={`text-lg font-semibold ${
// //               success ? "text-green-600" : "text-red-600"
// //             }`}
// //           >
// //             {message}
// //           </p>

// //           {success && (
// //             <p className="mt-5 text-gray-600">
// //               Redirecting to Login...
// //             </p>
// //           )}

// //         </div>
// //       </div>

// //       <Footer />
// //     </>
// //   );
// // }

// // export default VerifyEmail;

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function VerifyEmail() {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [message, setMessage] = useState("Verifying your email...");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/auth/verify-email/${token}`
//         );

//         const data = await response.json();

//         if (data.success) {
//           setMessage("✅ Email verified successfully!");

//           setTimeout(() => {
//             navigate("/login");
//           }, 3000);
//         } else {
//           setMessage(data.message || "Verification failed.");
//         }
//       } catch (error) {
//         setMessage("Something went wrong.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyEmail();
//   }, [token, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
//         <h1 className="text-2xl font-bold mb-4">
//           Email Verification
//         </h1>

//         <p className="text-gray-700">{message}</p>

//         {!loading && (
//           <p className="mt-4 text-sm text-gray-500">
//             Redirecting to Login...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default VerifyEmail;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelopeOpenText,
  FaSignInAlt,
} from "react-icons/fa";

import Image from "./image";
import Footer from "./footer";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/verify-email/${token}`
        );

        const data = await response.json();

        if (data.success) {
          setSuccess(true);
          setMessage("Email verified successfully!");

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setSuccess(false);
          setMessage(
            data.message || "Email verification failed."
          );
        }
      } catch (error) {
        console.error("Email verification error:", error);

        setSuccess(false);
        setMessage(
          "Something went wrong while verifying your email."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#080d16] text-white">
      {/* =========================
          Page Banner
      ========================= */}
      <Image title="Verify Email" />

      {/* =========================
          Verification Section
      ========================= */}
      <main className="min-h-[55vh] flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-lg">
          <div className="relative bg-[#101722] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 text-center shadow-2xl shadow-black/20 overflow-hidden">
            {/* Red Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* =========================
                  Loading State
              ========================= */}
              {loading ? (
                <>
                  <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold mt-7">
                    Verifying Your Email
                  </h1>

                  <p className="text-gray-500 text-sm sm:text-base mt-3">
                    Please wait while we verify your email
                    address.
                  </p>

                  <div className="mt-6 flex justify-center">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      Secure verification in progress
                    </div>
                  </div>
                </>
              ) : success ? (
                /* =========================
                   Success State
                ========================= */
                <>
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <FaCheckCircle className="text-green-500 text-5xl" />
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold mt-7">
                    Email Verified!
                  </h1>

                  <p className="text-green-400 font-semibold mt-3">
                    {message}
                  </p>

                  <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3 text-left">
                    <FaEnvelopeOpenText className="text-green-500 text-lg mt-0.5 flex-shrink-0" />

                    <div>
                      <p className="text-sm font-semibold text-gray-200">
                        Your account is ready
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        You can now log in to your Fresh Bites
                        account.
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mt-6">
                    Redirecting to Login...
                  </p>

                  <button
                    onClick={() => navigate("/login")}
                    className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition shadow-lg shadow-red-500/10"
                  >
                    <FaSignInAlt />
                    Go to Login
                  </button>
                </>
              ) : (
                /* =========================
                   Error State
                ========================= */
                <>
                  <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <FaTimesCircle className="text-red-500 text-5xl" />
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold mt-7">
                    Verification Failed
                  </h1>

                  <p className="text-red-400 font-semibold mt-3">
                    {message}
                  </p>

                  <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-left">
                    <p className="text-sm font-semibold text-gray-300">
                      What can you do?
                    </p>

                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      The verification link may be expired,
                      invalid, or already used. Please try
                      logging in or request a new verification
                      email.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/login")}
                    className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition shadow-lg shadow-red-500/10"
                  >
                    <FaSignInAlt />
                    Go to Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* =========================
          Footer
      ========================= */}
      <Footer />
    </div>
  );
}

export default VerifyEmail;