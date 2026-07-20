import { FaUserCircle, FaBell } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import CartDrawer from "./CartDrawer";
import { useState, useEffect, useRef } from "react";
import { logout } from "./authSlice";
import { useWishlist } from "./context/WishlistContext";
import { addToWishlist } from "./wishlistSlice";

const Navbar = () => {

  const cartCount = useSelector(state => state.carts.items.length);
  const [cartOpen, setCartOpen] = useState(false);
   const navigate = useNavigate();

   const { wishlist } = useWishlist();

// console.log("Wishlist in Navbar:", wishlist);




   // const [cartOpen, setCartOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);
  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-orange-500 font-semibold"
      : "hover:text-orange-500";

      const dispatch = useDispatch();
const { isAuthenticated, currentUser } = useSelector((state) => state.auth);


  
const handleLogout = () => {
  dispatch(logout());
  setDropOpen(false);
  navigate("/login");
};
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      
      {/* Left - Logo */}
      <NavLink to="/" className="flex items-center space-x-2">
        <img
          src={logo}
          alt="FoodApp Logo"
          className="h-10 w-auto"
        />
        <span className="text-xl font-bold text-red-500">
          Fresh Bites
        </span>
      </NavLink>

      {/* Center - Menu */}
      <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
        <li>
          <NavLink to="/" className={linkClass}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/food" className={linkClass}>Food</NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={linkClass}>Cart</NavLink>
        </li>
      
        <li>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </li>
        
      </ul>

      {/* Right - Icons */}
      <div className="flex items-center space-x-5 text-gray-700 text-2xl">
       <button
  onClick={() => setCartOpen(true)}
  className="relative p-2 hover:bg-gray-100 rounded"
>
  {/* Cart Icon */}
  <i className="ri-shopping-basket-line text-2xl text-gray-800"></i>

  {/* Badge */}
  <span
    className="absolute -top-1 -right-1 bg-red-500 text-white
               text-[10px] font-semibold rounded-full
               w-5 h-5 flex items-center justify-center"
  >
    {cartCount}
  </span>
</button>



{/* Wishlist Icon */}
<NavLink
  to="/wishlist"
  className="relative p-2 hover:bg-gray-100 rounded"
>
  <i className="ri-heart-line text-2xl text-red-500"></i>

  {wishlist.length > 0 && (
    <span
      className="
      absolute -top-1 -right-1 
      bg-red-500 text-white
      text-[10px] font-semibold
      rounded-full
      w-5 h-5
      flex items-center justify-center
      "
    >
      {wishlist.length}
    </span>
  )}
</NavLink>

      {/* Drawer - passes state */}
      <CartDrawer open={cartOpen} setOpen={setCartOpen} />

        {/* <span className="user">
  <button
      onClick={() => navigate("/login")}
      className="p-2 rounded hover:bg-gray-100 transition"
    >
      <i className="ri-user-line text-2xl text-gray-800"></i>
    </button>
</span> */}


    {/* {isAuthenticated ? (
  <button
    onClick={handleLogout}
    className="text-sm bg-red-500 text-white px-3 py-1 rounded"
  >
    Logout
  </button>
) : (
  <button
    onClick={() => navigate("/login")}
    className="p-2 rounded hover:bg-gray-100 transition"
  >
    <i className="ri-user-line text-2xl text-gray-800"></i>
  </button>
)} */}

    {/* User Dropdown */}
        <div className="relative" ref={dropRef}>
          <button
            onClick={() => isAuthenticated ? setDropOpen(!dropOpen) : navigate("/login")}
            className="flex items-center gap-1 p-2 rounded hover:bg-gray-100 transition"
          >
            <i className={`ri-user-line text-2xl ${isAuthenticated ? "text-red-500" : "text-gray-800"}`}></i>
            {isAuthenticated && (
              <span className="text-xs text-red-500 font-medium hidden md:block max-w-20 truncate">
                {currentUser?.fullName?.split(" ")[0]}
              </span>
            )}
          </button>

          {/* Dropdown Menu */}
          {dropOpen && isAuthenticated && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800 truncate">{currentUser?.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
              </div>
              {[
                { to: "/profile", icon: "ri-user-line", label: "Profile"},
                { to: "/my-orders", icon: "ri-shopping-bag-line", label: "My Orders"},
              ].map((item)=>(
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={()=> setDropOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <i className={`${item.icon} text-base`}></i> {item.label}
                  </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition border-t border-gray-100 mt-1"
              >
                <i className="ri-logout-box-line text-base"></i> Logout
              </button>
            </div>
           )} 
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
