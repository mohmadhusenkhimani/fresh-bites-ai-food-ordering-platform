// import React, { useEffect, useState } from "react";
// import CouponTable from "../components/CouponTable";
// import CouponForm from "../components/CouponForm";

// import {
//   getCoupons,
//   deleteCoupon,
// } from "../services/couponService";

// const Coupons = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCoupon, setSelectedCoupon] = useState(null);

//   // ================= Fetch Coupons =================

//   const fetchCoupons = async () => {
//     try {
//       setLoading(true);

//       const data = await getCoupons();

//       setCoupons(data.coupons || []);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCoupons();
//   }, []);

//   // ================= Add Coupon =================

//   const handleAdd = () => {
//     setSelectedCoupon(null);
//     setIsModalOpen(true);
//   };

//   // ================= Edit Coupon =================

//   const handleEdit = (coupon) => {
//     setSelectedCoupon(coupon);
//     setIsModalOpen(true);
//   };

//   // ================= Delete Coupon =================

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Delete this coupon?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteCoupon(id);

//       alert("Coupon deleted successfully.");

//       fetchCoupons();
//     } catch (error) {
//       console.error(error);

//       alert("Failed to delete coupon.");
//     }
//   };

//   // ================= Form Success =================

//   const handleFormSubmit = () => {
//     fetchCoupons();
//   };

//   return (
//     <div className="p-6">

//       {/* Header */}

//       <div className="flex justify-between items-center mb-6">

//         <div>
//           <h1 className="text-3xl font-bold">
//             Coupon Management
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Create and manage discount coupons
//           </p>
//         </div>

//         <button
//           onClick={handleAdd}
//           className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
//         >
//           + Add Coupon
//         </button>

//       </div>

//       {/* Coupon Table */}

//       <CouponTable
//         coupons={coupons}
//         loading={loading}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       {/* Coupon Modal */}

//       <CouponForm
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleFormSubmit}
//         initialData={selectedCoupon}
//       />

//     </div>
//   );
// };

// export default Coupons;

import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
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
      console.error("Failed to fetch coupons:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load coupons."
      );
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
      "Are you sure you want to delete this coupon?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCoupon(id);

      alert("Coupon deleted successfully.");

      fetchCoupons();
    } catch (error) {
      console.error("Delete coupon error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete coupon."
      );
    }
  };

  // ================= Form Success =================

  const handleFormSubmit = () => {
    fetchCoupons();
  };

  // ================= Close Modal =================

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCoupon(null);
  };

  // ================= Statistics =================

  const totalCoupons = coupons.length;

  const activeCoupons = coupons.filter(
    (coupon) => coupon.isActive
  ).length;

  const inactiveCoupons =
    totalCoupons - activeCoupons;

  return (
    <AdminLayout title="Coupons">

      <div className="w-full min-w-0">

        {/* ================= Page Header ================= */}

        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">

          <div className="min-w-0">

            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Manage Discount Coupons
            </h2>

            <p className="text-gray-400 text-sm sm:text-base mt-1">
              Create, edit and manage your promotional coupons.
            </p>

          </div>

          <button
            onClick={handleAdd}
            className="
              w-full sm:w-auto
              px-5 py-3
              rounded-xl
              bg-red-500
              hover:bg-red-600
              active:bg-red-700
              text-white
              font-semibold
              transition
              shadow-lg
              shadow-red-500/20
            "
          >
            + Add Coupon
          </button>

        </div>

        {/* ================= Statistics ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          {/* Total Coupons */}

          <div
            className="
              bg-[#101722]
              border border-white/10
              rounded-xl
              p-5
              shadow-lg
            "
          >
            <p className="text-sm text-gray-400">
              Total Coupons
            </p>

            <h3 className="text-2xl font-bold text-white mt-2">
              {totalCoupons}
            </h3>
          </div>

          {/* Active Coupons */}

          <div
            className="
              bg-[#101722]
              border border-white/10
              rounded-xl
              p-5
              shadow-lg
            "
          >
            <p className="text-sm text-gray-400">
              Active Coupons
            </p>

            <h3 className="text-2xl font-bold text-green-400 mt-2">
              {activeCoupons}
            </h3>
          </div>

          {/* Inactive Coupons */}

          <div
            className="
              bg-[#101722]
              border border-white/10
              rounded-xl
              p-5
              shadow-lg
            "
          >
            <p className="text-sm text-gray-400">
              Inactive Coupons
            </p>

            <h3 className="text-2xl font-bold text-gray-400 mt-2">
              {inactiveCoupons}
            </h3>
          </div>

        </div>

        {/* ================= Coupon Table ================= */}

        <div className="w-full min-w-0">

          <CouponTable
            coupons={coupons}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>

      </div>

      {/* ================= Coupon Modal ================= */}

      <CouponForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={selectedCoupon}
      />

    </AdminLayout>
  );
};

export default Coupons;