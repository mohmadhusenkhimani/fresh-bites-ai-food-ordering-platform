// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { useNavigate } from "react-router-dom";

// const Foods = () => {
//   const [foods, setFoods] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
// const navigate = useNavigate();
//   const foodsPerPage = 10;

//   useEffect(() => {
//     fetchFoods();
//   }, []);

//   const fetchFoods = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/foods"
//       );

//       setFoods(response.data.foods);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this food?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await axios.delete(
//         `http://localhost:5000/api/foods/${id}`
//       );

//       fetchFoods();

//       alert("Food Deleted Successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Failed To Delete Food");
//     }
//   };

//   // Search Filter
//   const filteredFoods = foods.filter((food) =>
//     food.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // Pagination
//   const indexOfLastFood = currentPage * foodsPerPage;
//   const indexOfFirstFood = indexOfLastFood - foodsPerPage;

//   const currentFoods = filteredFoods.slice(
//     indexOfFirstFood,
//     indexOfLastFood
//   );

//   const totalPages = Math.ceil(
//     filteredFoods.length / foodsPerPage
//   );

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 bg-gray-100 min-h-screen p-6">
//         <h1 className="text-3xl font-bold mb-6">
//           Food Management
//         </h1>

//         {/* Top Controls */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
//           <input
//             type="text"
//             placeholder="Search Food..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full md:w-1/2 p-3 border rounded-lg"
//           />

//           <button onClick={() => navigate("/add-food")}
//             className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
//           >
//             + Add Food
//           </button>
//         </div>

//         {/* Food Table */}
//         <div className="bg-white rounded-lg shadow overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="p-3 text-left">Image</th>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Price</th>
//                 <th className="p-3 text-left">Available</th>
//                 <th className="p-3 text-left">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentFoods.length > 0 ? (
//                 currentFoods.map((food) => (
//                   <tr
//                     key={food._id}
//                     className="border-b hover:bg-gray-50"
//                   >
//                     <td className="p-3">
//                       <img
//                         src={
//                           food.image ||
//                           "https://via.placeholder.com/80"
//                         }
//                         alt={food.name}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                     </td>

//                     <td className="p-3">{food.name}</td>

//                     <td className="p-3">{food.category}</td>

//                     <td className="p-3">
//                       ₹{food.price}
//                     </td>

//                     <td className="p-3">
//                       {food.isAvailable ? (
//                         <span className="text-green-600">
//                           Available
//                         </span>
//                       ) : (
//                         <span className="text-red-600">
//                           Not Available
//                         </span>
//                       )}
//                     </td>

//                     <td className="p-3">
//                      <button
//   onClick={() => navigate(`/edit-food/${food._id}`)}
//   className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
// >
//   Edit
// </button>

//                       <button
//                         onClick={() =>
//                           handleDelete(food._id)
//                         }
//                         className="bg-red-500 text-white px-3 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="text-center p-5 text-gray-500"
//                   >
//                     No foods found
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
//               {totalPages || 1}
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

// export default Foods;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const foodsPerPage = 10;

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/foods"
      );

      setFoods(response.data.foods);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/foods/${id}`
      );

      fetchFoods();

      alert("Food Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed To Delete Food");
    }
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;

  const currentFoods = filteredFoods.slice(
    indexOfFirstFood,
    indexOfLastFood
  );

  const totalPages = Math.ceil(
    filteredFoods.length / foodsPerPage
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-orange-50 min-h-screen p-6">

        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Food Management
        </h1>

        {/* Top Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <input
            type="text"
            placeholder="Search Food..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/2 p-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            onClick={() => navigate("/add-food")}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
          >
            + Add Food
          </button>

        </div>

        {/* Food Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Available</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentFoods.length > 0 ? (
                currentFoods.map((food) => (
                  <tr
                    key={food._id}
                    className="border-b hover:bg-orange-50 transition"
                  >
                    <td className="p-4">
                      <img
                        src={
                          food.image ||
                          "https://via.placeholder.com/80"
                        }
                        alt={food.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    </td>

                    <td className="p-4 font-medium">
                      {food.name}
                    </td>

                    <td className="p-4">
                      {food.category}
                    </td>

                    <td className="p-4 font-semibold text-orange-600">
                      ₹{food.price}
                    </td>

                    <td className="p-4">
                      {food.isAvailable ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          Available
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                          Not Available
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          navigate(`/edit-food/${food._id}`)
                        }
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg mr-2 hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(food._id)
                        }
                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-8 text-gray-500"
                  >
                    No Foods Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t">

            <button
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
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
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
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

export default Foods;