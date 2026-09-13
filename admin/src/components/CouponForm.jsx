// // import React, { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
// import {
//   createCoupon,
//   updateCoupon,
// } from "../services/couponService";

// const CouponForm = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   initialData = null,
// }) => {
//   const [formData, setFormData] = useState({
//     code: "",
//     discountType: "percentage",
//     discountValue: "",
//     minimumAmount: "",
//     maximumDiscount: "",
//     expiryDate: "",
//     usageLimit: "",
//     isActive: true,
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         code: initialData.code || "",
//         discountType: initialData.discountType || "percentage",
//         discountValue: initialData.discountValue || "",
//         minimumAmount: initialData.minimumAmount || "",
//         maximumDiscount: initialData.maximumDiscount || "",
//         expiryDate: initialData.expiryDate
//           ? initialData.expiryDate.substring(0, 10)
//           : "",
//         usageLimit: initialData.usageLimit || "",
//         isActive: initialData.isActive,
//       });
//     } else {
//       setFormData({
//         code: "",
//         discountType: "percentage",
//         discountValue: "",
//         minimumAmount: "",
//         maximumDiscount: "",
//         expiryDate: "",
//         usageLimit: "",
//         isActive: true,
//       });
//     }
//   }, [initialData, isOpen]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     if (initialData) {
//       await updateCoupon(initialData._id, formData);
//       alert("Coupon updated successfully.");
//     } else {
//       await createCoupon(formData);
//       alert("Coupon created successfully.");
//     }

//     onSubmit();
//     onClose();
//   } catch (error) {
//     console.error(error);

//     alert(
//       error.response?.data?.message ||
//         "Something went wrong."
//     );
//   }
// };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

//       <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl">

//         {/* Header */}

//         <div className="flex justify-between items-center border-b p-5">

//           <h2 className="text-2xl font-bold">
//             {initialData ? "Edit Coupon" : "Add Coupon"}
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-gray-500 text-2xl hover:text-red-500"
//           >
//             ×
//           </button>

//         </div>

//         <form onSubmit={handleSubmit} className="p-6">

//           <div className="grid grid-cols-2 gap-5">

//             {/* Coupon Code */}

//             <div>
//               <label className="block mb-2 font-medium">
//                 Coupon Code
//               </label>

//               <input
//                 type="text"
//                 name="code"
//                 value={formData.code}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3"
//                 placeholder="WELCOME50"
//                 required
//               />
//             </div>

//             {/* Discount Type */}

//             <div>
//               <label className="block mb-2 font-medium">
//                 Discount Type
//               </label>

//               <select
//                 name="discountType"
//                 value={formData.discountType}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3"
//               >
//                 <option value="percentage">Percentage</option>
//                 <option value="fixed">Fixed Amount</option>
//               </select>
//             </div>

//             {/* Discount Value */}

//             <div>
//               <label className="block mb-2 font-medium">
//                 Discount Value
//               </label>

//               <input
//                 type="number"
//                 name="discountValue"
//                 value={formData.discountValue}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3"
//                 required
//               />
//             </div>

//             {/* Minimum Amount */}

//             <div>
//               <label className="block mb-2 font-medium">
//                 Minimum Order
//               </label>

//               <input
//                 type="number"
//                 name="minimumAmount"
//                 value={formData.minimumAmount}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3"
//               />
//             </div>

//             {/* Maximum Discount */}

//             <div>
//               <label className="block mb-2 font-medium">
//                 Maximum Discount
//               </label>

//               <input
//                 type="number"
//                 name="maximumDiscount"
//                 value={formData.maximumDiscount}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3"
//               />
//             </div>

//             {/* Expiry Date */}

//             <div>
//               <label className="block mb-2 font-medium">
//                 Expiry Date
//               </label>

//               <input
//                 type="date"
//                 name="expiryDate"
//                 value={formData.expiryDate}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3"
//                 required
//               />
//             </div>

//             {/* Usage Limit */}

//             <div>
//               <label className="block mb-2 font-medium">
//                 Usage Limit
//               </label>

//               <input
//                 type="number"
//                 name="usageLimit"
//                 value={formData.usageLimit}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3"
//                 required
//               />
//             </div>

//             {/* Active */}

//             <div className="flex items-center mt-8">

//               <input
//                 type="checkbox"
//                 name="isActive"
//                 checked={formData.isActive}
//                 onChange={handleChange}
//                 className="mr-3 h-5 w-5"
//               />

//               <label className="font-medium">
//                 Active Coupon
//               </label>

//             </div>

//           </div>

//           {/* Buttons */}

//           <div className="flex justify-end gap-3 mt-8">

//             <button
//               type="button"
//               onClick={onClose}
//               className="px-5 py-2 border rounded-lg"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
//             >
//               {initialData ? "Update Coupon" : "Create Coupon"}
//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// };

// export default CouponForm;

import React, { useEffect, useState } from "react";
import {
  createCoupon,
  updateCoupon,
} from "../services/couponService";

const CouponForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minimumAmount: "",
    maximumDiscount: "",
    expiryDate: "",
    usageLimit: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || "",
        discountType: initialData.discountType || "percentage",
        discountValue: initialData.discountValue || "",
        minimumAmount: initialData.minimumAmount || "",
        maximumDiscount: initialData.maximumDiscount || "",
        expiryDate: initialData.expiryDate
          ? initialData.expiryDate.substring(0, 10)
          : "",
        usageLimit: initialData.usageLimit || "",
        isActive:
          initialData.isActive !== undefined
            ? initialData.isActive
            : true,
      });
    } else {
      setFormData({
        code: "",
        discountType: "percentage",
        discountValue: "",
        minimumAmount: "",
        maximumDiscount: "",
        expiryDate: "",
        usageLimit: "",
        isActive: true,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (initialData) {
        await updateCoupon(initialData._id, formData);
        alert("Coupon updated successfully.");
      } else {
        await createCoupon(formData);
        alert("Coupon created successfully.");
      }

      onSubmit();
      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 overflow-x-hidden">

      {/* Modal */}
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto overflow-x-hidden min-w-0 bg-[#101722] border border-white/10 rounded-2xl shadow-2xl shadow-black/40">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 bg-[#101722]/95 backdrop-blur-xl border-b border-white/10">

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-red-500 font-semibold mb-1">
              Coupon Management
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white truncate">
              {initialData ? "Edit Coupon" : "Add Coupon"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.05] border border-white/10 text-gray-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/30 transition"
            aria-label="Close"
          >
            <span className="text-2xl leading-none">
              ×
            </span>
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

            {/* Coupon Code */}
            <div className="min-w-0">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Coupon Code
              </label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10 uppercase"
                placeholder="WELCOME50"
                required
              />
            </div>

            {/* Discount Type */}
            <div className="min-w-0">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Discount Type
              </label>

              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
              >
                <option
                  value="percentage"
                  className="bg-[#101722]"
                >
                  Percentage
                </option>

                <option
                  value="fixed"
                  className="bg-[#101722]"
                >
                  Fixed Amount
                </option>
              </select>
            </div>

            {/* Discount Value */}
            <div className="min-w-0">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Discount Value
              </label>

              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                min="0"
                className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                placeholder="50"
                required
              />
            </div>

            {/* Minimum Amount */}
            <div className="min-w-0">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Minimum Order
              </label>

              <input
                type="number"
                name="minimumAmount"
                value={formData.minimumAmount}
                onChange={handleChange}
                min="0"
                className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                placeholder="500"
              />
            </div>

            {/* Maximum Discount */}
            <div className="min-w-0">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Maximum Discount
              </label>

              <input
                type="number"
                name="maximumDiscount"
                value={formData.maximumDiscount}
                onChange={handleChange}
                min="0"
                className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                placeholder="200"
              />
            </div>

            {/* Expiry Date */}
            <div className="min-w-0">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Expiry Date
              </label>

              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10 [color-scheme:dark]"
                required
              />
            </div>

            {/* Usage Limit */}
            <div className="min-w-0">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Usage Limit
              </label>

              <input
                type="number"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleChange}
                min="1"
                className="w-full min-w-0 bg-[#0b111c] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                placeholder="100"
                required
              />
            </div>

            {/* Active Coupon */}
            <div className="flex items-center min-w-0 sm:mt-7">

              <label className="flex items-center gap-3 cursor-pointer select-none">

                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-white/20 bg-[#0b111c] text-red-500 focus:ring-red-500/20 accent-red-500 cursor-pointer"
                />

                <span className="text-sm sm:text-base font-medium text-gray-300">
                  Active Coupon
                </span>

              </label>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7 sm:mt-8 pt-5 border-t border-white/10">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 hover:bg-white/[0.07] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg shadow-red-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Saving..."
                : initialData
                ? "Update Coupon"
                : "Create Coupon"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CouponForm;