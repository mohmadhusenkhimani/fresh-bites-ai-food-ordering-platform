import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";


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

  const { wishlist, fetchWishlist } = useWishlist();

  const { isAuthenticated, token: reduxToken } = useSelector(
    (state) => state.auth
  );

  const cartItems = useSelector(
    (state) => state.carts.items
  );

  const token = reduxToken || localStorage.getItem("token");

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchFood();
    fetchReviews();
    fetchAverageRating();
  }, [id]);

  const fetchFood = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/foods/${id}`
      );

      setFood(res.data.food);
    } catch (err) {
      console.log(err);
      toast.error("Food not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reviews/${id}`
      );

      setReviews(res.data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reviews/average/${id}`
      );

      setAverageRating(res.data.averageRating);
      setTotalReviews(res.data.totalReviews);
    } catch (err) {
      console.log(err);
    }
  };

  const isWishlisted = wishlist.some(
    (item) => item.food?._id === id
  );

  const alreadyInCart = cartItems.some(
    (item) => item._id === id
  );

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }

    try {
      if (isWishlisted) {
        const res = await axios.delete(
          `http://localhost:5000/api/wishlist/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(removeFromWishlist(id));

        await fetchWishlist();

        toast.success(res.data.message);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/wishlist",
          {
            foodId: id,
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
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleAddToCart = () => {
    if (alreadyInCart) {
      toast.info("Item already in cart");
      return;
    }

    dispatch(addToCartAction(food));

    toast.success(
      `${food.name} added to cart successfully!`
    );
  };
  

  // ================= SUBMIT REVIEW =================

const submitReview = async () => {
  if (!isAuthenticated) {
    toast.error("Please login first");
    return;
  }

  if (comment.trim() === "") {
    toast.error("Please write your review.");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/reviews",
      {
        foodId: id,
        rating,
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(res.data.message);

    setComment("");
    setRating(5);

    await fetchReviews();
    await fetchAverageRating();

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
        "Something went wrong"
    );
  }
};

  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-2xl font-semibold">Loading...</h2>
    </div>
  );
}

if (!food) {
  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-2xl font-semibold text-red-500">
        Food Not Found
      </h2>
    </div>
  );
}

return (
  <>
    <Image title={food.name} />

    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT SIDE */}

        <div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <img
              src={food.image}
              alt={food.name}
              className="w-full h-[450px] object-cover rounded-xl"
            />

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div>

          <h1 className="text-4xl font-bold">
            {food.name}
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            {food.category}
          </p>

          {/* Rating */}

          <div className="flex items-center gap-3 mt-5">

            <div className="flex text-yellow-400">

              {[1,2,3,4,5].map((star)=>(
                <FaStar
                  key={star}
                  className={
                    star <= Math.round(averageRating)
                      ? ""
                      : "text-gray-300"
                  }
                />
              ))}

            </div>

            <span className="font-semibold">
              {averageRating.toFixed(1)}
            </span>

            <span className="text-gray-500">
              ({totalReviews} Reviews)
            </span>

          </div>

          {/* Price */}

          <div className="mt-8">

            <h2 className="text-4xl font-bold text-red-500">
              ₹{food.price}
            </h2>

          </div>

          {/* Description */}

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-2">
              Description
            </h3>

            <p className="text-gray-600 leading-8">
              {food.description || "No description available."}
            </p>

          </div>

          {/* Buttons */}

          <div className="flex gap-5 mt-10">

            <button
              onClick={handleWishlist}
              className="
              flex items-center gap-2
              border-2 border-red-500
              px-8 py-3
              rounded-xl
              hover:bg-red-500
              hover:text-white
              transition
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

            <button
              onClick={handleAddToCart}
              disabled={alreadyInCart}
              className={`
                px-10 py-3
                rounded-xl
                font-semibold
                transition

                ${
                  alreadyInCart
                    ? "bg-green-600 cursor-not-allowed text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }
              `}
            >
              {alreadyInCart
                ? "✓ Item in Cart"
                : "Add to Cart"}
            </button>

          </div>

          {/* Extra Information */}

          <div className="mt-12 border-t pt-8 space-y-3">

            <div className="flex justify-between">

              <span className="font-semibold">
                Availability
              </span>

              <span className="text-green-600">
                In Stock
              </span>

            </div>

            <div className="flex justify-between">

              <span className="font-semibold">
                Category
              </span>

              <span>
                {food.category}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="font-semibold">
                Delivery
              </span>

              <span>
                25-35 Minutes
              </span>

            </div>

            <div className="flex justify-between">

              <span className="font-semibold">
                Payment
              </span>

              <span>
                Cash / UPI / Card
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

    {/* ================= CUSTOMER REVIEWS ================= */}

<div className="max-w-7xl mx-auto px-6 py-10">

  <h2 className="text-3xl font-bold mb-8">
    Customer Reviews
  </h2>

  {/* Rating Summary */}

  <div className="bg-white rounded-xl shadow-md p-6 mb-8">

    <div className="flex flex-col md:flex-row md:items-center md:justify-between">

      <div>

        <h3 className="text-5xl font-bold text-red-500">
          {averageRating.toFixed(1)}
        </h3>

        <div className="flex mt-2 text-yellow-400">

          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={
                star <= Math.round(averageRating)
                  ? ""
                  : "text-gray-300"
              }
            />
          ))}

        </div>

        <p className="text-gray-500 mt-2">
          Based on {totalReviews} Reviews
        </p>

      </div>

      <div className="mt-6 md:mt-0">

        <button
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg"
          onClick={() => {
            document
              .getElementById("write-review")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
        >
          Write Review
        </button>

      </div>

    </div>

  </div>

  {/* Review Cards */}

  {reviews.length === 0 ? (

    <div className="bg-white shadow rounded-xl p-10 text-center">

      <h3 className="text-xl font-semibold">
        No Reviews Yet
      </h3>

      <p className="text-gray-500 mt-2">
        Be the first customer to review this food.
      </p>

    </div>

  ) : (

    <div className="space-y-6">

      {reviews.map((review) => (

        <div
          key={review._id}
          className="bg-white shadow rounded-xl p-6"
        >

          {/* User */}

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold text-lg">
                {review.user?.fullName || "Anonymous"}
              </h3>

              <p className="text-sm text-gray-500">

                {new Date(
                  review.createdAt
                ).toLocaleDateString()}

              </p>

            </div>

            {/* Rating */}

            <div className="flex text-yellow-400">

              {[1,2,3,4,5].map((star)=>(

                <FaStar
                  key={star}
                  className={
                    star <= review.rating
                      ? ""
                      : "text-gray-300"
                  }
                />

              ))}

            </div>

          </div>

          {/* Review Text */}

         <div className="mt-5">

  <p className="text-gray-700 leading-7">
    {review.comment}
  </p>

</div>

        </div>

      ))}

    </div>

  )}

</div>

{/* ================= AI REVIEW SUMMARY ================= */}

<div className="max-w-7xl mx-auto px-6 py-6">

  <ReviewSummary 
      foodId={food._id}
  />

</div>

{/* ================= WRITE REVIEW ================= */}

<div
  id="write-review"
  className="max-w-7xl mx-auto px-6 pb-16"
>

  <div className="bg-white rounded-xl shadow-lg p-8">

    <h2 className="text-3xl font-bold mb-6">

      Write a Review

    </h2>

    {/* Rating */}

    <label className="block mb-2 font-semibold">

      Rating

    </label>

    <div className="flex gap-3 mb-6">

      {[1,2,3,4,5].map((star)=>(

        <FaStar
          key={star}
          onClick={()=>setRating(star)}
          className={`cursor-pointer text-3xl ${
            rating >= star
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        />

      ))}

    </div>

    {/* Comment */}

    <label className="block mb-2 font-semibold">

      Your Review

    </label>

    <textarea
      rows={5}
      value={comment}
      onChange={(e)=>setComment(e.target.value)}
      placeholder="Write your review..."
      className="w-full border rounded-lg p-4 resize-none focus:ring-2 focus:ring-red-500 outline-none"
    />

    <button
      onClick={submitReview}
      className="mt-6 bg-red-500 hover:bg-red-600 text-white px-10 py-3 rounded-lg font-semibold"
    >
      Submit Review
    </button>

  </div>

</div>

    <Footer />

  </>
)};