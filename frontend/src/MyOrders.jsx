// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import Image from "./image";
// import Footer from "./footer";
// import { useDispatch } from "react-redux";
// // import { increment } from "./cartSlice";
// import { addToCart } from "./cartSlice";

// const API = "http://localhost:5000/api/orders";

// const statusColors = {
//   pending: "bg-yellow-100 text-yellow-700",
//   confirmed: "bg-blue-100 text-blue-700",
//   preparing: "bg-orange-100 text-orange-700",
//   out_for_delivery: "bg-purple-100 text-purple-700",
//   delivered: "bg-green-100 text-green-700",
//   cancelled: "bg-red-100 text-red-700",
// };

// const statusLabels = {
//   pending: "Pending",
//   confirmed: "Confirmed",
//   preparing: "Preparing",
//   out_for_delivery: "Out for Delivery",
//   delivered: "Delivered",
//   cancelled: "Cancelled",
// };

// const MyOrders = () => {

//   const { isAuthenticated } = useSelector((s) => s.auth);
//   const reduxToken = useSelector((s)=> s.auth.token);
//   const token = reduxToken || localStorage.getItem("token");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // const { addToCart } = useCart();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => { 
//     if(!isAuthenticated) {
//       navigate("/login");
//       return;
//     }
//     fetch(`${API}/my`, {headers: { Authorization: `Bearer ${token}` } })
//       .then((r)=> r.json())
//       .then((d) => { if(d.success) setOrders(d.orders); })
//       .finally(() => setLoading(false));
//   },[isAuthenticated, token, navigate]);


//   const downloadInvoice = async (orderId) => {
//   try {
//     const response = await fetch(
//       `http://localhost:5000/api/orders/${orderId}/invoice`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to download invoice");
//     }

//     const blob = await response.blob();

//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");

//     link.href = url;

//     link.download = `Invoice-${orderId}.pdf`;

//     document.body.appendChild(link);

//     link.click();

//     link.remove();

//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error(error);
//     alert("Unable to download invoice.");
//   }
// };

// const handleBuyAgain = (order) => {
//   order.items.forEach((item) => {
//     dispatch(
//   addToCart({
//     id: item.foodId,
//     name: item.name,
//     price: item.price,
//     image: item.image,
//     quantity: item.quantity,
//   })
// );
//   });

//   navigate("/cart");
// };

//   return (
//     <div>
//       <Image title="My Orders" />

//       <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">
//         { loading ? (
//           <div className="flex justify-center items-center h-40">
//             <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : orders.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-6xl mb-4">You have no orders yet.</p>
//             <h2 className="text-gray-500 mb-6">Start ordering now!</h2>
//             <p className="text-gray-500 mb-6">Once you place an order, it will appear here.</p>
//             <Link to="/food" className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">
//               Order Now
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">My Orders ({orders.length}) </h2>
//             {orders.map((order) => (
//               <div key={order._id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-3 border-b">
//                   <div>
//                     <p className="text-xs text-gray-500">Order ID</p>
//                     <p className="font-mono text-sm font-semibold text-gray-700">#{order._id.slice(-8).toUpperCase()}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Date</p>
//                     <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString("en-IN",{day:"numeric",month: "short",year:"numeric"})}</p>
//                   </div>
//                  <div className="text-right">
//   <p className="text-xs text-gray-500">Total</p>

//   <p className="text-sm font-bold text-red-600">
//     ₹{order.total}
//   </p>

//   {order.discount > 0 && (
//     <>
//       <p className="text-xs text-green-600 font-semibold">
//         Coupon: {order.couponCode}
//       </p>

//       <p className="text-xs text-green-600">
//         Discount: -₹{order.discount}
//       </p>
//     </>
//   )}
// </div>
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
//                     {statusLabels[order.status]}
//                   </span>
//                   <div className="flex gap-2">
//   <Link
//     to={`/track-order/${order._id}`}
//     className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
//   >
//     Track Order
//   </Link>

//   <button
//     onClick={() => downloadInvoice(order._id)}
//     className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
//   >
//     Download Invoice
//   </button>

//   <button
//   onClick={() => handleBuyAgain(order)}
//   className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
// >
//   Buy Again
// </button>

// </div>
//                 </div>

//                 {/* Items */}
//                 <div className="px-6 py-4">
//                   <div className="flex flex-wrap gap-3">
//                     {order.items.map((item,i)=> (
//                       <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
//                         <span className="text-sm font-medium text-gray-700">{item.name}</span>
//                         <span className="text-xs text-gray-500">x {item.quantity}</span>
//                         <span className="text-xs font-semibold text-red-500">
//   ₹{item.price} × {item.quantity}
// </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default MyOrders

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import Image from "./image";
import Footer from "./footer";
import { addToCart } from "./cartSlice";

import {
  FaBoxOpen,
  FaTruck,
  FaFileInvoice,
  FaRedo,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaReceipt,
  FaShoppingBag,
} from "react-icons/fa";

const API = "http://localhost:5000/api/orders";

const statusColors = {
  pending:
    "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",

  confirmed:
    "bg-blue-500/10 text-blue-400 border border-blue-500/20",

  preparing:
    "bg-orange-500/10 text-orange-400 border border-orange-500/20",

  out_for_delivery:
    "bg-purple-500/10 text-purple-400 border border-purple-500/20",

  delivered:
    "bg-green-500/10 text-green-400 border border-green-500/20",

  cancelled:
    "bg-red-500/10 text-red-400 border border-red-500/20",
};

const statusLabels = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const MyOrders = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const reduxToken = useSelector((state) => state.auth.token);

  const token =
    reduxToken || localStorage.getItem("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, token, navigate]);

  // Download Invoice
  const downloadInvoice = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/invoice`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download invoice");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `Invoice-${orderId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Unable to download invoice.");
    }
  };

  // Buy Again
  const handleBuyAgain = (order) => {
    if (!order.items || order.items.length === 0) {
      return;
    }

    order.items.forEach((item) => {
      dispatch(
        addToCart({
          id: item.foodId,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })
      );
    });

    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-[#080d16] text-white">

      {/* Page Banner */}
      <Image title="My Orders" />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-h-screen">

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col justify-center items-center min-h-[400px]">

            <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />

            <p className="text-gray-400 mt-5 text-sm">
              Loading your orders...
            </p>

          </div>

        ) : orders.length === 0 ? (

          /* Empty Orders */
          <div className="flex justify-center items-center min-h-[500px]">

            <div className="text-center max-w-md">

              <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                <FaShoppingBag className="text-red-500 text-3xl" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                No Orders Yet
              </h2>

              <p className="text-gray-400 mb-2">
                You haven't placed any orders yet.
              </p>

              <p className="text-gray-500 text-sm mb-7">
                Start exploring our delicious food and place
                your first order.
              </p>

              <Link
                to="/food"
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-red-500/10"
              >
                <FaShoppingBag />
                Order Now
              </Link>

            </div>

          </div>

        ) : (

          /* Orders */
          <div>

            {/* Heading */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  My <span className="text-red-500">Orders</span>
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  View and manage your previous orders
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaBoxOpen className="text-red-500" />
                {orders.length}{" "}
                {orders.length === 1 ? "Order" : "Orders"}
              </div>

            </div>

            {/* Order List */}
            <div className="space-y-6">

              {orders.map((order) => (

                <div
                  key={order._id}
                  className="bg-[#101722] border border-white/10 rounded-2xl overflow-hidden shadow-xl"
                >

                  {/* Order Header */}
                  <div className="p-4 sm:p-6 border-b border-white/10">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                      {/* Order ID */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <FaReceipt className="text-red-500 text-xs" />

                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Order ID
                          </p>
                        </div>

                        <p className="font-mono text-sm font-semibold text-gray-200">
                          #
                          {order._id
                            .slice(-8)
                            .toUpperCase()}
                        </p>
                      </div>

                      {/* Date */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <FaCalendarAlt className="text-red-500 text-xs" />

                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Date
                          </p>
                        </div>

                        <p className="text-sm font-medium text-gray-300">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>

                      {/* Total */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <FaReceipt className="text-red-500 text-xs" />

                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Total
                          </p>
                        </div>

                        <p className="text-lg font-bold text-red-500">
                          ₹{order.total}
                        </p>

                        {order.discount > 0 && (
                          <div className="mt-1">

                            <p className="text-xs text-green-400 font-semibold">
                              Coupon:{" "}
                              {order.couponCode}
                            </p>

                            <p className="text-xs text-green-400">
                              Discount: -₹
                              {order.discount}
                            </p>

                          </div>
                        )}
                      </div>

                      {/* Status */}
                      <div className="sm:text-right">

                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                          Order Status
                        </p>

                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                            statusColors[
                              order.status
                            ] ||
                            "bg-gray-500/10 text-gray-400 border border-white/10"
                          }`}
                        >
                          {order.status ===
                            "out_for_delivery" && (
                            <FaTruck />
                          )}

                          {order.status ===
                            "delivered" && (
                            <FaBoxOpen />
                          )}

                          {statusLabels[
                            order.status
                          ] ||
                            order.status}
                        </span>

                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">

                      {/* Track Order */}
                      <Link
                        to={`/track-order/${order._id}`}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
                      >
                        <FaMapMarkerAlt />
                        Track Order
                      </Link>

                      {/* Invoice */}
                      <button
                        onClick={() =>
                          downloadInvoice(
                            order._id
                          )
                        }
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
                      >
                        <FaFileInvoice />
                        Download Invoice
                      </button>

                      {/* Buy Again */}
                      <button
                        onClick={() =>
                          handleBuyAgain(order)
                        }
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
                      >
                        <FaRedo />
                        Buy Again
                      </button>

                    </div>

                  </div>

                  {/* Items */}
                  <div className="p-4 sm:p-6">

                    <div className="flex items-center gap-2 mb-4">
                      <FaBoxOpen className="text-red-500" />

                      <h3 className="text-sm font-semibold text-gray-300">
                        Ordered Items
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                      {order.items?.map(
                        (item, index) => (

                          <div
                            key={index}
                            className="bg-[#0b111b] border border-white/5 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-3"
                          >

                            <div className="min-w-0">

                              <p className="text-sm font-semibold text-gray-200 truncate">
                                {item.name}
                              </p>

                              <p className="text-xs text-gray-500 mt-1">
                                Quantity:{" "}
                                {item.quantity}
                              </p>

                            </div>

                            <div className="text-right flex-shrink-0">

                              <p className="text-sm font-semibold text-red-500">
                                ₹
                                {item.price *
                                  item.quantity}
                              </p>

                              <p className="text-xs text-gray-500">
                                ₹{item.price} ×{" "}
                                {item.quantity}
                              </p>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default MyOrders;