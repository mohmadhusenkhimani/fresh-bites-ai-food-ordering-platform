// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { logout } from "./authSlice";
// import Image from "./image";
// import Footer from "./footer";

// const API = "http://localhost:5000/api/orders";

// export default function Profile() {
// const { currentUser, isAuthenticated } = useSelector((s) => s.auth);
// const reduxToken = useSelector((s) => s.auth.token);
// const token = reduxToken || localStorage.getItem("token");
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isAuthenticated) { navigate("/login"); return; }
//     fetch(`${API}/my`, { headers: { Authorization: `Bearer ${token}` } })
//       .then((r) => r.json())
//       .then((d) => { if (d.success) setOrders(d.orders); })
//       .finally(() => setLoading(false));
//   }, [isAuthenticated, token, navigate]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const stats = {
//     total: orders.length,
//     delivered: orders.filter((o) => o.status === "delivered").length,
//     pending: orders.filter((o) => ["pending", "confirmed", "preparing", "out_for_delivery"].includes(o.status)).length,
//     spent: orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0),
//   };

//   return (
//     <div>
//       <Image title="My Profile" />
//       <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">

//         {/* Profile Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
//           <div className="flex flex-wrap items-center gap-6">
//             <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
//               <i className="ri-user-fill text-4xl text-red-500"></i>
//             </div>
//             <div className="flex-1">
//               <h2 className="text-2xl font-bold text-gray-800">{currentUser?.fullName || "User"}</h2>
//               <p className="text-gray-500">{currentUser?.email}</p>
//               <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
//                 ✓ Verified Account
//               </span>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 border border-red-400 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition"
//             >
//               <i className="ri-logout-box-line"></i> Logout
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           {[
//             { label: "Total Orders", value: stats.total, icon: "ri-shopping-bag-line", color: "bg-blue-50 text-blue-600" },
//             { label: "Delivered", value: stats.delivered, icon: "ri-checkbox-circle-line", color: "bg-green-50 text-green-600" },
//             { label: "Active", value: stats.pending, icon: "ri-loader-4-line", color: "bg-orange-50 text-orange-600" },
//             { label: "Total Spent", value: `₹${stats.spent}`, icon: "ri-money-rupee-circle-line", color: "bg-red-50 text-red-600" },
//           ].map((s) => (
//             <div key={s.label} className={`${s.color} rounded-2xl p-5 text-center`}>
//               <i className={`${s.icon} text-3xl mb-2 block`}></i>
//               <p className="text-2xl font-bold">{s.value}</p>
//               <p className="text-xs font-medium mt-1 opacity-80">{s.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Quick Links */}
//         <div className="grid md:grid-cols-2 gap-4 mb-8">
//           <Link to="/my-orders" className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition group">
//             <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition">
//               <i className="ri-file-list-3-line text-red-500 text-xl"></i>
//             </div>
//             <div>
//               <p className="font-semibold text-gray-800">My Orders</p>
//               <p className="text-sm text-gray-500">View all your orders</p>
//             </div>
//             <i className="ri-arrow-right-s-line text-gray-400 ml-auto text-xl"></i>
//           </Link>

//           <Link to="/food" className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition group">
//             <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition">
//               <i className="ri-restaurant-line text-orange-500 text-xl"></i>
//             </div>
//             <div>
//               <p className="font-semibold text-gray-800">Order Food</p>
//               <p className="text-sm text-gray-500">Browse our menu</p>
//             </div>
//             <i className="ri-arrow-right-s-line text-gray-400 ml-auto text-xl"></i>
//           </Link>
//         </div>

//         {/* Recent Orders */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//           <div className="flex justify-between items-center mb-5">
//             <h3 className="font-semibold text-gray-800 text-lg">Recent Orders</h3>
//             <Link to="/my-orders" className="text-red-500 text-sm hover:underline">View all →</Link>
//           </div>
//           {loading ? (
//             <div className="flex justify-center py-8">
//               <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           ) : orders.length === 0 ? (
//             <p className="text-center text-gray-400 py-8">No orders yet. <Link to="/food" className="text-red-500">Order now!</Link></p>
//           ) : (
//             <div className="space-y-3">
//               {orders.slice(0, 3).map((order) => (
//                 <div key={order._id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
//                   <div>
//                     <p className="font-medium text-sm text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
//                     <p className="text-xs text-gray-500">{order.items.length} item(s) • {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-bold text-red-600 text-sm">₹{order.total}</p>
//                     <Link to={`/track-order/${order._id}`} className="text-xs text-blue-500 hover:underline">Track</Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//       <Footer />
//     </div>
//   );
// }



import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaUser,
  FaSignOutAlt,
  FaShoppingBag,
  FaCheckCircle,
  FaSpinner,
  FaRupeeSign,
  FaFileInvoice,
  FaUtensils,
  FaArrowRight,
  FaCalendarAlt,
  FaBoxOpen,
} from "react-icons/fa";

import { logout } from "./authSlice";
import Image from "./image";
import Footer from "./footer";

const API = "http://localhost:5000/api/orders";

export default function Profile() {
  // =========================
  // Redux Authentication
  // =========================
  const { currentUser, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const reduxToken = useSelector(
    (state) => state.auth.token
  );

  const token =
    reduxToken || localStorage.getItem("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================
  // State
  // =========================
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // Fetch Orders
  // =========================
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API}/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, token, navigate]);

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // =========================
  // Statistics
  // =========================
  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const activeOrders = orders.filter((order) =>
    [
      "pending",
      "confirmed",
      "preparing",
      "out_for_delivery",
    ].includes(order.status)
  ).length;

  const totalSpent = orders
    .filter((order) => order.status !== "cancelled")
    .reduce(
      (sum, order) =>
        sum + Number(order.total || 0),
      0
    );

  // =========================
  // Statistics Cards
  // =========================
  const statCards = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: FaShoppingBag,
    },
    {
      label: "Delivered",
      value: deliveredOrders,
      icon: FaCheckCircle,
    },
    {
      label: "Active Orders",
      value: activeOrders,
      icon: FaSpinner,
    },
    {
      label: "Total Spent",
      value: `₹${totalSpent}`,
      icon: FaRupeeSign,
    },
  ];

  return (
    <div className="min-h-screen bg-[#080d16] text-white">
      {/* =====================================
          PAGE BANNER
      ===================================== */}
      <Image title="My Profile" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* =====================================
            PROFILE CARD
        ===================================== */}
        <section className="relative bg-[#101722] border border-white/10 rounded-2xl p-5 sm:p-7 md:p-8 mb-8 overflow-hidden shadow-xl shadow-black/10">
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
              <FaUser className="text-red-500 text-3xl sm:text-4xl" />
            </div>

            {/* User Information */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-red-500 font-semibold uppercase tracking-[0.15em] mb-1">
                Welcome Back
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold truncate">
                {currentUser?.fullName || "User"}
              </h2>

              <p className="text-gray-500 text-sm mt-1 break-all">
                {currentUser?.email ||
                  "No email available"}
              </p>

              {/* Verified */}
              <span className="inline-flex items-center gap-2 mt-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-full font-medium">
                <FaCheckCircle />
                Verified Account
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-red-500/30 text-red-400 px-5 py-2.5 rounded-xl hover:bg-red-500/10 hover:border-red-500/50 transition font-semibold text-sm"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </section>

        {/* =====================================
            STATISTICS
        ===================================== */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="bg-[#101722] border border-white/10 rounded-2xl p-4 sm:p-5 text-center hover:border-red-500/30 transition"
              >
                {/* Icon */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center">
                  <Icon
                    className={`text-red-500 text-lg sm:text-xl ${
                      stat.label === "Active Orders"
                        ? "animate-spin"
                        : ""
                    }`}
                  />
                </div>

                {/* Number */}
                <p className="text-xl sm:text-2xl font-bold mt-3">
                  {stat.value}
                </p>

                {/* Label */}
                <p className="text-[10px] sm:text-xs font-medium text-gray-500 mt-1">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </section>

        {/* =====================================
            QUICK LINKS
        ===================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* My Orders */}
          <Link
            to="/my-orders"
            className="group bg-[#101722] border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-red-500/30 hover:bg-[#121b29] transition"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/15 transition">
              <FaFileInvoice className="text-red-500 text-xl" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-bold text-white">
                My Orders
              </p>

              <p className="text-sm text-gray-500 mt-1">
                View and track all your orders
              </p>
            </div>

            <FaArrowRight className="text-gray-600 group-hover:text-red-500 group-hover:translate-x-1 transition flex-shrink-0" />
          </Link>

          {/* Order Food */}
          <Link
            to="/food"
            className="group bg-[#101722] border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-red-500/30 hover:bg-[#121b29] transition"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/15 transition">
              <FaUtensils className="text-red-500 text-xl" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-bold text-white">
                Order Food
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Browse our delicious menu
              </p>
            </div>

            <FaArrowRight className="text-gray-600 group-hover:text-red-500 group-hover:translate-x-1 transition flex-shrink-0" />
          </Link>
        </section>

        {/* =====================================
            RECENT ORDERS
        ===================================== */}
        <section className="bg-[#101722] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center">
                <FaShoppingBag className="text-red-500" />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Recent Orders
                </h3>

                <p className="text-xs text-gray-500 mt-0.5">
                  Your latest food orders
                </p>
              </div>
            </div>

            <Link
              to="/my-orders"
              className="text-red-400 hover:text-red-300 text-sm font-medium transition"
            >
              View all →
            </Link>
          </div>

          {/* =====================================
              LOADING
          ===================================== */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-9 h-9 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />

              <p className="text-gray-600 text-sm mt-4">
                Loading your orders...
              </p>
            </div>
          ) : orders.length === 0 ? (
            /* =====================================
               NO ORDERS
            ===================================== */
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                <FaBoxOpen className="text-gray-600 text-2xl" />
              </div>

              <p className="text-gray-400 font-medium mt-4">
                No orders yet
              </p>

              <p className="text-gray-600 text-sm mt-1">
                Start exploring our menu and order
                your favorite food.
              </p>

              <Link
                to="/food"
                className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
              >
                <FaUtensils />
                Order Now
              </Link>
            </div>
          ) : (
            /* =====================================
               ORDERS
            ===================================== */
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order._id}
                  className="bg-[#0b111b] border border-white/5 rounded-xl p-4 hover:border-white/10 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Order Information */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center">
                          <FaShoppingBag className="text-red-500 text-xs" />
                        </div>

                        <p className="font-bold text-sm text-white">
                          #
                          {order._id
                            .slice(-8)
                            .toUpperCase()}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-600">
                        <span>
                          {order.items?.length || 0} item(s)
                        </span>

                        <span className="hidden sm:block">
                          •
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <FaCalendarAlt />

                          {new Date(
                            order.createdAt
                          ).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Price + Track */}
                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                      <p className="font-bold text-red-500 text-sm">
                        ₹{order.total}
                      </p>

                      <Link
                        to={`/track-order/${order._id}`}
                        className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-medium transition"
                      >
                        Track Order
                        <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* =====================================
          FOOTER
      ===================================== */}
      <Footer />
    </div>
  );
}