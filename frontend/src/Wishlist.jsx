// import { useEffect } from "react";
// import axios from "axios";
// import { FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useWishlist } from "./context/WishlistContext";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart as addToCartAction } from "./cartSlice";

// const Wishlist = () => {
//   const { wishlist, fetchWishlist } = useWishlist();

//   const dispatch = useDispatch();

//   const cartItems = useSelector((state) => state.carts.items);

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const token = localStorage.getItem("token");

//   // Remove from Wishlist
//   const handleRemove = async (foodId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:5000/api/wishlist/${foodId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(res.data.message);
//       fetchWishlist();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   // Add to Cart Only
//   const addToCart = (food) => {
//     const alreadyInCart = cartItems.some(
//       (item) => item._id === food._id
//     );

//     if (alreadyInCart) {
//       toast.info("Item is already in cart");
//       return;
//     }

//     dispatch(addToCartAction(food));
//     toast.success(`${food.name} added to cart successfully!`);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">

//       <h1 className="text-3xl font-bold text-center mb-10">
//         My Wishlist ❤️
//       </h1>

//       {wishlist.length === 0 ? (
//         <div className="text-center text-gray-500 text-xl">
//           Your wishlist is empty.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//           {wishlist.map((item) => {

//             const food = item.food;

//             const alreadyInCart = cartItems.some(
//               (cartItem) => cartItem._id === food._id
//             );

//             return (
//               <div
//                 key={item._id}
//                 className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5"
//               >

//                 {/* Remove */}
//                 <button
//                   onClick={() => handleRemove(food._id)}
//                   className="absolute top-4 right-4 text-red-500 hover:text-red-700"
//                 >
//                   <FaTrash size={18} />
//                 </button>

//                 {/* Image */}
//                 <img
//                   src={food.image}
//                   alt={food.name}
//                   className="w-40 h-40 mx-auto object-cover rounded-lg"
//                 />

//                 {/* Name */}
//                 <h2 className="mt-4 text-xl font-semibold text-center">
//                   {food.name}
//                 </h2>

//                 {/* Category */}
//                 <p className="text-center text-gray-500 mt-1">
//                   {food.category}
//                 </p>

//                 {/* Price */}
//                 <p className="text-center text-red-500 text-2xl font-bold mt-3">
//                   ₹{food.price}
//                 </p>

//                 {/* Button */}
//                 {alreadyInCart ? (
//                   <button
//                     disabled
//                     className="w-full mt-5 bg-green-600 text-white py-2 rounded-lg font-semibold cursor-not-allowed"
//                   >
//                     ✓ Item in Cart
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => addToCart(food)}
//                     className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
//                   >
//                     Add to Cart
//                   </button>
//                 )}

//               </div>
//             );
//           })}

//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;

import { useEffect } from "react";
import axios from "axios";
import {
  FaTrash,
  FaHeart,
  FaShoppingCart,
  FaCheck,
} from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import { useWishlist } from "./context/WishlistContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartAction } from "./cartSlice";
import Footer from "./footer";
import Image from "./image";

const Wishlist = () => {
  const { wishlist, fetchWishlist } = useWishlist();

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.carts?.items || []
  );

  const token = localStorage.getItem("token");

  /*
   * Fetch Wishlist
   */
  useEffect(() => {
    fetchWishlist();
  }, []);

  /*
   * Remove from Wishlist
   */
  const handleRemove = async (foodId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/wishlist/${foodId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        res.data.message || "Removed from wishlist"
      );

      fetchWishlist();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  /*
   * Add Wishlist Item to Cart
   */
  const addToCart = (food) => {
    const alreadyInCart = cartItems.some(
      (item) =>
        (item?._id || item?.id) === food?._id
    );

    if (alreadyInCart) {
      toast.info("Item is already in cart");
      return;
    }

    dispatch(
      addToCartAction({
        id: food._id,
        _id: food._id,
        name: food.name,
        price: food.price,
        image: food.image,
        quantity: 1,
      })
    );

    toast.success(
      `${food.name} added to cart successfully!`
    );
  };

  /*
   * Empty Wishlist
   */
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#080d16] text-white">

        <Image title="My Wishlist" />

        <div className="min-h-[55vh] flex items-center justify-center px-4 py-16">

          <div className="w-full max-w-lg text-center bg-[#101722] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">

            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <FaHeart className="text-red-500 text-3xl" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-400 mb-8">
              Save your favorite foods here and order them
              whenever you want.
            </p>

            <button
              onClick={() =>
                (window.location.href = "/food")
              }
              className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-7 py-3 rounded-xl font-semibold transition shadow-lg shadow-red-500/20"
            >
              <FiShoppingBag />
              Explore Foods
            </button>

          </div>

        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d16] text-white">

      {/* ================= BANNER ================= */}
      <Image title="My Wishlist" />

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Heading */}
        <div className="text-center mb-10">

          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
            <FaHeart />
            Your Favorites
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            My{" "}
            <span className="text-red-500">
              Wishlist
            </span>
          </h1>

          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Your favorite foods are saved here. Add them
            to your cart whenever you're ready.
          </p>

        </div>

        {/* Wishlist Count */}
        <div className="flex items-center justify-between mb-6">

          <p className="text-gray-400 text-sm sm:text-base">
            <span className="text-white font-semibold">
              {wishlist.length}
            </span>{" "}
            {wishlist.length === 1
              ? "item"
              : "items"}{" "}
            saved
          </p>

          <div className="hidden sm:flex items-center gap-2 text-gray-500 text-sm">
            <FaHeart className="text-red-500" />
            Favorite Foods
          </div>

        </div>

        {/* ================= WISHLIST GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">

          {wishlist.map((item) => {

            const food = item?.food;

            if (!food) return null;

            const alreadyInCart = cartItems.some(
              (cartItem) =>
                (cartItem?._id || cartItem?.id) ===
                food._id
            );

            return (
              <div
                key={item._id}
                className="group relative bg-[#101722] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-red-500/30 hover:shadow-red-500/5 transition-all duration-300"
              >

                {/* ================= IMAGE ================= */}
                <div className="relative h-56 sm:h-60 bg-[#0b111b] overflow-hidden">

                  <img
                    src={
                      food.image ||
                      "https://via.placeholder.com/400"
                    }
                    alt={food.name}
                    className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400";
                    }}
                  />

                  {/* Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#101722] to-transparent pointer-events-none" />

                  {/* Wishlist Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080d16]/90 backdrop-blur-sm border border-red-500/20 text-red-400 text-xs font-semibold">
                    <FaHeart />
                    Favorite
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(food._id)
                    }
                    className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#080d16]/90 backdrop-blur-sm border border-white/10 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 flex items-center justify-center"
                    title="Remove from wishlist"
                  >
                    <FaTrash className="text-sm" />
                  </button>

                </div>

                {/* ================= DETAILS ================= */}
                <div className="p-5">

                  {/* Name */}
                  <h2 className="text-lg sm:text-xl font-bold text-white truncate group-hover:text-red-400 transition">
                    {food.name}
                  </h2>

                  {/* Category */}
                  <div className="flex items-center justify-between mt-2">

                    <span className="text-sm text-gray-500">
                      {food.category}
                    </span>

                    {food.isAvailable !== false && (
                      <span className="flex items-center gap-1 text-xs text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Available
                      </span>
                    )}

                  </div>

                  {/* Price */}
                  <div className="mt-4 flex items-center justify-between">

                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Price
                      </p>

                      <p className="text-2xl font-bold text-red-500">
                        ₹{food.price}
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <FaShoppingCart className="text-red-500 text-sm" />
                    </div>

                  </div>

                  {/* ================= CART BUTTON ================= */}
                  {alreadyInCart ? (

                    <button
                      type="button"
                      disabled
                      className="w-full mt-5 bg-green-500/10 border border-green-500/20 text-green-400 py-3 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <FaCheck />
                      Item in Cart
                    </button>

                  ) : (

                    <button
                      type="button"
                      onClick={() =>
                        addToCart(food)
                      }
                      disabled={food.isAvailable === false}
                      className="w-full mt-5 bg-red-500 hover:bg-red-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-500/10"
                    >
                      <FaShoppingCart />
                      {food.isAvailable === false
                        ? "Unavailable"
                        : "Add to Cart"}
                    </button>

                  )}

                </div>

              </div>
            );
          })}

        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  );
};

export default Wishlist;