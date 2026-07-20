import { useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useWishlist } from "./context/WishlistContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartAction } from "./cartSlice";

const Wishlist = () => {
  const { wishlist, fetchWishlist } = useWishlist();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.carts.items);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const token = localStorage.getItem("token");

  // Remove from Wishlist
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

      toast.success(res.data.message);
      fetchWishlist();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // Add to Cart Only
  const addToCart = (food) => {
    const alreadyInCart = cartItems.some(
      (item) => item._id === food._id
    );

    if (alreadyInCart) {
      toast.info("Item is already in cart");
      return;
    }

    dispatch(addToCartAction(food));
    toast.success(`${food.name} added to cart successfully!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold text-center mb-10">
        My Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {wishlist.map((item) => {

            const food = item.food;

            const alreadyInCart = cartItems.some(
              (cartItem) => cartItem._id === food._id
            );

            return (
              <div
                key={item._id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5"
              >

                {/* Remove */}
                <button
                  onClick={() => handleRemove(food._id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  <FaTrash size={18} />
                </button>

                {/* Image */}
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-40 h-40 mx-auto object-cover rounded-lg"
                />

                {/* Name */}
                <h2 className="mt-4 text-xl font-semibold text-center">
                  {food.name}
                </h2>

                {/* Category */}
                <p className="text-center text-gray-500 mt-1">
                  {food.category}
                </p>

                {/* Price */}
                <p className="text-center text-red-500 text-2xl font-bold mt-3">
                  ₹{food.price}
                </p>

                {/* Button */}
                {alreadyInCart ? (
                  <button
                    disabled
                    className="w-full mt-5 bg-green-600 text-white py-2 rounded-lg font-semibold cursor-not-allowed"
                  >
                    ✓ Item in Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(food)}
                    className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
                  >
                    Add to Cart
                  </button>
                )}

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default Wishlist;
