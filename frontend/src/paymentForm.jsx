// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "./cartSlice";
// import logo from "./assets/logo.png"
// import Footer from "./footer";
// import back from "./assets/p-3.jpg"
// import { HandThumbDownIcon } from "@heroicons/react/24/solid";
// export default function PaymentFormPage() {
//     const cartItems = useSelector((state) => state.carts.items || []);
//     // Line 9 - REPLACE WITH:
//     const total = Array.isArray(cartItems)
//         ? cartItems.reduce((sum, item) => sum + (item?.price * item?.quantity || 0), 0)
//         : 0;

//     const dispatch = useDispatch();

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         country: "",
//         city: "",
//         postalCode: ""
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const emptyField = Object.entries(form).find(([key, value]) => !value);
//         if (emptyField) {
//             alert(`Please fill out ${emptyField[0]}`);
//             return;
//         }

//         alert(`Payment Successful! Total: ₹${total + 30}`);
//         dispatch(clearCart());
//     };

//     return (
//         <div>
//             <section
//                 className="relative h-[200px] md:h-[260px] w-full bg-center bg-cover opacity-50"
//                 style={{ backgroundImage: `url(${back})` }}
//             >
//                 <div className="absolute inset-0 bg-black/40"></div>
//                 <div className="relative z-10 flex items-center h-full">
//                     <div className="max-w-7xl mx-auto px-6 text-left">
//                         <h1 className="text-4xl md:text-5xl font-bold text-white">Checkout</h1>
//                     </div>
//                 </div>
//             </section>
//             {/* Main Container */}
//             <div className="max-w-7xl mx-auto px-6 py-12 lg:flex lg:gap-12">

//                 {/* Left: Form */}
//                 <div className="lg:w-2/3 bg-white p-8">
//                     <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         {["name", "email", "phone", "country", "city", "postalCode"].map((field) => (
//                             <input
//                                 key={field}
//                                 type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
//                                 name={field}
//                                 placeholder={`Enter your ${field}`}
//                                 value={form[field]}
//                                 onChange={handleChange}
//                                 className="w-full border-b p-2 focus:outline-none focus:border-red-600 transition"
//                                 required
//                             />
//                         ))}
//                         <button
//                             type="submit"
//                             className="bg-red-600 text-white px-6 py-2 rounded mt-4 hover:bg-red-700 transition"
//                         >
//                             Payment
//                         </button>
//                     </form>
//                 </div>

//                 {/* Right: Total Card */}
//                 <div className="sm:w-70 h-40 sm:flex sm:justify-end mt-4 sm:mt-10 p-3">
//                     <div className="bg-red-100 p-5 shadow w-70 md:w-120">
//                         <p className="flex justify-between text-sm mb-0.5">
//                             <span>Subtotal:         </span> <span>                       ₹{total}</span>
//                         </p>
//                         <p className="flex justify-between text-sm mb-0.5">
//                             <span>Shipping:        </span> <span>                       ₹30</span>
//                         </p>
//                         <hr className="my-1 border-gray-300" />
//                         <p className="flex justify-between font-semibold text-sm mt-1">
//                             <span>Total:</span> <span>₹{total + 30}</span>
//                         </p>
//                     </div>


//                 </div>

//             </div>

//             <Footer />
//         </div>

//     );
// }


import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";
import Footer from "./footer";
import back from "./assets/p-3.jpg";
// import { useNavigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { getAddresses } from "./services/addressService";

import {
  UserIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const API_URL = "http://localhost:5000/api/orders";

export default function PaymentFormPage() {
  const cartItems = useSelector((state) => state.carts.items || []);
  const reduxToken = useSelector((state) => state.auth.token);
const token = reduxToken || localStorage.getItem("token");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  

const {
  couponCode = "",
  discount = 0,
  finalTotal = 0,
} = location.state || {};

  const [step, setStep] = useState(1);
  // const [paymentMethod, setPaymentMethod] = useState("COD");
  const [paymentMethod, setPaymentMethod] = useState("");

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (item?.price * item?.quantity || 0), 0) : 0;
 const shippingFee = 30;

// Total after coupon discount
const total =
  (finalTotal > 0 ? finalTotal : subtotal) + shippingFee;

  const user = useSelector((state) => state.auth.user);
const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  postalCode: "",
});

const [addresses, setAddresses] = useState([]);
const [selectedAddress, setSelectedAddress] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.user) {
        setForm((prev) => ({
          ...prev,
          name: data.user.fullName,
          email: data.user.email,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  if (token) {
    fetchUser();
  }
}, [token]);

useEffect(() => {
  const loadAddresses = async () => {
    try {
      const data = await getAddresses();

      setAddresses(data.addresses || []);

      const defaultAddress = data.addresses.find(
        (address) => address.isDefault
      );

      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    } catch (error) {
      console.error("Failed to load addresses:", error);
    }
  };

  if (token) {
    loadAddresses();
  }
}, [token]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
const isAddressValid = !!selectedAddress;
  const handleSubmit = async (e) => {
   if (e) e.preventDefault();
 // DEBUG - paste this temporarily
  const debugToken = localStorage.getItem("token");
  console.log("Redux token:", token);
  console.log("LocalStorage token:", debugToken);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("Authorization header will be:", `Bearer ${token}`);
    if (!isAuthenticated || !token) {
      alert("Please login first to place an order.");
      navigate("/login");
      return;
    }



    if (cartItems.length === 0) { alert("Your cart is empty!"); return; }

    setLoading(true);
    try {
      if (!Array.isArray(cartItems)) {
  console.error("cartItems is not an array:", cartItems);
  alert("Cart data is invalid. Please refresh the page.");
  return;
}

const orderItems = cartItems.map((item) => ({
  foodId: String(item._id || item.id),
  name: item.name,
  price: item.price,
  quantity: item.quantity,
  image: item.image || "",
}));

console.log("Sending order:", {
  items: orderItems,
  shippingAddress: selectedAddress,
  paymentMethod,
});
      const res = await fetch(API_URL, {
        
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        // body: JSON.stringify({ items: orderItems, shippingAddress: form }),
       body: JSON.stringify({
  items: orderItems,
shippingAddress: {
  name: selectedAddress.fullName,
  email: form.email,
  phone: selectedAddress.phone,
  country: selectedAddress.country || "India",
  city: selectedAddress.city,
  postalCode: selectedAddress.pincode,
},
  paymentMethod,
  couponCode,
  discount,
  finalTotal,
}),
      });

      const data = await res.json();
      if (data.success) {
        dispatch(clearCart());
        // navigate(`/track-order/${data.order._id}`);
        navigate(`/track-order/${data.orderId}`);
      } else {
        alert(data.message || "Order failed. Please try again.");
      }
    } catch (err) {
       console.error(err);
        alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log("cartItems =", cartItems);
console.log("Type =", typeof cartItems);
console.log("Is Array =", Array.isArray(cartItems));

const loadAddresses = async () => {
  try {
    const data = await getAddresses();

    setAddresses(data.addresses || []);

    const defaultAddress = data.addresses.find(
      (address) => address.isDefault
    );

    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  } catch (error) {
    console.error("Failed to load addresses:", error);
  }
};
useEffect(() => {
  const handleFocus = () => {
    if (token) {
      loadAddresses();
    }
  };

  window.addEventListener("focus", handleFocus);

  return () => window.removeEventListener("focus", handleFocus);
}, [token]);
  return (
    <div>
      <section className="relative h-[200px] md:h-[260px] w-full bg-center bg-cover opacity-50" style={{ backgroundImage: `url(${back})` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-6 text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Checkout</h1>
          </div>
        </div>
      </section>

<div className="max-w-4xl mx-auto px-6 mt-10 mb-12">
  <div className="flex items-center justify-between">

    {/* Step 1 */}
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold
        ${step >= 1
          ? "bg-red-600 text-white"
          : "bg-gray-200 text-gray-500"
        }`}
      >
        1
      </div>

      <span className="mt-2 text-sm font-medium">
        Address
      </span>
    </div>

    <div
      className={`flex-1 h-1 mx-2
      ${step >= 2 ? "bg-red-600" : "bg-gray-200"}`}
    />

    {/* Step 2 */}
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold
        ${step >= 2
          ? "bg-red-600 text-white"
          : "bg-gray-200 text-gray-500"
        }`}
      >
        2
      </div>

      <span className="mt-2 text-sm font-medium">
        Payment
      </span>
    </div>

    <div
      className={`flex-1 h-1 mx-2
      ${step >= 3 ? "bg-red-600" : "bg-gray-200"}`}
    />

    {/* Step 3 */}
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold
        ${step >= 3
          ? "bg-red-600 text-white"
          : "bg-gray-200 text-gray-500"
        }`}
      >
        3
      </div>

      <span className="mt-2 text-sm font-medium">
        Review
      </span>
    </div>
  </div>
</div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:flex lg:gap-12">
        
        <div className="lg:w-2/3">

  {/* STEP 1 ADDRESS */}
  {step === 1 && (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-8">
        Delivery Address
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

       <input
  type="text"
  name="name"
  value={form.name}
  readOnly
  className="border rounded-lg p-3 bg-gray-100"
/>

       <input
  type="email"
  name="email"
  value={form.email}
  readOnly
  className="border rounded-lg p-3 bg-gray-100"
/>

<div className="mt-6">

  <h3 className="text-xl font-semibold mb-4">
    Select Delivery Address
  </h3>

  <div className="space-y-4">

    {addresses.map((address) => (

      <div
        key={address._id}
        onClick={() => setSelectedAddress(address)}
       className={`relative border rounded-xl p-5 cursor-pointer transition-all duration-300

        ${
         selectedAddress?._id === address._id
  ? "border-red-600 bg-red-50 shadow-xl scale-[1.02]"
  : "border-gray-300 hover:border-red-300 hover:shadow-md"
        }
        `}
      >

     <div className="flex items-start justify-between">
  <div>
    <h3 className="font-bold text-lg">
      {address.type}
    </h3>
  </div>

  <div className="flex flex-col items-end gap-2">
    {address.isDefault && (
      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
        Default
      </span>
    )}

    {selectedAddress?._id === address._id && (
      <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        ✓ Selected
      </span>
    )}
  </div>
</div>

        <p>{address.fullName}</p>

        <p>{address.phone}</p>

        <p>{address.street}</p>

        <p>
          {address.city}, {address.state}
        </p>

        <p>{address.pincode}</p>

      </div>

    ))}

  </div>


<div className="mt-6">
 {/* Manage Address Button */}
<button
  type="button"
  onClick={() => navigate("/my-addresses")}
  className="w-full mt-6 border-2 border-dashed border-red-500 rounded-xl py-4 text-red-600 font-semibold hover:bg-red-50 transition"
>
  Manage Addresses
</button>

</div>

</div>


      </div>

      <button
  type="button"
  disabled={!isAddressValid}
  onClick={() => {
   if (!selectedAddress) {
  alert("Please select a delivery address.");
  return;
}


if (cartItems.length === 0) {
  alert("Your cart is empty.");
  return;
}
    setStep(2);
  }}
  className={`w-full mt-6 py-4 rounded-xl font-semibold transition ${
    isAddressValid
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  Continue To Payment →
</button>

    </div>
  )}

  {/* STEP 2 PAYMENT */}
  {step === 2 && (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-8">
        Select Payment Method
      </h2>

      <div className="space-y-4">

        <label className="flex items-center justify-between border rounded-xl p-5 cursor-pointer hover:border-red-500">

          <div>
            <h3 className="font-semibold">
              Cash On Delivery
            </h3>

            <p className="text-sm text-gray-500">
              Pay when your food arrives
            </p>
          </div>

          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
        </label>

        <label className="flex items-center justify-between border rounded-xl p-5 cursor-pointer hover:border-red-500">

          <div>
            <h3 className="font-semibold">
              UPI Payment
            </h3>

            <p className="text-sm text-gray-500">
              Google Pay / PhonePe / Paytm
            </p>
          </div>

          <input
            type="radio"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
          />
        </label>

      </div>

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => setStep(1)}
          className="w-1/2 border border-red-600 text-red-600 py-3 rounded-xl"
        >
          Back
        </button>

      <button
  disabled={!paymentMethod}
  onClick={() => setStep(3)}
  className={`w-1/2 py-3 rounded-xl
  ${
    paymentMethod
      ? "bg-red-600 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  Continue
</button>

      </div>

    </div>
  )}

  {/* STEP 3 REVIEW */}
  {step === 3 && (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-8">
        Review Order
      </h2>

    <div className="space-y-3 text-gray-700">

  <h3 className="text-lg font-semibold">
    Delivery Address
  </h3>

  <p>
    <strong>{selectedAddress.fullName}</strong>
  </p>

  <p>
    {selectedAddress.phone}
  </p>

  <p>
    {selectedAddress.street}
  </p>

  <p>
    {selectedAddress.city}, {selectedAddress.state}
  </p>

  <p>
    {selectedAddress.pincode}
  </p>

  {selectedAddress.landmark && (
    <p>
      Landmark: {selectedAddress.landmark}
    </p>
  )}

  <hr className="my-4" />

  <p>
    <strong>Email:</strong> {form.email}
  </p>

  <p>
    <strong>Payment:</strong> {paymentMethod}
  </p>

</div>

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => setStep(2)}
          className="w-1/2 border border-red-600 text-red-600 py-3 rounded-xl"
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-1/2 bg-red-600 text-white py-3 rounded-xl"
        >
          {loading
            ? "Placing Order..."
            : `Place Order ₹${total}`}
        </button>

      </div>

    </div>
  )}

</div>


        {/* Summary */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
        <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {Array.isArray(cartItems) &&
  cartItems.map((item) => (
    <div
      key={item._id || item.id}
      className="flex justify-between text-sm"
    >
      <span>
        {item.name} × {item.quantity}
      </span>

      <span>
        ₹{item.price * item.quantity}
      </span>
    </div>
  ))}
            </div>
            <div className="border-t border-red-200 pt-3 space-y-2">

  <div className="flex justify-between text-sm text-gray-600">
    <span>Subtotal</span>
    <span>₹{subtotal}</span>
  </div>

  <div className="flex justify-between text-sm text-gray-600">
    <span>Shipping</span>
    <span>₹{shippingFee}</span>
  </div>

  {discount > 0 && (
    <>
      <div className="flex justify-between text-sm text-green-600">
        <span>Coupon ({couponCode})</span>
        <span>-₹{discount}</span>
      </div>
    </>
  )}

  <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-red-200 mt-2">
    <span>Total</span>
    <span className="text-red-600">
      ₹{discount > 0 ? finalTotal + shippingFee : total}
    </span>
  </div>

</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
