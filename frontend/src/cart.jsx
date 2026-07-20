import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, removeFromCart } from "./cartSlice";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Cartss from "./assets/p-6.jpg";
import PaymentForm from "./paymentForm";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import Image from "./image";
import axios from "axios";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.carts?.items || []);
  const [showPayment, setshowPayment] = useState(false);
const navigate = useNavigate();
  // const INC = (id) => dispatch(increment(id));
  //  const DEC = (id) => dispatch(decrement(id));

const total = Array.isArray(cartItems) 
  ? cartItems.reduce((sum, item) => sum + (item?.price * item?.quantity || 0), 0)
  : 0;


  const handleClosePayment = () => setshowPayment(false);

  const [couponCode, setCouponCode] = useState("");
const [discount, setDiscount] = useState(0);
const [finalTotal, setFinalTotal] = useState(total);
const [couponMessage, setCouponMessage] = useState("");

const handleApplyCoupon = async () => {
  if (!couponCode.trim()) {
    alert("Please enter a coupon code.");
    return;
  }

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/coupons/apply",
      {
        code: couponCode,
        cartTotal: total,
      }
    );

    setDiscount(data.discount);
    setFinalTotal(data.finalTotal);
    setCouponMessage(data.message);

  } catch (error) {
    setDiscount(0);
    setFinalTotal(total);

    setCouponMessage(
      error.response?.data?.message || "Failed to apply coupon."
    );
  }
};

  return (
    <>
      {/* 🔥 BANNER */}

      <Image title="Your Cart" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {cartItems.length === 0 ? (
          <p className="text-center text-lg font-semibold">
            Your cart is empty 😢
          </p>
        ) : (
          
          <>
            <div className="overflow-x-auto">
              <table className="w-full border border-white">
                <thead className="bg-white-100">
                  <tr> 
                    <th className="p-4 border">Image</th>
                    <th className="p-4 border">Product Title</th>
                    <th className="p-4 border">Price</th>
                    <th className="p-4 border">Quantity</th>
                    <th className="p-4 border text-center">Delete</th>
                  </tr>
                </thead>

               <tbody>
  {Array.isArray(cartItems) &&
    cartItems.map((item) => {
      const itemId = item._id || item.id;

      return (
        <tr key={itemId} className="border-t text-center">

          <td className="p-4 border">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-contain mx-auto"
            />
          </td>

          <td className="p-4 border font-medium">
            {item.name}
          </td>

          <td className="p-4 border font-semibold">
            ₹{item.price * item.quantity}
          </td>

          <td className="p-4 border">
            <div className="flex items-center justify-center gap-3">

              <button
                onClick={() => dispatch(decrement(itemId))}
                className="w-8 h-8 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
              >
                −
              </button>

              <span className="font-semibold">
                {item.quantity}
              </span>

              <button
               onClick={() => {
  console.log("Increment ID:", item._id || item.id);
  dispatch(increment(item._id || item.id));
}}
                className="w-8 h-8 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white"
              >
                +
              </button>

            </div>
          </td>

          <td className="p-4 border">
            <button
              onClick={() => dispatch(removeFromCart(itemId))}
              className="text-red-500 hover:text-red-700 text-lg"
            >
              <FaTrash />
            </button>
          </td>

        </tr>
      );
    })}
</tbody>
              </table>
            </div>

            <div className="bg-gray-100 rounded-lg p-5 mt-8 mb-6">
  <h3 className="text-lg font-semibold mb-3">
    Have a Coupon?
  </h3>

  <div className="flex gap-3">
    <input
      type="text"
      placeholder="Enter Coupon Code"
      value={couponCode}
      onChange={(e) => setCouponCode(e.target.value)}
      className="flex-1 border rounded-lg px-4 py-2 outline-none focus:border-red-500"
    />

    <button
      onClick={handleApplyCoupon}
      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Apply
    </button>
  </div>

  {couponMessage && (
    <p className="mt-3 text-green-600 font-medium">
      {couponMessage}
    </p>
  )}
</div>

            <div className="mt-10">
             <div className="space-y-3">

  <div className="flex justify-between text-lg">
    <span>Subtotal</span>
    <span className="font-semibold">
      ₹{total}
    </span>
  </div>

  <div className="flex justify-between text-lg">
    <span>Discount</span>
    <span className="text-green-600 font-semibold">
      -₹{discount}
    </span>
  </div>

  <hr />

  <div className="flex justify-between text-2xl font-bold">
    <span>Total</span>
    <span className="text-red-500">
      ₹{finalTotal}
    </span>
  </div>

</div>

              <p className="text-gray-600 mt-1">
                Taxes and shipping will calculate at checkout
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <button className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition" onClick={() => navigate("/food")}>
                  Continue Shopping
                </button>

                <button
  onClick={() =>
    navigate("/paymentForm", {
      state: {
        couponCode,
        discount,
        finalTotal,
      },
    })
  }
  className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
>
  Proceed to Checkout
</button>
              </div>
            </div>

            {showPayment && (
              <PaymentForm onPaymentClose={handleClosePayment} />
              
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;
