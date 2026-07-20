// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { increment, decrement, removeFromCart } from "./cartSlice";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function CartDrawer({ open, setOpen }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(
        (state) => state.cart?.items || state.carts?.items || []
    );

    const appliedCoupon = useSelector(
    (state) => state.cart?.appliedCoupon || state.carts?.appliedCoupon
);

const [showCouponModal, setShowCouponModal] = useState(false);

    const subtotal = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    if (appliedCoupon) {
        setOpen(false);
        navigate("/paymentForm");
    } else {
        setShowCouponModal(true);
    }
};

    return (
        <>
            {/* Overlay */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
        ${open ? "opacity-100" : "opacity-0 invisible"}`}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 w-[360px] max-w-full h-full bg-white z-50
        transform transition-transform duration-300 ease-in-out shadow-2xl
        ${open ? "translate-x-0" : "translate-x-full"}
        flex flex-col`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h2 className="text-lg font-semibold">
                        Your Cart <span className="text-gray-500">({cartItems.length})</span>
                    </h2>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-full bg-gray-100"
                    >
                        <XMarkIcon className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                {/* ITEMS – SCROLL AREA */}
                <div
                    className="flex-1 overflow-y-auto px-5 py-4 space-y-6
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                >
                    {cartItems.length > 0 ? (
  cartItems.map((item) => {
    const itemId = item._id || item.id;

    return (
      <div key={itemId} className="flex gap-4 items-start">
        {/* IMAGE */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-11 h-11 rounded-full object-cover"
            />
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1">
          <h4 className="font-medium text-gray-800 leading-tight">
            {item.name}
          </h4>

          <p className="text-red-600 font-semibold mt-1">
            ₹{item.price}
          </p>

          {/* QTY */}
          <div className="inline-flex items-center bg-red-50 rounded-lg px-3 py-1.5 mt-3">
            <button
              onClick={() => dispatch(decrement(itemId))}
              className="w-8 h-8 flex items-center justify-center text-red-600 text-lg font-bold"
            >
              −
            </button>

            <span className="mx-3 font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => dispatch(increment(itemId))}
              className="w-8 h-8 flex items-center justify-center text-red-600 text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* REMOVE */}
        <button
          onClick={() => dispatch(removeFromCart(itemId))}
          className="text-gray-400 hover:text-red-500 text-2xl leading-none"
        >
          ×
        </button>
      </div>
    );
  })
) : (
  <p className="text-center text-gray-400 mt-20">
    Your cart is empty
  </p>
)}
                </div>
                {/* FOOTER – FIXED */}
                <div className="bg-red-600 px-5 py-4">
                    <div className="flex justify-between items-center text-white text-lg font-semibold mb-4">
                        <span>Subtotal :</span>
                        <span>₹{subtotal}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                        className="w-full bg-white text-red-600 py-3 rounded-xl
            font-bold tracking-wide
            hover:bg-gray-100 active:scale-[0.98]
            transition disabled:opacity-50"
                    >
                        Checkout
                    </button>
                </div>
            </div>

{/* Coupon Reminder Modal */}
{showCouponModal && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">

        <div className="bg-white rounded-2xl p-7 w-[90%] max-w-md shadow-2xl">

            <div className="text-5xl text-center mb-4">
                🎁
            </div>

            <h2 className="text-2xl font-bold text-center">
                Have a Coupon?
            </h2>

            <p className="text-gray-600 text-center mt-3">
                You haven't applied any coupon yet.
            </p>

            <p className="text-gray-500 text-center text-sm mt-2">
                If you have a coupon code, you can apply it before checkout and save on your order.
            </p>

            <div className="flex gap-3 mt-8">

                <button
                    onClick={() => {
                        setShowCouponModal(false);
                        setOpen(false);
                        navigate("/cart");
                    }}
                    className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                >
                    Apply Coupon
                </button>

                <button
                    onClick={() => {
                        setShowCouponModal(false);
                        setOpen(false);
                        navigate("/paymentForm");
                    }}
                    className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                >
                    Continue
                </button>

            </div>

        </div>

    </div>
)}

        </>
    );
}
