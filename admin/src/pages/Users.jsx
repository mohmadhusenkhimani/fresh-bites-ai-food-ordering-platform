// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { useNavigate } from "react-router-dom";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const usersPerPage = 10;
//   const navigate = useNavigate();

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/users"
//       );

//       setUsers(res.data);
//     } catch (error) {
//       console.log("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await axios.delete(
//         `http://localhost:5000/api/users/${id}`
//       );

//       setUsers(
//         users.filter((user) => user._id !== id)
//       );

//       alert("User Deleted Successfully");
//     } catch (error) {
//       console.log("Error deleting user:", error);
//     }
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.fullName
//         ?.toLowerCase()
//         .includes(search.toLowerCase()) ||
//       user.email
//         ?.toLowerCase()
//         .includes(search.toLowerCase())
//   );

//   const indexOfLastUser =
//     currentPage * usersPerPage;

//   const indexOfFirstUser =
//     indexOfLastUser - usersPerPage;

//   const currentUsers = filteredUsers.slice(
//     indexOfFirstUser,
//     indexOfLastUser
//   );

//   const totalPages = Math.ceil(
//     filteredUsers.length / usersPerPage
//   );

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 bg-orange-50 min-h-screen p-6">

//         <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
//           User Management
//         </h1>

//         {/* Search + Add User */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

//           <input
//             type="text"
//             placeholder="Search Users..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full md:w-1/2 p-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
//           />

//           <button
//             onClick={() =>
//               navigate("/add-user")
//             }
//             className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
//           >
//             + Add User
//           </button>

//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

//           <table className="w-full text-left">

//             <thead className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
//               <tr>
//                 <th className="p-4">
//                   Name
//                 </th>

//                 <th className="p-4">
//                   Email
//                 </th>

//                 <th className="p-4">
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentUsers.length > 0 ? (
//                 currentUsers.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="border-b hover:bg-orange-50 transition"
//                   >
//                     <td className="p-4 font-medium">
//                       {user.fullName}
//                     </td>

//                     <td className="p-4 text-gray-600">
//                       {user.email}
//                     </td>

//                     <td className="p-4">
//                       <button
//                         onClick={() =>
//                           handleDelete(user._id)
//                         }
//                         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="3"
//                     className="text-center p-8 text-gray-500"
//                   >
//                     No Users Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>

//           </table>

//           {/* Pagination */}
//           <div className="flex justify-between items-center p-4 border-t">

//             <button
//               onClick={() =>
//                 setCurrentPage(
//                   (prev) => prev - 1
//                 )
//               }
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg ${
//                 currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-orange-500 text-white hover:bg-orange-600"
//               }`}
//             >
//               Previous
//             </button>

//             <span className="font-semibold text-orange-600">
//               Page {currentPage} of{" "}
//               {totalPages === 0
//                 ? 1
//                 : totalPages}
//             </span>

//             <button
//               onClick={() =>
//                 setCurrentPage(
//                   (prev) => prev + 1
//                 )
//               }
//               disabled={
//                 currentPage === totalPages ||
//                 totalPages === 0
//               }
//               className={`px-4 py-2 rounded-lg ${
//                 currentPage === totalPages ||
//                 totalPages === 0
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-orange-500 text-white hover:bg-orange-600"
//               }`}
//             >
//               Next
//             </button>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Users;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const usersPerPage = 10;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/users"
      );

      setUsers(res.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/users/${id}`
      );

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );

      alert("User Deleted Successfully");
    } catch (error) {
      console.log("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.fullName?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText)
    );
  });

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  const safeTotalPages = totalPages === 0 ? 1 : totalPages;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser =
    indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, safeTotalPages)
    );
  };

  return (
    <AdminLayout title="Users">
      <div className="w-full min-w-0">

        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-1">
            Manage registered users
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            User Management
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

          <div className="bg-[#101722] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Total Users
                </p>

                <h3 className="text-2xl font-bold text-white mt-1">
                  {users.length}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl">
                👥
              </div>
            </div>
          </div>

          <div className="bg-[#101722] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Search Results
                </p>

                <h3 className="text-2xl font-bold text-white mt-1">
                  {filteredUsers.length}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
                🔎
              </div>
            </div>
          </div>

        </div>

        {/* Search + Add User */}
        <div className="bg-[#101722] border border-white/10 rounded-2xl p-4 sm:p-5 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div className="w-full lg:max-w-xl">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Users
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  🔎
                </span>

                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={handleSearch}
                  className="w-full bg-[#0b111c] border border-white/10 text-white placeholder-gray-500 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                />
              </div>
            </div>

            <button
              onClick={() => navigate("/add-user")}
              className="w-full lg:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-red-500/20 transition"
            >
              + Add User
            </button>

          </div>
        </div>

        {/* Users Section */}
        <div className="bg-[#101722] border border-white/10 rounded-2xl overflow-hidden">

          {/* Section Header */}
          <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Registered Users
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {filteredUsers.length} user
                {filteredUsers.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-10 h-10 border-4 border-white/10 border-t-red-500 rounded-full animate-spin mb-4" />

              <p className="text-gray-400">
                Loading users...
              </p>
            </div>
          ) : filteredUsers.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-4">
                👥
              </div>

              <h3 className="text-lg font-semibold text-white">
                No Users Found
              </h3>

              <p className="text-gray-500 text-sm mt-2 max-w-sm">
                {search
                  ? "No users match your search."
                  : "There are no registered users yet."}
              </p>

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 text-sm text-red-500 hover:text-red-400 font-medium"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/10">
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        #
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Name
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Email
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className="border-b border-white/5 hover:bg-white/[0.025] transition"
                      >
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {indexOfFirstUser + index + 1}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-bold">
                              {user.fullName
                                ?.charAt(0)
                                ?.toUpperCase() || "U"}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-white">
                                {user.fullName || "Unknown User"}
                              </p>

                              <p className="text-xs text-gray-500">
                                Customer
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-300 break-all">
                            {user.email}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() =>
                              handleDelete(user._id)
                            }
                            className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-white/5">
                {currentUsers.map((user, index) => (
                  <div
                    key={user._id}
                    className="p-4 hover:bg-white/[0.02] transition"
                  >
                    <div className="flex items-start gap-3">

                      <div className="w-11 h-11 shrink-0 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-bold">
                        {user.fullName
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate">
                              {user.fullName || "Unknown User"}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              User #{indexOfFirstUser + index + 1}
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              handleDelete(user._id)
                            }
                            className="shrink-0 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-500 hover:text-white transition"
                          >
                            Delete
                          </button>
                        </div>

                        <p className="text-sm text-gray-400 break-all mt-3">
                          {user.email}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="px-4 sm:px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="text-gray-300 font-medium">
                    {indexOfFirstUser + 1}
                  </span>{" "}
                  to{" "}
                  <span className="text-gray-300 font-medium">
                    {Math.min(
                      indexOfLastUser,
                      filteredUsers.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="text-gray-300 font-medium">
                    {filteredUsers.length}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                      currentPage === 1
                        ? "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold">
                    {currentPage} / {safeTotalPages}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={
                      currentPage === safeTotalPages ||
                      totalPages === 0
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                      currentPage === safeTotalPages ||
                      totalPages === 0
                        ? "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Next
                  </button>
                </div>

              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Users;