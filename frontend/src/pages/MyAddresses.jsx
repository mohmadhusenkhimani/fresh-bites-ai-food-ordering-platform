import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getAddresses,
    deleteAddress,
    setDefaultAddress
} from "../services/addressService";

import AddAddressModal from "./AddAddressModal";

const MyAddresses = () => {

    const [addresses,setAddresses] = useState([]);
    const [showModal,setShowModal] = useState(false);

    const [editingAddress, setEditingAddress] = useState(null);

    useEffect(() => {
  console.log("editingAddress:", editingAddress);
}, [editingAddress]);

    const fetchAddresses = async()=>{

        try{

            const data = await getAddresses();

            setAddresses(data.addresses || []);

        }
        catch(error){

            toast.error(
                error.response?.data?.message ||
                "Failed to load addresses"
            );

        }

    };



    useEffect(()=>{

        fetchAddresses();

    },[]);



    const handleDelete = async(id)=>{

        try{

            const data = await deleteAddress(id);

            setAddresses(data.addresses);

            toast.success(
                "Address deleted"
            );

        }
        catch(error){

            toast.error(
                "Delete failed"
            );

        }

    };



    const handleDefault = async(id)=>{

        try{

            const data = await setDefaultAddress(id);

            setAddresses(data.addresses);

            toast.success(
                "Default address updated"
            );

        }
        catch(error){

            toast.error(
                "Failed to update default address"
            );

        }

    };



    return (

        <div className="p-6">


            <h1 className="text-3xl font-bold mb-6">
                My Delivery Addresses
            </h1>

<button
    onClick={() => setShowModal(true)}
    className="
    mb-6
    bg-orange-500
    text-white
    px-5
    py-3
    rounded-lg
    font-semibold
    "
>
    ➕ Add New Address
</button>


            <div className="grid md:grid-cols-2 gap-5">


            {
                addresses.map((address)=>(

                    <div
                    key={address._id}
                    className="
                    border rounded-xl p-5 shadow-sm
                    "
                    >


                    <div className="flex justify-between">


                        <h2 className="text-xl font-semibold">

                            {
                                address.type === "Home"
                                ? "🏠"
                                :
                                address.type === "Office"
                                ? "🏢"
                                :
                                "📍"
                            }

                            {" "}
                            {address.type}

                        </h2>


                        {
                            address.isDefault &&
                            (
                                <span className="
                                bg-green-100
                                text-green-700
                                px-3 py-1
                                rounded-full
                                text-sm
                                ">
                                    Default
                                </span>
                            )
                        }


                    </div>




                    <p className="mt-3 font-medium">
                        {address.fullName}
                    </p>


                    <p>
                        {address.phone}
                    </p>


                    <p>
                        {address.street}
                    </p>


                    <p>
                        {address.city},
                        {" "}
                        {address.state}
                    </p>


                    <p>
                        {address.pincode}
                    </p>


<div className="flex flex-wrap gap-3 mt-5">

    <button
        onClick={() => {
            setEditingAddress(address);
            setShowModal(true);
        }}
        className="
        px-4
        py-2
        bg-blue-600
        text-white
        rounded-lg
        hover:bg-blue-700
        transition
        "
    >
        ✏️ Edit
    </button>

    {!address.isDefault && (
        <button
            onClick={() => handleDefault(address._id)}
            className="
            px-4
            py-2
            bg-green-600
            text-white
            rounded-lg
            hover:bg-green-700
            transition
            "
        >
            ⭐ Make Default
        </button>
    )}

    <button
        onClick={() => handleDelete(address._id)}
        className="
        px-4
        py-2
        bg-red-500
        text-white
        rounded-lg
        hover:bg-red-600
        transition
        "
    >
        🗑 Delete
    </button>

</div>
                    </div>

                ))
            }


            </div>

<AddAddressModal
    isOpen={showModal}
    onClose={() => {
        setShowModal(false);
        setEditingAddress(null);
    }}
    onAddressAdded={(addresses) => {
        setAddresses(addresses);
    }}
    editingAddress={editingAddress}
    setEditingAddress={setEditingAddress}
/>

        </div>

    );

};


export default MyAddresses;