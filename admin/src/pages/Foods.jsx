// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import Sidebar from "../components/Sidebar";
// // // import { useNavigate } from "react-router-dom";

// // // const Foods = () => {
// // //   const [foods, setFoods] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // // const navigate = useNavigate();
// // //   const foodsPerPage = 10;

// // //   useEffect(() => {
// // //     fetchFoods();
// // //   }, []);

// // //   const fetchFoods = async () => {
// // //     try {
// // //       const response = await axios.get(
// // //         "http://localhost:5000/api/foods"
// // //       );

// // //       setFoods(response.data.foods);
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     const confirmDelete = window.confirm(
// // //       "Are you sure you want to delete this food?"
// // //     );

// // //     if (!confirmDelete) return;

// // //     try {
// // //       await axios.delete(
// // //         `http://localhost:5000/api/foods/${id}`
// // //       );

// // //       fetchFoods();

// // //       alert("Food Deleted Successfully");
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert("Failed To Delete Food");
// // //     }
// // //   };

// // //   // Search Filter
// // //   const filteredFoods = foods.filter((food) =>
// // //     food.name.toLowerCase().includes(search.toLowerCase())
// // //   );

// // //   // Pagination
// // //   const indexOfLastFood = currentPage * foodsPerPage;
// // //   const indexOfFirstFood = indexOfLastFood - foodsPerPage;

// // //   const currentFoods = filteredFoods.slice(
// // //     indexOfFirstFood,
// // //     indexOfLastFood
// // //   );

// // //   const totalPages = Math.ceil(
// // //     filteredFoods.length / foodsPerPage
// // //   );

// // //   return (
// // //     <div className="flex">
// // //       <Sidebar />

// // //       <div className="flex-1 bg-gray-100 min-h-screen p-6">
// // //         <h1 className="text-3xl font-bold mb-6">
// // //           Food Management
// // //         </h1>

// // //         {/* Top Controls */}
// // //         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
// // //           <input
// // //             type="text"
// // //             placeholder="Search Food..."
// // //             value={search}
// // //             onChange={(e) => {
// // //               setSearch(e.target.value);
// // //               setCurrentPage(1);
// // //             }}
// // //             className="w-full md:w-1/2 p-3 border rounded-lg"
// // //           />

// // //           <button onClick={() => navigate("/add-food")}
// // //             className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
// // //           >
// // //             + Add Food
// // //           </button>
// // //         </div>

// // //         {/* Food Table */}
// // //         <div className="bg-white rounded-lg shadow overflow-x-auto">
// // //           <table className="w-full">
// // //             <thead className="bg-gray-200">
// // //               <tr>
// // //                 <th className="p-3 text-left">Image</th>
// // //                 <th className="p-3 text-left">Name</th>
// // //                 <th className="p-3 text-left">Category</th>
// // //                 <th className="p-3 text-left">Price</th>
// // //                 <th className="p-3 text-left">Available</th>
// // //                 <th className="p-3 text-left">Action</th>
// // //               </tr>
// // //             </thead>

// // //             <tbody>
// // //               {currentFoods.length > 0 ? (
// // //                 currentFoods.map((food) => (
// // //                   <tr
// // //                     key={food._id}
// // //                     className="border-b hover:bg-gray-50"
// // //                   >
// // //                     <td className="p-3">
// // //                       <img
// // //                         src={
// // //                           food.image ||
// // //                           "https://via.placeholder.com/80"
// // //                         }
// // //                         alt={food.name}
// // //                         className="w-16 h-16 object-cover rounded"
// // //                       />
// // //                     </td>

// // //                     <td className="p-3">{food.name}</td>

// // //                     <td className="p-3">{food.category}</td>

// // //                     <td className="p-3">
// // //                       ₹{food.price}
// // //                     </td>

// // //                     <td className="p-3">
// // //                       {food.isAvailable ? (
// // //                         <span className="text-green-600">
// // //                           Available
// // //                         </span>
// // //                       ) : (
// // //                         <span className="text-red-600">
// // //                           Not Available
// // //                         </span>
// // //                       )}
// // //                     </td>

// // //                     <td className="p-3">
// // //                      <button
// // //   onClick={() => navigate(`/edit-food/${food._id}`)}
// // //   className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
// // // >
// // //   Edit
// // // </button>

// // //                       <button
// // //                         onClick={() =>
// // //                           handleDelete(food._id)
// // //                         }
// // //                         className="bg-red-500 text-white px-3 py-1 rounded"
// // //                       >
// // //                         Delete
// // //                       </button>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               ) : (
// // //                 <tr>
// // //                   <td
// // //                     colSpan="6"
// // //                     className="text-center p-5 text-gray-500"
// // //                   >
// // //                     No foods found
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
// // //           </table>

// // //           {/* Pagination */}
// // //           <div className="flex justify-between items-center p-4 border-t">
// // //             <button
// // //               onClick={() =>
// // //                 setCurrentPage((prev) => prev - 1)
// // //               }
// // //               disabled={currentPage === 1}
// // //               className={`px-4 py-2 rounded ${
// // //                 currentPage === 1
// // //                   ? "bg-gray-300 cursor-not-allowed"
// // //                   : "bg-blue-500 text-white hover:bg-blue-600"
// // //               }`}
// // //             >
// // //               Previous
// // //             </button>

// // //             <span className="font-semibold">
// // //               Page {currentPage} of{" "}
// // //               {totalPages || 1}
// // //             </span>

// // //             <button
// // //               onClick={() =>
// // //                 setCurrentPage((prev) => prev + 1)
// // //               }
// // //               disabled={
// // //                 currentPage === totalPages ||
// // //                 totalPages === 0
// // //               }
// // //               className={`px-4 py-2 rounded ${
// // //                 currentPage === totalPages ||
// // //                 totalPages === 0
// // //                   ? "bg-gray-300 cursor-not-allowed"
// // //                   : "bg-blue-500 text-white hover:bg-blue-600"
// // //               }`}
// // //             >
// // //               Next
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Foods;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import Sidebar from "../components/Sidebar";
// // import { useNavigate } from "react-router-dom";

// // const Foods = () => {
// //   const [foods, setFoods] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const navigate = useNavigate();
// //   const foodsPerPage = 10;

// //   useEffect(() => {
// //     fetchFoods();
// //   }, []);

// //   const fetchFoods = async () => {
// //     try {
// //       const response = await axios.get(
// //         "http://localhost:5000/api/foods"
// //       );

// //       setFoods(response.data.foods);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     const confirmDelete = window.confirm(
// //       "Are you sure you want to delete this food?"
// //     );

// //     if (!confirmDelete) return;

// //     try {
// //       await axios.delete(
// //         `http://localhost:5000/api/foods/${id}`
// //       );

// //       fetchFoods();

// //       alert("Food Deleted Successfully");
// //     } catch (error) {
// //       console.error(error);
// //       alert("Failed To Delete Food");
// //     }
// //   };

// //   const filteredFoods = foods.filter((food) =>
// //     food.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   const indexOfLastFood = currentPage * foodsPerPage;
// //   const indexOfFirstFood = indexOfLastFood - foodsPerPage;

// //   const currentFoods = filteredFoods.slice(
// //     indexOfFirstFood,
// //     indexOfLastFood
// //   );

// //   const totalPages = Math.ceil(
// //     filteredFoods.length / foodsPerPage
// //   );

// //   return (
// //     <div className="flex">
// //       <Sidebar />

// //       <div className="flex-1 bg-orange-50 min-h-screen p-6">

// //         <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
// //           Food Management
// //         </h1>

// //         {/* Top Controls */}
// //         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

// //           <input
// //             type="text"
// //             placeholder="Search Food..."
// //             value={search}
// //             onChange={(e) => {
// //               setSearch(e.target.value);
// //               setCurrentPage(1);
// //             }}
// //             className="w-full md:w-1/2 p-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
// //           />

// //           <button
// //             onClick={() => navigate("/add-food")}
// //             className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
// //           >
// //             + Add Food
// //           </button>

// //         </div>

// //         {/* Food Table */}
// //         <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

// //           <table className="w-full">

// //             <thead className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
// //               <tr>
// //                 <th className="p-4 text-left">Image</th>
// //                 <th className="p-4 text-left">Name</th>
// //                 <th className="p-4 text-left">Category</th>
// //                 <th className="p-4 text-left">Price</th>
// //                 <th className="p-4 text-left">Available</th>
// //                 <th className="p-4 text-left">Action</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {currentFoods.length > 0 ? (
// //                 currentFoods.map((food) => (
// //                   <tr
// //                     key={food._id}
// //                     className="border-b hover:bg-orange-50 transition"
// //                   >
// //                     <td className="p-4">
// //                       <img
// //                         src={
// //                           food.image ||
// //                           "https://via.placeholder.com/80"
// //                         }
// //                         alt={food.name}
// //                         className="w-16 h-16 object-cover rounded-lg border"
// //                       />
// //                     </td>

// //                     <td className="p-4 font-medium">
// //                       {food.name}
// //                     </td>

// //                     <td className="p-4">
// //                       {food.category}
// //                     </td>

// //                     <td className="p-4 font-semibold text-orange-600">
// //                       ₹{food.price}
// //                     </td>

// //                     <td className="p-4">
// //                       {food.isAvailable ? (
// //                         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
// //                           Available
// //                         </span>
// //                       ) : (
// //                         <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
// //                           Not Available
// //                         </span>
// //                       )}
// //                     </td>

// //                     <td className="p-4">
// //                       <button
// //                         onClick={() =>
// //                           navigate(`/edit-food/${food._id}`)
// //                         }
// //                         className="bg-blue-500 text-white px-3 py-2 rounded-lg mr-2 hover:bg-blue-600 transition"
// //                       >
// //                         Edit
// //                       </button>

// //                       <button
// //                         onClick={() =>
// //                           handleDelete(food._id)
// //                         }
// //                         className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td
// //                     colSpan="6"
// //                     className="text-center p-8 text-gray-500"
// //                   >
// //                     No Foods Found
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>

// //           </table>

// //           {/* Pagination */}
// //           <div className="flex justify-between items-center p-4 border-t">

// //             <button
// //               onClick={() =>
// //                 setCurrentPage((prev) => prev - 1)
// //               }
// //               disabled={currentPage === 1}
// //               className={`px-4 py-2 rounded-lg ${
// //                 currentPage === 1
// //                   ? "bg-gray-300 cursor-not-allowed"
// //                   : "bg-orange-500 text-white hover:bg-orange-600"
// //               }`}
// //             >
// //               Previous
// //             </button>

// //             <span className="font-semibold text-orange-600">
// //               Page {currentPage} of {totalPages || 1}
// //             </span>

// //             <button
// //               onClick={() =>
// //                 setCurrentPage((prev) => prev + 1)
// //               }
// //               disabled={
// //                 currentPage === totalPages ||
// //                 totalPages === 0
// //               }
// //               className={`px-4 py-2 rounded-lg ${
// //                 currentPage === totalPages ||
// //                 totalPages === 0
// //                   ? "bg-gray-300 cursor-not-allowed"
// //                   : "bg-orange-500 text-white hover:bg-orange-600"
// //               }`}
// //             >
// //               Next
// //             </button>

// //           </div>

// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// export default Foods;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const foodsPerPage = 10;

  // =========================
  // FETCH FOODS
  // =========================

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/foods"
      );

      setFoods(response.data.foods || []);
    } catch (error) {
      console.error("Fetch Foods Error:", error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE FOOD
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/foods/${id}`
      );

      alert("Food Deleted Successfully");

      fetchFoods();
    } catch (error) {
      console.error("Delete Food Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed To Delete Food"
      );
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredFoods = foods.filter((food) =>
    food.name?.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredFoods.length / foodsPerPage
  );

  const indexOfLastFood = currentPage * foodsPerPage;

  const indexOfFirstFood =
    indexOfLastFood - foodsPerPage;

  const currentFoods = filteredFoods.slice(
    indexOfFirstFood,
    indexOfLastFood
  );

  // =========================
  // SEARCH CHANGE
  // =========================

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // =========================
  // STATISTICS
  // =========================

  const totalFoods = foods.length;

  const availableFoods = foods.filter(
    (food) => food.isAvailable
  ).length;

  const unavailableFoods =
    totalFoods - availableFoods;

  return (
    <AdminLayout title="Foods">
      <div className="w-full min-w-0">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Manage Food Items
            </h2>

            <p className="text-gray-400 text-sm sm:text-base mt-1">
              Add, edit and manage your food menu.
            </p>
          </div>

          <button
            onClick={() => navigate("/add-food")}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold transition shadow-lg shadow-red-500/20"
          >
            + Add Food
          </button>
        </div>

        {/* =========================
            STATISTICS
        ========================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          {/* Total Foods */}

          <div className="bg-[#101722] border border-white/10 rounded-xl p-5 shadow-lg">
            <p className="text-sm text-gray-400">
              Total Foods
            </p>

            <h3 className="text-2xl font-bold text-white mt-2">
              {totalFoods}
            </h3>
          </div>

          {/* Available Foods */}

          <div className="bg-[#101722] border border-white/10 rounded-xl p-5 shadow-lg">
            <p className="text-sm text-gray-400">
              Available
            </p>

            <h3 className="text-2xl font-bold text-green-400 mt-2">
              {availableFoods}
            </h3>
          </div>

          {/* Unavailable Foods */}

          <div className="bg-[#101722] border border-white/10 rounded-xl p-5 shadow-lg">
            <p className="text-sm text-gray-400">
              Not Available
            </p>

            <h3 className="text-2xl font-bold text-gray-400 mt-2">
              {unavailableFoods}
            </h3>
          </div>

        </div>

        {/* =========================
            SEARCH
        ========================= */}

        <div className="bg-[#101722] border border-white/10 rounded-2xl p-4 sm:p-5 mb-6">

          <input
            type="text"
            placeholder="Search food by name..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 rounded-xl bg-[#0b111c] border border-white/10 text-white placeholder-gray-600 outline-none transition focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10"
          />

          {search && (
            <p className="text-xs text-gray-500 mt-3">
              Showing {filteredFoods.length} result
              {filteredFoods.length !== 1 ? "s" : ""} for "
              {search}"
            </p>
          )}

        </div>

        {/* =========================
            FOOD MENU
        ========================= */}

        <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-xl overflow-hidden">

          {/* Menu Header */}

          <div className="px-5 sm:px-6 py-5 border-b border-white/10">

            <h3 className="text-lg sm:text-xl font-bold text-white">
              Food Menu
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {filteredFoods.length} food item
              {filteredFoods.length !== 1 ? "s" : ""}
            </p>

          </div>

          {/* =========================
              LOADING
          ========================= */}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">

              <div className="w-10 h-10 border-4 border-white/10 border-t-red-500 rounded-full animate-spin" />

              <p className="text-gray-500 text-sm mt-4">
                Loading foods...
              </p>

            </div>
          ) : currentFoods.length === 0 ? (

            /* =========================
               EMPTY STATE
            ========================= */

            <div className="flex flex-col items-center justify-center py-16 px-5">

              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl mb-4">
                🍔
              </div>

              <h3 className="text-lg font-semibold text-white">
                No Foods Found
              </h3>

              <p className="text-sm text-gray-500 mt-1 text-center">
                Try changing your search or add a new food.
              </p>

              <button
                onClick={() => navigate("/add-food")}
                className="mt-5 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
              >
                + Add Food
              </button>

            </div>
          ) : (
            <>
              {/* =========================
                  DESKTOP TABLE
              ========================= */}

              <div className="hidden md:block overflow-x-auto">

                <table className="w-full">

                  <thead>
                    <tr className="border-b border-white/10 bg-[#0b111c]">

                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Image
                      </th>

                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Name
                      </th>

                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Category
                      </th>

                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Price
                      </th>

                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Actions
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {currentFoods.map((food) => (
                      <tr
                        key={food._id}
                        className="border-b border-white/5 hover:bg-white/[0.02] transition"
                      >

                        {/* Image */}

                        <td className="px-6 py-4">

                          <img
                            src={
                              food.image ||
                              "https://via.placeholder.com/80?text=Food"
                            }
                            alt={food.name}
                            className="w-14 h-14 object-cover rounded-xl border border-white/10"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/80?text=Food";
                            }}
                          />

                        </td>

                        {/* Name */}

                        <td className="px-6 py-4">

                          <p className="text-sm font-semibold text-white">
                            {food.name}
                          </p>

                        </td>

                        {/* Category */}

                        <td className="px-6 py-4 text-sm text-gray-400">
                          {food.category}
                        </td>

                        {/* Price */}

                        <td className="px-6 py-4 text-sm font-semibold text-red-400">
                          ₹{food.price}
                        </td>

                        {/* Status */}

                        <td className="px-6 py-4">

                          {food.isAvailable ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">

                              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />

                              Available

                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">

                              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />

                              Not Available

                            </span>
                          )}

                        </td>

                        {/* Actions */}

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-2">

                            <button
                              onClick={() =>
                                navigate(
                                  `/edit-food/${food._id}`
                                )
                              }
                              className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold hover:bg-blue-500/20 transition"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(food._id)
                              }
                              className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

              {/* =========================
                  MOBILE CARDS
              ========================= */}

              <div className="md:hidden p-4 space-y-3">

                {currentFoods.map((food) => (
                  <div
                    key={food._id}
                    className="bg-[#0b111c] border border-white/10 rounded-xl p-4"
                  >

                    <div className="flex items-center gap-3">

                      <img
                        src={
                          food.image ||
                          "https://via.placeholder.com/80?text=Food"
                        }
                        alt={food.name}
                        className="w-16 h-16 flex-shrink-0 object-cover rounded-xl border border-white/10"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/80?text=Food";
                        }}
                      />

                      <div className="min-w-0 flex-1">

                        <h4 className="text-sm font-semibold text-white truncate">
                          {food.name}
                        </h4>

                        <p className="text-xs text-gray-500 mt-1">
                          {food.category}
                        </p>

                        <p className="text-sm font-bold text-red-400 mt-1">
                          ₹{food.price}
                        </p>

                      </div>

                    </div>

                    {/* Mobile Bottom */}

                    <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-white/5">

                      {/* Status */}

                      {food.isAvailable ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">

                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />

                          Available

                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">

                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />

                          Not Available

                        </span>
                      )}

                      {/* Buttons */}

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() =>
                            navigate(
                              `/edit-food/${food._id}`
                            )
                          }
                          className="px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold hover:bg-blue-500/20 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(food._id)
                          }
                          className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

              {/* =========================
                  PAGINATION
              ========================= */}

              <div className="px-4 sm:px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

                <p className="text-xs sm:text-sm text-gray-500">
                  Page {currentPage} of {totalPages || 1}
                </p>

                <div className="flex items-center gap-2">

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => prev - 1)
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                      currentPage === 1
                        ? "bg-white/5 text-gray-600 border-white/5 cursor-not-allowed"
                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Previous
                  </button>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => prev + 1)
                    }
                    disabled={
                      currentPage === totalPages ||
                      totalPages === 0
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                      currentPage === totalPages ||
                      totalPages === 0
                        ? "bg-white/5 text-gray-600 border-white/5 cursor-not-allowed"
                        : "bg-red-500 text-white border-red-500 hover:bg-red-600"
                    }`}
                  >
                    Next
                  </button>

                </div>

              </div>
            </>
          )}

        </div>

        <div className="h-6" />

      </div>
    </AdminLayout>
  );
};

export default Foods;




