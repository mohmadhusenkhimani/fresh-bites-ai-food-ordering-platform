// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { useNavigate, useParams } from "react-router-dom";

// const EditFood = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [food, setFood] = useState({
//     name: "",
//     category: "",
//     price: "",
//     image: "",
//     isAvailable: true,
//   });

//   useEffect(() => {
//     fetchFood();
//   }, []);

//   const fetchFood = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/foods/${id}`
//       );

//       setFood(res.data.food);
//     } catch (error) {
//       console.error(error);
//     }
//   };

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
//       await axios.put(
//         `http://localhost:5000/api/foods/${id}`,
//         food
//       );

//       alert("Food Updated Successfully");

//       navigate("/foods");
//     } catch (error) {
//       console.error(error);
//       alert("Update Failed");
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         <h1 className="text-3xl font-bold mb-6">
//           Edit Food
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded shadow"
//         >
//           <input
//             type="text"
//             name="name"
//             value={food.name}
//             onChange={handleChange}
//             placeholder="Food Name"
//             className="w-full border p-3 mb-3 rounded"
//           />

//          <select
//   name="category"
//   value={food.category}
//   onChange={handleChange}
//   className="w-full border p-3 mb-3 rounded"
// >
//   <option value="Burger">Burger</option>
//   <option value="Pizza">Pizza</option>
//   <option value="Snacks">Snacks</option>
//   <option value="Drinks">Drinks</option>
//   <option value="Other">Other</option>
// </select>

//           <input
//             type="number"
//             name="price"
//             value={food.price}
//             onChange={handleChange}
//             placeholder="Price"
//             className="w-full border p-3 mb-3 rounded"
//           />

// <div className="mb-4">
//   <label className="block mb-2 font-semibold">
//     Availability
//   </label>

//   <select
//     name="isAvailable"
//     value={food.isAvailable.toString()}
//     onChange={(e) =>
//       setFood({
//         ...food,
//         isAvailable: e.target.value === "true",
//       })
//     }
//     className="w-full border p-3 rounded"
//   >
//     <option value="true">
//       Available
//     </option>

//     <option value="false">
//       Not Available
//     </option>
//   </select>
// </div>


//           {/* Image Preview */}
// {food.image && (
//   <div className="mb-4">
//     <label className="block mb-2 font-semibold">
//       Image Preview
//     </label>

//     <img
//       src={food.image}
//       alt="Preview"
//       className="w-40 h-40 object-cover rounded-lg border"
//       onError={(e) => {
//         e.target.src =
//           "https://via.placeholder.com/150?text=Invalid+Image";
//       }}
//     />
//   </div>
// )}

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-3 rounded"
//           >
//             Update Food
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditFood;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";

const EditFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    isAvailable: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // FETCH FOOD
  // =========================

  useEffect(() => {
    fetchFood();
  }, [id]);

  const fetchFood = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/foods/${id}`
      );

      setFood(res.data.food);
    } catch (error) {
      console.error("Fetch Food Error:", error);
      alert("Failed to load food.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // UPDATE FOOD
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await axios.put(
        `http://localhost:5000/api/foods/${id}`,
        food
      );

      alert("Food Updated Successfully");

      navigate("/foods");
    } catch (error) {
      console.error("Update Food Error:", error);

      alert(
        error.response?.data?.message ||
          "Update Failed"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <AdminLayout title="Edit Food">
        <div className="flex items-center justify-center min-h-[400px]">

          <div className="text-center">

            <div className="
              w-10 h-10
              border-4
              border-white/10
              border-t-red-500
              rounded-full
              animate-spin
              mx-auto
            " />

            <p className="text-gray-400 text-sm mt-4">
              Loading food details...
            </p>

          </div>

        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Food">

      <div className="w-full max-w-4xl mx-auto">

        {/* =========================
            PAGE INTRO
        ========================= */}

        <div className="mb-6">

          <p className="text-gray-400 text-sm">
            Update food item information
          </p>

          <p className="text-gray-500 text-xs mt-1">
            Modify the details below and save your changes.
          </p>

        </div>

        {/* =========================
            FORM CARD
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="
            bg-[#101722]
            border border-white/10
            rounded-2xl
            shadow-xl
            overflow-hidden
          "
        >

          {/* =========================
              FORM HEADER
          ========================= */}

          <div className="
            px-5 sm:px-6 lg:px-8
            py-5
            border-b border-white/10
          ">

            <h2 className="text-lg sm:text-xl font-bold text-white">
              Food Information
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Update the food item's details.
            </p>

          </div>

          {/* =========================
              FORM CONTENT
          ========================= */}

          <div className="
            p-5
            sm:p-6
            lg:p-8
            space-y-6
          ">

            {/* Food Name */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-gray-300
                mb-2
              ">
                Food Name
              </label>

              <input
                type="text"
                name="name"
                value={food.name || ""}
                onChange={handleChange}
                placeholder="Enter food name"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-[#0b111c]
                  border border-white/10
                  text-white
                  placeholder-gray-600
                  outline-none
                  transition
                  focus:border-red-500/50
                  focus:ring-2
                  focus:ring-red-500/10
                "
              />

            </div>

            {/* Category + Price */}

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            ">

              {/* Category */}

              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-gray-300
                  mb-2
                ">
                  Category
                </label>

                <select
                  name="category"
                  value={food.category || ""}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    bg-[#0b111c]
                    border border-white/10
                    text-white
                    outline-none
                    cursor-pointer
                    focus:border-red-500/50
                    focus:ring-2
                    focus:ring-red-500/10
                  "
                >

                  <option
                    value=""
                    disabled
                    className="bg-[#0b111c]"
                  >
                    Select Category
                  </option>

                  <option
                    value="Burger"
                    className="bg-[#0b111c]"
                  >
                    Burger
                  </option>

                  <option
                    value="Pizza"
                    className="bg-[#0b111c]"
                  >
                    Pizza
                  </option>

                  <option
                    value="Snacks"
                    className="bg-[#0b111c]"
                  >
                    Snacks
                  </option>

                  <option
                    value="Drinks"
                    className="bg-[#0b111c]"
                  >
                    Drinks
                  </option>

                  <option
                    value="Other"
                    className="bg-[#0b111c]"
                  >
                    Other
                  </option>

                </select>

              </div>

              {/* Price */}

              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-gray-300
                  mb-2
                ">
                  Price
                </label>

                <div className="relative">

                  <span className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    font-semibold
                  ">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="price"
                    value={food.price || ""}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    required
                    className="
                      w-full
                      pl-9
                      pr-4
                      py-3
                      rounded-xl
                      bg-[#0b111c]
                      border border-white/10
                      text-white
                      placeholder-gray-600
                      outline-none
                      focus:border-red-500/50
                      focus:ring-2
                      focus:ring-red-500/10
                    "
                  />

                </div>

              </div>

            </div>

            {/* Image URL */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-gray-300
                mb-2
              ">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={food.image || ""}
                onChange={handleChange}
                placeholder="https://example.com/food-image.jpg"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-[#0b111c]
                  border border-white/10
                  text-white
                  placeholder-gray-600
                  outline-none
                  focus:border-red-500/50
                  focus:ring-2
                  focus:ring-red-500/10
                "
              />

              <p className="text-xs text-gray-600 mt-2">
                Enter a valid image URL for the food item.
              </p>

            </div>

            {/* Availability */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-gray-300
                mb-2
              ">
                Availability
              </label>

              <select
                name="isAvailable"
                value={String(food.isAvailable)}
                onChange={(e) =>
                  setFood((prev) => ({
                    ...prev,
                    isAvailable:
                      e.target.value === "true",
                  }))
                }
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-[#0b111c]
                  border border-white/10
                  text-white
                  outline-none
                  cursor-pointer
                  focus:border-red-500/50
                  focus:ring-2
                  focus:ring-red-500/10
                "
              >

                <option
                  value="true"
                  className="bg-[#0b111c]"
                >
                  Available
                </option>

                <option
                  value="false"
                  className="bg-[#0b111c]"
                >
                  Not Available
                </option>

              </select>

            </div>

            {/* =========================
                IMAGE PREVIEW
            ========================= */}

            {food.image && (
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-gray-300
                  mb-3
                ">
                  Image Preview
                </label>

                <div className="
                  bg-[#0b111c]
                  border border-white/10
                  rounded-xl
                  p-4
                  inline-block
                  max-w-full
                ">

                  <img
                    src={food.image}
                    alt={food.name || "Food Preview"}
                    className="
                      w-40
                      h-40
                      sm:w-48
                      sm:h-48
                      object-cover
                      rounded-lg
                      border
                      border-white/10
                    "
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/200?text=Invalid+Image";
                    }}
                  />

                </div>

              </div>
            )}

          </div>

          {/* =========================
              FORM ACTIONS
          ========================= */}

          <div className="
            px-5
            sm:px-6
            lg:px-8
            py-5
            border-t border-white/10
            flex
            flex-col-reverse
            sm:flex-row
            sm:justify-end
            gap-3
          ">

            <button
              type="button"
              onClick={() => navigate("/foods")}
              disabled={saving}
              className="
                w-full
                sm:w-auto
                px-6
                py-3
                rounded-xl
                bg-white/5
                hover:bg-white/10
                border border-white/10
                text-gray-300
                font-semibold
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="
                w-full
                sm:w-auto
                px-6
                py-3
                rounded-xl
                bg-red-500
                hover:bg-red-600
                active:bg-red-700
                text-white
                font-semibold
                transition
                shadow-lg
                shadow-red-500/20
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {saving
                ? "Updating..."
                : "Update Food"}
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>
  );
};

export default EditFood;