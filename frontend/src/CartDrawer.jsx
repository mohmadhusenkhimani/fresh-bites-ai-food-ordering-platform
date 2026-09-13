// // import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { increment, decrement, removeFromCart } from "./cartSlice";
// import { useNavigate } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/solid";

// export default function CartDrawer({ open, setOpen }) {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const cartItems = useSelector(
//         (state) => state.cart?.items || state.carts?.items || []
//     );

//     const appliedCoupon = useSelector(
//     (state) => state.cart?.appliedCoupon || state.carts?.appliedCoupon
// );

// const [showCouponModal, setShowCouponModal] = useState(false);

//     const subtotal = Array.isArray(cartItems)
//         ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//         : 0;

//   const handleCheckout = () => {
//     if (cartItems.length === 0) return;

//     if (appliedCoupon) {
//         setOpen(false);
//         navigate("/paymentForm");
//     } else {
//         setShowCouponModal(true);
//     }
// };

//     return (
//         <>
//             {/* Overlay */}
//             <div
//                 onClick={() => setOpen(false)}
//                 className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
//         ${open ? "opacity-100" : "opacity-0 invisible"}`}
//             />

//             {/* Drawer */}
//             <div
//                 className={`fixed top-0 right-0 w-[360px] max-w-full h-full bg-white z-50
//         transform transition-transform duration-300 ease-in-out shadow-2xl
//         ${open ? "translate-x-0" : "translate-x-full"}
//         flex flex-col`}
//             >
//                 {/* Header */}
//                 <div className="flex items-center justify-between px-5 py-4 border-b">
//                     <h2 className="text-lg font-semibold">
//                         Your Cart <span className="text-gray-500">({cartItems.length})</span>
//                     </h2>

//                     <button
//                         onClick={() => setOpen(false)}
//                         className="p-2 rounded-full bg-gray-100"
//                     >
//                         <XMarkIcon className="w-6 h-6 text-gray-700" />
//                     </button>
//                 </div>

//                 {/* ITEMS – SCROLL AREA */}
//                 <div
//                     className="flex-1 overflow-y-auto px-5 py-4 space-y-6
//         scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
//                 >
//                     {cartItems.length > 0 ? (
//   cartItems.map((item) => {
//     const itemId = item._id || item.id;

//     return (
//       <div key={itemId} className="flex gap-4 items-start">
//         {/* IMAGE */}
//         <div className="flex-shrink-0">
//           <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-11 h-11 rounded-full object-cover"
//             />
//           </div>
//         </div>

//         {/* INFO */}
//         <div className="flex-1">
//           <h4 className="font-medium text-gray-800 leading-tight">
//             {item.name}
//           </h4>

//           <p className="text-red-600 font-semibold mt-1">
//             ₹{item.price}
//           </p>

//           {/* QTY */}
//           <div className="inline-flex items-center bg-red-50 rounded-lg px-3 py-1.5 mt-3">
//             <button
//               onClick={() => dispatch(decrement(itemId))}
//               className="w-8 h-8 flex items-center justify-center text-red-600 text-lg font-bold"
//             >
//               −
//             </button>

//             <span className="mx-3 font-semibold">
//               {item.quantity}
//             </span>

//             <button
//               onClick={() => dispatch(increment(itemId))}
//               className="w-8 h-8 flex items-center justify-center text-red-600 text-lg font-bold"
//             >
//               +
//             </button>
//           </div>
//         </div>

//         {/* REMOVE */}
//         <button
//           onClick={() => dispatch(removeFromCart(itemId))}
//           className="text-gray-400 hover:text-red-500 text-2xl leading-none"
//         >
//           ×
//         </button>
//       </div>
//     );
//   })
// ) : (
//   <p className="text-center text-gray-400 mt-20">
//     Your cart is empty
//   </p>
// )}
//                 </div>
//                 {/* FOOTER – FIXED */}
//                 <div className="bg-red-600 px-5 py-4">
//                     <div className="flex justify-between items-center text-white text-lg font-semibold mb-4">
//                         <span>Subtotal :</span>
//                         <span>₹{subtotal}</span>
//                     </div>

//                     <button
//                         onClick={handleCheckout}
//                         disabled={cartItems.length === 0}
//                         className="w-full bg-white text-red-600 py-3 rounded-xl
//             font-bold tracking-wide
//             hover:bg-gray-100 active:scale-[0.98]
//             transition disabled:opacity-50"
//                     >
//                         Checkout
//                     </button>
//                 </div>
//             </div>

// {/* Coupon Reminder Modal */}
// {showCouponModal && (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">

//         <div className="bg-white rounded-2xl p-7 w-[90%] max-w-md shadow-2xl">

//             <div className="text-5xl text-center mb-4">
//                 🎁
//             </div>

//             <h2 className="text-2xl font-bold text-center">
//                 Have a Coupon?
//             </h2>

//             <p className="text-gray-600 text-center mt-3">
//                 You haven't applied any coupon yet.
//             </p>

//             <p className="text-gray-500 text-center text-sm mt-2">
//                 If you have a coupon code, you can apply it before checkout and save on your order.
//             </p>

//             <div className="flex gap-3 mt-8">

//                 <button
//                     onClick={() => {
//                         setShowCouponModal(false);
//                         setOpen(false);
//                         navigate("/cart");
//                     }}
//                     className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
//                 >
//                     Apply Coupon
//                 </button>

//                 <button
//                     onClick={() => {
//                         setShowCouponModal(false);
//                         setOpen(false);
//                         navigate("/paymentForm");
//                     }}
//                     className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
//                 >
//                     Continue
//                 </button>

//             </div>

//         </div>

//     </div>
// )}

//         </>
//     );
// }

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  increment,
  decrement,
  removeFromCart,
} from "./cartSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function CartDrawer({ open, setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCouponModal, setShowCouponModal] = useState(false);

  // --------------------------------------------------
  // CART
  // --------------------------------------------------
  const cartItems = useSelector(
    (state) => state.cart?.items || state.carts?.items || []
  );

  // --------------------------------------------------
  // APPLIED COUPON
  // --------------------------------------------------
  const appliedCoupon = useSelector(
    (state) =>
      state.cart?.appliedCoupon ||
      state.carts?.appliedCoupon ||
      null
  );

  // --------------------------------------------------
  // SUBTOTAL
  // --------------------------------------------------
  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce(
        (sum, item) =>
          sum +
          Number(item?.price || 0) *
            Number(item?.quantity || 0),
        0
      )
    : 0;

  // --------------------------------------------------
  // CLOSE DRAWER
  // --------------------------------------------------
  const closeDrawer = () => {
    setOpen(false);
  };

  // --------------------------------------------------
  // CHECKOUT
  // --------------------------------------------------
  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      return;
    }

    if (appliedCoupon) {
      setOpen(false);
      navigate("/paymentForm");
    } else {
      setShowCouponModal(true);
    }
  };

  // --------------------------------------------------
  // APPLY COUPON
  // --------------------------------------------------
  const handleApplyCoupon = () => {
    setShowCouponModal(false);
    setOpen(false);
    navigate("/cart");
  };

  // --------------------------------------------------
  // CONTINUE WITHOUT COUPON
  // --------------------------------------------------
  const handleContinueCheckout = () => {
    setShowCouponModal(false);
    setOpen(false);
    navigate("/paymentForm");
  };

  return (
    <>
      {/* =====================================================
          OVERLAY
      ====================================================== */}
      <div
        onClick={closeDrawer}
        className={`
          fixed inset-0
          bg-black/70
          backdrop-blur-sm
          z-40
          transition-opacity duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      />

      {/* =====================================================
          CART DRAWER
      ====================================================== */}
      <aside
        className={`
          fixed
          top-0
          right-0
          h-[100dvh]
          w-full
          sm:w-[390px]
          md:w-[420px]
          max-w-full
          bg-[#0b111b]
          text-white
          border-l border-white/10
          shadow-2xl
          z-50
          flex
          flex-col
          overflow-hidden
          transform
          transition-transform
          duration-300
          ease-in-out
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* =================================================
            HEADER
        ================================================== */}
        <div
          className="
            flex
            items-center
            justify-between
            px-4
            sm:px-5
            py-4
            border-b
            border-white/10
            bg-[#0d1421]
            flex-shrink-0
          "
        >
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold truncate">
              Your Cart{" "}
              <span className="text-gray-500 font-medium">
                ({cartItems.length})
              </span>
            </h2>

            <p className="text-xs text-gray-500 mt-0.5">
              Fresh food, ready to order
            </p>
          </div>

          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="
              flex-shrink-0
              ml-3
              w-9
              h-9
              rounded-xl
              flex
              items-center
              justify-center
              bg-white/5
              border
              border-white/10
              text-gray-400
              hover:text-white
              hover:bg-red-500/10
              hover:border-red-500/30
              transition
            "
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* =================================================
            CART ITEMS SCROLL AREA
        ================================================== */}
        <div
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-4
            sm:px-5
            py-4
            space-y-4
          "
        >
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const itemId = item?._id || item?.id;

              return (
                <div
                  key={itemId}
                  className="
                    relative
                    w-full
                    bg-[#101722]
                    border
                    border-white/10
                    rounded-2xl
                    p-3
                    sm:p-4
                    hover:border-red-500/20
                    transition
                  "
                >
                  <div className="flex gap-3 min-w-0">
                    {/* ======================================
                        FOOD IMAGE
                    ======================================= */}
                    <div className="flex-shrink-0">
                      <div
                        className="
                          w-14
                          h-14
                          sm:w-16
                          sm:h-16
                          rounded-xl
                          overflow-hidden
                          bg-[#080d16]
                          border
                          border-white/10
                        "
                      >
                        <img
                          src={
                            item?.image ||
                            "https://via.placeholder.com/100"
                          }
                          alt={item?.name || "Food"}
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/100";
                          }}
                        />
                      </div>
                    </div>

                    {/* ======================================
                        FOOD INFORMATION
                    ======================================= */}
                    <div className="flex-1 min-w-0 pr-6">
                      <h4
                        className="
                          font-semibold
                          text-sm
                          sm:text-base
                          text-white
                          truncate
                        "
                        title={item?.name}
                      >
                        {item?.name}
                      </h4>

                      <p className="text-red-500 font-bold text-sm mt-1">
                        ₹{item?.price}
                      </p>

                      {/* ==================================
                          QUANTITY
                      =================================== */}
                      <div
                        className="
                          inline-flex
                          items-center
                          mt-3
                          rounded-xl
                          bg-red-500/10
                          border
                          border-red-500/20
                          overflow-hidden
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(decrement(itemId))
                          }
                          className="
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            text-red-400
                            text-lg
                            font-bold
                            hover:bg-red-500/10
                            transition
                          "
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span
                          className="
                            min-w-[32px]
                            text-center
                            text-sm
                            font-semibold
                            text-white
                          "
                        >
                          {item?.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(increment(itemId))
                          }
                          className="
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            text-red-400
                            text-lg
                            font-bold
                            hover:bg-red-500/10
                            transition
                          "
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* ======================================
                        REMOVE
                    ======================================= */}
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(removeFromCart(itemId))
                      }
                      aria-label={`Remove ${item?.name}`}
                      className="
                        absolute
                        top-3
                        right-3
                        w-7
                        h-7
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        text-gray-500
                        hover:text-red-400
                        hover:bg-red-500/10
                        transition
                      "
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* ITEM TOTAL */}
                  <div
                    className="
                      flex
                      justify-between
                      items-center
                      mt-3
                      pt-3
                      border-t
                      border-white/5
                    "
                  >
                    <span className="text-xs text-gray-500">
                      Item total
                    </span>

                    <span className="text-sm font-bold text-white">
                      ₹
                      {Number(item?.price || 0) *
                        Number(item?.quantity || 0)}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            /* ============================================
               EMPTY CART
            ============================================= */
            <div
              className="
                min-h-full
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-5
              "
            >
              <div
                className="
                  w-20
                  h-20
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
                <span className="text-4xl">🛒</span>
              </div>

              <h3 className="text-lg font-bold text-white">
                Your cart is empty
              </h3>

              <p className="text-sm text-gray-500 mt-2 max-w-[260px]">
                Looks like you haven't added anything
                delicious yet.
              </p>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/food");
                }}
                className="
                  mt-5
                  px-5
                  py-2.5
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  text-sm
                  font-semibold
                  transition
                "
              >
                Browse Food
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            FOOTER
        ================================================== */}
        <div
          className="
            flex-shrink-0
            bg-[#0d1421]
            border-t
            border-white/10
            px-4
            sm:px-5
            py-4
          "
        >
          {/* SUBTOTAL */}
          <div
            className="
              flex
              items-center
              justify-between
              mb-4
            "
          >
            <div>
              <p className="text-xs text-gray-500">
                Subtotal
              </p>

              <p className="text-lg font-bold text-white">
                ₹{subtotal}
              </p>
            </div>

            {appliedCoupon && (
              <div
                className="
                  px-3
                  py-1.5
                  rounded-lg
                  bg-green-500/10
                  border
                  border-green-500/20
                  text-green-400
                  text-xs
                  font-semibold
                "
              >
                ✓ Coupon Applied
              </div>
            )}
          </div>

          {/* CHECKOUT */}
          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              disabled:bg-gray-700
              disabled:text-gray-500
              disabled:cursor-not-allowed
              text-white
              py-3
              rounded-xl
              font-bold
              text-sm
              transition
              active:scale-[0.98]
            "
          >
            Proceed to Checkout
          </button>

          {/* CONTINUE SHOPPING */}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/food");
            }}
            className="
              w-full
              mt-2
              py-2.5
              rounded-xl
              text-gray-400
              hover:text-white
              hover:bg-white/5
              text-sm
              font-medium
              transition
            "
          >
            Continue Shopping
          </button>
        </div>
      </aside>

      {/* =====================================================
          COUPON REMINDER MODAL
      ====================================================== */}
      {showCouponModal && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/75
            backdrop-blur-sm
            px-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              bg-[#101722]
              border
              border-white/10
              rounded-2xl
              shadow-2xl
              p-5
              sm:p-7
            "
          >
            {/* ICON */}
            <div className="flex justify-center mb-4">
              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-red-500/10
                  border
                  border-red-500/20
                  flex
                  items-center
                  justify-center
                  text-3xl
                "
              >
                🎁
              </div>
            </div>

            {/* TITLE */}
            <h2
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-white
                text-center
              "
            >
              Have a Coupon?
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                text-gray-400
                text-center
                mt-3
                text-sm
                leading-relaxed
              "
            >
              You haven't applied any coupon yet.
            </p>

            <p
              className="
                text-gray-500
                text-center
                text-xs
                sm:text-sm
                mt-2
                leading-relaxed
              "
            >
              If you have a coupon code, you can apply
              it before checkout and save on your order.
            </p>

            {/* BUTTONS */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-3
                mt-7
              "
            >
              {/* APPLY COUPON */}
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="
                  w-full
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  py-3
                  rounded-xl
                  font-semibold
                  text-sm
                  transition
                "
              >
                Apply Coupon
              </button>

              {/* CONTINUE */}
              <button
                type="button"
                onClick={handleContinueCheckout}
                className="
                  w-full
                  bg-white/5
                  hover:bg-white/10
                  border
                  border-white/10
                  text-gray-200
                  py-3
                  rounded-xl
                  font-semibold
                  text-sm
                  transition
                "
              >
                Continue
              </button>
            </div>

            {/* CANCEL */}
            <button
              type="button"
              onClick={() => setShowCouponModal(false)}
              className="
                block
                mx-auto
                mt-4
                text-xs
                text-gray-500
                hover:text-gray-300
                transition
              "
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}