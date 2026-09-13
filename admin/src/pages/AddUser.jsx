// import React, { useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { useNavigate } from "react-router-dom";

// const AddUser = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         "http://localhost:5000/api/auth/signup",
//         formData
//       );

//       alert("User Added Successfully");
//       navigate("/users");
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Failed to Add User");
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 bg-gray-100 min-h-screen p-6">
//         <h1 className="text-3xl font-bold mb-6">Add User</h1>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md max-w-xl"
//         >
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full border p-3 rounded mb-4"
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border p-3 rounded mb-4"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border p-3 rounded mb-4"
//             required
//           />

//           <button
//             type="submit"
//             className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
//           >
//             Add User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddUser;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert("User Added Successfully");

      navigate("/users");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to Add User"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add User">

      <div className="w-full max-w-3xl min-w-0">

        {/* Page Heading */}
        <div className="mb-6">

          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Add New User
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Create a new user account for Fresh Bites.
          </p>

        </div>

        {/* Form Card */}
        <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-xl shadow-black/10 overflow-hidden">

          {/* Card Header */}
          <div className="px-5 sm:px-6 py-5 border-b border-white/10">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <span className="text-xl">
                  👤
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  User Information
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Enter the user's account details.
                </p>
              </div>

            </div>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-6"
          >

            {/* Full Name */}
            <div className="mb-5">

              <label className="block mb-2 text-sm font-medium text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
              />

            </div>

            {/* Email */}
            <div className="mb-5">

              <label className="block mb-2 text-sm font-medium text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
              />

            </div>

            {/* Password */}
            <div className="mb-6">

              <label className="block mb-2 text-sm font-medium text-gray-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
              />

              <p className="text-xs text-gray-600 mt-2">
                Use a strong password for the new account.
              </p>

            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-5 border-t border-white/10">

              <button
                type="button"
                onClick={() => navigate("/users")}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:bg-white/[0.08] hover:text-white transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg shadow-red-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Adding User..."
                  : "Add User"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </AdminLayout>
  );
};

export default AddUser;