import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "./authSlice";
import Image from "./image";
import Footer from "./footer";

const API = "http://localhost:5000/api/orders";

export default function Profile() {
const { currentUser, isAuthenticated } = useSelector((s) => s.auth);
const reduxToken = useSelector((s) => s.auth.token);
const token = reduxToken || localStorage.getItem("token");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { navigate("/login"); return; }
    fetch(`${API}/my`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { if (d.success) setOrders(d.orders); })
      .finally(() => setLoading(false));
  }, [isAuthenticated, token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const stats = {
    total: orders.length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    pending: orders.filter((o) => ["pending", "confirmed", "preparing", "out_for_delivery"].includes(o.status)).length,
    spent: orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0),
  };

  return (
    <div>
      <Image title="My Profile" />
      <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <i className="ri-user-fill text-4xl text-red-500"></i>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{currentUser?.fullName || "User"}</h2>
              <p className="text-gray-500">{currentUser?.email}</p>
              <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                ✓ Verified Account
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-red-400 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition"
            >
              <i className="ri-logout-box-line"></i> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: stats.total, icon: "ri-shopping-bag-line", color: "bg-blue-50 text-blue-600" },
            { label: "Delivered", value: stats.delivered, icon: "ri-checkbox-circle-line", color: "bg-green-50 text-green-600" },
            { label: "Active", value: stats.pending, icon: "ri-loader-4-line", color: "bg-orange-50 text-orange-600" },
            { label: "Total Spent", value: `₹${stats.spent}`, icon: "ri-money-rupee-circle-line", color: "bg-red-50 text-red-600" },
          ].map((s) => (
            <div key={s.label} className={`${s.color} rounded-2xl p-5 text-center`}>
              <i className={`${s.icon} text-3xl mb-2 block`}></i>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs font-medium mt-1 opacity-80">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link to="/my-orders" className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition group">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition">
              <i className="ri-file-list-3-line text-red-500 text-xl"></i>
            </div>
            <div>
              <p className="font-semibold text-gray-800">My Orders</p>
              <p className="text-sm text-gray-500">View all your orders</p>
            </div>
            <i className="ri-arrow-right-s-line text-gray-400 ml-auto text-xl"></i>
          </Link>

          <Link to="/food" className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition group">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition">
              <i className="ri-restaurant-line text-orange-500 text-xl"></i>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Order Food</p>
              <p className="text-sm text-gray-500">Browse our menu</p>
            </div>
            <i className="ri-arrow-right-s-line text-gray-400 ml-auto text-xl"></i>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-gray-800 text-lg">Recent Orders</h3>
            <Link to="/my-orders" className="text-red-500 text-sm hover:underline">View all →</Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No orders yet. <Link to="/food" className="text-red-500">Order now!</Link></p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div key={order._id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-sm text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-gray-500">{order.items.length} item(s) • {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600 text-sm">₹{order.total}</p>
                    <Link to={`/track-order/${order._id}`} className="text-xs text-blue-500 hover:underline">Track</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      <Footer />
    </div>
  );
}
