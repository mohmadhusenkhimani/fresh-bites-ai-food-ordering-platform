import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Image from "./image";
import Footer from "./footer";
import { useDispatch } from "react-redux";
// import { increment } from "./cartSlice";
import { addToCart } from "./cartSlice";

const API = "http://localhost:5000/api/orders";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-orange-100 text-orange-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
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

  const { isAuthenticated } = useSelector((s) => s.auth);
  const reduxToken = useSelector((s)=> s.auth.token);
  const token = reduxToken || localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    if(!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetch(`${API}/my`, {headers: { Authorization: `Bearer ${token}` } })
      .then((r)=> r.json())
      .then((d) => { if(d.success) setOrders(d.orders); })
      .finally(() => setLoading(false));
  },[isAuthenticated, token, navigate]);


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

const handleBuyAgain = (order) => {
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
    <div>
      <Image title="My Orders" />

      <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">
        { loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">You have no orders yet.</p>
            <h2 className="text-gray-500 mb-6">Start ordering now!</h2>
            <p className="text-gray-500 mb-6">Once you place an order, it will appear here.</p>
            <Link to="/food" className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">
              Order Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">My Orders ({orders.length}) </h2>
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-3 border-b">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-mono text-sm font-semibold text-gray-700">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString("en-IN",{day:"numeric",month: "short",year:"numeric"})}</p>
                  </div>
                 <div className="text-right">
  <p className="text-xs text-gray-500">Total</p>

  <p className="text-sm font-bold text-red-600">
    ₹{order.total}
  </p>

  {order.discount > 0 && (
    <>
      <p className="text-xs text-green-600 font-semibold">
        Coupon: {order.couponCode}
      </p>

      <p className="text-xs text-green-600">
        Discount: -₹{order.discount}
      </p>
    </>
  )}
</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                  <div className="flex gap-2">
  <Link
    to={`/track-order/${order._id}`}
    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
  >
    Track Order
  </Link>

  <button
    onClick={() => downloadInvoice(order._id)}
    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
  >
    Download Invoice
  </button>

  <button
  onClick={() => handleBuyAgain(order)}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
>
  Buy Again
</button>

</div>
                </div>

                {/* Items */}
                <div className="px-6 py-4">
                  <div className="flex flex-wrap gap-3">
                    {order.items.map((item,i)=> (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        <span className="text-xs text-gray-500">x {item.quantity}</span>
                        <span className="text-xs font-semibold text-red-500">
  ₹{item.price} × {item.quantity}
</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
