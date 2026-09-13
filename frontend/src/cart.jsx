// import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement, removeFromCart } from "./cartSlice";
// import { useState } from "react";
// import { FaTrash } from "react-icons/fa";
// import Cartss from "./assets/p-6.jpg";
// import PaymentForm from "./paymentForm";
// import Footer from "./footer";
// import { useNavigate } from "react-router-dom";
// import Image from "./image";
// import axios from "axios";

// function Cart() {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.carts?.items || []);
//   const [showPayment, setshowPayment] = useState(false);
// const navigate = useNavigate();
//   // const INC = (id) => dispatch(increment(id));
//   //  const DEC = (id) => dispatch(decrement(id));

// const total = Array.isArray(cartItems) 
//   ? cartItems.reduce((sum, item) => sum + (item?.price * item?.quantity || 0), 0)
//   : 0;


//   const handleClosePayment = () => setshowPayment(false);

//   const [couponCode, setCouponCode] = useState("");
// const [discount, setDiscount] = useState(0);
// const [finalTotal, setFinalTotal] = useState(total);
// const [couponMessage, setCouponMessage] = useState("");

// const handleApplyCoupon = async () => {
//   if (!couponCode.trim()) {
//     alert("Please enter a coupon code.");
//     return;
//   }

//   try {
//     const { data } = await axios.post(
//       "http://localhost:5000/api/coupons/apply",
//       {
//         code: couponCode,
//         cartTotal: total,
//       }
//     );

//     setDiscount(data.discount);
//     setFinalTotal(data.finalTotal);
//     setCouponMessage(data.message);

//   } catch (error) {
//     setDiscount(0);
//     setFinalTotal(total);

//     setCouponMessage(
//       error.response?.data?.message || "Failed to apply coupon."
//     );
//   }
// };

//   return (
//     <>
//       {/* 🔥 BANNER */}

//       <Image title="Your Cart" />

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {cartItems.length === 0 ? (
//           <p className="text-center text-lg font-semibold">
//             Your cart is empty 😢
//           </p>
//         ) : (
          
//           <>
//             <div className="overflow-x-auto">
//               <table className="w-full border border-white">
//                 <thead className="bg-white-100">
//                   <tr> 
//                     <th className="p-4 border">Image</th>
//                     <th className="p-4 border">Product Title</th>
//                     <th className="p-4 border">Price</th>
//                     <th className="p-4 border">Quantity</th>
//                     <th className="p-4 border text-center">Delete</th>
//                   </tr>
//                 </thead>

//                <tbody>
//   {Array.isArray(cartItems) &&
//     cartItems.map((item) => {
//       const itemId = item._id || item.id;

//       return (
//         <tr key={itemId} className="border-t text-center">

//           <td className="p-4 border">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-20 h-20 object-contain mx-auto"
//             />
//           </td>

//           <td className="p-4 border font-medium">
//             {item.name}
//           </td>

//           <td className="p-4 border font-semibold">
//             ₹{item.price * item.quantity}
//           </td>

//           <td className="p-4 border">
//             <div className="flex items-center justify-center gap-3">

//               <button
//                 onClick={() => dispatch(decrement(itemId))}
//                 className="w-8 h-8 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
//               >
//                 −
//               </button>

//               <span className="font-semibold">
//                 {item.quantity}
//               </span>

//               <button
//                onClick={() => {
//   console.log("Increment ID:", item._id || item.id);
//   dispatch(increment(item._id || item.id));
// }}
//                 className="w-8 h-8 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white"
//               >
//                 +
//               </button>

//             </div>
//           </td>

//           <td className="p-4 border">
//             <button
//               onClick={() => dispatch(removeFromCart(itemId))}
//               className="text-red-500 hover:text-red-700 text-lg"
//             >
//               <FaTrash />
//             </button>
//           </td>

//         </tr>
//       );
//     })}
// </tbody>
//               </table>
//             </div>

//             <div className="bg-gray-100 rounded-lg p-5 mt-8 mb-6">
//   <h3 className="text-lg font-semibold mb-3">
//     Have a Coupon?
//   </h3>

//   <div className="flex gap-3">
//     <input
//       type="text"
//       placeholder="Enter Coupon Code"
//       value={couponCode}
//       onChange={(e) => setCouponCode(e.target.value)}
//       className="flex-1 border rounded-lg px-4 py-2 outline-none focus:border-red-500"
//     />

//     <button
//       onClick={handleApplyCoupon}
//       className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//     >
//       Apply
//     </button>
//   </div>

//   {couponMessage && (
//     <p className="mt-3 text-green-600 font-medium">
//       {couponMessage}
//     </p>
//   )}
// </div>

//             <div className="mt-10">
//              <div className="space-y-3">

//   <div className="flex justify-between text-lg">
//     <span>Subtotal</span>
//     <span className="font-semibold">
//       ₹{total}
//     </span>
//   </div>

//   <div className="flex justify-between text-lg">
//     <span>Discount</span>
//     <span className="text-green-600 font-semibold">
//       -₹{discount}
//     </span>
//   </div>

//   <hr />

//   <div className="flex justify-between text-2xl font-bold">
//     <span>Total</span>
//     <span className="text-red-500">
//       ₹{finalTotal}
//     </span>
//   </div>

// </div>

//               <p className="text-gray-600 mt-1">
//                 Taxes and shipping will calculate at checkout
//               </p>

//               <div className="mt-6 flex flex-wrap gap-4">
//                 <button className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition" onClick={() => navigate("/food")}>
//                   Continue Shopping
//                 </button>

//                 <button
//   onClick={() =>
//     navigate("/paymentForm", {
//       state: {
//         couponCode,
//         discount,
//         finalTotal,
//       },
//     })
//   }
//   className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
// >
//   Proceed to Checkout
// </button>
//               </div>
//             </div>

//             {showPayment && (
//               <PaymentForm onPaymentClose={handleClosePayment} />
              
//             )}
//           </>
//         )}
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default Cart;

import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  removeFromCart,
} from "./cartSlice";
import { useEffect, useState } from "react";
import { FaTrash, FaMinus, FaPlus, FaTag } from "react-icons/fa";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import Image from "./image";
import axios from "axios";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.carts?.items || []
  );

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  /*
   * Calculate cart subtotal
   */
  const total = Array.isArray(cartItems)
    ? cartItems.reduce(
        (sum, item) =>
          sum +
          (Number(item?.price) || 0) *
            (Number(item?.quantity) || 0),
        0
      )
    : 0;

  /*
   * Keep final total synchronized with cart total
   * when no coupon is applied.
   */
  useEffect(() => {
    if (!couponApplied) {
      setFinalTotal(total);
    }
  }, [total, couponApplied]);

  /*
   * Apply Coupon
   */
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage("Please enter a coupon code.");
      setCouponApplied(false);
      setDiscount(0);
      setFinalTotal(total);
      return;
    }

    try {
      setApplyingCoupon(true);
      setCouponMessage("");

      const { data } = await axios.post(
        "http://localhost:5000/api/coupons/apply",
        {
          code: couponCode.trim(),
          cartTotal: total,
        }
      );

      setDiscount(Number(data.discount) || 0);
      setFinalTotal(Number(data.finalTotal) || total);
      setCouponMessage(
        data.message || "Coupon applied successfully."
      );
      setCouponApplied(true);
    } catch (error) {
      setDiscount(0);
      setFinalTotal(total);
      setCouponApplied(false);

      setCouponMessage(
        error.response?.data?.message ||
          "Failed to apply coupon."
      );
    } finally {
      setApplyingCoupon(false);
    }
  };

  /*
   * Remove Coupon
   */
  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setFinalTotal(total);
    setCouponMessage("");
    setCouponApplied(false);
  };

  /*
   * Empty Cart
   */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#080d16] text-white">
        <Image title="Your Cart" />

        <div className="min-h-[55vh] flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-lg text-center bg-[#101722] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">

            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <FiShoppingBag className="text-red-500 text-4xl" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Your Cart is Empty
            </h2>

            <p className="text-gray-400 mb-8">
              Looks like you haven't added anything to your
              cart yet.
            </p>

            <button
              onClick={() => navigate("/food")}
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
      <Image title="Your Cart" />

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-red-500 uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-2">
            Fresh Bites
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold">
            Shopping Cart
          </h1>

          <p className="text-gray-400 mt-2">
            Review your items before proceeding to checkout.
          </p>
        </div>

        {/* ================= CART ITEMS ================= */}
        <div className="bg-[#101722] border border-white/10 rounded-2xl overflow-hidden shadow-xl">

          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-[1.5fr_2fr_1fr_1.5fr_0.6fr] gap-4 px-6 py-4 bg-white/[0.03] border-b border-white/10 text-sm font-semibold text-gray-300">
            <div>Product</div>
            <div>Product Title</div>
            <div>Price</div>
            <div>Quantity</div>
            <div className="text-center">Delete</div>
          </div>

          {/* Items */}
          <div className="divide-y divide-white/10">
            {Array.isArray(cartItems) &&
              cartItems.map((item) => {
                const itemId = item?._id || item?.id;
                const quantity = Number(item?.quantity) || 0;
                const price = Number(item?.price) || 0;
                const itemTotal = price * quantity;

                return (
                  <div
                    key={itemId}
                    className="p-4 sm:p-5 md:px-6 hover:bg-white/[0.02] transition"
                  >

                    {/* ================= DESKTOP ================= */}
                    <div className="hidden md:grid grid-cols-[1.5fr_2fr_1fr_1.5fr_0.6fr] gap-4 items-center">

                      {/* Image */}
                      <div>
                        <div className="w-24 h-24 rounded-xl bg-[#080d16] border border-white/10 flex items-center justify-center overflow-hidden">
                          <img
                            src={
                              item?.image ||
                              "https://via.placeholder.com/200"
                            }
                            alt={item?.name || "Food"}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/200";
                            }}
                          />
                        </div>
                      </div>

                      {/* Name */}
                      <div>
                        <h3 className="font-semibold text-lg text-white">
                          {item?.name}
                        </h3>

                        <p className="text-gray-500 text-sm mt-1">
                          ₹{price} per item
                        </p>
                      </div>

                      {/* Price */}
                      <div>
                        <span className="font-bold text-red-500">
                          ₹{itemTotal}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div>
                        <div className="inline-flex items-center gap-3 bg-[#080d16] border border-white/10 rounded-xl p-1.5">

                          <button
                            type="button"
                            onClick={() =>
                              dispatch(decrement(itemId))
                            }
                            disabled={quantity <= 1}
                            className="w-8 h-8 rounded-lg border border-white/10 text-gray-300 hover:bg-red-500 hover:text-white hover:border-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center"
                          >
                            <FaMinus className="text-xs" />
                          </button>

                          <span className="w-6 text-center font-semibold">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              dispatch(increment(itemId))
                            }
                            className="w-8 h-8 rounded-lg bg-red-500 text-white hover:bg-red-600 transition flex items-center justify-center"
                          >
                            <FaPlus className="text-xs" />
                          </button>

                        </div>
                      </div>

                      {/* Delete */}
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(removeFromCart(itemId))
                          }
                          className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center"
                          title="Remove from cart"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>

                    {/* ================= MOBILE ================= */}
                    <div className="md:hidden">

                      <div className="flex gap-4">

                        {/* Image */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl bg-[#080d16] border border-white/10 overflow-hidden flex items-center justify-center">
                          <img
                            src={
                              item?.image ||
                              "https://via.placeholder.com/200"
                            }
                            alt={item?.name || "Food"}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/200";
                            }}
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">

                          <div className="flex justify-between gap-3">

                            <div className="min-w-0">
                              <h3 className="font-semibold text-base sm:text-lg truncate">
                                {item?.name}
                              </h3>

                              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                                ₹{price} / item
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                dispatch(
                                  removeFromCart(itemId)
                                )
                              }
                              className="shrink-0 w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center"
                            >
                              <FaTrash className="text-xs" />
                            </button>

                          </div>

                          <div className="flex items-center justify-between mt-5 gap-3">

                            {/* Quantity */}
                            <div className="inline-flex items-center gap-2 bg-[#080d16] border border-white/10 rounded-lg p-1">

                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(decrement(itemId))
                                }
                                disabled={quantity <= 1}
                                className="w-7 h-7 rounded-md text-gray-300 hover:bg-red-500 hover:text-white disabled:opacity-40 transition flex items-center justify-center"
                              >
                                <FaMinus className="text-[10px]" />
                              </button>

                              <span className="w-5 text-center text-sm font-semibold">
                                {quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(increment(itemId))
                                }
                                className="w-7 h-7 rounded-md bg-red-500 text-white hover:bg-red-600 transition flex items-center justify-center"
                              >
                                <FaPlus className="text-[10px]" />
                              </button>

                            </div>

                            {/* Total */}
                            <span className="font-bold text-red-500 text-base sm:text-lg">
                              ₹{itemTotal}
                            </span>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-8 mt-8">

          {/* ================= COUPON ================= */}
          <div className="bg-[#101722] border border-white/10 rounded-2xl p-5 sm:p-7">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FaTag className="text-red-500" />
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold">
                  Have a Coupon?
                </h2>

                <p className="text-gray-500 text-sm">
                  Apply your coupon to get a discount.
                </p>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponMessage("");
                }}
                className="flex-1 min-w-0 bg-[#080d16] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-red-500 transition"
              />

              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={applyingCoupon}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                {applyingCoupon
                  ? "Applying..."
                  : "Apply"}
              </button>
            </div>

            {couponMessage && (
              <div
                className={`mt-4 p-3 rounded-xl text-sm border ${
                  couponApplied
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}
              >
                {couponMessage}
              </div>
            )}

            {couponApplied && (
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="mt-3 text-sm text-gray-500 hover:text-red-400 transition"
              >
                Remove coupon
              </button>
            )}
          </div>

          {/* ================= ORDER SUMMARY ================= */}
          <div className="bg-[#101722] border border-white/10 rounded-2xl p-5 sm:p-7">

            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">

              {/* Subtotal */}
              <div className="flex justify-between gap-4 text-gray-400">
                <span>Subtotal</span>

                <span className="text-white font-semibold">
                  ₹{total}
                </span>
              </div>

              {/* Discount */}
              <div className="flex justify-between gap-4 text-gray-400">
                <span>Discount</span>

                <span className="text-green-400 font-semibold">
                  -₹{discount}
                </span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between gap-4 items-center">

                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-2xl sm:text-3xl font-bold text-red-500">
                    ₹{finalTotal}
                  </span>

                </div>
              </div>

            </div>

            <p className="text-gray-500 text-xs sm:text-sm mt-4">
              Taxes and shipping will be calculated at
              checkout.
            </p>

            {/* Buttons */}
            <div className="mt-7 space-y-3">

              <button
                type="button"
                onClick={() => navigate("/paymentForm")}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-red-500/10"
              >
                Proceed to Checkout
                <FiArrowRight />
              </button>

              <button
                type="button"
                onClick={() => navigate("/food")}
                className="w-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] text-white py-3.5 rounded-xl font-semibold transition"
              >
                Continue Shopping
              </button>

            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}

export default Cart;