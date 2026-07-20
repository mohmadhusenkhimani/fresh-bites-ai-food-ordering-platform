// // import { useState } from "react";
// // import Footer from "./footer";
// // // images
// // import Chees from "./assets/b-1.jpg";
// // import Veg from "./assets/b-2.jpg";
// // import Margherita from "./assets/b-3.jpg";
// // import French from "./assets/b-4.jpg";
// // import Cold from "./assets/b-5.png";
// // import Chicken from "./assets/b-1.jpg"
// // import Vegetarian from "./assets/p-1.jpg"
// // import Seafood from "./assets/p-2.jpg"
// // import Maxican from "./assets/p-3.jpg"
// // import Mushrom from "./assets/p-4.jpg"
// // import Image from "./image";
// // import { useCart } from "./CartContext";
// // import { useDispatch } from "react-redux";
// // import { addToCart as addToCartAction } from "./cartSlice";
// // export default function Food() {
// //   const [search, setSearch] = useState("");
// //   const [sort, setSort] = useState("");
// //   const { addToCart, cartItems } = useCart(); 
// //   const dispatch = useDispatch(); 
// //   const foods = [
// //     { id: 1, name: "Cheese Burger", price: 149, image: Chees },
// //     { id: 2, name: "Veg Burger", price: 129, image: Veg },
// //     { id: 3, name: "Margherita Pizza", price: 299, image: Margherita },
// //     { id: 4, name: "French Fries", price: 99, image: French },
// //     { id: 5, name: "Cold Drink", price: 59, image: Cold },
// //     {id:6,name:"Chicken",price:100,image:Chicken},
// //     {id:7,name:"Vegetarian Pizza",price:120,image:Vegetarian},
// //     {id:8,name:"Seafood Pizza",price:160,image:Seafood},
// //     {id:9,name:"Maxican Green Wave",price:180,image:Maxican},
// //     {id:10,name:"Pizza With Mushroom",price:200,image:Mushrom}
// //   ];

// //   /* 🔍 SEARCH */
// //   let filteredFoods = foods.filter((item) =>
// //     item.name.toLowerCase().includes(search.toLowerCase())
  
// //   );

// //   /* 🔃 SORT */
// //   if (sort === "az") {
// //     filteredFoods.sort((a, b) => a.name.localeCompare(b.name));
// //   }

// //   if (sort === "za") {
// //     filteredFoods.sort((a, b) => b.name.localeCompare(a.name));
// //   }

// //   if (sort === "low") {
// //     filteredFoods.sort((a, b) => a.price - b.price);
// //   }

// //   if (sort === "high") {
// //     filteredFoods.sort((a, b) => b.price - a.price);
// //   }
  

// //   return (
// //     <div>
// //       <Image title="All Foods" />

// // <div className="max-w-7xl mx-auto px-6 py-12">
// //       {/* SEARCH + SORT BAR */}
// //       <div className="flex flex-col md:flex-row gap-4 mb-10">

// //         {/* Search */}
// //         <input
// //           type="text"
// //           placeholder="Search food..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //         />

// //         {/* Sort */}
// //         <select
// //           value={sort}
// //           onChange={(e) => setSort(e.target.value)}
// //           className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //         >
// //           <option value="">Sort By</option>
// //           <option value="az">Name A - Z</option>
// //           <option value="za">Name Z - A</option>
// //           <option value="low">Price Low → High</option>
// //           <option value="high">Price High → Low</option>
// //         </select>

// //       </div>

// //       {/* FOOD GRID */}
// //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// //   {filteredFoods.length === 0 ? (
// //     <p className="col-span-full text-center text-gray-500">
// //       No food found 😢
// //     </p>
// //   ) : (
// //     filteredFoods.map((food) => (
// //       <div
// //         key={food.id}
// //         className="bg-white border border-gray-100
// //                   shadow-sm hover:shadow-md transition
// //                   p-8 flex flex-col"
// //       >
// //         {/* Image */}
// //         <img
// //           src={food.image}
// //           alt={food.name}
// //           className="w-36 h-36 mx-auto object-contain"
// //         />

// //         {/* Title */}
// //         <h3 className="mt-6 font-semibold text-lg text-center text-gray-900">
// //           {food.name}
// //         </h3>

// //         {/* Bottom Row */}
// //         <div className="mt-auto flex items-center justify-between pt-6">
// //           {/* Price - Left */}
// //           <span className="text-red-500 font-bold text-lg">
// //             ₹{food.price}
// //           </span>

// //           {/* Button - Right */}
// //           <button
// //             className="bg-red-500 text-white
// //                        px-5 py-2 rounded-lg
// //                        hover:bg-red-600 transition"
// //             onClick={() => dispatch(addToCartAction(food))}
// //           >
// //             Add to Cart
// //           </button>
// //         </div>
// //       </div>
// //     ))
// //   )}
// // </div>


      
// //     </div>
// //     <Footer/>
    
// //     </div>
// //   );
// // }


// import { useState, useEffect } from "react";
// import axios from "axios";
// import Footer from "./footer";
// import Image from "./image";
// import { useDispatch } from "react-redux";
// import { addToCart as addToCartAction } from "./cartSlice";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "./wishlistSlice";
// import { useSelector } from "react-redux";
// import { FaHeart, FaRegHeart } from "react-icons/fa";

// import { toast } from "react-toastify";

// export default function Food() {
//   const [foods, setFoods] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");

//   const wishlist = useSelector((state) => state.wishlist.items);
//   const dispatch = useDispatch();


//   const { isAuthenticated } = useSelector((state) => state.auth);

// const token =
//   useSelector((state) => state.auth.token) ||
//   localStorage.getItem("token");

//   useEffect(() => {
//     fetchFoods();
//   }, []);
// const handleWishlist = async (food) => {
//   const isWishlisted = wishlist.some(
//     (item) => item._id === food._id
//   );

//   if (isWishlisted) {
//     dispatch(removeFromWishlist(food._id));
//     toast.success("Removed from wishlist");
//     return;
//   }

//   try {
//     const res = await axios.post(
//       "http://localhost:5000/api/wishlist",
//       {
//         foodId: food._id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     dispatch(addToWishlist(food));
//     toast.success(res.data.message);

//   } catch (err) {
//     toast.error(err.response?.data?.message);
//   }
// };

//   try {
//     console.log("Token from frontend:", token);
//     const res = await axios.post(
//       "http://localhost:5000/api/wishlist",
//       {
//         foodId: food._id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     toast.success(res.data.message);
//     dispatch(addToWishlist(food));
//   } catch (err) {
//     toast.error(
//       err.response?.data?.message || "Something went wrong"
//     );
//   }
// };

//   const fetchFoods = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/foods"
//       );

//       setFoods(response.data.foods);
//     } catch (error) {
//       console.error("Error fetching foods:", error);
//     }
//   };

//   /* SEARCH */
//   let filteredFoods = foods.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   /* SORT */
//   if (sort === "az") {
//     filteredFoods.sort((a, b) =>
//       a.name.localeCompare(b.name)
//     );
//   }

//   if (sort === "za") {
//     filteredFoods.sort((a, b) =>
//       b.name.localeCompare(a.name)
//     );
//   }

//   if (sort === "low") {
//     filteredFoods.sort((a, b) => a.price - b.price);
//   }

//   if (sort === "high") {
//     filteredFoods.sort((a, b) => b.price - a.price);
//   }


//   return (
//     <div>
//       <Image title="All Foods" />

//       <div className="max-w-7xl mx-auto px-6 py-12">

//         {/* Search + Sort */}
//         <div className="flex flex-col md:flex-row gap-4 mb-10">

//           <input
//             type="text"
//             placeholder="Search food..."
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//             className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//           />

//           <select
//             value={sort}
//             onChange={(e) =>
//               setSort(e.target.value)
//             }
//             className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//           >
//             <option value="">Sort By</option>
//             <option value="az">Name A - Z</option>
//             <option value="za">Name Z - A</option>
//             <option value="low">
//               Price Low → High
//             </option>
//             <option value="high">
//               Price High → Low
//             </option>
//           </select>

//         </div>

//         {/* Food Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//           {filteredFoods.length === 0 ? (
//             <p className="col-span-full text-center text-gray-500">
//               No food found 😢
//             </p>
//           ) : (
//            filteredFoods.map((food) => {

//   const isWishlisted = wishlist.some(
//     (item) => item._id === food._id
//   );

//   return (

//     <div
//       key={food._id}
//       className="relative bg-white border border-gray-100 shadow-sm hover:shadow-md transition p-8 flex flex-col"
//     >

// <button
//   onClick={() => handleWishlist(food)}
//   className="absolute top-4 right-4 text-xl transition"
// >
//   {isWishlisted ? (
//     <FaHeart className="text-red-500" />
//   ) : (
//     <FaRegHeart className="text-gray-500 hover:text-red-500" />
//   )}
// </button>

//                 {/* Food Image */}
//                 <img
//                   src={
//                     food.image ||
//                     "https://via.placeholder.com/200"
//                   }
//                   alt={food.name}
//                   className="w-36 h-36 mx-auto object-cover rounded-lg"
//                   onError={(e) => {
//                     e.target.src =
//                       "https://via.placeholder.com/200";
//                   }}
//                 />

//                 {/* Food Name */}
//                 <h3 className="mt-6 font-semibold text-lg text-center text-gray-900">
//                   {food.name}
//                 </h3>

//                 {/* Category */}
//                 <p className="text-center text-gray-500 text-sm mt-1">
//                   {food.category}
//                 </p>

//                 {/* Price + Button */}
//                 <div className="mt-auto flex items-center justify-between pt-6">

//                   <span className="text-red-500 font-bold text-lg">
//                     ₹{food.price}
//                   </span>

//                   <button
//                     className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
//                     onClick={() => {
//   dispatch(addToCartAction(food));
//   toast.success(`${food.name} added to cart successfully!`);
// }}
//                   >
//                     Add to Cart
//                   </button>

//                 </div>

//               </div>
//             );
//            })

//         </div>

//       </div>

//       <Footer />
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./footer";
import Image from "./image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartAction } from "./cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "./wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { useWishlist } from "./context/WishlistContext";

export default function Food() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const dispatch = useDispatch();

  // const wishlist = useSelector((state) => state.wishlist.items);
  //const { wishlist, fetchWishlist } = useWishlist();

  // const { updateWishlist } = useWishlist();
 const { wishlist, fetchWishlist } = useWishlist();

  const { isAuthenticated, token: reduxToken } = useSelector(
    (state) => state.auth
  );

  const token = reduxToken || localStorage.getItem("token");

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

  const handleWishlist = async (food) => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }

    const isWishlisted = wishlist.some(
      (item) => item.food?._id === food._id
    );

   if (isWishlisted) {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/wishlist/${food._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(removeFromWishlist(food._id));

await fetchWishlist();

toast.success(res.data.message);

  } catch (err) {
    toast.error(err.response?.data?.message || "Error");
  }

  return;
}

    try {
      const res = await axios.post(
        "http://localhost:5000/api/wishlist",
        {
          foodId: food._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(addToWishlist(food));

await fetchWishlist();

toast.success(res.data.message);
    } catch (err) {
  console.log("Wishlist Error:", err.response?.data);
  toast.error(
    err.response?.data?.message || "Something went wrong"
  );
}
  };

  let filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "az") {
    filteredFoods.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "za") {
    filteredFoods.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sort === "low") {
    filteredFoods.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredFoods.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <Image title="All Foods" />

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Search + Sort */}

        <div className="flex flex-col md:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Sort By</option>
            <option value="az">Name A - Z</option>
            <option value="za">Name Z - A</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>

        </div>

        {/* Food Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {filteredFoods.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No food found 😢
            </p>
          ) : (
            filteredFoods.map((food) => {

              const isWishlisted = wishlist.some(
                (item) => item.food?._id === food._id
              );

              return (
                <div
                  key={food._id}
                  className="relative bg-white border border-gray-100 shadow-sm hover:shadow-md transition p-8 flex flex-col rounded-xl"
                >

                  {/* Wishlist */}

                  <button
                    onClick={() => handleWishlist(food)}
                    className="absolute top-4 right-4 text-xl"
                  >
                    {isWishlisted ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-400 hover:text-red-500" />
                    )}
                  </button>

                  {/* Image */}

                 <Link to={`/food/${food._id}`}>
  <img
    src={food.image || "https://via.placeholder.com/200"}
    alt={food.name}
    className="w-36 h-36 mx-auto object-cover rounded-lg cursor-pointer hover:scale-105 transition"
    onError={(e) => {
      e.target.src = "https://via.placeholder.com/200";
    }}
  />
</Link>

                  {/* Name */}
<Link to={`/food/${food._id}`}>
  <h3 className="mt-6 text-lg font-semibold text-center hover:text-red-500 cursor-pointer">
    {food.name}
  </h3>
</Link>

                  {/* Category */}

                  <p className="text-center text-gray-500 text-sm mt-1">
                    {food.category}
                  </p>

                  {/* Price + Cart */}

                  <div className="mt-auto flex items-center justify-between pt-6">

                    <span className="text-red-500 font-bold text-lg">
                      ₹{food.price}
                    </span>

                    <button
                      className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => {
                        dispatch(addToCartAction(food));
                        toast.success(
                          `${food.name} added to cart successfully!`
                        );
                      }}
                    >
                      Add to Cart
                    </button>

                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>

      <Footer />
    </div>
  );
}