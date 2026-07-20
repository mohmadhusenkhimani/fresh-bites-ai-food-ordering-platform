import React from "react";

const CouponTable = ({
  coupons,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        Loading coupons...
      </div>
    );
  }

  if (!coupons.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No coupons found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-red-500 text-white">
          <tr>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Discount</th>
            <th className="p-3 text-left">Min Order</th>
            <th className="p-3 text-left">Expiry</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((coupon) => (
            <tr
              key={coupon._id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-3 font-semibold">
                {coupon.code}
              </td>

              <td className="p-3 capitalize">
                {coupon.discountType}
              </td>

              <td className="p-3">
                {coupon.discountType === "percentage"
                  ? `${coupon.discountValue}%`
                  : `₹${coupon.discountValue}`}
              </td>

              <td className="p-3">
                ₹{coupon.minimumAmount}
              </td>

              <td className="p-3">
                {new Date(
                  coupon.expiryDate
                ).toLocaleDateString()}
              </td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    coupon.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {coupon.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="p-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(coupon)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(coupon._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
  );
};

export default CouponTable;