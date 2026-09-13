// // import React, { useState } from "react";
// // import toast from "react-hot-toast";
// // import { addAddress } from "../services/addressService";

// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import {
//   addAddress,
//   updateAddress,
// } from "../services/addressService";

// const AddAddressModal = ({
//   isOpen,
//   onClose,
//   onAddressAdded,
//   editingAddress,
//   setEditingAddress,
// }) => {


//     const [formData,setFormData] = useState({

//         type:"Home",
//         fullName:"",
//         phone:"",
//         street:"",
//         city:"",
//         state:"",
//         pincode:"",
//         landmark:""

//     });

//     useEffect(() => {
//   if (editingAddress) {
//     setFormData({
//       type: editingAddress.type || "Home",
//       fullName: editingAddress.fullName || "",
//       phone: editingAddress.phone || "",
//       street: editingAddress.street || "",
//       city: editingAddress.city || "",
//       state: editingAddress.state || "",
//       pincode: editingAddress.pincode || "",
//       landmark: editingAddress.landmark || "",
//     });
//   } else {
//     setFormData({
//       type: "Home",
//       fullName: "",
//       phone: "",
//       street: "",
//       city: "",
//       state: "",
//       pincode: "",
//       landmark: "",
//     });
//   }
// }, [editingAddress]);


//     const handleChange = (e)=>{

//         setFormData({

//             ...formData,

//             [e.target.name]:e.target.value

//         });

//     };



//    const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     let data;

//     if (editingAddress) {
//       data = await updateAddress(editingAddress._id, formData);

//       toast.success("Address updated successfully");
//     } else {
//       data = await addAddress(formData);

//       toast.success("Address added successfully");
//     }

//     onAddressAdded(data.addresses);

//     setFormData({
//       type: "Home",
//       fullName: "",
//       phone: "",
//       street: "",
//       city: "",
//       state: "",
//       pincode: "",
//       landmark: "",
//     });

//     setEditingAddress(null);

//     onClose();
//   } catch (error) {
//     toast.error(
//       error.response?.data?.message ||
//         "Something went wrong"
//     );
//   }
// };

//     if(!isOpen)
//         return null;



//     return (

//         <div
//         className="
//         fixed inset-0
//         bg-black/50
//         flex
//         items-center
//         justify-center
//         z-50
//         "
//         >


//             <div
//             className="
//             bg-white
//             rounded-xl
//             p-6
//             w-full
//             max-w-lg
//             "
//             >


//                 <div className="flex justify-between mb-5">


//                     <h2 className="
//                     text-2xl
//                     font-bold
//                     ">
//                        {editingAddress ? "Edit Address" : "Add New Address"}
//                     </h2>


//                     <button
//                     onClick={onClose}
//                     className="
//                     text-xl
//                     "
//                     >
//                         ✕
//                     </button>


//                 </div>




//                 <form
//                 onSubmit={handleSubmit}
//                 className="
//                 space-y-4
//                 "
//                 >



//                     {/* Address Type */}

//                     <select

//                     name="type"

//                     value={formData.type}

//                     onChange={handleChange}

//                     className="
//                     w-full
//                     border
//                     p-3
//                     rounded-lg
//                     "

//                     >

//                         <option value="Home">
//                             🏠 Home
//                         </option>


//                         <option value="Office">
//                             🏢 Office
//                         </option>


//                         <option value="Other">
//                             📍 Other
//                         </option>


//                     </select>





//                     <input

//                     type="text"

//                     name="fullName"

//                     placeholder="Full Name"

//                     value={formData.fullName}

//                     onChange={handleChange}

//                     className="
//                     w-full
//                     border
//                     p-3
//                     rounded-lg
//                     "

//                     required

//                     />




//                     <input

//                     type="text"

//                     name="phone"

//                     placeholder="Phone Number"

//                     value={formData.phone}

//                     onChange={handleChange}

//                     className="
//                     w-full
//                     border
//                     p-3
//                     rounded-lg
//                     "

//                     required

//                     />





//                     <input

//                     type="text"

//                     name="street"

//                     placeholder="House No, Street"

//                     value={formData.street}

//                     onChange={handleChange}

//                     className="
//                     w-full
//                     border
//                     p-3
//                     rounded-lg
//                     "

//                     required

//                     />





//                     <div className="grid grid-cols-2 gap-3">


//                         <input

//                         type="text"

//                         name="city"

//                         placeholder="City"

//                         value={formData.city}

//                         onChange={handleChange}

//                         className="
//                         border
//                         p-3
//                         rounded-lg
//                         "

//                         required

//                         />



//                         <input

//                         type="text"

//                         name="state"

//                         placeholder="State"

//                         value={formData.state}

//                         onChange={handleChange}

//                         className="
//                         border
//                         p-3
//                         rounded-lg
//                         "

//                         required

//                         />


//                     </div>






//                     <input

//                     type="text"

//                     name="pincode"

//                     placeholder="Pincode"

//                     value={formData.pincode}

//                     onChange={handleChange}

//                     className="
//                     w-full
//                     border
//                     p-3
//                     rounded-lg
//                     "

//                     required

//                     />






//                     <input

//                     type="text"

//                     name="landmark"

//                     placeholder="Landmark (Optional)"

//                     value={formData.landmark}

//                     onChange={handleChange}

//                     className="
//                     w-full
//                     border
//                     p-3
//                     rounded-lg
//                     "

//                     />







//                     <button

//                     type="submit"

//                     className="
//                     w-full
//                     bg-green-600
//                     text-white
//                     py-3
//                     rounded-lg
//                     font-semibold
//                     "

//                     >

//                         {editingAddress ? "Update Address" : "Save Address"}

//                     </button>




//                 </form>



//             </div>


//         </div>

//     );

// };


// export default AddAddressModal;


import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  addAddress,
  updateAddress,
} from "../services/addressService";

const initialFormData = {
  type: "Home",
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
};

const AddAddressModal = ({
  isOpen,
  onClose,
  onAddressAdded,
  editingAddress,
  setEditingAddress,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // Load Address Data When Editing
  // ==========================================
  useEffect(() => {
    if (editingAddress) {
      setFormData({
        type: editingAddress.type || "Home",
        fullName: editingAddress.fullName || "",
        phone: editingAddress.phone || "",
        street: editingAddress.street || "",
        city: editingAddress.city || "",
        state: editingAddress.state || "",
        pincode: editingAddress.pincode || "",
        landmark: editingAddress.landmark || "",
      });
    } else {
      setFormData({ ...initialFormData });
    }
  }, [editingAddress]);

  // ==========================================
  // Handle Input Change
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Close Modal
  // ==========================================
  const handleClose = () => {
    if (saving) return;

    setFormData({ ...initialFormData });
    setEditingAddress(null);
    onClose();
  };

  // ==========================================
  // Submit Form
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    try {
      setSaving(true);

      let data;

      if (editingAddress) {
        data = await updateAddress(
          editingAddress._id,
          formData
        );

        toast.success("Address updated successfully");
      } else {
        data = await addAddress(formData);

        toast.success("Address added successfully");
      }

      // Update address list in parent
      onAddressAdded(data.addresses || []);

      // Reset form
      setFormData({ ...initialFormData });

      setEditingAddress(null);

      onClose();
    } catch (error) {
      console.error("Address save error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Don't Render When Closed
  // ==========================================
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/80
        backdrop-blur-sm
        p-3
        sm:p-5
        overflow-x-hidden
        overflow-y-auto
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      {/* ==========================================
          MODAL CONTAINER
      ========================================== */}
      <div
        className="
          relative
          w-[calc(100%-24px)]
          sm:w-full
          max-w-xl
          min-w-0
          max-h-[92vh]
          overflow-hidden
          bg-[#101722]
          border
          border-white/10
          rounded-2xl
          shadow-2xl
          shadow-black/50
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* ==========================================
            RED GLOW
        ========================================== */}
        <div
          className="
            absolute
            -top-24
            -right-24
            w-48
            h-48
            bg-red-500/10
            rounded-full
            blur-3xl
            pointer-events-none
          "
        />

        {/* ==========================================
            CONTENT WRAPPER
            ONLY VERTICAL SCROLL
        ========================================== */}
        <div
          className="
            relative
            z-10
            max-h-[92vh]
            overflow-y-auto
            overflow-x-hidden
            overscroll-contain
          "
        >
          {/* ==========================================
              HEADER
          ========================================== */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              px-4
              sm:px-6
              py-4
              sm:py-5
              border-b
              border-white/10
            "
          >
            {/* Header Left */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  flex-shrink-0
                  rounded-xl
                  bg-red-500/10
                  border
                  border-red-500/20
                  flex
                  items-center
                  justify-center
                  text-lg
                  sm:text-xl
                "
              >
                {editingAddress ? "✏️" : "📍"}
              </div>

              <div className="min-w-0">
                <h2
                  className="
                    text-base
                    sm:text-xl
                    font-bold
                    text-white
                    truncate
                  "
                >
                  {editingAddress
                    ? "Edit Address"
                    : "Add New Address"}
                </h2>

                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  {editingAddress
                    ? "Update your delivery details"
                    : "Add a new delivery location"}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="
                flex-shrink-0
                w-9
                h-9
                rounded-lg
                bg-white/5
                border
                border-white/10
                text-gray-400
                hover:text-white
                hover:bg-white/10
                transition
                flex
                items-center
                justify-center
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* ==========================================
              FORM
          ========================================== */}
          <form
            onSubmit={handleSubmit}
            className="
              w-full
              min-w-0
              p-4
              sm:p-6
              space-y-4
            "
          >
            {/* ==========================================
                ADDRESS TYPE
            ========================================== */}
            <div className="w-full min-w-0">
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Address Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                disabled={saving}
                className="
                  block
                  w-full
                  min-w-0
                  max-w-full
                  bg-[#0b111b]
                  border
                  border-white/10
                  text-white
                  px-4
                  py-3
                  rounded-xl
                  outline-none
                  focus:border-red-500/60
                  focus:ring-2
                  focus:ring-red-500/10
                  transition
                  disabled:opacity-50
                "
              >
                <option
                  value="Home"
                  className="bg-[#101722]"
                >
                  🏠 Home
                </option>

                <option
                  value="Office"
                  className="bg-[#101722]"
                >
                  🏢 Office
                </option>

                <option
                  value="Other"
                  className="bg-[#101722]"
                >
                  📍 Other
                </option>
              </select>
            </div>

            {/* ==========================================
                FULL NAME
            ========================================== */}
            <div className="w-full min-w-0">
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                disabled={saving}
                autoComplete="name"
                className="
                  block
                  w-full
                  min-w-0
                  max-w-full
                  bg-[#0b111b]
                  border
                  border-white/10
                  text-white
                  placeholder:text-gray-600
                  px-4
                  py-3
                  rounded-xl
                  outline-none
                  focus:border-red-500/60
                  focus:ring-2
                  focus:ring-red-500/10
                  transition
                  disabled:opacity-50
                "
                required
              />
            </div>

            {/* ==========================================
                PHONE
            ========================================== */}
            <div className="w-full min-w-0">
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                disabled={saving}
                autoComplete="tel"
                inputMode="numeric"
                className="
                  block
                  w-full
                  min-w-0
                  max-w-full
                  bg-[#0b111b]
                  border
                  border-white/10
                  text-white
                  placeholder:text-gray-600
                  px-4
                  py-3
                  rounded-xl
                  outline-none
                  focus:border-red-500/60
                  focus:ring-2
                  focus:ring-red-500/10
                  transition
                  disabled:opacity-50
                "
                required
              />
            </div>

            {/* ==========================================
                STREET
            ========================================== */}
            <div className="w-full min-w-0">
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                House No / Street
              </label>

              <input
                type="text"
                name="street"
                placeholder="House No, Street, Area"
                value={formData.street}
                onChange={handleChange}
                disabled={saving}
                autoComplete="street-address"
                className="
                  block
                  w-full
                  min-w-0
                  max-w-full
                  bg-[#0b111b]
                  border
                  border-white/10
                  text-white
                  placeholder:text-gray-600
                  px-4
                  py-3
                  rounded-xl
                  outline-none
                  focus:border-red-500/60
                  focus:ring-2
                  focus:ring-red-500/10
                  transition
                  disabled:opacity-50
                "
                required
              />
            </div>

            {/* ==========================================
                CITY + STATE
                Single Column on Small Screens
            ========================================== */}
            <div
              className="
                w-full
                min-w-0
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              "
            >
              {/* City */}
              <div className="w-full min-w-0">
                <label className="block text-xs font-semibold text-gray-400 mb-2">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={saving}
                  autoComplete="address-level2"
                  className="
                    block
                    w-full
                    min-w-0
                    max-w-full
                    bg-[#0b111b]
                    border
                    border-white/10
                    text-white
                    placeholder:text-gray-600
                    px-4
                    py-3
                    rounded-xl
                    outline-none
                    focus:border-red-500/60
                    focus:ring-2
                    focus:ring-red-500/10
                    transition
                    disabled:opacity-50
                  "
                  required
                />
              </div>

              {/* State */}
              <div className="w-full min-w-0">
                <label className="block text-xs font-semibold text-gray-400 mb-2">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={saving}
                  autoComplete="address-level1"
                  className="
                    block
                    w-full
                    min-w-0
                    max-w-full
                    bg-[#0b111b]
                    border
                    border-white/10
                    text-white
                    placeholder:text-gray-600
                    px-4
                    py-3
                    rounded-xl
                    outline-none
                    focus:border-red-500/60
                    focus:ring-2
                    focus:ring-red-500/10
                    transition
                    disabled:opacity-50
                  "
                  required
                />
              </div>
            </div>

            {/* ==========================================
                PINCODE
            ========================================== */}
            <div className="w-full min-w-0">
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                placeholder="Enter 6-digit pincode"
                value={formData.pincode}
                onChange={handleChange}
                disabled={saving}
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={6}
                className="
                  block
                  w-full
                  min-w-0
                  max-w-full
                  bg-[#0b111b]
                  border
                  border-white/10
                  text-white
                  placeholder:text-gray-600
                  px-4
                  py-3
                  rounded-xl
                  outline-none
                  focus:border-red-500/60
                  focus:ring-2
                  focus:ring-red-500/10
                  transition
                  disabled:opacity-50
                "
                required
              />
            </div>

            {/* ==========================================
                LANDMARK
            ========================================== */}
            <div className="w-full min-w-0">
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Landmark
                <span className="text-gray-600 font-normal ml-1">
                  (Optional)
                </span>
              </label>

              <input
                type="text"
                name="landmark"
                placeholder="Nearby landmark"
                value={formData.landmark}
                onChange={handleChange}
                disabled={saving}
                className="
                  block
                  w-full
                  min-w-0
                  max-w-full
                  bg-[#0b111b]
                  border
                  border-white/10
                  text-white
                  placeholder:text-gray-600
                  px-4
                  py-3
                  rounded-xl
                  outline-none
                  focus:border-red-500/60
                  focus:ring-2
                  focus:ring-red-500/10
                  transition
                  disabled:opacity-50
                "
              />
            </div>

            {/* ==========================================
                BUTTONS
            ========================================== */}
            <div
              className="
                w-full
                min-w-0
                flex
                flex-col
                sm:flex-row
                gap-3
                pt-2
              "
            >
              {/* Cancel */}
              <button
                type="button"
                onClick={handleClose}
                disabled={saving}
                className="
                  w-full
                  sm:w-auto
                  sm:min-w-[120px]
                  px-5
                  py-3
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  text-gray-300
                  hover:bg-white/10
                  hover:text-white
                  transition
                  font-semibold
                  text-sm
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                Cancel
              </button>

              {/* Save / Update */}
              <button
                type="submit"
                disabled={saving}
                className="
                  w-full
                  sm:flex-1
                  min-w-0
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  text-sm
                  transition
                  shadow-lg
                  shadow-red-500/10
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {saving ? (
                  <>
                    <span
                      className="
                        w-4
                        h-4
                        border-2
                        border-white/30
                        border-t-white
                        rounded-full
                        animate-spin
                      "
                    />

                    {editingAddress
                      ? "Updating..."
                      : "Saving..."}
                  </>
                ) : (
                  <>
                    <span>
                      {editingAddress ? "✓" : "+"}
                    </span>

                    {editingAddress
                      ? "Update Address"
                      : "Save Address"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;