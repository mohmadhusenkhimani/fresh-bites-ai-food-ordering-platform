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

//   // Fetch Users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users");
//       setUsers(res.data);
//     } catch (error) {
//       console.log("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Delete User
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/users/${id}`);

//       setUsers(users.filter((user) => user._id !== id));

//       alert("User deleted successfully");
//     } catch (error) {
//       console.log("Error deleting user:", error);
//     }
//   };

//   // Search Filter
//   const filteredUsers = users.filter(
//     (user) =>
//       user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
//       user.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   // Pagination
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;

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

//       <div className="flex-1 bg-gray-100 min-h-screen p-6">
//         <h1 className="text-3xl font-bold mb-6">
//           User Management
//         </h1>

//         {/* Search + Add User */}
//         <div className="flex justify-between items-center mb-6">
//           <input
//             type="text"
//             placeholder="Search Users..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full md:w-1/2 p-3 border rounded-lg"
//           />

//           <button
//             onClick={() => navigate("/add-user")}
//             className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
//           >
//             + Add User
//           </button>
//         </div>

//         {/* Table */}
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <table className="w-full text-left">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentUsers.length > 0 ? (
//                 currentUsers.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="border-b hover:bg-gray-50"
//                   >
//                     <td className="p-3">{user.fullName}</td>
//                     <td className="p-3">{user.email}</td>

//                     <td className="p-3">
//                       <button
//                         onClick={() => handleDelete(user._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
//                     className="p-5 text-center text-gray-500"
//                   >
//                     No users found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="flex justify-between items-center p-4 border-t">
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => prev - 1)
//               }
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded ${
//                 currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
//               }`}
//             >
//               Previous
//             </button>

//             <span className="font-semibold">
//               Page {currentPage} of{" "}
//               {totalPages === 0 ? 1 : totalPages}
//             </span>

//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => prev + 1)
//               }
//               disabled={
//                 currentPage === totalPages ||
//                 totalPages === 0
//               }
//               className={`px-4 py-2 rounded ${
//                 currentPage === totalPages ||
//                 totalPages === 0
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
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
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users"
      );

      setUsers(res.data);
    } catch (error) {
      console.log("Error fetching users:", error);
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

      setUsers(
        users.filter((user) => user._id !== id)
      );

      alert("User Deleted Successfully");
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const indexOfLastUser =
    currentPage * usersPerPage;

  const indexOfFirstUser =
    indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-orange-50 min-h-screen p-6">

        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          User Management
        </h1>

        {/* Search + Add User */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <input
            type="text"
            placeholder="Search Users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/2 p-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            onClick={() =>
              navigate("/add-user")
            }
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
          >
            + Add User
          </button>

        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <table className="w-full text-left">

            <thead className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
              <tr>
                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Email
                </th>

                <th className="p-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-orange-50 transition"
                  >
                    <td className="p-4 font-medium">
                      {user.fullName}
                    </td>

                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          handleDelete(user._id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center p-8 text-gray-500"
                  >
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t">

            <button
              onClick={() =>
                setCurrentPage(
                  (prev) => prev - 1
                )
              }
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              Previous
            </button>

            <span className="font-semibold text-orange-600">
              Page {currentPage} of{" "}
              {totalPages === 0
                ? 1
                : totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage(
                  (prev) => prev + 1
                )
              }
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages ||
                totalPages === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              Next
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Users;