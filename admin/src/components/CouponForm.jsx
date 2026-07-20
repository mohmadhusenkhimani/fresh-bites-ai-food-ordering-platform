// import React, { useEffect, useState } from "react";
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
        isActive: initialData.isActive,
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
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-2xl font-bold">
            {initialData ? "Edit Coupon" : "Add Coupon"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-2xl hover:text-red-500"
          >
            ×
          </button>

        </div>

        <form onSubmit={handleSubmit} className="p-6">

          <div className="grid grid-cols-2 gap-5">

            {/* Coupon Code */}

            <div>
              <label className="block mb-2 font-medium">
                Coupon Code
              </label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="WELCOME50"
                required
              />
            </div>

            {/* Discount Type */}

            <div>
              <label className="block mb-2 font-medium">
                Discount Type
              </label>

              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            {/* Discount Value */}

            <div>
              <label className="block mb-2 font-medium">
                Discount Value
              </label>

              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            {/* Minimum Amount */}

            <div>
              <label className="block mb-2 font-medium">
                Minimum Order
              </label>

              <input
                type="number"
                name="minimumAmount"
                value={formData.minimumAmount}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Maximum Discount */}

            <div>
              <label className="block mb-2 font-medium">
                Maximum Discount
              </label>

              <input
                type="number"
                name="maximumDiscount"
                value={formData.maximumDiscount}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Expiry Date */}

            <div>
              <label className="block mb-2 font-medium">
                Expiry Date
              </label>

              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            {/* Usage Limit */}

            <div>
              <label className="block mb-2 font-medium">
                Usage Limit
              </label>

              <input
                type="number"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            {/* Active */}

            <div className="flex items-center mt-8">

              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="mr-3 h-5 w-5"
              />

              <label className="font-medium">
                Active Coupon
              </label>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 mt-8">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              {initialData ? "Update Coupon" : "Create Coupon"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CouponForm;