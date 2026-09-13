// import { FaUserCircle, FaBell } from "react-icons/fa";
// import { NavLink, useNavigate } from "react-router-dom";
// import logo from "./assets/logo.png";
// import { useSelector, useDispatch } from "react-redux";
// import CartDrawer from "./CartDrawer";
// import { useState, useEffect, useRef } from "react";
// import { logout } from "./authSlice";
// import { useWishlist } from "./context/WishlistContext";
// import { addToWishlist } from "./wishlistSlice";

// const Navbar = () => {

//   const cartCount = useSelector(state => state.carts.items.length);
//   const [cartOpen, setCartOpen] = useState(false);
//    const navigate = useNavigate();

//    const { wishlist } = useWishlist();

// // console.log("Wishlist in Navbar:", wishlist);




//    // const [cartOpen, setCartOpen] = useState(false);
//   const [dropOpen, setDropOpen] = useState(false);
//   const dropRef = useRef(null);
//   // Close dropdown on outside click
//   useEffect(() => {
//     const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const linkClass = ({ isActive }) =>
//     isActive
//       ? "text-orange-500 font-semibold"
//       : "hover:text-orange-500";

//       const dispatch = useDispatch();
// const { isAuthenticated, currentUser } = useSelector((state) => state.auth);


  
// const handleLogout = () => {
//   dispatch(logout());
//   setDropOpen(false);
//   navigate("/login");
// };
//   return (
//     <nav className="sticky top-0 z-50 w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      
//       {/* Left - Logo */}
//       <NavLink to="/" className="flex items-center space-x-2">
//         <img
//           src={logo}
//           alt="FoodApp Logo"
//           className="h-10 w-auto"
//         />
//         <span className="text-xl font-bold text-red-500">
//           Fresh Bites
//         </span>
//       </NavLink>

//       {/* Center - Menu */}
//       <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
//         <li>
//           <NavLink to="/" className={linkClass}>Home</NavLink>
//         </li>
//         <li>
//           <NavLink to="/food" className={linkClass}>Food</NavLink>
//         </li>
//         <li>
//           <NavLink to="/cart" className={linkClass}>Cart</NavLink>
//         </li>
      
//         <li>
//           <NavLink to="/contact" className={linkClass}>Contact</NavLink>
//         </li>
        
//       </ul>

//       {/* Right - Icons */}
//       <div className="flex items-center space-x-5 text-gray-700 text-2xl">
//        <button
//   onClick={() => setCartOpen(true)}
//   className="relative p-2 hover:bg-gray-100 rounded"
// >
//   {/* Cart Icon */}
//   <i className="ri-shopping-basket-line text-2xl text-gray-800"></i>

//   {/* Badge */}
//   <span
//     className="absolute -top-1 -right-1 bg-red-500 text-white
//                text-[10px] font-semibold rounded-full
//                w-5 h-5 flex items-center justify-center"
//   >
//     {cartCount}
//   </span>
// </button>



// {/* Wishlist Icon */}
// <NavLink
//   to="/wishlist"
//   className="relative p-2 hover:bg-gray-100 rounded"
// >
//   <i className="ri-heart-line text-2xl text-red-500"></i>

//   {wishlist.length > 0 && (
//     <span
//       className="
//       absolute -top-1 -right-1 
//       bg-red-500 text-white
//       text-[10px] font-semibold
//       rounded-full
//       w-5 h-5
//       flex items-center justify-center
//       "
//     >
//       {wishlist.length}
//     </span>
//   )}
// </NavLink>

//       {/* Drawer - passes state */}
//       <CartDrawer open={cartOpen} setOpen={setCartOpen} />

//         {/* <span className="user">
//   <button
//       onClick={() => navigate("/login")}
//       className="p-2 rounded hover:bg-gray-100 transition"
//     >
//       <i className="ri-user-line text-2xl text-gray-800"></i>
//     </button>
// </span> */}


//     {/* {isAuthenticated ? (
//   <button
//     onClick={handleLogout}
//     className="text-sm bg-red-500 text-white px-3 py-1 rounded"
//   >
//     Logout
//   </button>
// ) : (
//   <button
//     onClick={() => navigate("/login")}
//     className="p-2 rounded hover:bg-gray-100 transition"
//   >
//     <i className="ri-user-line text-2xl text-gray-800"></i>
//   </button>
// )} */}

//     {/* User Dropdown */}
//         <div className="relative" ref={dropRef}>
//           <button
//             onClick={() => isAuthenticated ? setDropOpen(!dropOpen) : navigate("/login")}
//             className="flex items-center gap-1 p-2 rounded hover:bg-gray-100 transition"
//           >
//             <i className={`ri-user-line text-2xl ${isAuthenticated ? "text-red-500" : "text-gray-800"}`}></i>
//             {isAuthenticated && (
//               <span className="text-xs text-red-500 font-medium hidden md:block max-w-20 truncate">
//                 {currentUser?.fullName?.split(" ")[0]}
//               </span>
//             )}
//           </button>

//           {/* Dropdown Menu */}
//           {dropOpen && isAuthenticated && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
//               <div className="px-4 py-2 border-b border-gray-100">
//                 <p className="text-sm font-semibold text-gray-800 truncate">{currentUser?.fullName}</p>
//                 <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
//               </div>
//               {[
//                 { to: "/profile", icon: "ri-user-line", label: "Profile"},
//                 { to: "/my-orders", icon: "ri-shopping-bag-line", label: "My Orders"},
//               ].map((item)=>(
//                 <NavLink
//                   key={item.to}
//                   to={item.to}
//                   onClick={()=> setDropOpen(false)}
//                   className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
//                   >
//                     <i className={`${item.icon} text-base`}></i> {item.label}
//                   </NavLink>
//               ))}
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition border-t border-gray-100 mt-1"
//               >
//                 <i className="ri-logout-box-line text-base"></i> Logout
//               </button>
//             </div>
//            )} 
//       </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { NavLink, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

import { useSelector, useDispatch } from "react-redux";
import CartDrawer from "./CartDrawer";

import { useState, useEffect, useRef } from "react";
import { logout } from "./authSlice";
import { useWishlist } from "./context/WishlistContext";

const Navbar = () => {
  /* =========================================================
     REDUX / AUTH
  ========================================================= */

  const cartCount = useSelector(
    (state) => state.carts.items.length
  );

  const { isAuthenticated, currentUser } = useSelector(
    (state) => state.auth
  );

  const { wishlist } = useWishlist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* =========================================================
     STATES
  ========================================================= */

  const [cartOpen, setCartOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropRef = useRef(null);

  /* =========================================================
     CLOSE USER DROPDOWN WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handler = (e) => {
      if (
        dropRef.current &&
        !dropRef.current.contains(e.target)
      ) {
        setDropOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener(
        "mousedown",
        handler
      );
    };
  }, []);

  /* =========================================================
     CLOSE MOBILE MENU WHEN SCREEN BECOMES DESKTOP
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =========================================================
     NAVIGATION LINK STYLE
  ========================================================= */

  const linkClass = ({ isActive }) =>
    `
      relative
      px-4
      py-2
      rounded-full
      text-sm
      font-medium
      transition-all
      duration-300
      whitespace-nowrap

      ${
        isActive
          ? `
            bg-red-500
            text-white
            shadow-[0_0_20px_rgba(239,68,68,0.35)]
          `
          : `
            text-gray-300
            hover:text-white
            hover:bg-white/5
          `
      }
    `;

  /* =========================================================
     MOBILE LINK STYLE
  ========================================================= */

  const mobileLinkClass = ({ isActive }) =>
    `
      flex
      items-center
      gap-3
      w-full
      px-4
      py-3
      rounded-xl
      text-sm
      font-medium
      transition-all
      duration-200

      ${
        isActive
          ? `
            bg-red-500
            text-white
            shadow-[0_0_15px_rgba(239,68,68,0.25)]
          `
          : `
            text-gray-300
            hover:text-white
            hover:bg-white/5
          `
      }
    `;

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    dispatch(logout());

    setDropOpen(false);
    setMobileMenuOpen(false);

    navigate("/login");
  };

  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const handleMobileNavigation = () => {
    setMobileMenuOpen(false);
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav
        className="
          sticky
          top-0
          z-50
          w-full

          bg-[#080d16]/95
          backdrop-blur-xl

          border-b
          border-white/10

          shadow-[0_8px_30px_rgba(0,0,0,0.4)]
        "
      >
        <div
          className="
            max-w-[1600px]
            mx-auto

            px-4
            sm:px-6
            lg:px-10

            h-[68px]
            md:h-[76px]

            flex
            items-center
            justify-between
          "
        >

          {/* =================================================
              LEFT SIDE - LOGO
          ================================================= */}

          <NavLink
            to="/"
            onClick={handleMobileNavigation}
            className="
              flex
              items-center
              gap-2
              sm:gap-3
              shrink-0
              group
            "
          >

            {/* Logo Circle */}

            <div
              className="
                relative

                w-9
                h-9

                sm:w-10
                sm:h-10

                md:w-11
                md:h-11

                rounded-full
                overflow-hidden

                bg-[#111827]

                border
                border-red-500/30

                shadow-[0_0_18px_rgba(239,68,68,0.15)]

                group-hover:border-red-500/70

                group-hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]

                transition-all
                duration-300
              "
            >
              <img
                src={logo}
                alt="Fresh Bites Logo"
                className="
                  w-full
                  h-full
                  object-contain

                  group-hover:scale-110

                  transition-transform
                  duration-300
                "
              />
            </div>

            {/* Logo Text */}

            <span
              className="
                text-lg
                sm:text-xl
                md:text-2xl

                font-bold
                tracking-tight

                text-white

                whitespace-nowrap
              "
            >
              Fresh{" "}
              <span className="text-red-500">
                Bites
              </span>
            </span>

          </NavLink>


          {/* =================================================
              DESKTOP CENTER MENU
          ================================================= */}

          <ul
            className="
              hidden
              md:flex

              items-center
              gap-1

              absolute
              left-1/2
              -translate-x-1/2
            "
          >

            <li>
              <NavLink
                to="/"
                className={linkClass}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/food"
                className={linkClass}
              >
                Food
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/cart"
                className={linkClass}
              >
                Cart
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={linkClass}
              >
                Contact
              </NavLink>
            </li>

          </ul>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-1
              sm:gap-2

              text-gray-300
            "
          >

            {/* ===============================================
                SEARCH
            =============================================== */}

            <button
              type="button"
              className="
                hidden
                lg:flex

                w-10
                h-10

                items-center
                justify-center

                rounded-full

                text-gray-400

                hover:text-white
                hover:bg-white/5

                transition-all
                duration-300
              "
              title="Search"
            >
              <i className="ri-search-line text-xl"></i>
            </button>


            {/* ===============================================
                CART
            =============================================== */}

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="
                relative

                w-10
                h-10

                flex
                items-center
                justify-center

                rounded-full

                text-gray-300

                hover:text-white
                hover:bg-white/5

                transition-all
                duration-300
              "
              title="Cart"
            >

              <i
                className="
                  ri-shopping-basket-line
                  text-[21px]
                  sm:text-[22px]
                "
              ></i>

              {cartCount > 0 && (
                <span
                  className="
                    absolute

                    -top-0.5
                    -right-0.5

                    min-w-[18px]
                    h-[18px]

                    px-1

                    flex
                    items-center
                    justify-center

                    rounded-full

                    bg-red-500

                    text-white
                    text-[9px]
                    font-bold

                    border-2
                    border-[#080d16]

                    shadow-[0_0_12px_rgba(239,68,68,0.5)]
                  "
                >
                  {cartCount}
                </span>
              )}

            </button>


            {/* ===============================================
                WISHLIST
            =============================================== */}

            <NavLink
              to="/wishlist"
              className="
                relative

                w-10
                h-10

                flex
                items-center
                justify-center

                rounded-full

                text-gray-300

                hover:text-red-400
                hover:bg-white/5

                transition-all
                duration-300
              "
              title="Wishlist"
            >

              <i
                className="
                  ri-heart-line
                  text-[22px]
                "
              ></i>

              {wishlist.length > 0 && (
                <span
                  className="
                    absolute

                    -top-0.5
                    -right-0.5

                    min-w-[18px]
                    h-[18px]

                    px-1

                    flex
                    items-center
                    justify-center

                    rounded-full

                    bg-red-500

                    text-white
                    text-[9px]
                    font-bold

                    border-2
                    border-[#080d16]

                    shadow-[0_0_12px_rgba(239,68,68,0.5)]
                  "
                >
                  {wishlist.length}
                </span>
              )}

            </NavLink>


            {/* ===============================================
                USER DESKTOP
            =============================================== */}

            <div
              className="
                relative
                ml-0
                sm:ml-1
              "
              ref={dropRef}
            >

              <button
                type="button"
                onClick={() =>
                  isAuthenticated
                    ? setDropOpen(!dropOpen)
                    : navigate("/login")
                }
                className="
                  flex
                  items-center
                  gap-2

                  px-1
                  sm:px-2
                  md:px-3

                  h-10

                  rounded-full

                  text-gray-300

                  hover:text-white
                  hover:bg-white/5

                  transition-all
                  duration-300
                "
              >

                {/* User Icon */}

                <div
                  className="
                    w-8
                    h-8

                    rounded-full

                    flex
                    items-center
                    justify-center

                    bg-gradient-to-br
                    from-red-500
                    to-red-700

                    text-white

                    shadow-[0_0_14px_rgba(239,68,68,0.3)]
                  "
                >
                  <i className="ri-user-line text-lg"></i>
                </div>


                {/* User Name */}

                {isAuthenticated && (
                  <>
                    <span
                      className="
                        hidden
                        lg:block

                        text-sm
                        font-medium

                        text-gray-200

                        max-w-[90px]

                        truncate
                      "
                    >
                      {currentUser?.fullName
                        ?.split(" ")[0]}
                    </span>

                    <i
                      className={`
                        hidden
                        lg:block

                        ri-arrow-down-s-line

                        text-gray-500

                        transition-transform
                        duration-300

                        ${
                          dropOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    ></i>
                  </>
                )}

              </button>


              {/* =============================================
                  USER DROPDOWN
              ============================================= */}

              {dropOpen && isAuthenticated && (
                <div
                  className="
                    absolute

                    right-0
                    top-12
                    md:top-14

                    w-[calc(100vw-32px)]
                    sm:w-64

                    max-w-64

                    overflow-hidden

                    rounded-2xl

                    bg-[#0d1421]/98
                    backdrop-blur-xl

                    border
                    border-white/10

                    shadow-[0_20px_60px_rgba(0,0,0,0.55)]

                    z-[100]
                  "
                >

                  {/* User Information */}

                  <div
                    className="
                      px-5
                      py-4

                      border-b
                      border-white/10

                      bg-gradient-to-r
                      from-red-500/10
                      to-transparent
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-10
                          h-10

                          shrink-0

                          rounded-full

                          flex
                          items-center
                          justify-center

                          bg-red-500

                          text-white
                        "
                      >
                        <i className="ri-user-line text-xl"></i>
                      </div>

                      <div className="min-w-0">

                        <p
                          className="
                            text-sm
                            font-semibold

                            text-white

                            truncate
                          "
                        >
                          {currentUser?.fullName}
                        </p>

                        <p
                          className="
                            text-xs

                            text-gray-500

                            truncate

                            mt-0.5
                          "
                        >
                          {currentUser?.email}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* Dropdown Links */}

                  <div className="p-2">

                    {[
                      {
                        to: "/profile",
                        icon: "ri-user-line",
                        label: "Profile",
                      },
                      {
                        to: "/my-orders",
                        icon: "ri-shopping-bag-line",
                        label: "My Orders",
                      },
                      {
                        to: "/wishlist",
                        icon: "ri-heart-line",
                        label: "Wishlist",
                      },
                    ].map((item) => (

                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() =>
                          setDropOpen(false)
                        }
                        className="
                          flex
                          items-center
                          gap-3

                          px-3
                          py-3

                          rounded-xl

                          text-sm

                          text-gray-300

                          hover:text-white
                          hover:bg-red-500/10

                          transition-all
                          duration-200
                        "
                      >

                        <i
                          className={`
                            ${item.icon}

                            text-lg
                            text-gray-500
                          `}
                        ></i>

                        <span>
                          {item.label}
                        </span>

                        <i
                          className="
                            ri-arrow-right-s-line

                            ml-auto

                            text-gray-600
                          "
                        ></i>

                      </NavLink>

                    ))}

                  </div>


                  {/* Logout */}

                  <div
                    className="
                      p-2

                      border-t
                      border-white/10
                    "
                  >

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        w-full

                        flex
                        items-center
                        gap-3

                        px-3
                        py-3

                        rounded-xl

                        text-sm

                        text-red-400

                        hover:text-red-300
                        hover:bg-red-500/10

                        transition-all
                        duration-200
                      "
                    >

                      <i className="ri-logout-box-line text-lg"></i>

                      <span>
                        Logout
                      </span>

                    </button>

                  </div>

                </div>
              )}

            </div>


            {/* ===============================================
                MOBILE MENU BUTTON
            =============================================== */}

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="
                md:hidden

                w-10
                h-10

                ml-1

                flex
                items-center
                justify-center

                rounded-full

                text-gray-300

                hover:text-white
                hover:bg-white/5

                transition-all
                duration-300
              "
              aria-label="Toggle menu"
            >

              <i
                className={`
                  ${
                    mobileMenuOpen
                      ? "ri-close-line"
                      : "ri-menu-line"
                  }

                  text-2xl
                `}
              ></i>

            </button>

          </div>

        </div>


        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <div
          className={`
            md:hidden

            overflow-hidden

            transition-all
            duration-300
            ease-in-out

            ${
              mobileMenuOpen
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >

          <div
            className="
              px-4
              sm:px-6

              pb-5

              border-t
              border-white/10

              bg-[#080d16]
            "
          >

            {/* Mobile Navigation */}

            <div className="pt-4 space-y-2">

              <NavLink
                to="/"
                onClick={handleMobileNavigation}
                className={mobileLinkClass}
              >
                <i className="ri-home-5-line text-lg"></i>

                <span>
                  Home
                </span>
              </NavLink>


              <NavLink
                to="/food"
                onClick={handleMobileNavigation}
                className={mobileLinkClass}
              >
                <i className="ri-restaurant-2-line text-lg"></i>

                <span>
                  Food
                </span>
              </NavLink>


              <NavLink
                to="/cart"
                onClick={handleMobileNavigation}
                className={mobileLinkClass}
              >
                <i className="ri-shopping-cart-line text-lg"></i>

                <span>
                  Cart
                </span>

                {cartCount > 0 && (
                  <span
                    className="
                      ml-auto

                      min-w-[22px]
                      h-[22px]

                      px-1

                      flex
                      items-center
                      justify-center

                      rounded-full

                      bg-red-500

                      text-white
                      text-[10px]
                      font-bold
                    "
                  >
                    {cartCount}
                  </span>
                )}
              </NavLink>


              <NavLink
                to="/wishlist"
                onClick={handleMobileNavigation}
                className={mobileLinkClass}
              >
                <i className="ri-heart-line text-lg"></i>

                <span>
                  Wishlist
                </span>

                {wishlist.length > 0 && (
                  <span
                    className="
                      ml-auto

                      min-w-[22px]
                      h-[22px]

                      px-1

                      flex
                      items-center
                      justify-center

                      rounded-full

                      bg-red-500

                      text-white
                      text-[10px]
                      font-bold
                    "
                  >
                    {wishlist.length}
                  </span>
                )}
              </NavLink>


              <NavLink
                to="/contact"
                onClick={handleMobileNavigation}
                className={mobileLinkClass}
              >
                <i className="ri-phone-line text-lg"></i>

                <span>
                  Contact
                </span>
              </NavLink>

            </div>


            {/* Mobile User Section */}

            <div
              className="
                mt-4
                pt-4

                border-t
                border-white/10
              "
            >

              {isAuthenticated ? (

                <>

                  {/* User Info */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3

                      px-4
                      py-3

                      mb-2

                      rounded-xl

                      bg-white/[0.03]

                      border
                      border-white/5
                    "
                  >

                    <div
                      className="
                        w-10
                        h-10

                        rounded-full

                        flex
                        items-center
                        justify-center

                        bg-gradient-to-br
                        from-red-500
                        to-red-700

                        text-white
                      "
                    >
                      <i className="ri-user-line text-lg"></i>
                    </div>

                    <div className="min-w-0">

                      <p
                        className="
                          text-sm
                          font-semibold

                          text-white

                          truncate
                        "
                      >
                        {currentUser?.fullName}
                      </p>

                      <p
                        className="
                          text-xs

                          text-gray-500

                          truncate
                        "
                      >
                        {currentUser?.email}
                      </p>

                    </div>

                  </div>


                  {/* Profile */}

                  <NavLink
                    to="/profile"
                    onClick={handleMobileNavigation}
                    className="
                      flex
                      items-center
                      gap-3

                      px-4
                      py-3

                      rounded-xl

                      text-sm

                      text-gray-300

                      hover:text-white
                      hover:bg-white/5
                    "
                  >
                    <i className="ri-user-line text-lg"></i>

                    Profile
                  </NavLink>


                  {/* Orders */}

                  <NavLink
                    to="/my-orders"
                    onClick={handleMobileNavigation}
                    className="
                      flex
                      items-center
                      gap-3

                      px-4
                      py-3

                      rounded-xl

                      text-sm

                      text-gray-300

                      hover:text-white
                      hover:bg-white/5
                    "
                  >
                    <i className="ri-shopping-bag-line text-lg"></i>

                    My Orders
                  </NavLink>


                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full

                      flex
                      items-center
                      gap-3

                      px-4
                      py-3

                      rounded-xl

                      text-sm

                      text-red-400

                      hover:text-red-300
                      hover:bg-red-500/10

                      transition-all
                    "
                  >
                    <i className="ri-logout-box-line text-lg"></i>

                    Logout
                  </button>

                </>

              ) : (

                /* Login */

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="
                    w-full

                    flex
                    items-center
                    justify-center
                    gap-2

                    px-4
                    py-3

                    rounded-xl

                    bg-red-500

                    text-white

                    font-semibold

                    hover:bg-red-600

                    shadow-[0_0_20px_rgba(239,68,68,0.25)]

                    transition-all
                  "
                >
                  <i className="ri-login-box-line text-lg"></i>

                  Login
                </button>

              )}

            </div>

          </div>

        </div>

      </nav>


      {/* =====================================================
          CART DRAWER
      ===================================================== */}

      <CartDrawer
        open={cartOpen}
        setOpen={setCartOpen}
      />

    </>
  );
};

export default Navbar;