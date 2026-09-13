// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import {
//     getAddresses,
//     deleteAddress,
//     setDefaultAddress
// } from "../services/addressService";

// import AddAddressModal from "./AddAddressModal";

// const MyAddresses = () => {

//     const [addresses,setAddresses] = useState([]);
//     const [showModal,setShowModal] = useState(false);

//     const [editingAddress, setEditingAddress] = useState(null);

//     useEffect(() => {
//   console.log("editingAddress:", editingAddress);
// }, [editingAddress]);

//     const fetchAddresses = async()=>{

//         try{

//             const data = await getAddresses();

//             setAddresses(data.addresses || []);

//         }
//         catch(error){

//             toast.error(
//                 error.response?.data?.message ||
//                 "Failed to load addresses"
//             );

//         }

//     };



//     useEffect(()=>{

//         fetchAddresses();

//     },[]);



//     const handleDelete = async(id)=>{

//         try{

//             const data = await deleteAddress(id);

//             setAddresses(data.addresses);

//             toast.success(
//                 "Address deleted"
//             );

//         }
//         catch(error){

//             toast.error(
//                 "Delete failed"
//             );

//         }

//     };



//     const handleDefault = async(id)=>{

//         try{

//             const data = await setDefaultAddress(id);

//             setAddresses(data.addresses);

//             toast.success(
//                 "Default address updated"
//             );

//         }
//         catch(error){

//             toast.error(
//                 "Failed to update default address"
//             );

//         }

//     };



//     return (

//         <div className="p-6">


//             <h1 className="text-3xl font-bold mb-6">
//                 My Delivery Addresses
//             </h1>

// <button
//     onClick={() => setShowModal(true)}
//     className="
//     mb-6
//     bg-orange-500
//     text-white
//     px-5
//     py-3
//     rounded-lg
//     font-semibold
//     "
// >
//     ➕ Add New Address
// </button>


//             <div className="grid md:grid-cols-2 gap-5">


//             {
//                 addresses.map((address)=>(

//                     <div
//                     key={address._id}
//                     className="
//                     border rounded-xl p-5 shadow-sm
//                     "
//                     >


//                     <div className="flex justify-between">


//                         <h2 className="text-xl font-semibold">

//                             {
//                                 address.type === "Home"
//                                 ? "🏠"
//                                 :
//                                 address.type === "Office"
//                                 ? "🏢"
//                                 :
//                                 "📍"
//                             }

//                             {" "}
//                             {address.type}

//                         </h2>


//                         {
//                             address.isDefault &&
//                             (
//                                 <span className="
//                                 bg-green-100
//                                 text-green-700
//                                 px-3 py-1
//                                 rounded-full
//                                 text-sm
//                                 ">
//                                     Default
//                                 </span>
//                             )
//                         }


//                     </div>




//                     <p className="mt-3 font-medium">
//                         {address.fullName}
//                     </p>


//                     <p>
//                         {address.phone}
//                     </p>


//                     <p>
//                         {address.street}
//                     </p>


//                     <p>
//                         {address.city},
//                         {" "}
//                         {address.state}
//                     </p>


//                     <p>
//                         {address.pincode}
//                     </p>


// <div className="flex flex-wrap gap-3 mt-5">

//     <button
//         onClick={() => {
//             setEditingAddress(address);
//             setShowModal(true);
//         }}
//         className="
//         px-4
//         py-2
//         bg-blue-600
//         text-white
//         rounded-lg
//         hover:bg-blue-700
//         transition
//         "
//     >
//         ✏️ Edit
//     </button>

//     {!address.isDefault && (
//         <button
//             onClick={() => handleDefault(address._id)}
//             className="
//             px-4
//             py-2
//             bg-green-600
//             text-white
//             rounded-lg
//             hover:bg-green-700
//             transition
//             "
//         >
//             ⭐ Make Default
//         </button>
//     )}

//     <button
//         onClick={() => handleDelete(address._id)}
//         className="
//         px-4
//         py-2
//         bg-red-500
//         text-white
//         rounded-lg
//         hover:bg-red-600
//         transition
//         "
//     >
//         🗑 Delete
//     </button>

// </div>
//                     </div>

//                 ))
//             }


//             </div>

// <AddAddressModal
//     isOpen={showModal}
//     onClose={() => {
//         setShowModal(false);
//         setEditingAddress(null);
//     }}
//     onAddressAdded={(addresses) => {
//         setAddresses(addresses);
//     }}
//     editingAddress={editingAddress}
//     setEditingAddress={setEditingAddress}
// />

//         </div>

//     );

// };


// export default MyAddresses;





import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAddresses,
  deleteAddress,
  setDefaultAddress,
} from "../services/addressService";

import AddAddressModal from "./AddAddressModal";
import Image from "../image";
import Footer from "../footer";

const MyAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [defaultId, setDefaultId] = useState(null);

  // =====================================
  // Fetch Addresses
  // =====================================
  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const data = await getAddresses();

      setAddresses(data.addresses || []);
    } catch (error) {
      console.error("Failed to load addresses:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load addresses"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Initial Load
  // =====================================
  useEffect(() => {
    fetchAddresses();
  }, []);

  // =====================================
  // Add New Address
  // =====================================
  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowModal(true);
  };

  // =====================================
  // Edit Address
  // =====================================
  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  // =====================================
  // Close Modal
  // =====================================
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAddress(null);
  };

  // =====================================
  // Delete Address
  // =====================================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const data = await deleteAddress(id);

      setAddresses(data.addresses || []);

      toast.success("Address deleted successfully");
    } catch (error) {
      console.error("Delete address error:", error);

      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================
  // Make Default Address
  // =====================================
  const handleDefault = async (id) => {
    try {
      setDefaultId(id);

      const data = await setDefaultAddress(id);

      setAddresses(data.addresses || []);

      toast.success("Default address updated");
    } catch (error) {
      console.error(
        "Update default address error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update default address"
      );
    } finally {
      setDefaultId(null);
    }
  };

  // =====================================
  // Address Icon
  // =====================================
  const getAddressIcon = (type) => {
    if (type === "Home") return "🏠";

    if (type === "Office") return "🏢";

    return "📍";
  };

  return (
    <div className="min-h-screen bg-[#080d16] text-white">
      {/* =====================================
          PAGE BANNER
      ===================================== */}
      <Image title="My Addresses" />

      {/* =====================================
          MAIN CONTENT
      ===================================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* =====================================
            HEADER
        ===================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
          <div>
            <p className="text-red-500 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2">
              Delivery Details
            </p>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              My Delivery Addresses
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Manage your saved delivery locations
            </p>
          </div>

          {/* Add Address Button */}
          <button
            onClick={handleAddAddress}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold text-sm transition shadow-lg shadow-red-500/10"
          >
            <span className="text-lg">+</span>
            Add New Address
          </button>
        </div>

        {/* =====================================
            ADDRESS COUNT
        ===================================== */}
        {!loading && addresses.length > 0 && (
          <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-red-500" />

            {addresses.length}{" "}
            {addresses.length === 1
              ? "saved address"
              : "saved addresses"}
          </div>
        )}

        {/* =====================================
            LOADING STATE
        ===================================== */}
        {loading ? (
          <div className="bg-[#101722] border border-white/10 rounded-2xl py-16 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />

            <p className="text-gray-500 text-sm mt-4">
              Loading your addresses...
            </p>
          </div>
        ) : addresses.length === 0 ? (
          /* =====================================
             EMPTY STATE
          ===================================== */
          <div className="bg-[#101722] border border-white/10 rounded-2xl py-16 px-5 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 border border-red-500/10 flex items-center justify-center text-4xl">
              📍
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mt-5">
              No Saved Addresses
            </h2>

            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              Add your delivery address to make
              checkout faster and easier.
            </p>

            <button
              onClick={handleAddAddress}
              className="mt-6 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition"
            >
              <span className="text-lg">+</span>
              Add Your First Address
            </button>
          </div>
        ) : (
          /* =====================================
             ADDRESS GRID
          ===================================== */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {addresses.map((address) => (
              <div
                key={address._id}
                className={`relative bg-[#101722] border rounded-2xl p-5 sm:p-6 transition overflow-hidden ${
                  address.isDefault
                    ? "border-red-500/40"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Default Glow */}
                {address.isDefault && (
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                )}

                <div className="relative z-10">
                  {/* =====================================
                      CARD HEADER
                  ===================================== */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Address Icon */}
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${
                          address.isDefault
                            ? "bg-red-500/10 border border-red-500/20"
                            : "bg-white/5 border border-white/10"
                        }`}
                      >
                        {getAddressIcon(address.type)}
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-white">
                          {address.type}
                        </h2>

                        <p className="text-xs text-gray-600 mt-0.5">
                          Delivery Address
                        </p>
                      </div>
                    </div>

                    {/* Default Badge */}
                    {address.isDefault && (
                      <span className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Default
                      </span>
                    )}
                  </div>

                  {/* =====================================
                      ADDRESS DETAILS
                  ===================================== */}
                  <div className="mt-5 space-y-2.5">
                    {/* Name */}
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wider">
                        Name
                      </p>

                      <p className="text-sm font-semibold text-gray-200 mt-0.5">
                        {address.fullName}
                      </p>
                    </div>

                    {/* Phone */}
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wider">
                        Phone
                      </p>

                      <p className="text-sm text-gray-400 mt-0.5">
                        {address.phone}
                      </p>
                    </div>

                    {/* Street */}
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wider">
                        Address
                      </p>

                      <p className="text-sm text-gray-400 mt-0.5 leading-relaxed">
                        {address.street}
                      </p>
                    </div>

                    {/* City / State */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wider">
                          City
                        </p>

                        <p className="text-sm text-gray-400 mt-0.5">
                          {address.city}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wider">
                          State
                        </p>

                        <p className="text-sm text-gray-400 mt-0.5">
                          {address.state}
                        </p>
                      </div>
                    </div>

                    {/* Pincode */}
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wider">
                        Pincode
                      </p>

                      <p className="text-sm text-gray-400 mt-0.5">
                        {address.pincode}
                      </p>
                    </div>
                  </div>

                  {/* =====================================
                      DIVIDER
                  ===================================== */}
                  <div className="border-t border-white/10 mt-5 pt-5">
                    {/* =====================================
                        ACTION BUTTONS
                    ===================================== */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {/* Edit */}
                      <button
                        onClick={() =>
                          handleEdit(address)
                        }
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/15 hover:border-blue-500/30 transition text-sm font-medium"
                      >
                        <span>✏️</span>
                        Edit
                      </button>

                      {/* Make Default */}
                      {!address.isDefault ? (
                        <button
                          onClick={() =>
                            handleDefault(
                              address._id
                            )
                          }
                          disabled={
                            defaultId ===
                            address._id
                          }
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/15 hover:border-green-500/30 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {defaultId ===
                          address._id ? (
                            <>
                              <span className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
                              Updating
                            </>
                          ) : (
                            <>
                              <span>⭐</span>
                              Default
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="hidden sm:block" />
                      )}

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDelete(
                            address._id
                          )
                        }
                        disabled={
                          deletingId ===
                          address._id
                        }
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/15 hover:border-red-500/30 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId ===
                        address._id ? (
                          <>
                            <span className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                            Deleting
                          </>
                        ) : (
                          <>
                            <span>🗑️</span>
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =====================================
            DELIVERY INFO
        ===================================== */}
        {!loading && addresses.length > 0 && (
          <div className="mt-6 bg-[#101722] border border-white/10 rounded-2xl p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🚚</span>
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Quick Delivery
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Your default address will be
                  automatically selected during
                  checkout. You can change it anytime
                  from this page.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =====================================
          ADD / EDIT ADDRESS MODAL
      ===================================== */}
      <AddAddressModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onAddressAdded={(updatedAddresses) => {
          setAddresses(updatedAddresses || []);
          setShowModal(false);
          setEditingAddress(null);
        }}
        editingAddress={editingAddress}
        setEditingAddress={setEditingAddress}
      />

      {/* =====================================
          FOOTER
      ===================================== */}
      <Footer />
    </div>
  );
};

export default MyAddresses;