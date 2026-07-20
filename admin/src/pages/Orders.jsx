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

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/orders"
//       );

//       setOrders(response.data.orders);
//     } catch (error) {
//       console.error(error);
//     }
//   };

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
//        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
//   Orders Management
// </h1>

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
//            className="w-full p-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
//           />
//         </div>

//         {/* Orders Table */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
//           <table className="w-full">
//            <thead className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
//               <tr>
//                 <th className="p-3 text-left">
//                   Customer
//                 </th>

//                 <th className="p-3 text-left">
//                   Email
//                 </th>

//                 <th className="p-3 text-left">
//                   Total
//                 </th>

//                 <th className="p-3 text-left">
//                   Status
//                 </th>

//                 <th className="p-3 text-left">
//                   Date
//                 </th>
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
//                       ₹{order.total}
//                     </td>

//                   <td className="p-3">
//   <div className="flex items-center gap-2">
//    <select
//   value={order.status}
//   onChange={(e) =>
//     updateStatus(order._id, e.target.value)
//   }
//   className="border rounded px-2 py-1"
//   disabled={
//     order.status === "delivered" ||
//     order.status === "cancelled"
//   }
// >
//   <option value="pending">Pending</option>
//   <option value="confirmed">Confirmed</option>
//   <option value="preparing">Preparing</option>
//   <option value="out_for_delivery">
//     Out For Delivery
//   </option>
//   <option value="delivered">Delivered</option>

//   {/* Only for display after cancellation */}
//   <option value="cancelled">Cancelled</option>
// </select>

//     {order.status !== "delivered" &&
//  order.status !== "cancelled" && (
//   <button
//     onClick={() =>
//       updateStatus(order._id, "cancelled")
//     }
//     className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
//   >
//     Cancel
//   </button>
// )}
//   </div>
// </td>
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
//                     colSpan="5"
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
//               Page {currentPage} of{" "}
//               {totalPages || 1}
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
import Sidebar from "../components/Sidebar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);
const fetchOrders = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/orders"
    );

    // console.log(response.data.orders[0]);   // ← ADD HERE

    setOrders(response.data.orders);
  } catch (error) {
    console.error(error);
  }
};

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status }
      );

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  // Search Filter
  const filteredOrders = orders.filter((order) =>
    order.shippingAddress?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-orange-50 min-h-screen p-6">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Orders Management
        </h1>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full p-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
              <tr>
               <th className="px-2 py-3 text-left w-36">Customer</th>
<th className="px-2 py-3 text-left w-56">Email</th>
<th className="px-2 py-3 text-center w-20">Subtotal</th>
<th className="px-2 py-3 text-center w-24">Coupon</th>
<th className="px-2 py-3 text-center w-20">Discount</th>
<th className="px-2 py-3 text-center w-24">Total</th>
<th className="px-2 py-3 text-center w-20">Method</th>
<th className="px-2 py-3 text-center w-20">Payment</th>
<th className="px-2 py-3 text-center w-32">Status</th>
<th className="px-2 py-3 text-center w-24">Date</th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-orange-50 transition"
                  >
                    <td className="p-3">
                      {order.shippingAddress?.name}
                    </td>

                    <td className="p-3">
                      {order.shippingAddress?.email}
                    </td>

                    <td className="p-3">
  ₹{order.subtotal}
</td>

<td className="p-3">
  {order.couponCode ? (
    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-semibold">
      {order.couponCode}
    </span>
  ) : (
    <span className="text-gray-400">—</span>
  )}
</td>

<td className="p-3">
  {order.discount > 0 ? (
    <span className="text-green-600 font-semibold">
      -₹{order.discount}
    </span>
  ) : (
    <span className="text-gray-400">₹0</span>
  )}
</td>

<td className="p-3">
  <div>
    <p className="font-bold text-red-600">
      ₹{order.total}
    </p>

    <p className="text-xs text-gray-500">
      + ₹{order.shippingFee} Shipping
    </p>
  </div>
</td>

<td className="p-3">
  {order.paymentMethod}
</td>

<td className="p-3">
  {order.paymentStatus === "Paid" ? (
    <span className="text-green-600 font-semibold">
      Paid
    </span>
  ) : (
    <span className="text-orange-600 font-semibold">
      UnPaid
    </span>
  )}
</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order._id, e.target.value)
                          }
                          className="border rounded px-2 py-1"
                          disabled={
                            order.status === "delivered" ||
                            order.status === "cancelled"
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="out_for_delivery">
                            Out For Delivery
                          </option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        {order.status !== "delivered" &&
                          order.status !== "cancelled" && (
                            <button
                              onClick={() =>
                                updateStatus(order._id, "cancelled")
                              }
                              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                            >
                              Cancel
                            </button>
                          )}
                      </div>
                    </td>

                    <td className="p-3">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center p-5 text-gray-500"
                  >
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t">
            <button
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              className={`px-4 py-2 rounded ${
                currentPage === totalPages ||
                totalPages === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;