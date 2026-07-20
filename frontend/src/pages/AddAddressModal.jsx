// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { addAddress } from "../services/addressService";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  addAddress,
  updateAddress,
} from "../services/addressService";

const AddAddressModal = ({
  isOpen,
  onClose,
  onAddressAdded,
  editingAddress,
  setEditingAddress,
}) => {


    const [formData,setFormData] = useState({

        type:"Home",
        fullName:"",
        phone:"",
        street:"",
        city:"",
        state:"",
        pincode:"",
        landmark:""

    });

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
    setFormData({
      type: "Home",
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    });
  }
}, [editingAddress]);


    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };



   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let data;

    if (editingAddress) {
      data = await updateAddress(editingAddress._id, formData);

      toast.success("Address updated successfully");
    } else {
      data = await addAddress(formData);

      toast.success("Address added successfully");
    }

    onAddressAdded(data.addresses);

    setFormData({
      type: "Home",
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    });

    setEditingAddress(null);

    onClose();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Something went wrong"
    );
  }
};

    if(!isOpen)
        return null;



    return (

        <div
        className="
        fixed inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
        "
        >


            <div
            className="
            bg-white
            rounded-xl
            p-6
            w-full
            max-w-lg
            "
            >


                <div className="flex justify-between mb-5">


                    <h2 className="
                    text-2xl
                    font-bold
                    ">
                       {editingAddress ? "Edit Address" : "Add New Address"}
                    </h2>


                    <button
                    onClick={onClose}
                    className="
                    text-xl
                    "
                    >
                        ✕
                    </button>


                </div>




                <form
                onSubmit={handleSubmit}
                className="
                space-y-4
                "
                >



                    {/* Address Type */}

                    <select

                    name="type"

                    value={formData.type}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    "

                    >

                        <option value="Home">
                            🏠 Home
                        </option>


                        <option value="Office">
                            🏢 Office
                        </option>


                        <option value="Other">
                            📍 Other
                        </option>


                    </select>





                    <input

                    type="text"

                    name="fullName"

                    placeholder="Full Name"

                    value={formData.fullName}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    "

                    required

                    />




                    <input

                    type="text"

                    name="phone"

                    placeholder="Phone Number"

                    value={formData.phone}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    "

                    required

                    />





                    <input

                    type="text"

                    name="street"

                    placeholder="House No, Street"

                    value={formData.street}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    "

                    required

                    />





                    <div className="grid grid-cols-2 gap-3">


                        <input

                        type="text"

                        name="city"

                        placeholder="City"

                        value={formData.city}

                        onChange={handleChange}

                        className="
                        border
                        p-3
                        rounded-lg
                        "

                        required

                        />



                        <input

                        type="text"

                        name="state"

                        placeholder="State"

                        value={formData.state}

                        onChange={handleChange}

                        className="
                        border
                        p-3
                        rounded-lg
                        "

                        required

                        />


                    </div>






                    <input

                    type="text"

                    name="pincode"

                    placeholder="Pincode"

                    value={formData.pincode}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    "

                    required

                    />






                    <input

                    type="text"

                    name="landmark"

                    placeholder="Landmark (Optional)"

                    value={formData.landmark}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    "

                    />







                    <button

                    type="submit"

                    className="
                    w-full
                    bg-green-600
                    text-white
                    py-3
                    rounded-lg
                    font-semibold
                    "

                    >

                        {editingAddress ? "Update Address" : "Save Address"}

                    </button>




                </form>



            </div>


        </div>

    );

};


export default AddAddressModal;