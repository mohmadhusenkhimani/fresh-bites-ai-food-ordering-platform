import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Image from "./image";
import Footer from "./footer";

const API = "http://localhost:5000/api/orders";

const steps = [
  { key: "pending",          icon: "ri-file-list-3-line",       label: "Order Placed"     },
  { key: "confirmed",        icon: "ri-checkbox-circle-line",   label: "Confirmed"        },
  { key: "preparing",        icon: "ri-restaurant-2-line",      label: "Preparing"        },
  { key: "out_for_delivery", icon: "ri-e-bike-line",            label: "Out for Delivery" },
  { key: "delivered",        icon: "ri-map-pin-2-line",         label: "Delivered"        },
];

const stepIndex = (status) => steps.findIndex((s) => s.key === status);

export default function TrackOrder() {
  const { id } = useParams();
  const { isAuthenticated } = useSelector((s) => s.auth);
const reduxToken = useSelector((s) => s.auth.token);
const token = reduxToken || localStorage.getItem("token");
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);

  const fetchOrder = useCallback(() => {
    fetch(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { if (d.success) setOrder(d.order); })
      .finally(() => setLoading(false));
  }, [id, token]);

  useEffect(() => {
    if (!isAuthenticated) { navigate("/login"); return; }
    fetchOrder();
    // Poll every 15 seconds for live updates
    const interval = setInterval(fetchOrder, 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated, navigate, fetchOrder]);

  const advanceStatus = async () => {
    setAdvancing(true);
    try {
      const res = await fetch(`${API}/${id}/status`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setOrder(data.order);
      else alert(data.message);
    } finally {
      setAdvancing(false);
    }
  };

  const cancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    const res = await fetch(`${API}/${id}/cancel`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setOrder(data.order);
    else alert(data.message);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!order) return (
    <div className="text-center py-20">
      <p className="text-2xl font-bold text-gray-600">Order not found</p>
      <Link to="/my-orders" className="text-red-500 mt-4 inline-block">← Back to My Orders</Link>
    </div>
  );

  const currentStep = stepIndex(order.status);
  const isCancelled = order.status === "cancelled";
  const isDelivered = order.status === "delivered";

  return (
    <div>
      <Image title="Track Order" />
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Order Header */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div>
            <Link to="/my-orders" className="text-red-500 text-sm hover:underline">← Back to My Orders</Link>
            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              Order <span className="text-red-500">#{order._id.slice(-8).toUpperCase()}</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Placed on {new Date(order.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-red-600">₹{order.total}</p>
            <p className="text-xs text-gray-500">Including ₹{order.shippingFee} shipping</p>
          </div>
        </div>

        {/* Stepper */}
        {!isCancelled && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-8">Order Status</h3>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 mx-10 rounded-full">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-700"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Steps */}
              <div className="relative flex justify-between">
                {steps.map((step, i) => {
                  const done = i <= currentStep;
                  const active = i === currentStep;
                  return (
                    <div key={step.key} className="flex flex-col items-center gap-3 z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500
                        ${done ? "bg-red-500 text-white shadow-lg shadow-red-200" : "bg-gray-100 text-gray-400"}
                        ${active ? "ring-4 ring-red-200 scale-110" : ""}`}>
                        <i className={step.icon}></i>
                      </div>
                      <p className={`text-xs font-medium text-center max-w-16 ${done ? "text-red-600" : "text-gray-400"}`}>
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ETA */}
            {order.estimatedDelivery && !isDelivered && (
              <div className="mt-8 bg-red-50 rounded-xl p-4 flex items-center gap-3">
                <i className="ri-time-line text-red-500 text-xl"></i>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Estimated Delivery</p>
                  <p className="text-red-600 font-bold">{new Date(order.estimatedDelivery).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>
            )}

            {isDelivered && (
              <div className="mt-8 bg-green-50 rounded-xl p-4 flex items-center gap-3">
                <i className="ri-checkbox-circle-fill text-green-500 text-2xl"></i>
                <p className="text-green-700 font-semibold">Order Delivered! Enjoy your meal 🎉</p>
              </div>
            )}
          </div>
        )}

        {isCancelled && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-center gap-4">
            <i className="ri-close-circle-fill text-red-500 text-4xl"></i>
            <div>
              <h3 className="text-lg font-bold text-red-700">Order Cancelled</h3>
              <p className="text-red-600 text-sm">This order has been cancelled.</p>
            </div>
          </div>
        )}

      {/* Cancel button for user */}
{/* {!isCancelled &&
  !isDelivered &&
  ["pending", "confirmed"].includes(order.status) && (
    <div className="mb-8">
      <button
        onClick={cancelOrder}
        className="border border-red-400 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition text-sm"
      >
        Cancel Order
      </button>
    </div>
)} */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">🍽️ Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-red-600 text-sm">₹{item.price * item.quantity}</p>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-200">

  <div className="flex justify-between text-sm text-gray-600">
    <span>Subtotal</span>
    <span>₹{order.subtotal}</span>
  </div>

  {order.discount > 0 && (
    <>
      <div className="flex justify-between text-sm text-green-600 mt-2">
        <span>
          Coupon ({order.couponCode})
        </span>
        <span>-₹{order.discount}</span>
      </div>

      <div className="flex justify-between text-xs text-green-500">
        <span>Discount Applied</span>
        <span>{order.couponCode}</span>
      </div>
    </>
  )}

  <div className="flex justify-between text-sm text-gray-600 mt-2">
    <span>Shipping</span>
    <span>₹{order.shippingFee}</span>
  </div>

  <div className="flex justify-between font-bold text-gray-800 mt-3 pt-3 border-t">
    <span>Total Paid</span>
    <span className="text-red-600">
      ₹{order.total}
    </span>
  </div>

</div>
            </div>
          </div>

          {/* Tracking History */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">📍 Tracking History</h3>
            <div className="space-y-4">
              {[...order.trackingHistory].reverse().map((entry, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${i === 0 ? "bg-red-500" : "bg-gray-300"}`}></div>
                    {i < order.trackingHistory.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1"></div>}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-gray-800">{entry.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(entry.timestamp).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <h3 className="font-semibold text-gray-800 mb-4">📦 Delivery Address</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {Object.entries(order.shippingAddress).map(([k, v]) => (
              <div key={k}>
                <p className="text-xs text-gray-400 capitalize">{k}</p>
                <p className="font-medium text-gray-700">{v}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
