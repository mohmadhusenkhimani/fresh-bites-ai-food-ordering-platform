// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import Sidebar from "../components/Sidebar";

// // const Orders = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const ordersPerPage = 10;

// //   useEffect(() => {
// //     fetchOrders();
// //   }, []);

// //   const fetchOrders = async () => {
// //     try {
// //       const response = await axios.get(
// //         "http://localhost:5000/api/orders"
// //       );

// //       setOrders(response.data.orders);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const updateStatus = async (id, status) => {
// //     try {
// //       await axios.put(
// //         `http://localhost:5000/api/orders/${id}/status`,
// //         { status }
// //       );

// //       fetchOrders();
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   // Search Filter
// //   const filteredOrders = orders.filter((order) =>
// //     order.shippingAddress?.name
// //       ?.toLowerCase()
// //       .includes(search.toLowerCase())
// //   );

// //   // Pagination
// //   const indexOfLastOrder = currentPage * ordersPerPage;
// //   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

// //   const currentOrders = filteredOrders.slice(
// //     indexOfFirstOrder,
// //     indexOfLastOrder
// //   );

// //   const totalPages = Math.ceil(
// //     filteredOrders.length / ordersPerPage
// //   );

// //   return (
// //     <div className="flex">
// //       <Sidebar />

// //       <div className="flex-1 bg-orange-50 min-h-screen p-6">
// //        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
// //   Orders Management
// // </h1>

// //         {/* Search */}
// //         <div className="mb-4">
// //           <input
// //             type="text"
// //             placeholder="Search Customer..."
// //             value={search}
// //             onChange={(e) => {
// //               setSearch(e.target.value);
// //               setCurrentPage(1);
// //             }}
// //            className="w-full p-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
// //           />
// //         </div>

// //         {/* Orders Table */}
// //         <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
// //           <table className="w-full">
// //            <thead className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
// //               <tr>
// //                 <th className="p-3 text-left">
// //                   Customer
// //                 </th>

// //                 <th className="p-3 text-left">
// //                   Email
// //                 </th>

// //                 <th className="p-3 text-left">
// //                   Total
// //                 </th>

// //                 <th className="p-3 text-left">
// //                   Status
// //                 </th>

// //                 <th className="p-3 text-left">
// //                   Date
// //                 </th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {currentOrders.length > 0 ? (
// //                 currentOrders.map((order) => (
// //                   <tr
// //                     key={order._id}
// //                     className="border-b hover:bg-orange-50 transition"
// //                   >
// //                     <td className="p-3">
// //                       {order.shippingAddress?.name}
// //                     </td>

// //                     <td className="p-3">
// //                       {order.shippingAddress?.email}
// //                     </td>

// //                     <td className="p-3">
// //                       ₹{order.total}
// //                     </td>

// //                   <td className="p-3">
// //   <div className="flex items-center gap-2">
// //    <select
// //   value={order.status}
// //   onChange={(e) =>
// //     updateStatus(order._id, e.target.value)
// //   }
// //   className="border rounded px-2 py-1"
// //   disabled={
// //     order.status === "delivered" ||
// //     order.status === "cancelled"
// //   }
// // >
// //   <option value="pending">Pending</option>
// //   <option value="confirmed">Confirmed</option>
// //   <option value="preparing">Preparing</option>
// //   <option value="out_for_delivery">
// //     Out For Delivery
// //   </option>
// //   <option value="delivered">Delivered</option>

// //   {/* Only for display after cancellation */}
// //   <option value="cancelled">Cancelled</option>
// // </select>

// //     {order.status !== "delivered" &&
// //  order.status !== "cancelled" && (
// //   <button
// //     onClick={() =>
// //       updateStatus(order._id, "cancelled")
// //     }
// //     className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
// //   >
// //     Cancel
// //   </button>
// // )}
// //   </div>
// // </td>
// //                     <td className="p-3">
// //                       {new Date(
// //                         order.createdAt
// //                       ).toLocaleDateString("en-GB")}
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td
// //                     colSpan="5"
// //                     className="text-center p-5 text-gray-500"
// //                   >
// //                     No Orders Found
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>

// //           {/* Pagination */}
// //           <div className="flex justify-between items-center p-4 border-t">
// //             <button
// //               onClick={() =>
// //                 setCurrentPage((prev) => prev - 1)
// //               }
// //               disabled={currentPage === 1}
// //               className={`px-4 py-2 rounded ${
// //                 currentPage === 1
// //                   ? "bg-gray-300 cursor-not-allowed"
// //                   : "bg-orange-500 text-white hover:bg-orange-600"
// //               }`}
// //             >
// //               Previous
// //             </button>

// //             <span className="font-semibold">
// //               Page {currentPage} of{" "}
// //               {totalPages || 1}
// //             </span>

// //             <button
// //               onClick={() =>
// //                 setCurrentPage((prev) => prev + 1)
// //               }
// //               disabled={
// //                 currentPage === totalPages ||
// //                 totalPages === 0
// //               }
// //               className={`px-4 py-2 rounded ${
// //                 currentPage === totalPages ||
// //                 totalPages === 0
// //                   ? "bg-gray-300 cursor-not-allowed"
// //                   : "bg-orange-500 text-white hover:bg-orange-600"
// //               }`}
// //             >
// //               Next
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Orders;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const ordersPerPage = 10;

//   useEffect(() => {
//     fetchOrders();
//   }, []);
// const fetchOrders = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:5000/api/orders"
//     );

//     // console.log(response.data.orders[0]);   // ← ADD HERE

//     setOrders(response.data.orders);
//   } catch (error) {
//     console.error(error);
//   }
// };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/orders/${id}/status`,
//         { status }
//       );

//       fetchOrders();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Search Filter
//   const filteredOrders = orders.filter((order) =>
//     order.shippingAddress?.name
//       ?.toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   // Pagination
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

//   const currentOrders = filteredOrders.slice(
//     indexOfFirstOrder,
//     indexOfLastOrder
//   );

//   const totalPages = Math.ceil(
//     filteredOrders.length / ordersPerPage
//   );

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 bg-orange-50 min-h-screen p-6">
//         <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
//           Orders Management
//         </h1>

//         {/* Search */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search Customer..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full p-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
//           />
//         </div>

//         {/* Orders Table */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
//               <tr>
//                <th className="px-2 py-3 text-left w-36">Customer</th>
// <th className="px-2 py-3 text-left w-56">Email</th>
// <th className="px-2 py-3 text-center w-20">Subtotal</th>
// <th className="px-2 py-3 text-center w-24">Coupon</th>
// <th className="px-2 py-3 text-center w-20">Discount</th>
// <th className="px-2 py-3 text-center w-24">Total</th>
// <th className="px-2 py-3 text-center w-20">Method</th>
// <th className="px-2 py-3 text-center w-20">Payment</th>
// <th className="px-2 py-3 text-center w-32">Status</th>
// <th className="px-2 py-3 text-center w-24">Date</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentOrders.length > 0 ? (
//                 currentOrders.map((order) => (
//                   <tr
//                     key={order._id}
//                     className="border-b hover:bg-orange-50 transition"
//                   >
//                     <td className="p-3">
//                       {order.shippingAddress?.name}
//                     </td>

//                     <td className="p-3">
//                       {order.shippingAddress?.email}
//                     </td>

//                     <td className="p-3">
//   ₹{order.subtotal}
// </td>

// <td className="p-3">
//   {order.couponCode ? (
//     <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-semibold">
//       {order.couponCode}
//     </span>
//   ) : (
//     <span className="text-gray-400">—</span>
//   )}
// </td>

// <td className="p-3">
//   {order.discount > 0 ? (
//     <span className="text-green-600 font-semibold">
//       -₹{order.discount}
//     </span>
//   ) : (
//     <span className="text-gray-400">₹0</span>
//   )}
// </td>

// <td className="p-3">
//   <div>
//     <p className="font-bold text-red-600">
//       ₹{order.total}
//     </p>

//     <p className="text-xs text-gray-500">
//       + ₹{order.shippingFee} Shipping
//     </p>
//   </div>
// </td>

// <td className="p-3">
//   {order.paymentMethod}
// </td>

// <td className="p-3">
//   {order.paymentStatus === "Paid" ? (
//     <span className="text-green-600 font-semibold">
//       Paid
//     </span>
//   ) : (
//     <span className="text-orange-600 font-semibold">
//       UnPaid
//     </span>
//   )}
// </td>
//                     <td className="p-3">
//                       <div className="flex items-center gap-2">
//                         <select
//                           value={order.status}
//                           onChange={(e) =>
//                             updateStatus(order._id, e.target.value)
//                           }
//                           className="border rounded px-2 py-1"
//                           disabled={
//                             order.status === "delivered" ||
//                             order.status === "cancelled"
//                           }
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="confirmed">Confirmed</option>
//                           <option value="preparing">Preparing</option>
//                           <option value="out_for_delivery">
//                             Out For Delivery
//                           </option>
//                           <option value="delivered">Delivered</option>
//                           <option value="cancelled">Cancelled</option>
//                         </select>

//                         {order.status !== "delivered" &&
//                           order.status !== "cancelled" && (
//                             <button
//                               onClick={() =>
//                                 updateStatus(order._id, "cancelled")
//                               }
//                               className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
//                             >
//                               Cancel
//                             </button>
//                           )}
//                       </div>
//                     </td>

//                     <td className="p-3">
//                       {new Date(
//                         order.createdAt
//                       ).toLocaleDateString("en-GB")}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="9"
//                     className="text-center p-5 text-gray-500"
//                   >
//                     No Orders Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="flex justify-between items-center p-4 border-t">
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => prev - 1)
//               }
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded ${
//                 currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-orange-500 text-white hover:bg-orange-600"
//               }`}
//             >
//               Previous
//             </button>

//             <span className="font-semibold">
//               Page {currentPage} of {totalPages || 1}
//             </span>

//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => prev + 1)
//               }
//               disabled={
//                 currentPage === totalPages ||
//                 totalPages === 0
//               }
//               className={`px-4 py-2 rounded ${
//                 currentPage === totalPages ||
//                 totalPages === 0
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-orange-500 text-white hover:bg-orange-600"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const ordersPerPage = 10;

  // =========================
  // FETCH ORDERS
  // =========================

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE ORDER STATUS
  // =========================

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status }
      );

      await fetchOrders();
    } catch (error) {
      console.error("Update Status Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update order status."
      );
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredOrders = orders.filter((order) => {
    const customerName =
      order.shippingAddress?.name?.toLowerCase() || "";

    const customerEmail =
      order.shippingAddress?.email?.toLowerCase() || "";

    const searchText = search.toLowerCase();

    return (
      customerName.includes(searchText) ||
      customerEmail.includes(searchText)
    );
  });

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  const indexOfLastOrder =
    currentPage * ordersPerPage;

  const indexOfFirstOrder =
    indexOfLastOrder - ordersPerPage;

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // =========================
  // SEARCH CHANGE
  // =========================

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // =========================
  // ORDER STATISTICS
  // =========================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  ).length;

  return (
    <AdminLayout title="Orders">
      <div className="w-full min-w-0">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Manage Orders
            </h2>

            <p className="text-gray-400 text-sm sm:text-base mt-1">
              View and manage customer orders.
            </p>
          </div>
        </div>

        {/* =========================
            STATISTICS
        ========================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* Total Orders */}

          <div className="bg-[#101722] border border-white/10 rounded-xl p-5 shadow-lg">
            <p className="text-sm text-gray-400">
              Total Orders
            </p>

            <h3 className="text-2xl font-bold text-white mt-2">
              {totalOrders}
            </h3>
          </div>

          {/* Pending */}

          <div className="bg-[#101722] border border-white/10 rounded-xl p-5 shadow-lg">
            <p className="text-sm text-gray-400">
              Pending
            </p>

            <h3 className="text-2xl font-bold text-yellow-400 mt-2">
              {pendingOrders}
            </h3>
          </div>

          {/* Delivered */}

          <div className="bg-[#101722] border border-white/10 rounded-xl p-5 shadow-lg">
            <p className="text-sm text-gray-400">
              Delivered
            </p>

            <h3 className="text-2xl font-bold text-green-400 mt-2">
              {deliveredOrders}
            </h3>
          </div>

          {/* Cancelled */}

          <div className="bg-[#101722] border border-white/10 rounded-xl p-5 shadow-lg">
            <p className="text-sm text-gray-400">
              Cancelled
            </p>

            <h3 className="text-2xl font-bold text-red-400 mt-2">
              {cancelledOrders}
            </h3>
          </div>

        </div>

        {/* =========================
            SEARCH
        ========================= */}

        <div className="bg-[#101722] border border-white/10 rounded-2xl p-4 sm:p-5 mb-6">

          <input
            type="text"
            placeholder="Search customer name or email..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 rounded-xl bg-[#0b111c] border border-white/10 text-white placeholder-gray-600 outline-none transition focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10"
          />

          {search && (
            <p className="text-xs text-gray-500 mt-3">
              Showing {filteredOrders.length} result
              {filteredOrders.length !== 1 ? "s" : ""} for "
              {search}"
            </p>
          )}

        </div>

        {/* =========================
            ORDERS CONTAINER
        ========================= */}

        <div className="bg-[#101722] border border-white/10 rounded-2xl shadow-xl overflow-hidden">

          {/* =========================
              HEADER
          ========================= */}

          <div className="px-5 sm:px-6 py-5 border-b border-white/10">

            <h3 className="text-lg sm:text-xl font-bold text-white">
              Orders
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {filteredOrders.length} order
              {filteredOrders.length !== 1 ? "s" : ""}
            </p>

          </div>

          {/* =========================
              LOADING
          ========================= */}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">

              <div className="w-10 h-10 border-4 border-white/10 border-t-red-500 rounded-full animate-spin" />

              <p className="text-gray-500 text-sm mt-4">
                Loading orders...
              </p>

            </div>
          ) : currentOrders.length === 0 ? (

            /* =========================
               EMPTY STATE
            ========================= */

            <div className="flex flex-col items-center justify-center py-16 px-5">

              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl mb-4">
                🛍️
              </div>

              <h3 className="text-lg font-semibold text-white">
                No Orders Found
              </h3>

              <p className="text-sm text-gray-500 mt-1 text-center">
                There are no orders matching your search.
              </p>

            </div>
          ) : (
            <>
              {/* =========================
                  DESKTOP TABLE
              ========================= */}

              <div className="hidden xl:block overflow-x-auto">

                <table className="w-full">

                  <thead>
                    <tr className="border-b border-white/10 bg-[#0b111c]">

                      <th className="px-4 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Customer
                      </th>

                      <th className="px-4 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Email
                      </th>

                      <th className="px-4 py-4 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Subtotal
                      </th>

                      <th className="px-4 py-4 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Coupon
                      </th>

                      <th className="px-4 py-4 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Discount
                      </th>

                      <th className="px-4 py-4 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Total
                      </th>

                      <th className="px-4 py-4 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Method
                      </th>

                      <th className="px-4 py-4 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Payment
                      </th>

                      <th className="px-4 py-4 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Status
                      </th>

                      <th className="px-4 py-4 text-center text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Date
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {currentOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b border-white/5 hover:bg-white/[0.02] transition"
                      >

                        {/* Customer */}

                        <td className="px-4 py-4">
                          <p className="text-sm font-semibold text-white">
                            {order.shippingAddress?.name ||
                              "Unknown"}
                          </p>
                        </td>

                        {/* Email */}

                        <td className="px-4 py-4">
                          <p className="text-sm text-gray-400 break-all">
                            {order.shippingAddress?.email ||
                              "—"}
                          </p>
                        </td>

                        {/* Subtotal */}

                        <td className="px-4 py-4 text-center">
                          <span className="text-sm text-gray-300">
                            ₹{order.subtotal ?? 0}
                          </span>
                        </td>

                        {/* Coupon */}

                        <td className="px-4 py-4 text-center">

                          {order.couponCode ? (
                            <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                              {order.couponCode}
                            </span>
                          ) : (
                            <span className="text-gray-600">
                              —
                            </span>
                          )}

                        </td>

                        {/* Discount */}

                        <td className="px-4 py-4 text-center">

                          {order.discount > 0 ? (
                            <span className="text-sm text-green-400 font-semibold">
                              -₹{order.discount}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">
                              ₹0
                            </span>
                          )}

                        </td>

                        {/* Total */}

                        <td className="px-4 py-4 text-center">

                          <p className="text-sm font-bold text-red-400">
                            ₹{order.total ?? 0}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            + ₹{order.shippingFee ?? 0} Shipping
                          </p>

                        </td>

                        {/* Payment Method */}

                        <td className="px-4 py-4 text-center">

                          <span className="text-sm text-gray-300 capitalize">
                            {order.paymentMethod || "—"}
                          </span>

                        </td>

                        {/* Payment Status */}

                        <td className="px-4 py-4 text-center">

                          {order.paymentStatus?.toLowerCase() ===
                          "paid" ? (
                            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                              Paid
                            </span>
                          ) : (
                            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                              Unpaid
                            </span>
                          )}

                        </td>

                        {/* Order Status */}

                        <td className="px-4 py-4">

                          <div className="flex flex-col gap-2 min-w-[150px]">

                            <select
                              value={order.status}
                              onChange={(e) =>
                                updateStatus(
                                  order._id,
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#0b111c] border border-white/10 text-white text-xs outline-none focus:border-red-500/50"
                              disabled={
                                order.status === "delivered" ||
                                order.status === "cancelled"
                              }
                            >
                              <option value="pending">
                                Pending
                              </option>

                              <option value="confirmed">
                                Confirmed
                              </option>

                              <option value="preparing">
                                Preparing
                              </option>

                              <option value="out_for_delivery">
                                Out For Delivery
                              </option>

                              <option value="delivered">
                                Delivered
                              </option>

                              <option value="cancelled">
                                Cancelled
                              </option>
                            </select>

                            {order.status !== "delivered" &&
                              order.status !== "cancelled" && (
                                <button
                                  onClick={() =>
                                    updateStatus(
                                      order._id,
                                      "cancelled"
                                    )
                                  }
                                  className="w-full px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition"
                                >
                                  Cancel Order
                                </button>
                              )}

                          </div>

                        </td>

                        {/* Date */}

                        <td className="px-4 py-4 text-center">

                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString("en-GB")
                              : "—"}
                          </span>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

              {/* =========================
                  TABLE FOR TABLET
              ========================= */}

              <div className="hidden md:block xl:hidden overflow-x-auto">

                <table className="w-full min-w-[1100px]">

                  <thead>
                    <tr className="border-b border-white/10 bg-[#0b111c]">

                      <th className="px-4 py-4 text-left text-xs text-gray-500 font-semibold">
                        Customer
                      </th>

                      <th className="px-4 py-4 text-left text-xs text-gray-500 font-semibold">
                        Email
                      </th>

                      <th className="px-4 py-4 text-center text-xs text-gray-500 font-semibold">
                        Total
                      </th>

                      <th className="px-4 py-4 text-center text-xs text-gray-500 font-semibold">
                        Payment
                      </th>

                      <th className="px-4 py-4 text-center text-xs text-gray-500 font-semibold">
                        Status
                      </th>

                      <th className="px-4 py-4 text-center text-xs text-gray-500 font-semibold">
                        Date
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {currentOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b border-white/5"
                      >

                        <td className="px-4 py-4">
                          <p className="text-sm font-semibold text-white">
                            {order.shippingAddress?.name ||
                              "Unknown"}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <p className="text-sm text-gray-400 break-all">
                            {order.shippingAddress?.email ||
                              "—"}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-center">
                          <span className="text-sm font-bold text-red-400">
                            ₹{order.total ?? 0}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-center">

                          {order.paymentStatus?.toLowerCase() ===
                          "paid" ? (
                            <span className="text-xs font-semibold text-green-400">
                              Paid
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-yellow-400">
                              Unpaid
                            </span>
                          )}

                        </td>

                        <td className="px-4 py-4">

                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateStatus(
                                order._id,
                                e.target.value
                              )
                            }
                            disabled={
                              order.status === "delivered" ||
                              order.status === "cancelled"
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#0b111c] border border-white/10 text-white text-xs outline-none"
                          >
                            <option value="pending">
                              Pending
                            </option>

                            <option value="confirmed">
                              Confirmed
                            </option>

                            <option value="preparing">
                              Preparing
                            </option>

                            <option value="out_for_delivery">
                              Out For Delivery
                            </option>

                            <option value="delivered">
                              Delivered
                            </option>

                            <option value="cancelled">
                              Cancelled
                            </option>
                          </select>

                        </td>

                        <td className="px-4 py-4 text-center">
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString("en-GB")
                              : "—"}
                          </span>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

              {/* =========================
                  MOBILE CARDS
              ========================= */}

              <div className="md:hidden p-4 space-y-4">

                {currentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-[#0b111c] border border-white/10 rounded-xl p-4"
                  >

                    {/* Customer */}

                    <div className="flex items-start justify-between gap-3 mb-4">

                      <div className="min-w-0">

                        <p className="text-sm font-semibold text-white truncate">
                          {order.shippingAddress?.name ||
                            "Unknown"}
                        </p>

                        <p className="text-xs text-gray-500 mt-1 break-all">
                          {order.shippingAddress?.email ||
                            "—"}
                        </p>

                      </div>

                      <span className="text-base font-bold text-red-400 whitespace-nowrap">
                        ₹{order.total ?? 0}
                      </span>

                    </div>

                    {/* Order Information */}

                    <div className="grid grid-cols-2 gap-3 mb-4">

                      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">

                        <p className="text-[11px] text-gray-500">
                          Subtotal
                        </p>

                        <p className="text-sm text-gray-300 mt-1">
                          ₹{order.subtotal ?? 0}
                        </p>

                      </div>

                      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">

                        <p className="text-[11px] text-gray-500">
                          Discount
                        </p>

                        <p className="text-sm text-green-400 mt-1">
                          ₹{order.discount ?? 0}
                        </p>

                      </div>

                      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">

                        <p className="text-[11px] text-gray-500">
                          Payment
                        </p>

                        <p className="text-sm text-gray-300 mt-1 capitalize">
                          {order.paymentMethod || "—"}
                        </p>

                      </div>

                      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">

                        <p className="text-[11px] text-gray-500">
                          Payment Status
                        </p>

                        <p
                          className={`text-sm mt-1 font-semibold ${
                            order.paymentStatus?.toLowerCase() ===
                            "paid"
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {order.paymentStatus?.toLowerCase() ===
                          "paid"
                            ? "Paid"
                            : "Unpaid"}
                        </p>

                      </div>

                    </div>

                    {/* Coupon */}

                    {order.couponCode && (
                      <div className="mb-4">

                        <p className="text-[11px] text-gray-500 mb-2">
                          Coupon
                        </p>

                        <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                          {order.couponCode}
                        </span>

                      </div>
                    )}

                    {/* Shipping */}

                    <div className="mb-4">

                      <p className="text-xs text-gray-500">
                        Shipping Fee
                      </p>

                      <p className="text-sm text-gray-300 mt-1">
                        ₹{order.shippingFee ?? 0}
                      </p>

                    </div>

                    {/* Status */}

                    <div className="pt-4 border-t border-white/5">

                      <p className="text-xs text-gray-500 mb-2">
                        Order Status
                      </p>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        disabled={
                          order.status === "delivered" ||
                          order.status === "cancelled"
                        }
                        className="w-full px-3 py-2.5 rounded-lg bg-[#101722] border border-white/10 text-white text-sm outline-none focus:border-red-500/50"
                      >
                        <option value="pending">
                          Pending
                        </option>

                        <option value="confirmed">
                          Confirmed
                        </option>

                        <option value="preparing">
                          Preparing
                        </option>

                        <option value="out_for_delivery">
                          Out For Delivery
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>
                      </select>

                      {order.status !== "delivered" &&
                        order.status !== "cancelled" && (
                          <button
                            onClick={() =>
                              updateStatus(
                                order._id,
                                "cancelled"
                              )
                            }
                            className="w-full mt-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition"
                          >
                            Cancel Order
                          </button>
                        )}

                    </div>

                    {/* Date */}

                    <div className="mt-4 pt-3 border-t border-white/5">

                      <p className="text-xs text-gray-500">
                        Order Date
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleDateString("en-GB")
                          : "—"}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              {/* =========================
                  PAGINATION
              ========================= */}

              <div className="px-4 sm:px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

                <p className="text-xs sm:text-sm text-gray-500">
                  Page {currentPage} of {totalPages || 1}
                </p>

                <div className="flex items-center gap-2">

                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.max(prev - 1, 1)
                      )
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                      currentPage === 1
                        ? "bg-white/5 text-gray-600 border-white/5 cursor-not-allowed"
                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Previous
                  </button>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          totalPages || 1
                        )
                      )
                    }
                    disabled={
                      currentPage === totalPages ||
                      totalPages === 0
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                      currentPage === totalPages ||
                      totalPages === 0
                        ? "bg-white/5 text-gray-600 border-white/5 cursor-not-allowed"
                        : "bg-red-500 text-white border-red-500 hover:bg-red-600"
                    }`}
                  >
                    Next
                  </button>

                </div>

              </div>
            </>
          )}

        </div>

        <div className="h-6" />

      </div>
    </AdminLayout>
  );
};

export default Orders;