// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";

// const AddFood = () => {
//   const navigate = useNavigate();

//   const [food, setFood] = useState({
//     name: "",
//     category: "",
//     price: "",
//     image: "",
//     isAvailable: true,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFood({
//       ...food,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         "http://localhost:5000/api/foods",
//         food
//       );

//       alert("Food Added Successfully");
//       navigate("/foods");
//     } catch (error) {
//       console.error(error);
//       alert("Failed To Add Food");
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 bg-gray-100 min-h-screen p-6">
//         <h1 className="text-3xl font-bold mb-6">
//           Add Food
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-lg max-w-2xl"
//         >
//           {/* Food Name */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">
//               Food Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={food.name}
//               onChange={handleChange}
//               placeholder="Enter Food Name"
//               required
//               className="w-full border p-3 rounded-lg"
//             />
//           </div>

//           {/* Category */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">
//               Category
//             </label>

//             <select
//               name="category"
//               value={food.category}
//               onChange={handleChange}
//               required
//               className="w-full border p-3 rounded-lg"
//             >
//               <option value="">
//                 Select Category
//               </option>

//               <option value="Burger">
//                 Burger
//               </option>

//               <option value="Pizza">
//                 Pizza
//               </option>

//               <option value="Snacks">
//                 Snacks
//               </option>

//               <option value="Drinks">
//                 Drinks
//               </option>

//               <option value="Other">
//                 Other
//               </option>
//             </select>
//           </div>

//           {/* Price */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">
//               Price
//             </label>

//             <input
//               type="number"
//               name="price"
//               value={food.price}
//               onChange={handleChange}
//               placeholder="Enter Price"
//               required
//               className="w-full border p-3 rounded-lg"
//             />
//           </div>

//           {/* Image URL */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">
//               Image URL
//             </label>

//             <input
//               type="text"
//               name="image"
//               value={food.image}
//               onChange={handleChange}
//               placeholder="Enter Image URL"
//               className="w-full border p-3 rounded-lg"
//             />
//           </div>

//           {/* Image Preview */}
//           {food.image && (
//             <div className="mb-4">
//               <label className="block mb-2 font-medium">
//                 Image Preview
//               </label>

//               <img
//                 src={food.image}
//                 alt="Food Preview"
//                 className="w-40 h-40 object-cover border rounded-lg"
//                 onError={(e) => {
//                   e.target.src =
//                     "https://via.placeholder.com/150?text=Invalid+Image";
//                 }}
//               />
//             </div>
//           )}

//           {/* Availability */}
//           <div className="mb-6">
//             <label className="block mb-2 font-medium">
//               Availability
//             </label>

//             <select
//               value={food.isAvailable}
//               onChange={(e) =>
//                 setFood({
//                   ...food,
//                   isAvailable:
//                     e.target.value === "true",
//                 })
//               }
//               className="w-full border p-3 rounded-lg"
//             >
//               <option value="true">
//                 Available
//               </option>

//               <option value="false">
//                 Not Available
//               </option>
//             </select>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
//             >
//               Add Food
//             </button>

//             <button
//               type="button"
//               onClick={() => navigate("/foods")}
//               className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddFood;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const AddFood = () => {
  const navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    isAvailable: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/foods",
        food
      );

      alert("Food Added Successfully");

      navigate("/foods");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed To Add Food"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add Food">

      <div className="w-full max-w-4xl min-w-0">

        {/* Page Heading */}
        <div className="mb-6">

          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Add New Food
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add a new food item to your Fresh Bites menu.
          </p>

        </div>

        {/* Form Card */}
        <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-xl shadow-black/10 overflow-hidden">

          {/* Form Header */}
          <div className="px-5 sm:px-6 py-5 border-b border-white/10">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <span className="text-xl">
                  🍔
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Food Information
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Enter the details of the food item.
                </p>
              </div>

            </div>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-6"
          >

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Food Name */}
              <div className="sm:col-span-2">

                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Food Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={food.name}
                  onChange={handleChange}
                  placeholder="Enter Food Name"
                  required
                  className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                />

              </div>

              {/* Category */}
              <div>

                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Category
                </label>

                <select
                  name="category"
                  value={food.category}
                  onChange={handleChange}
                  required
                  className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                >

                  <option
                    value=""
                    className="bg-[#101722]"
                  >
                    Select Category
                  </option>

                  <option
                    value="Burger"
                    className="bg-[#101722]"
                  >
                    Burger
                  </option>

                  <option
                    value="Pizza"
                    className="bg-[#101722]"
                  >
                    Pizza
                  </option>

                  <option
                    value="Snacks"
                    className="bg-[#101722]"
                  >
                    Snacks
                  </option>

                  <option
                    value="Drinks"
                    className="bg-[#101722]"
                  >
                    Drinks
                  </option>

                  <option
                    value="Other"
                    className="bg-[#101722]"
                  >
                    Other
                  </option>

                </select>

              </div>

              {/* Price */}
              <div>

                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Price
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="price"
                    value={food.price}
                    onChange={handleChange}
                    placeholder="Enter Price"
                    min="0"
                    required
                    className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                  />

                </div>

              </div>

              {/* Image URL */}
              <div className="sm:col-span-2">

                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={food.image}
                  onChange={handleChange}
                  placeholder="https://example.com/food-image.jpg"
                  className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                />

                <p className="text-xs text-gray-600 mt-2">
                  Add a valid image URL for the food item.
                </p>

              </div>

            </div>

            {/* Image Preview */}
            {food.image && (
              <div className="mt-6">

                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Image Preview
                </label>

                <div className="w-full sm:w-56 h-44 sm:h-56 bg-[#0b111c] border border-white/10 rounded-xl overflow-hidden">

                  <img
                    src={food.image}
                    alt="Food Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=Invalid+Image";
                    }}
                  />

                </div>

              </div>
            )}

            {/* Availability */}
            <div className="mt-6">

              <label className="block mb-2 text-sm font-medium text-gray-300">
                Availability
              </label>

              <select
                value={food.isAvailable}
                onChange={(e) =>
                  setFood((prev) => ({
                    ...prev,
                    isAvailable:
                      e.target.value === "true",
                  }))
                }
                className="w-full sm:w-1/2 min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
              >

                <option
                  value="true"
                  className="bg-[#101722]"
                >
                  Available
                </option>

                <option
                  value="false"
                  className="bg-[#101722]"
                >
                  Not Available
                </option>

              </select>

            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8 pt-6 border-t border-white/10">

              <button
                type="button"
                onClick={() => navigate("/foods")}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:bg-white/[0.08] hover:text-white transition font-medium disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg shadow-red-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Adding Food..."
                  : "Add Food"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </AdminLayout>
  );
};

export default AddFood;