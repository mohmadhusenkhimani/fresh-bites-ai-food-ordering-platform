// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addToCart as addToCartAction } from "./cartSlice";

// const categories = ["All", "Burger", "Pizza", "Snacks", "Drinks", "Other"];

// export default function PopularFoods() {
//   const [active, setActive] = useState("All");
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     fetchFoods();
//   }, []);

//   const fetchFoods = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/foods"
//       );

//       setFoods(response.data.foods || []);
//     } catch (error) {
//       console.error("Error Fetching Foods:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//  const filteredFoods =  
//   foods
//     .filter((food) => food.isAvailable)
//     .filter(
//       (food) =>
//         active === "All" ||
//         food.category === active
//     );

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center mb-8">
//           Popular <span className="text-red-500">Foods</span>
//         </h2>

//         {/* Category Buttons */}
//         <div className="bg-red-600 rounded-xl p-3 flex justify-center gap-4 mb-12 flex-wrap">
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

//         {/* Loading */}
//         {loading ? (
//           <div className="text-center text-lg font-semibold">
//             Loading Foods...
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {filteredFoods.length > 0 ? (
//               filteredFoods.map((food) => (
//                 <div
//                   key={food._id}
//                   className="bg-white border border-gray-100 shadow hover:shadow-lg transition p-6 flex flex-col rounded-lg"
//                 >
//                   <img
//                     src={
//                       food.image ||
//                       "https://via.placeholder.com/200"
//                     }
//                     alt={food.name}
//                     className="w-32 h-32 mx-auto object-cover rounded-lg transition-transform duration-300 hover:scale-110"
//                   />

//                   <h3 className="mt-4 font-semibold text-lg text-center">
//                     {food.name}
//                   </h3>

//                   <p className="text-center text-gray-500 mt-1">
//                     {food.category}
//                   </p>

//                   <div className="mt-auto flex items-center justify-between pt-6">
//                     <span className="text-red-500 font-bold text-lg">
//                       ₹{food.price}
//                     </span>

//                     <button
//                       className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
//                       onClick={() =>
//                         dispatch(
//                           addToCartAction({
//                             id: food._id,
//                             name: food.name,
//                             price: food.price,
//                             image: food.image,
//                           })
//                         )
//                       }
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center text-gray-500 text-lg">
//                 No Foods Available
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from "./cartSlice";

const categories = [
  "All",
  "Burger",
  "Pizza",
  "Snacks",
  "Drinks",
  "Other",
];

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

  const filteredFoods = foods
    .filter((food) => food.isAvailable)
    .filter(
      (food) =>
        active === "All" ||
        food.category === active
    );

  const handleAddToCart = (food) => {
    dispatch(
      addToCartAction({
        id: food._id,
        name: food.name,
        price: food.price,
        image: food.image,
      })
    );
  };

  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-[#080d16] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            OUR MENU
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Popular{" "}
            <span className="text-red-500">
              Foods
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
            Discover our most loved dishes, prepared fresh
            and delivered straight to your doorstep.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 sm:mb-12">
          <div className="bg-[#101722] border border-white/10 rounded-2xl p-2 sm:p-3 shadow-xl shadow-black/10">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide sm:flex-wrap sm:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`
                    flex-shrink-0
                    px-4 sm:px-6
                    py-2 sm:py-2.5
                    rounded-xl
                    text-xs sm:text-sm
                    font-semibold
                    transition-all duration-300
                    ${
                      active === cat
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-[#101722] border border-white/10 rounded-2xl p-5 animate-pulse"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-2xl bg-white/10" />

                <div className="h-5 bg-white/10 rounded mt-5 w-3/4 mx-auto" />

                <div className="h-4 bg-white/10 rounded mt-3 w-1/2 mx-auto" />

                <div className="flex justify-between items-center mt-6">
                  <div className="h-5 bg-white/10 rounded w-16" />
                  <div className="h-9 bg-white/10 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Food Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {filteredFoods.length > 0 ? (
                filteredFoods.map((food) => (
                  <div
                    key={food._id}
                    className="
                      group
                      relative
                      bg-[#101722]
                      border border-white/10
                      rounded-2xl
                      p-4 sm:p-5
                      flex flex-col
                      overflow-hidden
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-red-500/30
                      hover:shadow-xl
                      hover:shadow-red-500/5
                    "
                  >
                    {/* Card Glow */}
                    <div className="absolute -top-20 -right-20 w-32 h-32 bg-red-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Image */}
                    <div className="relative flex items-center justify-center mb-4">
                      <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300" />

                      <img
                        src={
                          food.image ||
                          "https://via.placeholder.com/300"
                        }
                        alt={food.name}
                        loading="lazy"
                        className="
                          relative
                          w-32 h-32
                          sm:w-36 sm:h-36
                          object-cover
                          rounded-2xl
                          transition-transform duration-500
                          group-hover:scale-105
                        "
                      />
                    </div>

                    {/* Food Information */}
                    <div className="text-center">
                      <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                        {food.name}
                      </h3>

                      <p className="mt-1 text-xs sm:text-sm text-gray-500">
                        {food.category}
                      </p>
                    </div>

                    {/* Bottom */}
                    <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">
                          Price
                        </p>

                        <span className="text-lg sm:text-xl font-extrabold text-red-500">
                          ₹{food.price}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          handleAddToCart(food)
                        }
                        className="
                          px-3 sm:px-4
                          py-2
                          rounded-xl
                          bg-red-500
                          hover:bg-red-600
                          active:scale-95
                          text-white
                          text-xs sm:text-sm
                          font-semibold
                          transition-all duration-200
                          whitespace-nowrap
                        "
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <div className="bg-[#101722] border border-white/10 rounded-2xl py-14 px-5 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <span className="text-2xl">
                        🍽️
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      No Foods Available
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      We couldn't find any available food
                      in this category.
                    </p>

                    {active !== "All" && (
                      <button
                        onClick={() => setActive("All")}
                        className="
                          mt-5
                          px-5 py-2.5
                          rounded-xl
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          text-sm
                          font-semibold
                          transition
                        "
                      >
                        View All Foods
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Result Count */}
            {filteredFoods.length > 0 && (
              <div className="text-center mt-8">
                <p className="text-xs sm:text-sm text-gray-500">
                  Showing{" "}
                  <span className="text-gray-300 font-semibold">
                    {filteredFoods.length}
                  </span>{" "}
                  {filteredFoods.length === 1
                    ? "food"
                    : "foods"}{" "}
                  in{" "}
                  <span className="text-red-400 font-semibold">
                    {active}
                  </span>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}