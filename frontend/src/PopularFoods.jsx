// import { useState } from "react";
// import Chees from "./assets/b-1.jpg";
// import Veg from "./assets/b-2.jpg";
// import Margherita from "./assets/b-3.jpg";
// import French from "./assets/b-4.jpg";
// import Cold from "./assets/b-5.png";
// import { useCart } from "./CartContext";
// import { useDispatch } from "react-redux";
// import { addToCart as addToCartAction } from "./cartSlice";
// const categories = ["All", "Burger", "Pizza", "Snacks", "Drinks"];

// const foods = [
//   { id: 1, name: "Cheese Burger", price: 149, category: "Burger", image: Chees},
//   { id: 2, name: "Veg Burger", price: 129, category: "Burger", image: Veg},
//   { id: 3, name: "Margherita Pizza", price: 299, category: "Pizza", image: Margherita },
//   { id: 4, name: "French Fries", price: 99, category: "Snacks", image: French },
//   { id: 5, name: "Cold Drink", price: 59, category: "Drinks", image: Cold},
// ];

// export default function PopularFoods() {
//   const [active, setActive] = useState("All");
//   const { cartItems, addToCart } = useCart();
//   const dispatch = useDispatch(); 
//   const filteredFoods =
//     active === "All"
//       ? foods
//       : foods.filter((item) => item.category === active);

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center mb-8">
//           Popular <span className="text-red-500">Foods</span>
//         </h2>

//         <div className="bg-red-600 rounded-xl p-3 flex justify-center gap-6 mb-12 flex-wrap">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActive(cat)}
//               className={`px-6 py-2 rounded-lg font-medium transition ${
//                 active === cat
//                   ? "bg-white text-red-600"
//                   : "text-white hover:bg-red-500"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//   {filteredFoods.map((food) => (
//     <div
//       key={food.id}
//       className="bg-white border border-gray-100
//                 shadow hover:shadow-lg transition
//                 p-6 flex flex-col"
//     >
//       {/* Image */}
//       <img
//         src={food.image}
//         alt={food.name}
//         className="w-32 h-32 mx-auto object-contain
//                 transition-transform duration-300 hover:scale-110"
//       />

//       {/* Title */}
//       <h3 className="mt-4 font-semibold text-lg text-center">
//         {food.name}
//       </h3>

//       {/* Bottom Section */}
//       <div className="mt-auto flex items-center justify-between pt-6">
//         {/* Price - Left */}
//         <span className="text-red-500 font-bold text-lg">
//           ₹{food.price}
//         </span>

//         {/* Button - Right */}
//         <button
//           className="bg-red-500 text-white px-5 py-2
//                     rounded-lg hover:bg-red-600 transition"
//           onClick={() => dispatch(addToCartAction(food))}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   ))}
// </div>

//       </div>
//     </section>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from "./cartSlice";

const categories = ["All", "Burger", "Pizza", "Snacks", "Drinks", "Other"];

export default function PopularFoods() {
  const [active, setActive] = useState("All");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/foods"
      );

      setFoods(response.data.foods || []);
    } catch (error) {
      console.error("Error Fetching Foods:", error);
    } finally {
      setLoading(false);
    }
  };

 const filteredFoods =  
  foods
    .filter((food) => food.isAvailable)
    .filter(
      (food) =>
        active === "All" ||
        food.category === active
    );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Popular <span className="text-red-500">Foods</span>
        </h2>

        {/* Category Buttons */}
        <div className="bg-red-600 rounded-xl p-3 flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                active === cat
                  ? "bg-white text-red-600"
                  : "text-white hover:bg-red-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-lg font-semibold">
            Loading Foods...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <div
                  key={food._id}
                  className="bg-white border border-gray-100 shadow hover:shadow-lg transition p-6 flex flex-col rounded-lg"
                >
                  <img
                    src={
                      food.image ||
                      "https://via.placeholder.com/200"
                    }
                    alt={food.name}
                    className="w-32 h-32 mx-auto object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                  />

                  <h3 className="mt-4 font-semibold text-lg text-center">
                    {food.name}
                  </h3>

                  <p className="text-center text-gray-500 mt-1">
                    {food.category}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="text-red-500 font-bold text-lg">
                      ₹{food.price}
                    </span>

                    <button
                      className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() =>
                        dispatch(
                          addToCartAction({
                            id: food._id,
                            name: food.name,
                            price: food.price,
                            image: food.image,
                          })
                        )
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No Foods Available
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}