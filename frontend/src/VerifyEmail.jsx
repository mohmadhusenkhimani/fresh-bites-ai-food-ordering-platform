// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Image from "./image";
// import Footer from "./footer";

// function VerifyEmail() {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [message, setMessage] = useState("Verifying your email...");
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const verify = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/auth/verify-email/${token}`
//         );

//         const data = await response.json();

//         if (data.success) {
//           setSuccess(true);
//           setMessage("✅ Email verified successfully!");

//           setTimeout(() => {
//             navigate("/login");
//           }, 3000);
//         } else {
//           setSuccess(false);
//           setMessage(data.message);
//         }
//       } catch (error) {
//         setSuccess(false);
//         setMessage("Something went wrong.");
//       }
//     };

//     verify();
//   }, [token, navigate]);

//   return (
//     <>
//       <Image title="Verify Email" />

//       <div className="min-h-screen flex justify-center items-center bg-white">
//         <div className="bg-red-100 p-10 rounded-lg shadow-lg w-full max-w-lg text-center">

//           <h2 className="text-3xl font-bold mb-6">
//             Email Verification
//           </h2>

//           <p
//             className={`text-lg font-semibold ${
//               success ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>

//           {success && (
//             <p className="mt-5 text-gray-600">
//               Redirecting to Login...
//             </p>
//           )}

//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default VerifyEmail;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/verify-email/${token}`
        );

        const data = await response.json();

        if (data.success) {
          setMessage("✅ Email verified successfully!");

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setMessage(data.message || "Verification failed.");
        }
      } catch (error) {
        setMessage("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Email Verification
        </h1>

        <p className="text-gray-700">{message}</p>

        {!loading && (
          <p className="mt-4 text-sm text-gray-500">
            Redirecting to Login...
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;