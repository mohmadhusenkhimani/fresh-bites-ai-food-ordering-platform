import React, { useEffect, useState } from "react";
import CouponTable from "../components/CouponTable";
import CouponForm from "../components/CouponForm";

import {
  getCoupons,
  deleteCoupon,
} from "../services/couponService";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // ================= Fetch Coupons =================

  const fetchCoupons = async () => {
    try {
      setLoading(true);

      const data = await getCoupons();

      setCoupons(data.coupons || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // ================= Add Coupon =================

  const handleAdd = () => {
    setSelectedCoupon(null);
    setIsModalOpen(true);
  };

  // ================= Edit Coupon =================

  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  // ================= Delete Coupon =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this coupon?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCoupon(id);

      alert("Coupon deleted successfully.");

      fetchCoupons();
    } catch (error) {
      console.error(error);

      alert("Failed to delete coupon.");
    }
  };

  // ================= Form Success =================

  const handleFormSubmit = () => {
    fetchCoupons();
  };

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Coupon Management
          </h1>

          <p className="text-gray-500 mt-1">
            Create and manage discount coupons
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Coupon
        </button>

      </div>

      {/* Coupon Table */}

      <CouponTable
        coupons={coupons}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Coupon Modal */}

      <CouponForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedCoupon}
      />

    </div>
  );
};

export default Coupons;