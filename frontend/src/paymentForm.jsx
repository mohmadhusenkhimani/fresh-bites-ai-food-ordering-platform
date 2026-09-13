// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "./cartSlice";
// import Footer from "./footer";
// import back from "./assets/p-3.jpg";
// // import { useNavigate } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
// import { getAddresses } from "./services/addressService";

// import {
//   UserIcon,
//   PhoneIcon,
//   MapPinIcon,
// } from "@heroicons/react/24/outline";

// const API_URL = "http://localhost:5000/api/orders";

// export default function PaymentFormPage() {
//   const cartItems = useSelector((state) => state.carts.items || []);
//   const reduxToken = useSelector((state) => state.auth.token);
// const token = reduxToken || localStorage.getItem("token");
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const location = useLocation();
  

// const {
//   couponCode = "",
//   discount = 0,
//   finalTotal = 0,
// } = location.state || {};

//   const [step, setStep] = useState(1);
//   // const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [paymentMethod, setPaymentMethod] = useState("");

//   const subtotal = Array.isArray(cartItems)
//     ? cartItems.reduce((sum, item) => sum + (item?.price * item?.quantity || 0), 0) : 0;
//  const shippingFee = 30;

// // Total after coupon discount
// const total =
//   (finalTotal > 0 ? finalTotal : subtotal) + shippingFee;

//   const user = useSelector((state) => state.auth.user);
// const [form, setForm] = useState({
//   name: "",
//   email: "",
//   phone: "",
//   country: "",
//   city: "",
//   postalCode: "",
// });

// const [addresses, setAddresses] = useState([]);
// const [selectedAddress, setSelectedAddress] = useState(null);

// useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/auth/me",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       console.log(data);

//       if (data.user) {
//         setForm((prev) => ({
//           ...prev,
//           name: data.user.fullName,
//           email: data.user.email,
//         }));
//       }
//     } catch (error) {
//       console.error("Failed to fetch user:", error);
//     }
//   };

//   if (token) {
//     fetchUser();
//   }
// }, [token]);

// useEffect(() => {
//   const loadAddresses = async () => {
//     try {
//       const data = await getAddresses();

//       setAddresses(data.addresses || []);

//       const defaultAddress = data.addresses.find(
//         (address) => address.isDefault
//       );

//       if (defaultAddress) {
//         setSelectedAddress(defaultAddress);
//       }
//     } catch (error) {
//       console.error("Failed to load addresses:", error);
//     }
//   };

//   if (token) {
//     loadAddresses();
//   }
// }, [token]);

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
// const isAddressValid = !!selectedAddress;
//   const handleSubmit = async (e) => {
//    if (e) e.preventDefault();
//  // DEBUG - paste this temporarily
//   const debugToken = localStorage.getItem("token");
//   console.log("Redux token:", token);
//   console.log("LocalStorage token:", debugToken);
//   console.log("isAuthenticated:", isAuthenticated);
//   console.log("Authorization header will be:", `Bearer ${token}`);
//     if (!isAuthenticated || !token) {
//       alert("Please login first to place an order.");
//       navigate("/login");
//       return;
//     }



//     if (cartItems.length === 0) { alert("Your cart is empty!"); return; }

//     setLoading(true);
//     try {
//       if (!Array.isArray(cartItems)) {
//   console.error("cartItems is not an array:", cartItems);
//   alert("Cart data is invalid. Please refresh the page.");
//   return;
// }

// const orderItems = cartItems.map((item) => ({
//   foodId: String(item._id || item.id),
//   name: item.name,
//   price: item.price,
//   quantity: item.quantity,
//   image: item.image || "",
// }));

// console.log("Sending order:", {
//   items: orderItems,
//   shippingAddress: selectedAddress,
//   paymentMethod,
// });
//       const res = await fetch(API_URL, {
        
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         // body: JSON.stringify({ items: orderItems, shippingAddress: form }),
//        body: JSON.stringify({
//   items: orderItems,
// shippingAddress: {
//   name: selectedAddress.fullName,
//   email: form.email,
//   phone: selectedAddress.phone,
//   country: selectedAddress.country || "India",
//   city: selectedAddress.city,
//   postalCode: selectedAddress.pincode,
// },
//   paymentMethod,
//   couponCode,
//   discount,
//   finalTotal,
// }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         dispatch(clearCart());
//         // navigate(`/track-order/${data.order._id}`);
//         navigate(`/track-order/${data.orderId}`);
//       } else {
//         alert(data.message || "Order failed. Please try again.");
//       }
//     } catch (err) {
//        console.error(err);
//         alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log("cartItems =", cartItems);
// console.log("Type =", typeof cartItems);
// console.log("Is Array =", Array.isArray(cartItems));

// const loadAddresses = async () => {
//   try {
//     const data = await getAddresses();

//     setAddresses(data.addresses || []);

//     const defaultAddress = data.addresses.find(
//       (address) => address.isDefault
//     );

//     if (defaultAddress) {
//       setSelectedAddress(defaultAddress);
//     }
//   } catch (error) {
//     console.error("Failed to load addresses:", error);
//   }
// };
// useEffect(() => {
//   const handleFocus = () => {
//     if (token) {
//       loadAddresses();
//     }
//   };

//   window.addEventListener("focus", handleFocus);

//   return () => window.removeEventListener("focus", handleFocus);
// }, [token]);
//   return (
//     <div>
//       <section className="relative h-[200px] md:h-[260px] w-full bg-center bg-cover opacity-50" style={{ backgroundImage: `url(${back})` }}>
//         <div className="absolute inset-0 bg-black/40"></div>
//         <div className="relative z-10 flex items-center h-full">
//           <div className="max-w-7xl mx-auto px-6 text-left">
//             <h1 className="text-4xl md:text-5xl font-bold text-white">Checkout</h1>
//           </div>
//         </div>
//       </section>

// <div className="max-w-4xl mx-auto px-6 mt-10 mb-12">
//   <div className="flex items-center justify-between">

//     {/* Step 1 */}
//     <div className="flex flex-col items-center">
//       <div
//         className={`w-12 h-12 rounded-full flex items-center justify-center font-bold
//         ${step >= 1
//           ? "bg-red-600 text-white"
//           : "bg-gray-200 text-gray-500"
//         }`}
//       >
//         1
//       </div>

//       <span className="mt-2 text-sm font-medium">
//         Address
//       </span>
//     </div>

//     <div
//       className={`flex-1 h-1 mx-2
//       ${step >= 2 ? "bg-red-600" : "bg-gray-200"}`}
//     />

//     {/* Step 2 */}
//     <div className="flex flex-col items-center">
//       <div
//         className={`w-12 h-12 rounded-full flex items-center justify-center font-bold
//         ${step >= 2
//           ? "bg-red-600 text-white"
//           : "bg-gray-200 text-gray-500"
//         }`}
//       >
//         2
//       </div>

//       <span className="mt-2 text-sm font-medium">
//         Payment
//       </span>
//     </div>

//     <div
//       className={`flex-1 h-1 mx-2
//       ${step >= 3 ? "bg-red-600" : "bg-gray-200"}`}
//     />

//     {/* Step 3 */}
//     <div className="flex flex-col items-center">
//       <div
//         className={`w-12 h-12 rounded-full flex items-center justify-center font-bold
//         ${step >= 3
//           ? "bg-red-600 text-white"
//           : "bg-gray-200 text-gray-500"
//         }`}
//       >
//         3
//       </div>

//       <span className="mt-2 text-sm font-medium">
//         Review
//       </span>
//     </div>
//   </div>
// </div>

//       <div className="max-w-7xl mx-auto px-6 py-12 lg:flex lg:gap-12">
        
//         <div className="lg:w-2/3">

//   {/* STEP 1 ADDRESS */}
//   {step === 1 && (
//     <div className="bg-white rounded-2xl shadow-lg p-8">

//       <h2 className="text-3xl font-bold mb-8">
//         Delivery Address
//       </h2>

//       <div className="grid md:grid-cols-2 gap-5">

//        <input
//   type="text"
//   name="name"
//   value={form.name}
//   readOnly
//   className="border rounded-lg p-3 bg-gray-100"
// />

//        <input
//   type="email"
//   name="email"
//   value={form.email}
//   readOnly
//   className="border rounded-lg p-3 bg-gray-100"
// />

// <div className="mt-6">

//   <h3 className="text-xl font-semibold mb-4">
//     Select Delivery Address
//   </h3>

//   <div className="space-y-4">

//     {addresses.map((address) => (

//       <div
//         key={address._id}
//         onClick={() => setSelectedAddress(address)}
//        className={`relative border rounded-xl p-5 cursor-pointer transition-all duration-300

//         ${
//          selectedAddress?._id === address._id
//   ? "border-red-600 bg-red-50 shadow-xl scale-[1.02]"
//   : "border-gray-300 hover:border-red-300 hover:shadow-md"
//         }
//         `}
//       >

//      <div className="flex items-start justify-between">
//   <div>
//     <h3 className="font-bold text-lg">
//       {address.type}
//     </h3>
//   </div>

//   <div className="flex flex-col items-end gap-2">
//     {address.isDefault && (
//       <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
//         Default
//       </span>
//     )}

//     {selectedAddress?._id === address._id && (
//       <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
//         ✓ Selected
//       </span>
//     )}
//   </div>
// </div>

//         <p>{address.fullName}</p>

//         <p>{address.phone}</p>

//         <p>{address.street}</p>

//         <p>
//           {address.city}, {address.state}
//         </p>

//         <p>{address.pincode}</p>

//       </div>

//     ))}

//   </div>


// <div className="mt-6">
//  {/* Manage Address Button */}
// <button
//   type="button"
//   onClick={() => navigate("/my-addresses")}
//   className="w-full mt-6 border-2 border-dashed border-red-500 rounded-xl py-4 text-red-600 font-semibold hover:bg-red-50 transition"
// >
//   Manage Addresses
// </button>

// </div>

// </div>


//       </div>

//       <button
//   type="button"
//   disabled={!isAddressValid}
//   onClick={() => {
//    if (!selectedAddress) {
//   alert("Please select a delivery address.");
//   return;
// }


// if (cartItems.length === 0) {
//   alert("Your cart is empty.");
//   return;
// }
//     setStep(2);
//   }}
//   className={`w-full mt-6 py-4 rounded-xl font-semibold transition ${
//     isAddressValid
//       ? "bg-red-600 text-white hover:bg-red-700"
//       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//   }`}
// >
//   Continue To Payment →
// </button>

//     </div>
//   )}

//   {/* STEP 2 PAYMENT */}
//   {step === 2 && (
//     <div className="bg-white rounded-2xl shadow-lg p-8">

//       <h2 className="text-3xl font-bold mb-8">
//         Select Payment Method
//       </h2>

//       <div className="space-y-4">

//         <label className="flex items-center justify-between border rounded-xl p-5 cursor-pointer hover:border-red-500">

//           <div>
//             <h3 className="font-semibold">
//               Cash On Delivery
//             </h3>

//             <p className="text-sm text-gray-500">
//               Pay when your food arrives
//             </p>
//           </div>

//           <input
//             type="radio"
//             checked={paymentMethod === "COD"}
//             onChange={() => setPaymentMethod("COD")}
//           />
//         </label>

//         <label className="flex items-center justify-between border rounded-xl p-5 cursor-pointer hover:border-red-500">

//           <div>
//             <h3 className="font-semibold">
//               UPI Payment
//             </h3>

//             <p className="text-sm text-gray-500">
//               Google Pay / PhonePe / Paytm
//             </p>
//           </div>

//           <input
//             type="radio"
//             checked={paymentMethod === "UPI"}
//             onChange={() => setPaymentMethod("UPI")}
//           />
//         </label>

//       </div>

//       <div className="flex gap-4 mt-8">

//         <button
//           onClick={() => setStep(1)}
//           className="w-1/2 border border-red-600 text-red-600 py-3 rounded-xl"
//         >
//           Back
//         </button>

//       <button
//   disabled={!paymentMethod}
//   onClick={() => setStep(3)}
//   className={`w-1/2 py-3 rounded-xl
//   ${
//     paymentMethod
//       ? "bg-red-600 text-white"
//       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//   }`}
// >
//   Continue
// </button>

//       </div>

//     </div>
//   )}

//   {/* STEP 3 REVIEW */}
//   {step === 3 && (
//     <div className="bg-white rounded-2xl shadow-lg p-8">

//       <h2 className="text-3xl font-bold mb-8">
//         Review Order
//       </h2>

//     <div className="space-y-3 text-gray-700">

//   <h3 className="text-lg font-semibold">
//     Delivery Address
//   </h3>

//   <p>
//     <strong>{selectedAddress.fullName}</strong>
//   </p>

//   <p>
//     {selectedAddress.phone}
//   </p>

//   <p>
//     {selectedAddress.street}
//   </p>

//   <p>
//     {selectedAddress.city}, {selectedAddress.state}
//   </p>

//   <p>
//     {selectedAddress.pincode}
//   </p>

//   {selectedAddress.landmark && (
//     <p>
//       Landmark: {selectedAddress.landmark}
//     </p>
//   )}

//   <hr className="my-4" />

//   <p>
//     <strong>Email:</strong> {form.email}
//   </p>

//   <p>
//     <strong>Payment:</strong> {paymentMethod}
//   </p>

// </div>

//       <div className="flex gap-4 mt-8">

//         <button
//           onClick={() => setStep(2)}
//           className="w-1/2 border border-red-600 text-red-600 py-3 rounded-xl"
//         >
//           Back
//         </button>

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-1/2 bg-red-600 text-white py-3 rounded-xl"
//         >
//           {loading
//             ? "Placing Order..."
//             : `Place Order ₹${total}`}
//         </button>

//       </div>

//     </div>
//   )}

// </div>


//         {/* Summary */}
//         <div className="lg:w-1/3 mt-8 lg:mt-0">
//         <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
//             <h3 className="font-bold text-lg mb-4 text-gray-800">Order Summary</h3>
//             <div className="space-y-2 mb-4">
//               {Array.isArray(cartItems) &&
//   cartItems.map((item) => (
//     <div
//       key={item._id || item.id}
//       className="flex justify-between text-sm"
//     >
//       <span>
//         {item.name} × {item.quantity}
//       </span>

//       <span>
//         ₹{item.price * item.quantity}
//       </span>
//     </div>
//   ))}
//             </div>
//             <div className="border-t border-red-200 pt-3 space-y-2">

//   <div className="flex justify-between text-sm text-gray-600">
//     <span>Subtotal</span>
//     <span>₹{subtotal}</span>
//   </div>

//   <div className="flex justify-between text-sm text-gray-600">
//     <span>Shipping</span>
//     <span>₹{shippingFee}</span>
//   </div>

//   {discount > 0 && (
//     <>
//       <div className="flex justify-between text-sm text-green-600">
//         <span>Coupon ({couponCode})</span>
//         <span>-₹{discount}</span>
//       </div>
//     </>
//   )}

//   <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-red-200 mt-2">
//     <span>Total</span>
//     <span className="text-red-600">
//       ₹{discount > 0 ? finalTotal + shippingFee : total}
//     </span>
//   </div>

// </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";
import Footer from "./footer";
import back from "./assets/p-3.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { getAddresses } from "./services/addressService";

import {
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const API_URL = "http://localhost:5000/api/orders";

export default function PaymentFormPage() {
  const cartItems = useSelector(
    (state) => state.carts?.items || []
  );

  const reduxToken = useSelector(
    (state) => state.auth?.token
  );

  const token =
    reduxToken || localStorage.getItem("token");

  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    couponCode = "",
    discount = 0,
    finalTotal = 0,
  } = location.state || {};

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] =
    useState(null);

  /*
   * ================================
   * CART TOTALS
   * ================================
   */

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce(
        (sum, item) =>
          sum +
          (Number(item?.price) || 0) *
            (Number(item?.quantity) || 0),
        0
      )
    : 0;

  const shippingFee = 30;

  /*
   * finalTotal comes from Cart page
   * after coupon discount.
   *
   * If no coupon was applied,
   * use subtotal.
   */
  const discountedSubtotal =
    Number(finalTotal) > 0
      ? Number(finalTotal)
      : subtotal;

  const total =
    discountedSubtotal + shippingFee;

  /*
   * ================================
   * FETCH LOGGED-IN USER
   * ================================
   */

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

        if (data.user) {
          setForm((prev) => ({
            ...prev,
            name: data.user.fullName || "",
            email: data.user.email || "",
          }));
        }
      } catch (error) {
        console.error(
          "Failed to fetch user:",
          error
        );
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  /*
   * ================================
   * LOAD ADDRESSES
   * ================================
   */

  const loadAddresses = async () => {
    try {
      const data = await getAddresses();

      const userAddresses = data.addresses || [];

      setAddresses(userAddresses);

      const defaultAddress =
        userAddresses.find(
          (address) => address.isDefault
        );

      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (userAddresses.length > 0) {
        setSelectedAddress(userAddresses[0]);
      }
    } catch (error) {
      console.error(
        "Failed to load addresses:",
        error
      );
    }
  };

  useEffect(() => {
    if (token) {
      loadAddresses();
    }
  }, [token]);

  /*
   * Reload addresses when user
   * returns to this browser tab.
   */
  useEffect(() => {
    const handleFocus = () => {
      if (token) {
        loadAddresses();
      }
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, [token]);

  /*
   * ================================
   * HANDLE FORM
   * ================================
   */

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isAddressValid = !!selectedAddress;

  /*
   * ================================
   * PLACE ORDER
   * ================================
   */

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!isAuthenticated || !token) {
      alert(
        "Please login first to place an order."
      );
      navigate("/login");
      return;
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!selectedAddress) {
      alert("Please select a delivery address.");
      setStep(1);
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      setStep(2);
      return;
    }

    setLoading(true);

    try {
      /*
       * Convert Redux cart items
       * into order items.
       */
      const orderItems = cartItems.map((item) => ({
        foodId: String(
          item?._id || item?.id
        ),
        name: item?.name,
        price: item?.price,
        quantity: item?.quantity,
        image: item?.image || "",
      }));

      /*
       * Shipping address expected
       * by backend.
       */
      const shippingAddress = {
        name:
          selectedAddress.fullName ||
          form.name ||
          "",
        email: form.email || "",
        phone:
          selectedAddress.phone ||
          form.phone ||
          "",
        country:
          selectedAddress.country ||
          "India",
        city:
          selectedAddress.city || "",
        postalCode:
          selectedAddress.pincode || "",
        state:
          selectedAddress.state || "",
        street:
          selectedAddress.street || "",
        landmark:
          selectedAddress.landmark || "",
      };

      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: orderItems,
            shippingAddress,
            paymentMethod,
            couponCode,
            discount,
            finalTotal:
              Number(finalTotal) > 0
                ? Number(finalTotal)
                : subtotal,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        /*
         * Clear cart after successful order.
         */
        dispatch(clearCart());

        /*
         * Go to order tracking page.
         */
        navigate(
          `/track-order/${data.orderId}`
        );
      } else {
        alert(
          data.message ||
            "Order failed. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Order error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while placing the order."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ================================
   * EMPTY CART
   * ================================
   */

  if (
    !Array.isArray(cartItems) ||
    cartItems.length === 0
  ) {
    return (
      <div className="min-h-screen bg-[#080d16] text-white">

        {/* Banner */}
        <section
          className="relative h-[200px] md:h-[260px] w-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${back})`,
          }}
        >
          <div className="absolute inset-0 bg-[#080d16]/75" />

          <div className="relative z-10 flex items-center h-full">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
              <p className="text-red-400 uppercase tracking-[0.2em] text-sm font-semibold mb-2">
                Fresh Bites
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Checkout
              </h1>
            </div>
          </div>
        </section>

        <div className="min-h-[50vh] flex items-center justify-center px-4 py-16">

          <div className="w-full max-w-lg text-center bg-[#101722] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">

            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <ShoppingBagIcon className="w-10 h-10 text-red-500" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Your Cart is Empty
            </h2>

            <p className="text-gray-400 mb-8">
              Add some delicious food to your cart
              before checking out.
            </p>

            <button
              onClick={() =>
                navigate("/food")
              }
              className="bg-red-500 hover:bg-red-600 text-white px-7 py-3 rounded-xl font-semibold transition"
            >
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

      {/* ==================================================
          BANNER
      ================================================== */}

      <section
        className="relative h-[200px] md:h-[260px] w-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${back})`,
        }}
      >
        <div className="absolute inset-0 bg-[#080d16]/75" />

        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">

            <p className="text-red-400 uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-2">
              Fresh Bites
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Checkout
            </h1>

            <p className="text-gray-400 mt-2">
              Complete your order in a few simple steps.
            </p>

          </div>
        </div>
      </section>

      {/* ==================================================
          STEP INDICATOR
      ================================================== */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        <div className="flex items-start">

          {/* STEP 1 */}
          <div className="flex flex-col items-center shrink-0">

            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold border ${
                step >= 1
                  ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20"
                  : "bg-[#101722] border-white/10 text-gray-500"
              }`}
            >
              {step > 1 ? (
                <CheckCircleIcon className="w-6 h-6" />
              ) : (
                "1"
              )}
            </div>

            <span
              className={`mt-2 text-xs sm:text-sm font-medium ${
                step >= 1
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              Address
            </span>

          </div>

          {/* LINE */}
          <div
            className={`flex-1 h-1 mx-2 sm:mx-4 mt-5 sm:mt-6 rounded ${
              step >= 2
                ? "bg-red-500"
                : "bg-white/10"
            }`}
          />

          {/* STEP 2 */}
          <div className="flex flex-col items-center shrink-0">

            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold border ${
                step >= 2
                  ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20"
                  : "bg-[#101722] border-white/10 text-gray-500"
              }`}
            >
              {step > 2 ? (
                <CheckCircleIcon className="w-6 h-6" />
              ) : (
                "2"
              )}
            </div>

            <span
              className={`mt-2 text-xs sm:text-sm font-medium ${
                step >= 2
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              Payment
            </span>

          </div>

          {/* LINE */}
          <div
            className={`flex-1 h-1 mx-2 sm:mx-4 mt-5 sm:mt-6 rounded ${
              step >= 3
                ? "bg-red-500"
                : "bg-white/10"
            }`}
          />

          {/* STEP 3 */}
          <div className="flex flex-col items-center shrink-0">

            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold border ${
                step >= 3
                  ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20"
                  : "bg-[#101722] border-white/10 text-gray-500"
              }`}
            >
              3
            </div>

            <span
              className={`mt-2 text-xs sm:text-sm font-medium ${
                step >= 3
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              Review
            </span>

          </div>

        </div>
      </div>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-10">

          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <div>

            {/* ==================================================
                STEP 1 - ADDRESS
            ================================================== */}

            {step === 1 && (
              <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-xl p-5 sm:p-7 lg:p-8">

                <div className="mb-7">

                  <div className="flex items-center gap-3 mb-2">

                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <MapPinIcon className="w-5 h-5 text-red-500" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Delivery Address
                    </h2>

                  </div>

                  <p className="text-gray-500 text-sm">
                    Select where you want your order
                    delivered.
                  </p>

                </div>

                {/* USER INFO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Full Name
                    </label>

                    <div className="relative">

                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />

                      <input
                        type="text"
                        value={form.name}
                        readOnly
                        className="w-full bg-[#080d16] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-gray-400 outline-none"
                      />

                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Email
                    </label>

                    <div className="relative">

                      <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />

                      <input
                        type="email"
                        value={form.email}
                        readOnly
                        className="w-full bg-[#080d16] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-gray-400 outline-none"
                      />

                    </div>
                  </div>

                </div>

                {/* SAVED ADDRESSES */}
                <div>

                  <div className="flex items-center justify-between gap-3 mb-4">

                    <h3 className="text-lg sm:text-xl font-semibold">
                      Select Delivery Address
                    </h3>

                    <span className="text-xs sm:text-sm text-gray-500">
                      {addresses.length} saved
                    </span>

                  </div>

                  {addresses.length === 0 ? (

                    <div className="text-center py-8 bg-[#080d16] border border-dashed border-white/10 rounded-xl">

                      <MapPinIcon className="w-10 h-10 mx-auto text-gray-600 mb-3" />

                      <p className="text-gray-400">
                        No saved addresses found.
                      </p>

                    </div>

                  ) : (

                    <div className="space-y-4">

                      {addresses.map((address) => {

                        const selected =
                          selectedAddress?._id ===
                          address?._id;

                        return (
                          <div
                            key={address._id}
                            onClick={() =>
                              setSelectedAddress(
                                address
                              )
                            }
                            className={`relative p-4 sm:p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                              selected
                                ? "border-red-500 bg-red-500/5 shadow-lg shadow-red-500/5"
                                : "border-white/10 bg-[#080d16] hover:border-red-500/30"
                            }`}
                          >

                            {/* Selected indicator */}
                            <div
                              className={`absolute top-4 right-4 w-5 h-5 rounded-full border flex items-center justify-center ${
                                selected
                                  ? "border-red-500 bg-red-500"
                                  : "border-white/20"
                              }`}
                            >
                              {selected && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>

                            {/* Address Header */}
                            <div className="flex items-center gap-3 pr-8 mb-3">

                              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                                <MapPinIcon className="w-5 h-5 text-red-500" />
                              </div>

                              <div>
                                <h4 className="font-bold text-white">
                                  {address.type ||
                                    "Address"}
                                </h4>

                                <div className="flex flex-wrap gap-2 mt-1">

                                  {address.isDefault && (
                                    <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                                      Default
                                    </span>
                                  )}

                                  {selected && (
                                    <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                      Selected
                                    </span>
                                  )}

                                </div>
                              </div>

                            </div>

                            {/* Address Details */}
                            <div className="space-y-1 text-sm">

                              <p className="font-semibold text-white">
                                {address.fullName}
                              </p>

                              <p className="text-gray-400 flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4 text-gray-600" />
                                {address.phone}
                              </p>

                              <p className="text-gray-400">
                                {address.street}
                              </p>

                              <p className="text-gray-400">
                                {address.city},{" "}
                                {address.state}
                              </p>

                              <p className="text-gray-400">
                                {address.pincode}
                              </p>

                              {address.landmark && (
                                <p className="text-gray-500">
                                  Landmark:{" "}
                                  {address.landmark}
                                </p>
                              )}

                            </div>

                          </div>
                        );
                      })}

                    </div>
                  )}

                  {/* Manage Address */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/my-addresses")
                    }
                    className="w-full mt-5 border border-dashed border-red-500/50 rounded-xl py-3.5 text-red-400 font-semibold hover:bg-red-500/10 hover:border-red-500 transition"
                  >
                    + Manage Addresses
                  </button>

                </div>

                {/* Continue */}
                <button
                  type="button"
                  disabled={!isAddressValid}
                  onClick={() => {
                    if (!selectedAddress) {
                      alert(
                        "Please select a delivery address."
                      );
                      return;
                    }

                    if (cartItems.length === 0) {
                      alert(
                        "Your cart is empty."
                      );
                      return;
                    }

                    setStep(2);
                  }}
                  className={`w-full mt-7 py-3.5 rounded-xl font-semibold transition flex items-center justify-center ${
                    isAddressValid
                      ? "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/10"
                      : "bg-white/10 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Continue to Payment
                  <span className="ml-2">
                    →
                  </span>
                </button>

              </div>
            )}

            {/* ==================================================
                STEP 2 - PAYMENT
            ================================================== */}

            {step === 2 && (
              <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-xl p-5 sm:p-7 lg:p-8">

                <div className="mb-7">

                  <div className="flex items-center gap-3 mb-2">

                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <CreditCardIcon className="w-5 h-5 text-red-500" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Select Payment Method
                    </h2>

                  </div>

                  <p className="text-gray-500 text-sm">
                    Choose your preferred way to pay.
                  </p>

                </div>

                <div className="space-y-4">

                  {/* COD */}
                  <label
                    className={`flex items-center justify-between gap-4 p-5 rounded-2xl cursor-pointer border transition ${
                      paymentMethod === "COD"
                        ? "border-red-500 bg-red-500/5"
                        : "border-white/10 bg-[#080d16] hover:border-red-500/30"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                        <span className="text-green-400 font-bold text-sm">
                          COD
                        </span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          Cash On Delivery
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Pay when your food arrives
                        </p>
                      </div>

                    </div>

                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={
                        paymentMethod === "COD"
                      }
                      onChange={() =>
                        setPaymentMethod("COD")
                      }
                      className="w-5 h-5 accent-red-500"
                    />

                  </label>

                  {/* UPI */}
                  <label
                    className={`flex items-center justify-between gap-4 p-5 rounded-2xl cursor-pointer border transition ${
                      paymentMethod === "UPI"
                        ? "border-red-500 bg-red-500/5"
                        : "border-white/10 bg-[#080d16] hover:border-red-500/30"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                        <span className="text-blue-400 font-bold text-sm">
                          UPI
                        </span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          UPI Payment
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Google Pay / PhonePe / Paytm
                        </p>
                      </div>

                    </div>

                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={
                        paymentMethod === "UPI"
                      }
                      onChange={() =>
                        setPaymentMethod("UPI")
                      }
                      className="w-5 h-5 accent-red-500"
                    />

                  </label>

                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-red-500 text-red-400 hover:bg-red-500/10 py-3.5 rounded-xl font-semibold transition"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    disabled={!paymentMethod}
                    onClick={() => {
                      if (!paymentMethod) {
                        alert(
                          "Please select a payment method."
                        );
                        return;
                      }

                      setStep(3);
                    }}
                    className={`py-3.5 rounded-xl font-semibold transition ${
                      paymentMethod
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-white/10 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>

                </div>

              </div>
            )}

            {/* ==================================================
                STEP 3 - REVIEW
            ================================================== */}

            {step === 3 &&
              selectedAddress && (
                <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-xl p-5 sm:p-7 lg:p-8">

                  <div className="mb-7">

                    <div className="flex items-center gap-3 mb-2">

                      <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <CheckCircleIcon className="w-5 h-5 text-red-500" />
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold">
                        Review Order
                      </h2>

                    </div>

                    <p className="text-gray-500 text-sm">
                      Check your order details before
                      placing the order.
                    </p>

                  </div>

                  {/* DELIVERY ADDRESS */}
                  <div className="bg-[#080d16] border border-white/10 rounded-2xl p-5">

                    <div className="flex items-center gap-3 mb-4">

                      <MapPinIcon className="w-5 h-5 text-red-500" />

                      <h3 className="text-lg font-semibold">
                        Delivery Address
                      </h3>

                    </div>

                    <div className="space-y-1 text-sm">

                      <p className="font-bold text-white">
                        {selectedAddress.fullName}
                      </p>

                      <p className="text-gray-400">
                        {selectedAddress.phone}
                      </p>

                      <p className="text-gray-400">
                        {selectedAddress.street}
                      </p>

                      <p className="text-gray-400">
                        {selectedAddress.city},{" "}
                        {selectedAddress.state}
                      </p>

                      <p className="text-gray-400">
                        {selectedAddress.pincode}
                      </p>

                      {selectedAddress.landmark && (
                        <p className="text-gray-500">
                          Landmark:{" "}
                          {selectedAddress.landmark}
                        </p>
                      )}

                    </div>

                  </div>

                  {/* CUSTOMER + PAYMENT */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

                    <div className="bg-[#080d16] border border-white/10 rounded-2xl p-5">

                      <p className="text-gray-500 text-sm mb-2">
                        Email
                      </p>

                      <p className="text-white font-medium break-words">
                        {form.email}
                      </p>

                    </div>

                    <div className="bg-[#080d16] border border-white/10 rounded-2xl p-5">

                      <p className="text-gray-500 text-sm mb-2">
                        Payment Method
                      </p>

                      <p className="text-white font-semibold">
                        {paymentMethod === "COD"
                          ? "Cash On Delivery"
                          : "UPI Payment"}
                      </p>

                    </div>

                  </div>

                  {/* BUTTONS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="border border-red-500 text-red-400 hover:bg-red-500/10 py-3.5 rounded-xl font-semibold transition"
                    >
                      ← Back
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition shadow-lg shadow-red-500/10"
                    >
                      {loading
                        ? "Placing Order..."
                        : `Place Order ₹${total}`}
                    </button>

                  </div>

                </div>
              )}

          </div>

          {/* ==================================================
              ORDER SUMMARY
          ================================================== */}

          <aside className="lg:mt-0">

            <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-xl p-5 sm:p-6 lg:sticky lg:top-24">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <ShoppingBagIcon className="w-5 h-5 text-red-500" />
                </div>

                <h3 className="text-xl font-bold">
                  Order Summary
                </h3>

              </div>

              {/* CART ITEMS */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">

                {cartItems.map((item) => (

                  <div
                    key={
                      item?._id || item?.id
                    }
                    className="flex items-center gap-3"
                  >

                    <div className="w-14 h-14 rounded-xl bg-[#080d16] border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">

                      <img
                        src={
                          item?.image ||
                          "https://via.placeholder.com/100"
                        }
                        alt={item?.name}
                        className="w-full h-full object-contain p-1"
                      />

                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="text-sm font-medium text-white truncate">
                        {item?.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        ₹{item?.price} ×{" "}
                        {item?.quantity}
                      </p>

                    </div>

                    <span className="text-sm font-semibold text-white">
                      ₹
                      {(
                        Number(item?.price) *
                        Number(item?.quantity)
                      ).toFixed(0)}
                    </span>

                  </div>

                ))}

              </div>

              {/* TOTALS */}
              <div className="border-t border-white/10 mt-5 pt-5 space-y-3">

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="text-white">
                    ₹{subtotal}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="text-white">
                    ₹{shippingFee}
                  </span>

                </div>

                {Number(discount) > 0 && (
                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Coupon
                      {couponCode && (
                        <span className="text-red-400 ml-1">
                          ({couponCode})
                        </span>
                      )}
                    </span>

                    <span className="text-green-400">
                      -₹{discount}
                    </span>

                  </div>
                )}

                <div className="border-t border-white/10 pt-4 mt-3">

                  <div className="flex justify-between items-center">

                    <span className="text-lg font-bold">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-red-500">
                      ₹{total}
                    </span>

                  </div>

                </div>

              </div>

              {/* SECURE CHECKOUT */}
              <div className="mt-5 p-3 rounded-xl bg-green-500/5 border border-green-500/10">

                <p className="text-xs text-green-400 text-center">
                  ✓ Secure checkout • Your order is
                  protected
                </p>

              </div>

            </div>

          </aside>

        </div>

      </main>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <Footer />

    </div>
  );
}