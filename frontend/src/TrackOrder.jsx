// import { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Image from "./image";
// import Footer from "./footer";

// const API = "http://localhost:5000/api/orders";

// const steps = [
//   { key: "pending",          icon: "ri-file-list-3-line",       label: "Order Placed"     },
//   { key: "confirmed",        icon: "ri-checkbox-circle-line",   label: "Confirmed"        },
//   { key: "preparing",        icon: "ri-restaurant-2-line",      label: "Preparing"        },
//   { key: "out_for_delivery", icon: "ri-e-bike-line",            label: "Out for Delivery" },
//   { key: "delivered",        icon: "ri-map-pin-2-line",         label: "Delivered"        },
// ];

// const stepIndex = (status) => steps.findIndex((s) => s.key === status);

// export default function TrackOrder() {
//   const { id } = useParams();
//   const { isAuthenticated } = useSelector((s) => s.auth);
// const reduxToken = useSelector((s) => s.auth.token);
// const token = reduxToken || localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [advancing, setAdvancing] = useState(false);

//   const fetchOrder = useCallback(() => {
//     fetch(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
//       .then((r) => r.json())
//       .then((d) => { if (d.success) setOrder(d.order); })
//       .finally(() => setLoading(false));
//   }, [id, token]);

//   useEffect(() => {
//     if (!isAuthenticated) { navigate("/login"); return; }
//     fetchOrder();
//     // Poll every 15 seconds for live updates
//     const interval = setInterval(fetchOrder, 15000);
//     return () => clearInterval(interval);
//   }, [isAuthenticated, navigate, fetchOrder]);

//   const advanceStatus = async () => {
//     setAdvancing(true);
//     try {
//       const res = await fetch(`${API}/${id}/status`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success) setOrder(data.order);
//       else alert(data.message);
//     } finally {
//       setAdvancing(false);
//     }
//   };

//   const cancelOrder = async () => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;
//     const res = await fetch(`${API}/${id}/cancel`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (data.success) setOrder(data.order);
//     else alert(data.message);
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );

//   if (!order) return (
//     <div className="text-center py-20">
//       <p className="text-2xl font-bold text-gray-600">Order not found</p>
//       <Link to="/my-orders" className="text-red-500 mt-4 inline-block">← Back to My Orders</Link>
//     </div>
//   );

//   const currentStep = stepIndex(order.status);
//   const isCancelled = order.status === "cancelled";
//   const isDelivered = order.status === "delivered";

//   return (
//     <div>
//       <Image title="Track Order" />
//       <div className="max-w-4xl mx-auto px-6 py-12">

//         {/* Order Header */}
//         <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
//           <div>
//             <Link to="/my-orders" className="text-red-500 text-sm hover:underline">← Back to My Orders</Link>
//             <h2 className="text-2xl font-bold text-gray-800 mt-1">
//               Order <span className="text-red-500">#{order._id.slice(-8).toUpperCase()}</span>
//             </h2>
//             <p className="text-gray-500 text-sm mt-1">
//               Placed on {new Date(order.createdAt).toLocaleString("en-IN")}
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-2xl font-bold text-red-600">₹{order.total}</p>
//             <p className="text-xs text-gray-500">Including ₹{order.shippingFee} shipping</p>
//           </div>
//         </div>

//         {/* Stepper */}
//         {!isCancelled && (
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
//             <h3 className="text-lg font-semibold text-gray-800 mb-8">Order Status</h3>
//             <div className="relative">
//               {/* Progress Line */}
//               <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 mx-10 rounded-full">
//                 <div
//                   className="h-full bg-red-500 rounded-full transition-all duration-700"
//                   style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
//                 />
//               </div>

//               {/* Steps */}
//               <div className="relative flex justify-between">
//                 {steps.map((step, i) => {
//                   const done = i <= currentStep;
//                   const active = i === currentStep;
//                   return (
//                     <div key={step.key} className="flex flex-col items-center gap-3 z-10">
//                       <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500
//                         ${done ? "bg-red-500 text-white shadow-lg shadow-red-200" : "bg-gray-100 text-gray-400"}
//                         ${active ? "ring-4 ring-red-200 scale-110" : ""}`}>
//                         <i className={step.icon}></i>
//                       </div>
//                       <p className={`text-xs font-medium text-center max-w-16 ${done ? "text-red-600" : "text-gray-400"}`}>
//                         {step.label}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* ETA */}
//             {order.estimatedDelivery && !isDelivered && (
//               <div className="mt-8 bg-red-50 rounded-xl p-4 flex items-center gap-3">
//                 <i className="ri-time-line text-red-500 text-xl"></i>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">Estimated Delivery</p>
//                   <p className="text-red-600 font-bold">{new Date(order.estimatedDelivery).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
//                 </div>
//               </div>
//             )}

//             {isDelivered && (
//               <div className="mt-8 bg-green-50 rounded-xl p-4 flex items-center gap-3">
//                 <i className="ri-checkbox-circle-fill text-green-500 text-2xl"></i>
//                 <p className="text-green-700 font-semibold">Order Delivered! Enjoy your meal 🎉</p>
//               </div>
//             )}
//           </div>
//         )}

//         {isCancelled && (
//           <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-center gap-4">
//             <i className="ri-close-circle-fill text-red-500 text-4xl"></i>
//             <div>
//               <h3 className="text-lg font-bold text-red-700">Order Cancelled</h3>
//               <p className="text-red-600 text-sm">This order has been cancelled.</p>
//             </div>
//           </div>
//         )}

//       {/* Cancel button for user */}
// {/* {!isCancelled &&
//   !isDelivered &&
//   ["pending", "confirmed"].includes(order.status) && (
//     <div className="mb-8">
//       <button
//         onClick={cancelOrder}
//         className="border border-red-400 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition text-sm"
//       >
//         Cancel Order
//       </button>
//     </div>
// )} */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Order Items */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <h3 className="font-semibold text-gray-800 mb-4">🍽️ Order Items</h3>
//             <div className="space-y-3">
//               {order.items.map((item, i) => (
//                 <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
//                   <div>
//                     <p className="font-medium text-gray-800 text-sm">{item.name}</p>
//                     <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                   </div>
//                   <p className="font-semibold text-red-600 text-sm">₹{item.price * item.quantity}</p>
//                 </div>
//               ))}
//               <div className="pt-2 border-t border-gray-200">

//   <div className="flex justify-between text-sm text-gray-600">
//     <span>Subtotal</span>
//     <span>₹{order.subtotal}</span>
//   </div>

//   {order.discount > 0 && (
//     <>
//       <div className="flex justify-between text-sm text-green-600 mt-2">
//         <span>
//           Coupon ({order.couponCode})
//         </span>
//         <span>-₹{order.discount}</span>
//       </div>

//       <div className="flex justify-between text-xs text-green-500">
//         <span>Discount Applied</span>
//         <span>{order.couponCode}</span>
//       </div>
//     </>
//   )}

//   <div className="flex justify-between text-sm text-gray-600 mt-2">
//     <span>Shipping</span>
//     <span>₹{order.shippingFee}</span>
//   </div>

//   <div className="flex justify-between font-bold text-gray-800 mt-3 pt-3 border-t">
//     <span>Total Paid</span>
//     <span className="text-red-600">
//       ₹{order.total}
//     </span>
//   </div>

// </div>
//             </div>
//           </div>

//           {/* Tracking History */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <h3 className="font-semibold text-gray-800 mb-4">📍 Tracking History</h3>
//             <div className="space-y-4">
//               {[...order.trackingHistory].reverse().map((entry, i) => (
//                 <div key={i} className="flex gap-3">
//                   <div className="flex flex-col items-center">
//                     <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${i === 0 ? "bg-red-500" : "bg-gray-300"}`}></div>
//                     {i < order.trackingHistory.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1"></div>}
//                   </div>
//                   <div className="pb-4">
//                     <p className="text-sm font-medium text-gray-800">{entry.message}</p>
//                     <p className="text-xs text-gray-400 mt-0.5">
//                       {new Date(entry.timestamp).toLocaleString("en-IN")}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Shipping Address */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
//           <h3 className="font-semibold text-gray-800 mb-4">📦 Delivery Address</h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
//             {Object.entries(order.shippingAddress).map(([k, v]) => (
//               <div key={k}>
//                 <p className="text-xs text-gray-400 capitalize">{k}</p>
//                 <p className="font-medium text-gray-700">{v}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//       <Footer />
//     </div>
//   );
// }

import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaClipboardList,
  FaCheckCircle,
  FaUtensils,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaClock,
  FaTimesCircle,
  FaBoxOpen,
  FaArrowLeft,
  FaReceipt,
  FaMapMarkedAlt,
} from "react-icons/fa";

import Image from "./image";
import Footer from "./footer";

const API = "http://localhost:5000/api/orders";

const steps = [
  {
    key: "pending",
    icon: FaClipboardList,
    label: "Order Placed",
  },
  {
    key: "confirmed",
    icon: FaCheckCircle,
    label: "Confirmed",
  },
  {
    key: "preparing",
    icon: FaUtensils,
    label: "Preparing",
  },
  {
    key: "out_for_delivery",
    icon: FaMotorcycle,
    label: "Out for Delivery",
  },
  {
    key: "delivered",
    icon: FaMapMarkerAlt,
    label: "Delivered",
  },
];

const stepIndex = (status) =>
  steps.findIndex((step) => step.key === status);

export default function TrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const reduxToken = useSelector((state) => state.auth.token);
  const token = reduxToken || localStorage.getItem("token");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);

  // =========================
  // Fetch Order
  // =========================
  const fetchOrder = useCallback(async () => {
    if (!token || !id) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  // =========================
  // Authentication + Polling
  // =========================
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchOrder();

    // Refresh order status every 15 seconds
    const interval = setInterval(() => {
      fetchOrder();
    }, 15000);

    return () => clearInterval(interval);
  }, [isAuthenticated, navigate, fetchOrder]);

  // =========================
  // Advance Order Status
  // =========================
  const advanceStatus = async () => {
    if (!token) return;

    setAdvancing(true);

    try {
      const response = await fetch(`${API}/${id}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        alert(data.message || "Unable to update order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Something went wrong while updating the order.");
    } finally {
      setAdvancing(false);
    }
  };

  // =========================
  // Cancel Order
  // =========================
  const cancelOrder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed || !token) return;

    try {
      const response = await fetch(`${API}/${id}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        alert(data.message || "Unable to cancel the order.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Something went wrong while cancelling the order.");
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080d16] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto" />

          <p className="text-gray-400 mt-5 text-sm">
            Loading your order...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Order Not Found
  // =========================
  if (!order) {
    return (
      <div className="min-h-screen bg-[#080d16] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <FaBoxOpen className="text-red-500 text-3xl" />
          </div>

          <h2 className="text-2xl font-bold mt-6">
            Order Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            We couldn't find the order you're looking for.
          </p>

          <Link
            to="/my-orders"
            className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
          >
            <FaArrowLeft />
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  const currentStep = stepIndex(order.status);

  const isCancelled = order.status === "cancelled";
  const isDelivered = order.status === "delivered";

  const progressPercentage =
    currentStep >= 0
      ? (currentStep / (steps.length - 1)) * 100
      : 0;

  return (
    <div className="min-h-screen bg-[#080d16] text-white">
      {/* =========================
          Page Banner
      ========================= */}
      <Image title="Track Order" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* =========================
            Order Header
        ========================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
          <div>
            <Link
              to="/my-orders"
              className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium transition"
            >
              <FaArrowLeft />
              Back to My Orders
            </Link>

            <h2 className="text-2xl sm:text-3xl font-bold mt-3">
              Order{" "}
              <span className="text-red-500">
                #{order._id.slice(-8).toUpperCase()}
              </span>
            </h2>

            <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm mt-2">
              <FaClock className="text-red-500" />

              <span>
                Placed on{" "}
                {new Date(order.createdAt).toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
          </div>

          <div className="sm:text-right">
            <p className="text-3xl font-bold text-red-500">
              ₹{order.total}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Including ₹{order.shippingFee} shipping
            </p>
          </div>
        </div>

        {/* =========================
            Cancelled Order
        ========================= */}
        {isCancelled && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 sm:p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
              <FaTimesCircle className="text-red-500 text-2xl" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-red-400">
                Order Cancelled
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                This order has been cancelled and will not be
                processed.
              </p>
            </div>
          </div>
        )}

        {/* =========================
            Order Progress
        ========================= */}
        {!isCancelled && (
          <div className="bg-[#101722] border border-white/10 rounded-2xl p-5 sm:p-7 lg:p-8 mb-8 shadow-xl shadow-black/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FaMapMarkedAlt className="text-red-500" />
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Order Status
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Your order is updated automatically.
                </p>
              </div>
            </div>

            {/* Desktop / Tablet Stepper */}
            <div className="hidden sm:block relative px-4 lg:px-8">
              {/* Background Line */}
              <div className="absolute top-6 left-10 right-10 h-1 bg-white/10 rounded-full" />

              {/* Progress Line */}
              <div
                className="absolute top-6 left-10 h-1 bg-red-500 rounded-full transition-all duration-700"
                style={{
                  width: `calc(${progressPercentage}% - ${
                    progressPercentage === 100 ? "0px" : "0px"
                  })`,
                  maxWidth: "calc(100% - 80px)",
                }}
              />

              <div className="relative flex justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const done =
                    currentStep >= 0 && index <= currentStep;
                  const active = index === currentStep;

                  return (
                    <div
                      key={step.key}
                      className="flex flex-col items-center text-center z-10"
                    >
                      <div
                        className={`
                          w-12 h-12 lg:w-14 lg:h-14
                          rounded-full
                          flex items-center justify-center
                          border transition-all duration-500
                          ${
                            done
                              ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20"
                              : "bg-[#151d2a] border-white/10 text-gray-600"
                          }
                          ${
                            active
                              ? "ring-4 ring-red-500/15 scale-110"
                              : ""
                          }
                        `}
                      >
                        <Icon className="text-lg lg:text-xl" />
                      </div>

                      <p
                        className={`
                          mt-3 text-xs sm:text-sm font-medium
                          max-w-[90px] lg:max-w-[120px]
                          ${
                            done
                              ? "text-white"
                              : "text-gray-600"
                          }
                        `}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Stepper */}
            <div className="sm:hidden space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const done =
                  currentStep >= 0 && index <= currentStep;
                const active = index === currentStep;

                return (
                  <div
                    key={step.key}
                    className="flex items-center gap-4"
                  >
                    <div
                      className={`
                        w-11 h-11 rounded-full
                        flex items-center justify-center
                        border flex-shrink-0
                        ${
                          done
                            ? "bg-red-500 border-red-500 text-white"
                            : "bg-[#151d2a] border-white/10 text-gray-600"
                        }
                        ${
                          active
                            ? "ring-4 ring-red-500/15"
                            : ""
                        }
                      `}
                    >
                      <Icon />
                    </div>

                    <div className="flex-1">
                      <p
                        className={`font-semibold text-sm ${
                          done
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      >
                        {step.label}
                      </p>

                      {active && (
                        <p className="text-xs text-red-400 mt-1">
                          Current status
                        </p>
                      )}
                    </div>

                    {done && (
                      <FaCheckCircle className="text-red-500 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* =========================
                Estimated Delivery
            ========================= */}
            {order.estimatedDelivery && !isDelivered && (
              <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-red-500 text-lg" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Estimated Delivery
                  </p>

                  <p className="text-red-400 font-bold text-lg mt-0.5">
                    {new Date(
                      order.estimatedDelivery
                    ).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            )}

            {/* =========================
                Delivered Message
            ========================= */}
            {isDelivered && (
              <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="text-green-500 text-xl" />
                </div>

                <div>
                  <p className="text-green-400 font-bold">
                    Order Delivered!
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Enjoy your meal 🎉
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================
            Main Information Grid
        ========================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* =========================
              Order Items
          ========================= */}
          <div className="bg-[#101722] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FaReceipt className="text-red-500" />
              </div>

              <div>
                <h3 className="font-bold">
                  Order Items
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {order.items.length} item
                  {order.items.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-white truncate">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>

                  <p className="font-bold text-red-400 text-sm whitespace-nowrap">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* =========================
                Price Summary
            ========================= */}
            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="text-gray-300">
                  ₹{order.subtotal}
                </span>
              </div>

              {order.discount > 0 && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">
                      Coupon ({order.couponCode})
                    </span>

                    <span className="text-green-400">
                      -₹{order.discount}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">
                      Discount Applied
                    </span>

                    <span className="text-green-500">
                      {order.couponCode}
                    </span>
                  </div>
                </>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Shipping
                </span>

                <span className="text-gray-300">
                  ₹{order.shippingFee}
                </span>
              </div>

              <div className="flex justify-between items-center pt-4 mt-2 border-t border-white/10">
                <span className="font-bold text-white">
                  Total Paid
                </span>

                <span className="text-xl font-bold text-red-500">
                  ₹{order.total}
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              Tracking History
          ========================= */}
          <div className="bg-[#101722] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FaMapMarkerAlt className="text-red-500" />
              </div>

              <div>
                <h3 className="font-bold">
                  Tracking History
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Latest order updates
                </p>
              </div>
            </div>

            {order.trackingHistory?.length > 0 ? (
              <div className="space-y-1">
                {[...order.trackingHistory]
                  .reverse()
                  .map((entry, index, array) => (
                    <div
                      key={index}
                      className="flex gap-4"
                    >
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`
                            w-3 h-3 rounded-full mt-1.5
                            flex-shrink-0
                            ${
                              index === 0
                                ? "bg-red-500 shadow-lg shadow-red-500/30"
                                : "bg-gray-700"
                            }
                          `}
                        />

                        {index < array.length - 1 && (
                          <div className="w-px flex-1 bg-white/10 mt-1" />
                        )}
                      </div>

                      <div className="pb-5 min-w-0">
                        <p
                          className={`text-sm font-medium ${
                            index === 0
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {entry.message}
                        </p>

                        <p className="text-xs text-gray-600 mt-1">
                          {new Date(
                            entry.timestamp
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <FaClock className="text-gray-700 text-3xl mx-auto" />

                <p className="text-gray-500 text-sm mt-3">
                  No tracking updates available yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* =========================
            Delivery Address
        ========================= */}
        <div className="bg-[#101722] border border-white/10 rounded-2xl p-5 sm:p-6 mt-6 shadow-xl shadow-black/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <FaMapMarkerAlt className="text-red-500" />
            </div>

            <div>
              <h3 className="font-bold">
                Delivery Address
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Address used for this order
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(order.shippingAddress || {}).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="bg-[#0b111b] border border-white/5 rounded-xl p-4"
                >
                  <p className="text-[11px] text-gray-600 uppercase tracking-wide">
                    {key}
                  </p>

                  <p className="font-medium text-gray-300 text-sm mt-1 break-words">
                    {String(value || "-")}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* =========================
            Action Buttons
        ========================= */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link
            to="/my-orders"
            className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-[#101722] text-gray-300 hover:text-white hover:border-red-500/30 transition text-sm font-semibold"
          >
            <FaArrowLeft />
            My Orders
          </Link>

          <Link
            to="/food"
            className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition text-sm font-semibold shadow-lg shadow-red-500/10"
          >
            <FaUtensils />
            Order More Food
          </Link>
        </div>

        {/* =========================
            Optional Admin/Test Status
            Keep hidden from normal user
        ========================= */}

        {/*
        {!isCancelled && !isDelivered && (
          <div className="mt-8 text-center">
            <button
              onClick={advanceStatus}
              disabled={advancing}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-red-500/30 transition text-sm"
            >
              {advancing
                ? "Updating..."
                : "Advance Status"}
            </button>
          </div>
        )}
        */}

        {/* =========================
            Optional Cancel Button
        ========================= */}

        {/*
        {!isCancelled &&
          !isDelivered &&
          ["pending", "confirmed"].includes(order.status) && (
            <div className="mt-6 text-center">
              <button
                onClick={cancelOrder}
                className="px-5 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition text-sm font-semibold"
              >
                Cancel Order
              </button>
            </div>
          )}
        */}
      </main>

      <Footer />
    </div>
  );
}