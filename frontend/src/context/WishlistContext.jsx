// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {

//     const [wishlist, setWishlist] = useState([]);

//     const fetchWishlist = async () => {
//         try {

//             const token = localStorage.getItem("token");

//             if (!token) return;

//             const res = await axios.get(
//                 "http://localhost:5000/api/wishlist",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             // setWishlist(res.data);
//             setWishlist(res.data.wishlist);
//         } catch (error) {
//             console.log("Wishlist Error:", error);
//         }
//     };


//     useEffect(() => {
//         fetchWishlist();
//     }, []);


//     const updateWishlist = (item) => {
//   setWishlist((prev) => [...prev, item]);
// };

//     return (
//         <WishlistContext.Provider
//             value={{
//                wishlist,
//    setWishlist,
//    fetchWishlist,
//    updateWishlist
//             }}
//         >
//             {children}
//         </WishlistContext.Provider>
//     );
// };


// export const useWishlist = () => useContext(WishlistContext);

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setWishlist([]);
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlist(res.data.wishlist || []);
    } catch (error) {
      console.log("Wishlist Error:", error);
      setWishlist([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const updateWishlist = (food) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.food?._id === food._id);

      if (exists) return prev;

      return [...prev, { food }];
    });
  };

  const removeWishlist = (foodId) => {
    setWishlist((prev) =>
      prev.filter((item) => item.food?._id !== foodId)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        fetchWishlist,
        updateWishlist,
        removeWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);