import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AddFood = () => {
  const navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    isAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFood({
      ...food,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/foods",
        food
      );

      alert("Food Added Successfully");
      navigate("/foods");
    } catch (error) {
      console.error(error);
      alert("Failed To Add Food");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">
          Add Food
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg max-w-2xl"
        >
          {/* Food Name */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Food Name
            </label>

            <input
              type="text"
              name="name"
              value={food.name}
              onChange={handleChange}
              placeholder="Enter Food Name"
              required
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              name="category"
              value={food.category}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            >
              <option value="">
                Select Category
              </option>

              <option value="Burger">
                Burger
              </option>

              <option value="Pizza">
                Pizza
              </option>

              <option value="Snacks">
                Snacks
              </option>

              <option value="Drinks">
                Drinks
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={food.price}
              onChange={handleChange}
              placeholder="Enter Price"
              required
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={food.image}
              onChange={handleChange}
              placeholder="Enter Image URL"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Image Preview */}
          {food.image && (
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Image Preview
              </label>

              <img
                src={food.image}
                alt="Food Preview"
                className="w-40 h-40 object-cover border rounded-lg"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/150?text=Invalid+Image";
                }}
              />
            </div>
          )}

          {/* Availability */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Availability
            </label>

            <select
              value={food.isAvailable}
              onChange={(e) =>
                setFood({
                  ...food,
                  isAvailable:
                    e.target.value === "true",
                })
              }
              className="w-full border p-3 rounded-lg"
            >
              <option value="true">
                Available
              </option>

              <option value="false">
                Not Available
              </option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Add Food
            </button>

            <button
              type="button"
              onClick={() => navigate("/foods")}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;