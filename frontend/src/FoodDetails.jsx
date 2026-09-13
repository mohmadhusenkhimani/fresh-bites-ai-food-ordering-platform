// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";


// import Image from "./image";
// import Footer from "./footer";
// import ReviewSummary from "./ReviewSummary";

// import { addToCart as addToCartAction } from "./cartSlice";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "./wishlistSlice";

// import { useWishlist } from "./context/WishlistContext";

// export default function FoodDetails() {
//   const { id } = useParams();

//   const dispatch = useDispatch();

//   const { wishlist, fetchWishlist } = useWishlist();

//   const { isAuthenticated, token: reduxToken } = useSelector(
//     (state) => state.auth
//   );

//   const cartItems = useSelector(
//     (state) => state.carts.items
//   );

//   const token = reduxToken || localStorage.getItem("token");

//   const [food, setFood] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [totalReviews, setTotalReviews] = useState(0);

//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   useEffect(() => {
//     fetchFood();
//     fetchReviews();
//     fetchAverageRating();
//   }, [id]);

//   const fetchFood = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/foods/${id}`
//       );

//       setFood(res.data.food);
//     } catch (err) {
//       console.log(err);
//       toast.error("Food not found");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/reviews/${id}`
//       );

//       setReviews(res.data.reviews);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchAverageRating = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/reviews/average/${id}`
//       );

//       setAverageRating(res.data.averageRating);
//       setTotalReviews(res.data.totalReviews);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const isWishlisted = wishlist.some(
//     (item) => item.food?._id === id
//   );

//   const alreadyInCart = cartItems.some(
//     (item) => item._id === id
//   );

//   const handleWishlist = async () => {
//     if (!isAuthenticated) {
//       toast.error("Please login first");
//       return;
//     }

//     try {
//       if (isWishlisted) {
//         const res = await axios.delete(
//           `http://localhost:5000/api/wishlist/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         dispatch(removeFromWishlist(id));

//         await fetchWishlist();

//         toast.success(res.data.message);
//       } else {
//         const res = await axios.post(
//           "http://localhost:5000/api/wishlist",
//           {
//             foodId: id,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         dispatch(addToWishlist(food));

//         await fetchWishlist();

//         toast.success(res.data.message);
//       }
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message ||
//           "Something went wrong"
//       );
//     }
//   };

//   const handleAddToCart = () => {
//     if (alreadyInCart) {
//       toast.info("Item already in cart");
//       return;
//     }

//     dispatch(addToCartAction(food));

//     toast.success(
//       `${food.name} added to cart successfully!`
//     );
//   };
  

//   // ================= SUBMIT REVIEW =================

// const submitReview = async () => {
//   if (!isAuthenticated) {
//     toast.error("Please login first");
//     return;
//   }

//   if (comment.trim() === "") {
//     toast.error("Please write your review.");
//     return;
//   }

//   try {
//     const res = await axios.post(
//       "http://localhost:5000/api/reviews",
//       {
//         foodId: id,
//         rating,
//         comment,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     toast.success(res.data.message);

//     setComment("");
//     setRating(5);

//     await fetchReviews();
//     await fetchAverageRating();

//   } catch (err) {
//     toast.error(
//       err.response?.data?.message ||
//         "Something went wrong"
//     );
//   }
// };

//   if (loading) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <h2 className="text-2xl font-semibold">Loading...</h2>
//     </div>
//   );
// }

// if (!food) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <h2 className="text-2xl font-semibold text-red-500">
//         Food Not Found
//       </h2>
//     </div>
//   );
// }

// return (
//   <>
//     <Image title={food.name} />

//     <div className="max-w-7xl mx-auto px-6 py-10">

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

//         {/* LEFT SIDE */}

//         <div>

//           <div className="bg-white rounded-2xl shadow-md p-6">

//             <img
//               src={food.image}
//               alt={food.name}
//               className="w-full h-[450px] object-cover rounded-xl"
//             />

//           </div>

//         </div>

//         {/* RIGHT SIDE */}

//         <div>

//           <h1 className="text-4xl font-bold">
//             {food.name}
//           </h1>

//           <p className="text-gray-500 mt-3 text-lg">
//             {food.category}
//           </p>

//           {/* Rating */}

//           <div className="flex items-center gap-3 mt-5">

//             <div className="flex text-yellow-400">

//               {[1,2,3,4,5].map((star)=>(
//                 <FaStar
//                   key={star}
//                   className={
//                     star <= Math.round(averageRating)
//                       ? ""
//                       : "text-gray-300"
//                   }
//                 />
//               ))}

//             </div>

//             <span className="font-semibold">
//               {averageRating.toFixed(1)}
//             </span>

//             <span className="text-gray-500">
//               ({totalReviews} Reviews)
//             </span>

//           </div>

//           {/* Price */}

//           <div className="mt-8">

//             <h2 className="text-4xl font-bold text-red-500">
//               ₹{food.price}
//             </h2>

//           </div>

//           {/* Description */}

//           <div className="mt-8">

//             <h3 className="text-xl font-semibold mb-2">
//               Description
//             </h3>

//             <p className="text-gray-600 leading-8">
//               {food.description || "No description available."}
//             </p>

//           </div>

//           {/* Buttons */}

//           <div className="flex gap-5 mt-10">

//             <button
//               onClick={handleWishlist}
//               className="
//               flex items-center gap-2
//               border-2 border-red-500
//               px-8 py-3
//               rounded-xl
//               hover:bg-red-500
//               hover:text-white
//               transition
//               "
//             >
//               {isWishlisted ? (
//                 <FaHeart />
//               ) : (
//                 <FaRegHeart />
//               )}

//               {isWishlisted
//                 ? "Wishlisted"
//                 : "Add to Wishlist"}
//             </button>

//             <button
//               onClick={handleAddToCart}
//               disabled={alreadyInCart}
//               className={`
//                 px-10 py-3
//                 rounded-xl
//                 font-semibold
//                 transition

//                 ${
//                   alreadyInCart
//                     ? "bg-green-600 cursor-not-allowed text-white"
//                     : "bg-red-500 hover:bg-red-600 text-white"
//                 }
//               `}
//             >
//               {alreadyInCart
//                 ? "✓ Item in Cart"
//                 : "Add to Cart"}
//             </button>

//           </div>

//           {/* Extra Information */}

//           <div className="mt-12 border-t pt-8 space-y-3">

//             <div className="flex justify-between">

//               <span className="font-semibold">
//                 Availability
//               </span>

//               <span className="text-green-600">
//                 In Stock
//               </span>

//             </div>

//             <div className="flex justify-between">

//               <span className="font-semibold">
//                 Category
//               </span>

//               <span>
//                 {food.category}
//               </span>

//             </div>

//             <div className="flex justify-between">

//               <span className="font-semibold">
//                 Delivery
//               </span>

//               <span>
//                 25-35 Minutes
//               </span>

//             </div>

//             <div className="flex justify-between">

//               <span className="font-semibold">
//                 Payment
//               </span>

//               <span>
//                 Cash / UPI / Card
//               </span>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//     {/* ================= CUSTOMER REVIEWS ================= */}

// <div className="max-w-7xl mx-auto px-6 py-10">

//   <h2 className="text-3xl font-bold mb-8">
//     Customer Reviews
//   </h2>

//   {/* Rating Summary */}

//   <div className="bg-white rounded-xl shadow-md p-6 mb-8">

//     <div className="flex flex-col md:flex-row md:items-center md:justify-between">

//       <div>

//         <h3 className="text-5xl font-bold text-red-500">
//           {averageRating.toFixed(1)}
//         </h3>

//         <div className="flex mt-2 text-yellow-400">

//           {[1, 2, 3, 4, 5].map((star) => (
//             <FaStar
//               key={star}
//               className={
//                 star <= Math.round(averageRating)
//                   ? ""
//                   : "text-gray-300"
//               }
//             />
//           ))}

//         </div>

//         <p className="text-gray-500 mt-2">
//           Based on {totalReviews} Reviews
//         </p>

//       </div>

//       <div className="mt-6 md:mt-0">

//         <button
//           className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg"
//           onClick={() => {
//             document
//               .getElementById("write-review")
//               ?.scrollIntoView({
//                 behavior: "smooth",
//               });
//           }}
//         >
//           Write Review
//         </button>

//       </div>

//     </div>

//   </div>

//   {/* Review Cards */}

//   {reviews.length === 0 ? (

//     <div className="bg-white shadow rounded-xl p-10 text-center">

//       <h3 className="text-xl font-semibold">
//         No Reviews Yet
//       </h3>

//       <p className="text-gray-500 mt-2">
//         Be the first customer to review this food.
//       </p>

//     </div>

//   ) : (

//     <div className="space-y-6">

//       {reviews.map((review) => (

//         <div
//           key={review._id}
//           className="bg-white shadow rounded-xl p-6"
//         >

//           {/* User */}

//           <div className="flex items-center justify-between">

//             <div>

//               <h3 className="font-semibold text-lg">
//                 {review.user?.fullName || "Anonymous"}
//               </h3>

//               <p className="text-sm text-gray-500">

//                 {new Date(
//                   review.createdAt
//                 ).toLocaleDateString()}

//               </p>

//             </div>

//             {/* Rating */}

//             <div className="flex text-yellow-400">

//               {[1,2,3,4,5].map((star)=>(

//                 <FaStar
//                   key={star}
//                   className={
//                     star <= review.rating
//                       ? ""
//                       : "text-gray-300"
//                   }
//                 />

//               ))}

//             </div>

//           </div>

//           {/* Review Text */}

//          <div className="mt-5">

//   <p className="text-gray-700 leading-7">
//     {review.comment}
//   </p>

// </div>

//         </div>

//       ))}

//     </div>

//   )}

// </div>

// {/* ================= AI REVIEW SUMMARY ================= */}

// <div className="max-w-7xl mx-auto px-6 py-6">

//   <ReviewSummary 
//       foodId={food._id}
//   />

// </div>

// {/* ================= WRITE REVIEW ================= */}

// <div
//   id="write-review"
//   className="max-w-7xl mx-auto px-6 pb-16"
// >

//   <div className="bg-white rounded-xl shadow-lg p-8">

//     <h2 className="text-3xl font-bold mb-6">

//       Write a Review

//     </h2>

//     {/* Rating */}

//     <label className="block mb-2 font-semibold">

//       Rating

//     </label>

//     <div className="flex gap-3 mb-6">

//       {[1,2,3,4,5].map((star)=>(

//         <FaStar
//           key={star}
//           onClick={()=>setRating(star)}
//           className={`cursor-pointer text-3xl ${
//             rating >= star
//               ? "text-yellow-400"
//               : "text-gray-300"
//           }`}
//         />

//       ))}

//     </div>

//     {/* Comment */}

//     <label className="block mb-2 font-semibold">

//       Your Review

//     </label>

//     <textarea
//       rows={5}
//       value={comment}
//       onChange={(e)=>setComment(e.target.value)}
//       placeholder="Write your review..."
//       className="w-full border rounded-lg p-4 resize-none focus:ring-2 focus:ring-red-500 outline-none"
//     />

//     <button
//       onClick={submitReview}
//       className="mt-6 bg-red-500 hover:bg-red-600 text-white px-10 py-3 rounded-lg font-semibold"
//     >
//       Submit Review
//     </button>

//   </div>

// </div>

//     <Footer />

//   </>
// )};

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";

import {
  FiClock,
  FiCreditCard,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import Image from "./image";
import Footer from "./footer";
import ReviewSummary from "./ReviewSummary";

import { addToCart as addToCartAction } from "./cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "./wishlistSlice";

import { useWishlist } from "./context/WishlistContext";

export default function FoodDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    wishlist,
    fetchWishlist,
  } = useWishlist();

  const {
    isAuthenticated,
    token: reduxToken,
  } = useSelector(
    (state) => state.auth
  );

  const cartItems = useSelector(
    (state) => state.carts.items
  );

  const token =
    reduxToken ||
    localStorage.getItem("token");

  // ==============================
  // STATE
  // ==============================

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);

  const [averageRating, setAverageRating] =
    useState(0);

  const [totalReviews, setTotalReviews] =
    useState(0);

  const [rating, setRating] = useState(5);

  const [comment, setComment] =
    useState("");

  const [submittingReview, setSubmittingReview] =
    useState(false);

  // ==============================
  // FETCH DATA
  // ==============================

  useEffect(() => {
    fetchFood();
    fetchReviews();
    fetchAverageRating();
  }, [id]);

  // ==============================
  // FETCH FOOD
  // ==============================

  const fetchFood = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/foods/${id}`
      );

      setFood(res.data.food);
    } catch (err) {
      console.error(
        "Food Fetch Error:",
        err
      );

      toast.error("Food not found");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH REVIEWS
  // ==============================

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reviews/${id}`
      );

      setReviews(
        res.data.reviews || []
      );
    } catch (err) {
      console.error(
        "Reviews Fetch Error:",
        err
      );
    }
  };

  // ==============================
  // FETCH AVERAGE RATING
  // ==============================

  const fetchAverageRating = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reviews/average/${id}`
      );

      setAverageRating(
        res.data.averageRating || 0
      );

      setTotalReviews(
        res.data.totalReviews || 0
      );
    } catch (err) {
      console.error(
        "Average Rating Error:",
        err
      );
    }
  };

  // ==============================
  // WISHLIST STATUS
  // ==============================

  const isWishlisted = wishlist.some(
    (item) =>
      item.food?._id === id
  );

  // ==============================
  // CART STATUS
  // ==============================

  const alreadyInCart =
    cartItems.some(
      (item) =>
        item._id === id ||
        item.id === id
    );

  // ==============================
  // WISHLIST HANDLER
  // ==============================

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }

    try {
      if (isWishlisted) {
        // REMOVE
        const res = await axios.delete(
          `http://localhost:5000/api/wishlist/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        dispatch(
          removeFromWishlist(id)
        );

        await fetchWishlist();

        toast.success(
          res.data.message ||
            "Removed from wishlist"
        );
      } else {
        // ADD
        const res = await axios.post(
          "http://localhost:5000/api/wishlist",
          {
            foodId: id,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        dispatch(
          addToWishlist(food)
        );

        await fetchWishlist();

        toast.success(
          res.data.message ||
            "Added to wishlist"
        );
      }
    } catch (err) {
      console.error(
        "Wishlist Error:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ==============================
  // ADD TO CART
  // ==============================

  const handleAddToCart = () => {
    if (alreadyInCart) {
      toast.info(
        "Item already in cart"
      );
      return;
    }

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

  // ==============================
  // SUBMIT REVIEW
  // ==============================

  const submitReview = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }

    if (comment.trim() === "") {
      toast.error(
        "Please write your review."
      );
      return;
    }

    try {
      setSubmittingReview(true);

      const res = await axios.post(
        "http://localhost:5000/api/reviews",
        {
          foodId: id,
          rating,
          comment: comment.trim(),
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        res.data.message ||
          "Review submitted successfully"
      );

      setComment("");
      setRating(5);

      await fetchReviews();
      await fetchAverageRating();
    } catch (err) {
      console.error(
        "Review Error:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080d16] text-white">

        <div className="min-h-screen flex items-center justify-center px-4">

          <div className="text-center">

            <div
              className="
                w-12
                h-12
                border-4
                border-white/10
                border-t-red-500
                rounded-full
                animate-spin
                mx-auto
                mb-5
              "
            />

            <h2 className="text-xl sm:text-2xl font-bold">
              Loading Food...
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Please wait a moment.
            </p>

          </div>

        </div>

      </div>
    );
  }

  // ==============================
  // FOOD NOT FOUND
  // ==============================

  if (!food) {
    return (
      <div className="min-h-screen bg-[#080d16] text-white">

        <div className="min-h-screen flex items-center justify-center px-4">

          <div
            className="
              text-center
              bg-[#101722]
              border
              border-white/10
              rounded-2xl
              p-8
              sm:p-12
              max-w-md
              w-full
            "
          >

            <div className="text-5xl mb-5">
              🍽️
            </div>

            <h2 className="text-2xl font-bold">
              Food Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              The food item you're looking for
              doesn't exist.
            </p>

            <Link
              to="/food"
              className="
                inline-flex
                items-center
                gap-2
                mt-6
                px-6
                py-3
                bg-red-500
                hover:bg-red-600
                rounded-xl
                font-semibold
                transition
              "
            >
              <FiArrowLeft />
              Back to Foods
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // ==============================
  // MAIN
  // ==============================

  return (
    <div className="min-h-screen bg-[#080d16] text-white">

      {/* =====================================
          PAGE IMAGE / BANNER
      ====================================== */}

      <Image title={food.name} />

      {/* =====================================
          FOOD DETAILS
      ====================================== */}

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

        <div
          className="
            relative
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-10
            sm:py-14
            lg:py-16
          "
        >

          {/* Back Link */}

          <Link
            to="/food"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-gray-500
              hover:text-red-400
              transition
              mb-6
            "
          >
            <FiArrowLeft />
            Back to Foods
          </Link>

          {/* =====================================
              PRODUCT GRID
          ====================================== */}

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-8
              lg:gap-12
              items-start
            "
          >

            {/* =================================
                LEFT - IMAGE
            ================================= */}

            <div>

              <div
                className="
                  relative
                  bg-[#101722]
                  border
                  border-white/10
                  rounded-2xl
                  p-4
                  sm:p-6
                  overflow-hidden
                "
              >

                {/* Glow */}

                <div
                  className="
                    absolute
                    w-64
                    h-64
                    sm:w-80
                    sm:h-80
                    bg-red-500/10
                    rounded-full
                    blur-[80px]
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    pointer-events-none
                  "
                />

                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                    min-h-[300px]
                    sm:min-h-[420px]
                    lg:min-h-[500px]
                  "
                >

                  <img
                    src={
                      food.image ||
                      "https://via.placeholder.com/600"
                    }
                    alt={food.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/600";
                    }}
                    className="
                      w-full
                      max-w-[500px]
                      h-[300px]
                      sm:h-[400px]
                      lg:h-[460px]
                      object-cover
                      rounded-2xl
                      transition-transform
                      duration-500
                      hover:scale-[1.02]
                    "
                  />

                </div>

                {/* Availability Badge */}

                <div
                  className="
                    absolute
                    top-7
                    left-7
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-1.5
                    rounded-full
                    bg-green-500/10
                    border
                    border-green-500/20
                    backdrop-blur-sm
                  "
                >

                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                  <span className="text-xs font-semibold text-green-400">
                    Available
                  </span>

                </div>

              </div>

            </div>

            {/* =================================
                RIGHT - INFORMATION
            ================================= */}

            <div>

              {/* Category */}

              <span
                className="
                  inline-flex
                  items-center
                  px-3
                  py-1
                  rounded-full
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  text-xs
                  sm:text-sm
                  font-semibold
                "
              >
                {food.category}
              </span>

              {/* Name */}

              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-extrabold
                  text-white
                  mt-4
                  leading-tight
                "
              >
                {food.name}
              </h1>

              {/* Rating */}

              <div className="flex items-center gap-3 mt-5 flex-wrap">

                <div className="flex items-center gap-1">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <FaStar
                        key={star}
                        className={
                          star <=
                          Math.round(
                            averageRating
                          )
                            ? "text-yellow-400"
                            : "text-gray-700"
                        }
                      />
                    )
                  )}

                </div>

                <span className="font-bold text-white">
                  {averageRating.toFixed(1)}
                </span>

                <span className="text-gray-500 text-sm">
                  ({totalReviews} Reviews)
                </span>

              </div>

              {/* Price */}

              <div className="mt-7">

                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Price
                </p>

                <h2 className="text-4xl sm:text-5xl font-extrabold text-red-500 mt-1">
                  ₹{food.price}
                </h2>

              </div>

              {/* Description */}

              <div className="mt-7">

                <h3 className="text-lg font-bold text-white mb-2">
                  Description
                </h3>

                <p className="text-sm sm:text-base text-gray-400 leading-7">
                  {food.description ||
                    "No description available."}
                </p>

              </div>

              {/* Buttons */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                  mt-8
                "
              >

                {/* Wishlist */}

                <button
                  onClick={handleWishlist}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-red-500/40
                    bg-red-500/5
                    text-red-400
                    hover:bg-red-500
                    hover:text-white
                    transition-all
                    duration-300
                    font-semibold
                  "
                >

                  {isWishlisted ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}

                  {isWishlisted
                    ? "Wishlisted"
                    : "Add to Wishlist"}

                </button>

                {/* Cart */}

                <button
                  onClick={handleAddToCart}
                  disabled={alreadyInCart}
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      alreadyInCart
                        ? "bg-green-600 text-white cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }
                  `}
                >

                  <FaShoppingCart />

                  {alreadyInCart
                    ? "Item in Cart"
                    : "Add to Cart"}

                </button>

              </div>

              {/* =================================
                  EXTRA INFORMATION
              ================================= */}

              <div
                className="
                  mt-8
                  bg-[#101722]
                  border
                  border-white/10
                  rounded-2xl
                  overflow-hidden
                "
              >

                {/* Availability */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-4
                    border-b
                    border-white/10
                  "
                >

                  <div className="flex items-center gap-3">

                    <FiCheckCircle className="text-green-400" />

                    <span className="text-sm text-gray-400">
                      Availability
                    </span>

                  </div>

                  <span className="text-sm font-semibold text-green-400">
                    In Stock
                  </span>

                </div>

                {/* Category */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-4
                    border-b
                    border-white/10
                  "
                >

                  <span className="text-sm text-gray-400">
                    Category
                  </span>

                  <span className="text-sm font-semibold text-gray-200">
                    {food.category}
                  </span>

                </div>

                {/* Delivery */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-4
                    border-b
                    border-white/10
                  "
                >

                  <div className="flex items-center gap-3">

                    <FiClock className="text-red-400" />

                    <span className="text-sm text-gray-400">
                      Delivery
                    </span>

                  </div>

                  <span className="text-sm font-semibold text-gray-200">
                    25-35 Minutes
                  </span>

                </div>

                {/* Payment */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-4
                  "
                >

                  <div className="flex items-center gap-3">

                    <FiCreditCard className="text-red-400" />

                    <span className="text-sm text-gray-400">
                      Payment
                    </span>

                  </div>

                  <span className="text-sm font-semibold text-gray-200 text-right">
                    Cash / UPI / Card
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

      {/* =====================================
          CUSTOMER REVIEWS
      ====================================== */}

      <section
        className="
          relative
          border-t
          border-white/5
          bg-[#090f18]
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-12
            sm:py-16
          "
        >

          {/* Heading */}

          <div className="mb-8">

            <span
              className="
                inline-flex
                px-3
                py-1
                rounded-full
                bg-red-500/10
                border
                border-red-500/20
                text-red-400
                text-xs
                font-semibold
                mb-3
              "
            >
              CUSTOMER FEEDBACK
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              Customer{" "}
              <span className="text-red-500">
                Reviews
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              See what our customers think about this food.
            </p>

          </div>

          {/* =================================
              RATING SUMMARY
          ================================= */}

          <div
            className="
              bg-[#101722]
              border
              border-white/10
              rounded-2xl
              p-5
              sm:p-7
              mb-8
            "
          >

            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-6
              "
            >

              <div>

                <div className="flex items-end gap-3">

                  <h3 className="text-5xl sm:text-6xl font-extrabold text-red-500">
                    {averageRating.toFixed(1)}
                  </h3>

                  <span className="text-gray-500 pb-2">
                    / 5
                  </span>

                </div>

                <div className="flex gap-1 mt-2">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <FaStar
                        key={star}
                        className={
                          star <=
                          Math.round(
                            averageRating
                          )
                            ? "text-yellow-400"
                            : "text-gray-700"
                        }
                      />
                    )
                  )}

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Based on{" "}
                  <span className="text-gray-300 font-semibold">
                    {totalReviews}
                  </span>{" "}
                  Reviews
                </p>

              </div>

              <button
                onClick={() => {
                  document
                    .getElementById(
                      "write-review"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="
                  px-6
                  sm:px-8
                  py-3
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  active:scale-95
                  text-white
                  font-semibold
                  transition
                  w-full
                  md:w-auto
                "
              >
                Write Review
              </button>

            </div>

          </div>

          {/* =================================
              REVIEW CARDS
          ================================= */}

          {reviews.length === 0 ? (

            <div
              className="
                bg-[#101722]
                border
                border-white/10
                rounded-2xl
                p-10
                text-center
              "
            >

              <div className="text-4xl mb-4">
                ⭐
              </div>

              <h3 className="text-xl font-bold text-white">
                No Reviews Yet
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                Be the first customer to review this food.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {reviews.map((review) => (

                <div
                  key={review._id}
                  className="
                    bg-[#101722]
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                    sm:p-6
                    transition
                    hover:border-white/15
                  "
                >

                  {/* Review Header */}

                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-4
                    "
                  >

                    <div>

                      <h3 className="font-bold text-white">
                        {review.user?.fullName ||
                          "Anonymous"}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {review.createdAt
                          ? new Date(
                              review.createdAt
                            ).toLocaleDateString()
                          : ""}
                      </p>

                    </div>

                    {/* Rating */}

                    <div className="flex gap-1">

                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <FaStar
                            key={star}
                            className={
                              star <=
                              review.rating
                                ? "text-yellow-400"
                                : "text-gray-700"
                            }
                          />
                        )
                      )}

                    </div>

                  </div>

                  {/* Review Text */}

                  <p
                    className="
                      mt-5
                      text-sm
                      sm:text-base
                      text-gray-400
                      leading-7
                    "
                  >
                    {review.comment}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>
      </section>

      {/* =====================================
          AI REVIEW SUMMARY
      ====================================== */}

      <section className="bg-[#080d16]">

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-8
          "
        >

          <ReviewSummary
            foodId={food._id}
          />

        </div>

      </section>

      {/* =====================================
          WRITE REVIEW
      ====================================== */}

      <section
        id="write-review"
        className="bg-[#080d16]"
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            pb-14
            sm:pb-16
          "
        >

          <div
            className="
              bg-[#101722]
              border
              border-white/10
              rounded-2xl
              p-5
              sm:p-8
            "
          >

            {/* Heading */}

            <div className="mb-7">

              <span
                className="
                  text-red-400
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                "
              >
                SHARE YOUR EXPERIENCE
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">
                Write a{" "}
                <span className="text-red-500">
                  Review
                </span>
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Tell other customers about your experience.
              </p>

            </div>

            {/* Rating */}

            <div className="mb-6">

              <label className="block mb-3 text-sm font-semibold text-gray-300">
                Your Rating
              </label>

              <div className="flex gap-2">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setRating(star)
                      }
                      aria-label={`Rate ${star} stars`}
                      className="
                        transition
                        hover:scale-110
                        active:scale-95
                      "
                    >

                      <FaStar
                        className={`
                          text-2xl
                          sm:text-3xl
                          ${
                            rating >= star
                              ? "text-yellow-400"
                              : "text-gray-700"
                          }
                        `}
                      />

                    </button>
                  )
                )}

              </div>

            </div>

            {/* Comment */}

            <div>

              <label
                htmlFor="review-comment"
                className="
                  block
                  mb-3
                  text-sm
                  font-semibold
                  text-gray-300
                "
              >
                Your Review
              </label>

              <textarea
                id="review-comment"
                rows={5}
                value={comment}
                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }
                placeholder="Write your review..."
                className="
                  w-full
                  bg-[#080d16]
                  border
                  border-white/10
                  rounded-xl
                  p-4
                  text-white
                  placeholder-gray-600
                  text-sm
                  resize-none
                  outline-none
                  focus:border-red-500/50
                  focus:ring-1
                  focus:ring-red-500/30
                  transition
                "
              />

            </div>

            {/* Submit */}

            <button
              onClick={submitReview}
              disabled={submittingReview}
              className="
                mt-5
                px-7
                sm:px-10
                py-3
                rounded-xl
                bg-red-500
                hover:bg-red-600
                active:scale-95
                disabled:opacity-60
                disabled:cursor-not-allowed
                text-white
                font-semibold
                transition-all
              "
            >

              {submittingReview
                ? "Submitting..."
                : "Submit Review"}

            </button>

          </div>

        </div>

      </section>

      {/* =====================================
          FOOTER
      ====================================== */}

      <Footer />

    </div>
  );
}