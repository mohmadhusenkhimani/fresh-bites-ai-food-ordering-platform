// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import Footer from "./footer";
// // import Image from "./image";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addToCart as addToCartAction } from "./cartSlice";
// // import {
// //   addToWishlist,
// //   removeFromWishlist,
// // } from "./wishlistSlice";
// // import { FaHeart, FaRegHeart } from "react-icons/fa";
// // import { toast } from "react-toastify";
// // import { Link } from "react-router-dom";

// // import { useWishlist } from "./context/WishlistContext";

// // export default function Food() {
// //   const [foods, setFoods] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [sort, setSort] = useState("");

// //   const dispatch = useDispatch();

// //   // const wishlist = useSelector((state) => state.wishlist.items);
// //   //const { wishlist, fetchWishlist } = useWishlist();

// //   // const { updateWishlist } = useWishlist();
// //  const { wishlist, fetchWishlist } = useWishlist();

// //   const { isAuthenticated, token: reduxToken } = useSelector(
// //     (state) => state.auth
// //   );

// //   const token = reduxToken || localStorage.getItem("token");

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

// //   const handleWishlist = async (food) => {
// //     if (!isAuthenticated) {
// //       toast.error("Please login first");
// //       return;
// //     }

// //     const isWishlisted = wishlist.some(
// //       (item) => item.food?._id === food._id
// //     );

// //    if (isWishlisted) {
// //   try {
// //     const res = await axios.delete(
// //       `http://localhost:5000/api/wishlist/${food._id}`,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     dispatch(removeFromWishlist(food._id));

// // await fetchWishlist();

// // toast.success(res.data.message);

// //   } catch (err) {
// //     toast.error(err.response?.data?.message || "Error");
// //   }

// //   return;
// // }

// //     try {
// //       const res = await axios.post(
// //         "http://localhost:5000/api/wishlist",
// //         {
// //           foodId: food._id,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       dispatch(addToWishlist(food));

// // await fetchWishlist();

// // toast.success(res.data.message);
// //     } catch (err) {
// //   console.log("Wishlist Error:", err.response?.data);
// //   toast.error(
// //     err.response?.data?.message || "Something went wrong"
// //   );
// // }
// //   };

// //   let filteredFoods = foods.filter((food) =>
// //     food.name.toLowerCase().includes(search.toLowerCase())
// //   );

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

// //       <div className="max-w-7xl mx-auto px-6 py-12">

// //         {/* Search + Sort */}

// //         <div className="flex flex-col md:flex-row gap-4 mb-10">

// //           <input
// //             type="text"
// //             placeholder="Search food..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //           />

// //           <select
// //             value={sort}
// //             onChange={(e) => setSort(e.target.value)}
// //             className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //           >
// //             <option value="">Sort By</option>
// //             <option value="az">Name A - Z</option>
// //             <option value="za">Name Z - A</option>
// //             <option value="low">Price Low → High</option>
// //             <option value="high">Price High → Low</option>
// //           </select>

// //         </div>

// //         {/* Food Grid */}

// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

// //           {filteredFoods.length === 0 ? (
// //             <p className="col-span-full text-center text-gray-500">
// //               No food found 😢
// //             </p>
// //           ) : (
// //             filteredFoods.map((food) => {

// //               const isWishlisted = wishlist.some(
// //                 (item) => item.food?._id === food._id
// //               );

// //               return (
// //                 <div
// //                   key={food._id}
// //                   className="relative bg-white border border-gray-100 shadow-sm hover:shadow-md transition p-8 flex flex-col rounded-xl"
// //                 >

// //                   {/* Wishlist */}

// //                   <button
// //                     onClick={() => handleWishlist(food)}
// //                     className="absolute top-4 right-4 text-xl"
// //                   >
// //                     {isWishlisted ? (
// //                       <FaHeart className="text-red-500" />
// //                     ) : (
// //                       <FaRegHeart className="text-gray-400 hover:text-red-500" />
// //                     )}
// //                   </button>

// //                   {/* Image */}

// //                  <Link to={`/food/${food._id}`}>
// //   <img
// //     src={food.image || "https://via.placeholder.com/200"}
// //     alt={food.name}
// //     className="w-36 h-36 mx-auto object-cover rounded-lg cursor-pointer hover:scale-105 transition"
// //     onError={(e) => {
// //       e.target.src = "https://via.placeholder.com/200";
// //     }}
// //   />
// // </Link>

// //                   {/* Name */}
// // <Link to={`/food/${food._id}`}>
// //   <h3 className="mt-6 text-lg font-semibold text-center hover:text-red-500 cursor-pointer">
// //     {food.name}
// //   </h3>
// // </Link>

// //                   {/* Category */}

// //                   <p className="text-center text-gray-500 text-sm mt-1">
// //                     {food.category}
// //                   </p>

// //                   {/* Price + Cart */}

// //                   <div className="mt-auto flex items-center justify-between pt-6">

// //                     <span className="text-red-500 font-bold text-lg">
// //                       ₹{food.price}
// //                     </span>

// //                     <button
// //                       className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
// //                       onClick={() => {
// //                         dispatch(addToCartAction(food));
// //                         toast.success(
// //                           `${food.name} added to cart successfully!`
// //                         );
// //                       }}
// //                     >
// //                       Add to Cart
// //                     </button>

// //                   </div>

// //                 </div>
// //               );
// //             })
// //           )}

// //         </div>

// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Footer from "./footer";
// import Image from "./image";

// import { useDispatch, useSelector } from "react-redux";
// import { addToCart as addToCartAction } from "./cartSlice";

// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "./wishlistSlice";

// import {
//   FaHeart,
//   FaRegHeart,
//   FaSearch,
// } from "react-icons/fa";

// import { FiFilter } from "react-icons/fi";

// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// import { useWishlist } from "./context/WishlistContext";

// export default function Food() {
//   const [foods, setFoods] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");
//   const [loading, setLoading] = useState(true);

//   const dispatch = useDispatch();

//   const { wishlist, fetchWishlist } = useWishlist();

//   const {
//     isAuthenticated,
//     token: reduxToken,
//   } = useSelector((state) => state.auth);

//   const token =
//     reduxToken || localStorage.getItem("token");

//   // ==============================
//   // FETCH FOODS
//   // ==============================

//   useEffect(() => {
//     fetchFoods();
//   }, []);

//   const fetchFoods = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.get(
//   "https://fresh-bites-backend-updi.onrender.com/api/foods"
// );

//       setFoods(response.data.foods || []);
//     } catch (error) {
//       console.error(
//         "Error Fetching Foods:",
//         error
//       );

//       toast.error("Unable to load foods.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================
//   // WISHLIST
//   // ==============================

//   const handleWishlist = async (food) => {
//     if (!isAuthenticated) {
//       toast.error("Please login first");
//       return;
//     }

//     const isWishlisted = wishlist.some(
//       (item) =>
//         item.food?._id === food._id
//     );

//     // ============================
//     // REMOVE FROM WISHLIST
//     // ============================

//     if (isWishlisted) {
//       try {
//         const res = await axios.delete(
//   `https://fresh-bites-backend-updi.onrender.com/api/wishlist/${food._id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         dispatch(
//           removeFromWishlist(food._id)
//         );

//         await fetchWishlist();

//         toast.success(
//           res.data.message ||
//             "Removed from wishlist"
//         );
//       } catch (err) {
//         console.error(
//           "Remove Wishlist Error:",
//           err
//         );

//         toast.error(
//           err.response?.data?.message ||
//             "Error removing from wishlist"
//         );
//       }

//       return;
//     }

//     // ============================
//     // ADD TO WISHLIST
//     // ============================

//     try {
//       const res = await axios.post(
//   "https://fresh-bites-backend-updi.onrender.com/api/wishlist",
//         {
//           foodId: food._id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       dispatch(addToWishlist(food));

//       await fetchWishlist();

//       toast.success(
//         res.data.message ||
//           "Added to wishlist"
//       );
//     } catch (err) {
//       console.error(
//         "Wishlist Error:",
//         err.response?.data
//       );

//       toast.error(
//         err.response?.data?.message ||
//           "Something went wrong"
//       );
//     }
//   };

//   // ==============================
//   // SEARCH + SORT
//   // ==============================

//   let filteredFoods = foods.filter((food) =>
//     food.name
//       ?.toLowerCase()
//       .includes(search.toLowerCase())
//   );

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
//     filteredFoods.sort(
//       (a, b) => a.price - b.price
//     );
//   }

//   if (sort === "high") {
//     filteredFoods.sort(
//       (a, b) => b.price - a.price
//     );
//   }

//   // ==============================
//   // ADD TO CART
//   // ==============================

//   const handleAddToCart = (food) => {
//     dispatch(
//       addToCartAction({
//         id: food._id,
//         name: food.name,
//         price: food.price,
//         image: food.image,
//       })
//     );

//     toast.success(
//       `${food.name} added to cart successfully!`
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#080d16] text-white">

//       {/* =================================
//           PAGE HERO
//       ================================= */}

//       <Image title="All Foods" />

//       {/* =================================
//           MAIN CONTENT
//       ================================= */}

//       <main className="relative overflow-hidden">

//         {/* Background Glow */}

//         <div
//           className="
//             absolute
//             top-0
//             left-1/2
//             -translate-x-1/2
//             w-[300px]
//             sm:w-[500px]
//             lg:w-[700px]
//             h-[300px]
//             sm:h-[500px]
//             lg:h-[700px]
//             bg-red-600/5
//             rounded-full
//             blur-[120px]
//             pointer-events-none
//           "
//         />

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

//           {/* =================================
//               HEADING
//           ================================= */}

//           <div className="text-center mb-8 sm:mb-10 lg:mb-12">

//             <span
//               className="
//                 inline-flex
//                 items-center
//                 px-4
//                 py-1.5
//                 rounded-full
//                 border
//                 border-red-500/20
//                 bg-red-500/10
//                 text-red-400
//                 text-xs
//                 sm:text-sm
//                 font-semibold
//                 tracking-wide
//                 mb-4
//               "
//             >
//               OUR COMPLETE MENU
//             </span>

//             <h1
//               className="
//                 text-3xl
//                 sm:text-4xl
//                 lg:text-5xl
//                 font-extrabold
//                 text-white
//               "
//             >
//               Explore{" "}
//               <span className="text-red-500">
//                 All Foods
//               </span>
//             </h1>

//             <p
//               className="
//                 max-w-2xl
//                 mx-auto
//                 mt-3
//                 text-sm
//                 sm:text-base
//                 text-gray-400
//                 leading-relaxed
//               "
//             >
//               Browse our complete collection of fresh,
//               delicious, and carefully prepared food.
//             </p>

//           </div>

//           {/* =================================
//               SEARCH + SORT
//           ================================= */}

//           <div
//             className="
//               bg-[#101722]
//               border
//               border-white/10
//               rounded-2xl
//               p-3
//               sm:p-4
//               mb-8
//               sm:mb-10
//               shadow-xl
//               shadow-black/10
//             "
//           >

//             <div
//               className="
//                 flex
//                 flex-col
//                 md:flex-row
//                 gap-3
//                 sm:gap-4
//               "
//             >

//               {/* SEARCH */}

//               <div className="relative flex-1">

//                 <FaSearch
//                   className="
//                     absolute
//                     left-4
//                     top-1/2
//                     -translate-y-1/2
//                     text-gray-500
//                     text-sm
//                   "
//                 />

//                 <input
//                   type="text"
//                   placeholder="Search food..."
//                   value={search}
//                   onChange={(e) =>
//                     setSearch(e.target.value)
//                   }
//                   className="
//                     w-full
//                     h-11
//                     sm:h-12
//                     pl-11
//                     pr-4
//                     rounded-xl
//                     bg-[#080d16]
//                     border
//                     border-white/10
//                     text-white
//                     placeholder-gray-600
//                     text-sm
//                     focus:outline-none
//                     focus:border-red-500/50
//                     focus:ring-1
//                     focus:ring-red-500/30
//                     transition
//                   "
//                 />

//               </div>

//               {/* SORT */}

//               <div className="relative md:w-64">

//                 <FiFilter
//                   className="
//                     absolute
//                     left-4
//                     top-1/2
//                     -translate-y-1/2
//                     text-gray-500
//                     pointer-events-none
//                   "
//                 />

//                 <select
//                   value={sort}
//                   onChange={(e) =>
//                     setSort(e.target.value)
//                   }
//                   className="
//                     w-full
//                     h-11
//                     sm:h-12
//                     pl-11
//                     pr-4
//                     rounded-xl
//                     bg-[#080d16]
//                     border
//                     border-white/10
//                     text-gray-300
//                     text-sm
//                     focus:outline-none
//                     focus:border-red-500/50
//                     focus:ring-1
//                     focus:ring-red-500/30
//                     transition
//                     appearance-none
//                     cursor-pointer
//                   "
//                 >
//                   <option
//                     value=""
//                     className="bg-[#101722]"
//                   >
//                     Sort By
//                   </option>

//                   <option
//                     value="az"
//                     className="bg-[#101722]"
//                   >
//                     Name A - Z
//                   </option>

//                   <option
//                     value="za"
//                     className="bg-[#101722]"
//                   >
//                     Name Z - A
//                   </option>

//                   <option
//                     value="low"
//                     className="bg-[#101722]"
//                   >
//                     Price Low → High
//                   </option>

//                   <option
//                     value="high"
//                     className="bg-[#101722]"
//                   >
//                     Price High → Low
//                   </option>
//                 </select>

//               </div>

//             </div>

//             {/* RESULT INFO */}

//             <div className="flex items-center justify-between mt-3 px-1">

//               <p className="text-xs text-gray-500">
//                 {search
//                   ? `Search results for "${search}"`
//                   : "Showing all available foods"}
//               </p>

//               <p className="text-xs text-gray-500">
//                 <span className="text-gray-300 font-semibold">
//                   {filteredFoods.length}
//                 </span>{" "}
//                 {filteredFoods.length === 1
//                   ? "item"
//                   : "items"}
//               </p>

//             </div>

//           </div>

//           {/* =================================
//               LOADING
//           ================================= */}

//           {loading ? (

//             <div
//               className="
//                 grid
//                 grid-cols-1
//                 sm:grid-cols-2
//                 lg:grid-cols-4
//                 gap-5
//                 sm:gap-6
//               "
//             >

//               {[1, 2, 3, 4, 5, 6, 7, 8].map(
//                 (item) => (
//                   <div
//                     key={item}
//                     className="
//                       bg-[#101722]
//                       border
//                       border-white/10
//                       rounded-2xl
//                       p-5
//                       animate-pulse
//                     "
//                   >

//                     <div
//                       className="
//                         w-32
//                         h-32
//                         sm:w-36
//                         sm:h-36
//                         mx-auto
//                         rounded-2xl
//                         bg-white/10
//                       "
//                     />

//                     <div
//                       className="
//                         h-5
//                         bg-white/10
//                         rounded
//                         mt-5
//                         w-3/4
//                         mx-auto
//                       "
//                     />

//                     <div
//                       className="
//                         h-4
//                         bg-white/10
//                         rounded
//                         mt-3
//                         w-1/2
//                         mx-auto
//                       "
//                     />

//                     <div
//                       className="
//                         flex
//                         justify-between
//                         items-center
//                         mt-6
//                       "
//                     >
//                       <div className="h-5 bg-white/10 rounded w-16" />

//                       <div className="h-9 bg-white/10 rounded w-24" />
//                     </div>

//                   </div>
//                 )
//               )}

//             </div>

//           ) : (

//             /* =================================
//                FOOD GRID
//             ================================= */

//             <div
//               className="
//                 grid
//                 grid-cols-1
//                 sm:grid-cols-2
//                 lg:grid-cols-4
//                 gap-5
//                 sm:gap-6
//               "
//             >

//               {filteredFoods.length === 0 ? (

//                 /* EMPTY STATE */

//                 <div className="col-span-full">

//                   <div
//                     className="
//                       bg-[#101722]
//                       border
//                       border-white/10
//                       rounded-2xl
//                       py-16
//                       px-5
//                       text-center
//                     "
//                   >

//                     <div
//                       className="
//                         w-16
//                         h-16
//                         mx-auto
//                         rounded-full
//                         bg-red-500/10
//                         border
//                         border-red-500/20
//                         flex
//                         items-center
//                         justify-center
//                         mb-5
//                       "
//                     >
//                       <FaSearch className="text-red-400 text-xl" />
//                     </div>

//                     <h3 className="text-xl font-bold text-white">
//                       No Food Found
//                     </h3>

//                     <p className="text-sm text-gray-500 mt-2">
//                       We couldn't find any food matching
//                       your search.
//                     </p>

//                     {search && (
//                       <button
//                         onClick={() => setSearch("")}
//                         className="
//                           mt-5
//                           px-5
//                           py-2.5
//                           rounded-xl
//                           bg-red-500
//                           hover:bg-red-600
//                           active:scale-95
//                           text-white
//                           text-sm
//                           font-semibold
//                           transition
//                         "
//                       >
//                         Clear Search
//                       </button>
//                     )}

//                   </div>

//                 </div>

//               ) : (

//                 filteredFoods.map((food) => {

//                   const isWishlisted =
//                     wishlist.some(
//                       (item) =>
//                         item.food?._id ===
//                         food._id
//                     );

//                   return (
//                     <div
//                       key={food._id}
//                       className="
//                         group
//                         relative
//                         bg-[#101722]
//                         border
//                         border-white/10
//                         rounded-2xl
//                         p-4
//                         sm:p-5
//                         flex
//                         flex-col
//                         overflow-hidden
//                         transition-all
//                         duration-300
//                         hover:-translate-y-1
//                         hover:border-red-500/30
//                         hover:shadow-xl
//                         hover:shadow-red-500/5
//                       "
//                     >

//                       {/* Card Glow */}

//                       <div
//                         className="
//                           absolute
//                           -top-20
//                           -right-20
//                           w-32
//                           h-32
//                           bg-red-500/10
//                           rounded-full
//                           blur-3xl
//                           opacity-0
//                           group-hover:opacity-100
//                           transition-opacity
//                           duration-500
//                           pointer-events-none
//                         "
//                       />

//                       {/* Wishlist */}

//                       <button
//                         onClick={() =>
//                           handleWishlist(food)
//                         }
//                         aria-label={
//                           isWishlisted
//                             ? "Remove from wishlist"
//                             : "Add to wishlist"
//                         }
//                         className="
//                           absolute
//                           top-3
//                           right-3
//                           z-10
//                           w-9
//                           h-9
//                           rounded-full
//                           bg-[#080d16]/80
//                           border
//                           border-white/10
//                           backdrop-blur-sm
//                           flex
//                           items-center
//                           justify-center
//                           transition-all
//                           duration-200
//                           hover:scale-110
//                           active:scale-95
//                         "
//                       >

//                         {isWishlisted ? (
//                           <FaHeart className="text-red-500 text-base" />
//                         ) : (
//                           <FaRegHeart
//                             className="
//                               text-gray-400
//                               group-hover:text-red-400
//                               text-base
//                             "
//                           />
//                         )}

//                       </button>

//                       {/* Food Image */}

//                       <Link
//                         to={`/food/${food._id}`}
//                         className="block"
//                       >

//                         <div
//                           className="
//                             relative
//                             flex
//                             items-center
//                             justify-center
//                             py-2
//                           "
//                         >

//                           <div
//                             className="
//                               absolute
//                               w-28
//                               h-28
//                               sm:w-32
//                               sm:h-32
//                               rounded-full
//                               bg-red-500/5
//                               group-hover:bg-red-500/10
//                               transition
//                             "
//                           />

//                           <img
//                             src={
//                               food.image ||
//                               "https://via.placeholder.com/300"
//                             }
//                             alt={food.name}
//                             loading="lazy"
//                             onError={(e) => {
//                               e.currentTarget.src =
//                                 "https://via.placeholder.com/300";
//                             }}
//                             className="
//                               relative
//                               w-32
//                               h-32
//                               sm:w-36
//                               sm:h-36
//                               object-cover
//                               rounded-2xl
//                               cursor-pointer
//                               transition-transform
//                               duration-500
//                               group-hover:scale-105
//                             "
//                           />

//                         </div>

//                       </Link>

//                       {/* Food Name */}

//                       <Link
//                         to={`/food/${food._id}`}
//                       >
//                         <h3
//                           className="
//                             mt-4
//                             text-base
//                             sm:text-lg
//                             font-bold
//                             text-white
//                             text-center
//                             line-clamp-1
//                             hover:text-red-400
//                             transition
//                           "
//                         >
//                           {food.name}
//                         </h3>
//                       </Link>

//                       {/* Category */}

//                       <p
//                         className="
//                           text-center
//                           text-xs
//                           sm:text-sm
//                           text-gray-500
//                           mt-1
//                         "
//                       >
//                         {food.category}
//                       </p>

//                       {/* Bottom Section */}

//                       <div
//                         className="
//                           mt-auto
//                           flex
//                           items-center
//                           justify-between
//                           gap-3
//                           pt-5
//                         "
//                       >

//                         {/* Price */}

//                         <div>

//                           <p
//                             className="
//                               text-[10px]
//                               sm:text-xs
//                               text-gray-500
//                               uppercase
//                               tracking-wide
//                             "
//                           >
//                             Price
//                           </p>

//                           <span
//                             className="
//                               text-lg
//                               sm:text-xl
//                               font-extrabold
//                               text-red-500
//                             "
//                           >
//                             ₹{food.price}
//                           </span>

//                         </div>

//                         {/* Cart Button */}

//                         <button
//                           onClick={() =>
//                             handleAddToCart(food)
//                           }
//                           className="
//                             px-3
//                             sm:px-4
//                             py-2
//                             rounded-xl
//                             bg-red-500
//                             hover:bg-red-600
//                             active:scale-95
//                             text-white
//                             text-xs
//                             sm:text-sm
//                             font-semibold
//                             transition-all
//                             duration-200
//                             whitespace-nowrap
//                           "
//                         >
//                           Add to Cart
//                         </button>

//                       </div>

//                     </div>
//                   );
//                 })
//               )}

//             </div>
//           )}

//         </div>
//       </main>

//       {/* =================================
//           FOOTER
//       ================================= */}

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

import {
  FaHeart,
  FaRegHeart,
  FaSearch,
} from "react-icons/fa";

import { FiFilter } from "react-icons/fi";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { useWishlist } from "./context/WishlistContext";

const API_URL = "https://fresh-bites-backend-updi.onrender.com";

export default function Food() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { wishlist, fetchWishlist } = useWishlist();

  const {
    isAuthenticated,
    token: reduxToken,
  } = useSelector((state) => state.auth);

  const token = reduxToken || localStorage.getItem("token");

  // ==============================
  // FETCH FOODS
  // ==============================

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/foods`
      );

      setFoods(response.data.foods || []);
    } catch (error) {
      console.error("Error Fetching Foods:", error);
      toast.error("Unable to load foods.");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // WISHLIST
  // ==============================

  const handleWishlist = async (food) => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }

    const isWishlisted = wishlist.some(
      (item) => item.food?._id === food._id
    );

    // ============================
    // REMOVE FROM WISHLIST
    // ============================

    if (isWishlisted) {
      try {
        const res = await axios.delete(
          `${API_URL}/api/wishlist/${food._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(removeFromWishlist(food._id));

        await fetchWishlist();

        toast.success(
          res.data.message || "Removed from wishlist"
        );
      } catch (err) {
        console.error("Remove Wishlist Error:", err);

        toast.error(
          err.response?.data?.message ||
            "Error removing from wishlist"
        );
      }

      return;
    }

    // ============================
    // ADD TO WISHLIST
    // ============================

    try {
      const res = await axios.post(
        `${API_URL}/api/wishlist`,
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

      toast.success(
        res.data.message || "Added to wishlist"
      );
    } catch (err) {
      console.error(
        "Wishlist Error:",
        err.response?.data
      );

      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ==============================
  // SEARCH + SORT
  // ==============================

  let filteredFoods = foods.filter((food) =>
    food.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (sort === "az") {
    filteredFoods.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sort === "za") {
    filteredFoods.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  if (sort === "low") {
    filteredFoods.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredFoods.sort(
      (a, b) => b.price - a.price
    );
  }

  // ==============================
  // ADD TO CART
  // ==============================

  const handleAddToCart = (food) => {
    dispatch(
      addToCartAction({
        id: food._id,
        name: food.name,
        price: food.price,
        image: food.image,
      })
    );

    toast.success(
      `${food.name} added to cart successfully!`
    );
  };

  return (
    <div className="min-h-screen bg-[#080d16] text-white">
      {/* PAGE HERO */}
      <Image title="All Foods" />

      {/* MAIN CONTENT */}
      <main className="relative overflow-hidden">
        {/* Background Glow */}
        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[300px]
            sm:w-[500px]
            lg:w-[700px]
            h-[300px]
            sm:h-[500px]
            lg:h-[700px]
            bg-red-600/5
            rounded-full
            blur-[120px]
            pointer-events-none
          "
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* HEADING */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <span
              className="
                inline-flex
                items-center
                px-4
                py-1.5
                rounded-full
                border
                border-red-500/20
                bg-red-500/10
                text-red-400
                text-xs
                sm:text-sm
                font-semibold
                tracking-wide
                mb-4
              "
            >
              OUR COMPLETE MENU
            </span>

            <h1
              className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-extrabold
                text-white
              "
            >
              Explore{" "}
              <span className="text-red-500">
                All Foods
              </span>
            </h1>

            <p
              className="
                max-w-2xl
                mx-auto
                mt-3
                text-sm
                sm:text-base
                text-gray-400
                leading-relaxed
              "
            >
              Browse our complete collection of fresh,
              delicious, and carefully prepared food.
            </p>
          </div>

          {/* SEARCH + SORT */}
          <div
            className="
              bg-[#101722]
              border
              border-white/10
              rounded-2xl
              p-3
              sm:p-4
              mb-8
              sm:mb-10
              shadow-xl
              shadow-black/10
            "
          >
            <div
              className="
                flex
                flex-col
                md:flex-row
                gap-3
                sm:gap-4
              "
            >
              {/* SEARCH */}
              <div className="relative flex-1">
                <FaSearch
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    text-sm
                  "
                />

                <input
                  type="text"
                  placeholder="Search food..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                    w-full
                    h-11
                    sm:h-12
                    pl-11
                    pr-4
                    rounded-xl
                    bg-[#080d16]
                    border
                    border-white/10
                    text-white
                    placeholder-gray-600
                    text-sm
                    focus:outline-none
                    focus:border-red-500/50
                    focus:ring-1
                    focus:ring-red-500/30
                    transition
                  "
                />
              </div>

              {/* SORT */}
              <div className="relative md:w-64">
                <FiFilter
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    pointer-events-none
                  "
                />

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                  className="
                    w-full
                    h-11
                    sm:h-12
                    pl-11
                    pr-4
                    rounded-xl
                    bg-[#080d16]
                    border
                    border-white/10
                    text-gray-300
                    text-sm
                    focus:outline-none
                    focus:border-red-500/50
                    focus:ring-1
                    focus:ring-red-500/30
                    transition
                    appearance-none
                    cursor-pointer
                  "
                >
                  <option
                    value=""
                    className="bg-[#101722]"
                  >
                    Sort By
                  </option>

                  <option
                    value="az"
                    className="bg-[#101722]"
                  >
                    Name A - Z
                  </option>

                  <option
                    value="za"
                    className="bg-[#101722]"
                  >
                    Name Z - A
                  </option>

                  <option
                    value="low"
                    className="bg-[#101722]"
                  >
                    Price Low → High
                  </option>

                  <option
                    value="high"
                    className="bg-[#101722]"
                  >
                    Price High → Low
                  </option>
                </select>
              </div>
            </div>

            {/* RESULT INFO */}
            <div className="flex items-center justify-between mt-3 px-1">
              <p className="text-xs text-gray-500">
                {search
                  ? `Search results for "${search}"`
                  : "Showing all available foods"}
              </p>

              <p className="text-xs text-gray-500">
                <span className="text-gray-300 font-semibold">
                  {filteredFoods.length}
                </span>{" "}
                {filteredFoods.length === 1
                  ? "item"
                  : "items"}
              </p>
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-5
                sm:gap-6
              "
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      bg-[#101722]
                      border
                      border-white/10
                      rounded-2xl
                      p-5
                      animate-pulse
                    "
                  >
                    <div
                      className="
                        w-32
                        h-32
                        sm:w-36
                        sm:h-36
                        mx-auto
                        rounded-2xl
                        bg-white/10
                      "
                    />

                    <div
                      className="
                        h-5
                        bg-white/10
                        rounded
                        mt-5
                        w-3/4
                        mx-auto
                      "
                    />

                    <div
                      className="
                        h-4
                        bg-white/10
                        rounded
                        mt-3
                        w-1/2
                        mx-auto
                      "
                    />

                    <div
                      className="
                        flex
                        justify-between
                        items-center
                        mt-6
                      "
                    >
                      <div className="h-5 bg-white/10 rounded w-16" />
                      <div className="h-9 bg-white/10 rounded w-24" />
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            /* FOOD GRID */
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-5
                sm:gap-6
              "
            >
              {filteredFoods.length === 0 ? (
                /* EMPTY STATE */
                <div className="col-span-full">
                  <div
                    className="
                      bg-[#101722]
                      border
                      border-white/10
                      rounded-2xl
                      py-16
                      px-5
                      text-center
                    "
                  >
                    <div
                      className="
                        w-16
                        h-16
                        mx-auto
                        rounded-full
                        bg-red-500/10
                        border
                        border-red-500/20
                        flex
                        items-center
                        justify-center
                        mb-5
                      "
                    >
                      <FaSearch className="text-red-400 text-xl" />
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      No Food Found
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      We couldn't find any food matching
                      your search.
                    </p>

                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="
                          mt-5
                          px-5
                          py-2.5
                          rounded-xl
                          bg-red-500
                          hover:bg-red-600
                          active:scale-95
                          text-white
                          text-sm
                          font-semibold
                          transition
                        "
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                filteredFoods.map((food) => {
                  const isWishlisted = wishlist.some(
                    (item) =>
                      item.food?._id === food._id
                  );

                  return (
                    <div
                      key={food._id}
                      className="
                        group
                        relative
                        bg-[#101722]
                        border
                        border-white/10
                        rounded-2xl
                        p-4
                        sm:p-5
                        flex
                        flex-col
                        overflow-hidden
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-red-500/30
                        hover:shadow-xl
                        hover:shadow-red-500/5
                      "
                    >
                      {/* Card Glow */}
                      <div
                        className="
                          absolute
                          -top-20
                          -right-20
                          w-32
                          h-32
                          bg-red-500/10
                          rounded-full
                          blur-3xl
                          opacity-0
                          group-hover:opacity-100
                          transition-opacity
                          duration-500
                          pointer-events-none
                        "
                      />

                      {/* Wishlist */}
                      <button
                        onClick={() =>
                          handleWishlist(food)
                        }
                        aria-label={
                          isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        className="
                          absolute
                          top-3
                          right-3
                          z-10
                          w-9
                          h-9
                          rounded-full
                          bg-[#080d16]/80
                          border
                          border-white/10
                          backdrop-blur-sm
                          flex
                          items-center
                          justify-center
                          transition-all
                          duration-200
                          hover:scale-110
                          active:scale-95
                        "
                      >
                        {isWishlisted ? (
                          <FaHeart className="text-red-500 text-base" />
                        ) : (
                          <FaRegHeart
                            className="
                              text-gray-400
                              group-hover:text-red-400
                              text-base
                            "
                          />
                        )}
                      </button>

                      {/* Food Image */}
                      <Link
                        to={`/food/${food._id}`}
                        className="block"
                      >
                        <div
                          className="
                            relative
                            flex
                            items-center
                            justify-center
                            py-2
                          "
                        >
                          <div
                            className="
                              absolute
                              w-28
                              h-28
                              sm:w-32
                              sm:h-32
                              rounded-full
                              bg-red-500/5
                              group-hover:bg-red-500/10
                              transition
                            "
                          />

                          <img
                            src={
                              food.image ||
                              "https://via.placeholder.com/300"
                            }
                            alt={food.name}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/300";
                            }}
                            className="
                              relative
                              w-32
                              h-32
                              sm:w-36
                              sm:h-36
                              object-cover
                              rounded-2xl
                              cursor-pointer
                              transition-transform
                              duration-500
                              group-hover:scale-105
                            "
                          />
                        </div>
                      </Link>

                      {/* Food Name */}
                      <Link
                        to={`/food/${food._id}`}
                      >
                        <h3
                          className="
                            mt-4
                            text-base
                            sm:text-lg
                            font-bold
                            text-white
                            text-center
                            line-clamp-1
                            hover:text-red-400
                            transition
                          "
                        >
                          {food.name}
                        </h3>
                      </Link>

                      {/* Category */}
                      <p
                        className="
                          text-center
                          text-xs
                          sm:text-sm
                          text-gray-500
                          mt-1
                        "
                      >
                        {food.category}
                      </p>

                      {/* Bottom Section */}
                      <div
                        className="
                          mt-auto
                          flex
                          items-center
                          justify-between
                          gap-3
                          pt-5
                        "
                      >
                        {/* Price */}
                        <div>
                          <p
                            className="
                              text-[10px]
                              sm:text-xs
                              text-gray-500
                              uppercase
                              tracking-wide
                            "
                          >
                            Price
                          </p>

                          <span
                            className="
                              text-lg
                              sm:text-xl
                              font-extrabold
                              text-red-500
                            "
                          >
                            ₹{food.price}
                          </span>
                        </div>

                        {/* Cart Button */}
                        <button
                          onClick={() =>
                            handleAddToCart(food)
                          }
                          className="
                            px-3
                            sm:px-4
                            py-2
                            rounded-xl
                            bg-red-500
                            hover:bg-red-600
                            active:scale-95
                            text-white
                            text-xs
                            sm:text-sm
                            font-semibold
                            transition-all
                            duration-200
                            whitespace-nowrap
                          "
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}