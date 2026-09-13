// import React from "react";

// const CouponTable = ({
//   coupons,
//   loading,
//   onEdit,
//   onDelete,
// }) => {
//   if (loading) {
//     return (
//       <div className="bg-white rounded-lg shadow p-6 text-center">
//         Loading coupons...
//       </div>
//     );
//   }

//   if (!coupons.length) {
//     return (
//       <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
//         No coupons found.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-red-500 text-white">
//           <tr>
//             <th className="p-3 text-left">Code</th>
//             <th className="p-3 text-left">Type</th>
//             <th className="p-3 text-left">Discount</th>
//             <th className="p-3 text-left">Min Order</th>
//             <th className="p-3 text-left">Expiry</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-center">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {coupons.map((coupon) => (
//             <tr
//               key={coupon._id}
//               className="border-b hover:bg-gray-50"
//             >
//               <td className="p-3 font-semibold">
//                 {coupon.code}
//               </td>

//               <td className="p-3 capitalize">
//                 {coupon.discountType}
//               </td>

//               <td className="p-3">
//                 {coupon.discountType === "percentage"
//                   ? `${coupon.discountValue}%`
//                   : `₹${coupon.discountValue}`}
//               </td>

//               <td className="p-3">
//                 ₹{coupon.minimumAmount}
//               </td>

//               <td className="p-3">
//                 {new Date(
//                   coupon.expiryDate
//                 ).toLocaleDateString()}
//               </td>

//               <td className="p-3">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm ${
//                     coupon.isActive
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {coupon.isActive ? "Active" : "Inactive"}
//                 </span>
//               </td>

//               <td className="p-3">
//                 <div className="flex justify-center gap-2">
//                   <button
//                     onClick={() => onEdit(coupon)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => onDelete(coupon._id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CouponTable;


import React from "react";

const CouponTable = ({
  coupons,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="w-full bg-[#101722] border border-white/10 rounded-2xl p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />

          <p className="text-gray-400 text-sm">
            Loading coupons...
          </p>
        </div>
      </div>
    );
  }

  if (!coupons || !coupons.length) {
    return (
      <div className="w-full bg-[#101722] border border-white/10 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <span className="text-2xl">🎟️</span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-1">
          No Coupons Found
        </h3>

        <p className="text-sm text-gray-500">
          Create a coupon to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 bg-[#101722] border border-white/10 rounded-2xl shadow-xl shadow-black/10 overflow-hidden">

      {/* Desktop Table */}
      <div className="hidden md:block w-full overflow-x-auto">

        <table className="w-full min-w-[850px]">

          {/* Table Header */}
          <thead className="bg-[#0b111c] border-b border-white/10">

            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Code
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Type
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Discount
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Min Order
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Expiry
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Status
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                Actions
              </th>
            </tr>

          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-white/5">

            {coupons.map((coupon) => (
              <tr
                key={coupon._id}
                className="hover:bg-white/[0.025] transition-colors"
              >

                {/* Code */}
                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🎟️</span>
                    </div>

                    <span className="font-semibold text-white uppercase">
                      {coupon.code}
                    </span>

                  </div>

                </td>

                {/* Type */}
                <td className="px-5 py-4">

                  <span className="capitalize text-gray-300">
                    {coupon.discountType}
                  </span>

                </td>

                {/* Discount */}
                <td className="px-5 py-4">

                  <span className="font-semibold text-red-400">
                    {coupon.discountType === "percentage"
                      ? `${coupon.discountValue}%`
                      : `₹${coupon.discountValue}`}
                  </span>

                </td>

                {/* Minimum Order */}
                <td className="px-5 py-4 text-gray-300">
                  ₹{coupon.minimumAmount || 0}
                </td>

                {/* Expiry */}
                <td className="px-5 py-4 text-gray-400">
                  {coupon.expiryDate
                    ? new Date(
                        coupon.expiryDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                {/* Status */}
                <td className="px-5 py-4">

                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      coupon.isActive
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >

                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        coupon.isActive
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    />

                    {coupon.isActive
                      ? "Active"
                      : "Inactive"}

                  </span>

                </td>

                {/* Actions */}
                <td className="px-5 py-4">

                  <div className="flex justify-center items-center gap-2">

                    <button
                      type="button"
                      onClick={() => onEdit(coupon)}
                      className="px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all text-sm font-medium"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(coupon._id)}
                      className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm font-medium"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-white/5">

        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="p-4 hover:bg-white/[0.02] transition"
          >

            {/* Top */}
            <div className="flex items-start justify-between gap-3">

              <div className="flex items-center gap-3 min-w-0">

                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span>🎟️</span>
                </div>

                <div className="min-w-0">

                  <p className="font-bold text-white uppercase truncate">
                    {coupon.code}
                  </p>

                  <p className="text-xs text-gray-500 capitalize mt-1">
                    {coupon.discountType}
                  </p>

                </div>

              </div>

              <span
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  coupon.isActive
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    coupon.isActive
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                />

                {coupon.isActive
                  ? "Active"
                  : "Inactive"}
              </span>

            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mt-4">

              <div className="bg-[#0b111c] border border-white/5 rounded-lg p-3">

                <p className="text-[11px] uppercase tracking-wider text-gray-600">
                  Discount
                </p>

                <p className="text-sm font-semibold text-red-400 mt-1">
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}%`
                    : `₹${coupon.discountValue}`}
                </p>

              </div>

              <div className="bg-[#0b111c] border border-white/5 rounded-lg p-3">

                <p className="text-[11px] uppercase tracking-wider text-gray-600">
                  Min Order
                </p>

                <p className="text-sm font-semibold text-gray-300 mt-1">
                  ₹{coupon.minimumAmount || 0}
                </p>

              </div>

              <div className="bg-[#0b111c] border border-white/5 rounded-lg p-3">

                <p className="text-[11px] uppercase tracking-wider text-gray-600">
                  Expiry
                </p>

                <p className="text-sm font-semibold text-gray-300 mt-1">
                  {coupon.expiryDate
                    ? new Date(
                        coupon.expiryDate
                      ).toLocaleDateString()
                    : "-"}
                </p>

              </div>

              <div className="bg-[#0b111c] border border-white/5 rounded-lg p-3">

                <p className="text-[11px] uppercase tracking-wider text-gray-600">
                  Usage Limit
                </p>

                <p className="text-sm font-semibold text-gray-300 mt-1">
                  {coupon.usageLimit || 0}
                </p>

              </div>

            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">

              <button
                type="button"
                onClick={() => onEdit(coupon)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition text-sm font-semibold"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(coupon._id)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition text-sm font-semibold"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CouponTable;