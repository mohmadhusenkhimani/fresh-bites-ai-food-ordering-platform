import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

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

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/foods/${id}`
      );

      setFood(res.data.food);
    } catch (error) {
      console.error(error);
    }
  };

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
      await axios.put(
        `http://localhost:5000/api/foods/${id}`,
        food
      );

      alert("Food Updated Successfully");

      navigate("/foods");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Edit Food
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow"
        >
          <input
            type="text"
            name="name"
            value={food.name}
            onChange={handleChange}
            placeholder="Food Name"
            className="w-full border p-3 mb-3 rounded"
          />

         <select
  name="category"
  value={food.category}
  onChange={handleChange}
  className="w-full border p-3 mb-3 rounded"
>
  <option value="Burger">Burger</option>
  <option value="Pizza">Pizza</option>
  <option value="Snacks">Snacks</option>
  <option value="Drinks">Drinks</option>
  <option value="Other">Other</option>
</select>

          <input
            type="number"
            name="price"
            value={food.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-3 mb-3 rounded"
          />

<div className="mb-4">
  <label className="block mb-2 font-semibold">
    Availability
  </label>

  <select
    name="isAvailable"
    value={food.isAvailable.toString()}
    onChange={(e) =>
      setFood({
        ...food,
        isAvailable: e.target.value === "true",
      })
    }
    className="w-full border p-3 rounded"
  >
    <option value="true">
      Available
    </option>

    <option value="false">
      Not Available
    </option>
  </select>
</div>


          {/* Image Preview */}
{food.image && (
  <div className="mb-4">
    <label className="block mb-2 font-semibold">
      Image Preview
    </label>

    <img
      src={food.image}
      alt="Preview"
      className="w-40 h-40 object-cover rounded-lg border"
      onError={(e) => {
        e.target.src =
          "https://via.placeholder.com/150?text=Invalid+Image";
      }}
    />
  </div>
)}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Update Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFood;