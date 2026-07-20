// import { Routes, Route } from "react-router-dom";
// // import Navbar from "./navbar";
// import Navbar from "./navbar";
// // import ReactDOM from "react-dom/client";
// // import { BrowserRouter } from "react-router-dom";
// import Home from "./home";
// import PopularFoods from "./PopularFoods";
// import HotPizza from "./HotPizza";
// import Footer from "./footer";
// import Food from "./food.jsx";
// import Cart from "./cart";
// import { CartProvider } from "./CartContext";
// import Contact from "./contact";
// import PaymentFormPage from "./paymentForm";
// import Login from "./login";
// import Signup from "./signup";
// import Image from "./image";
// import MyOrders from "./MyOrders";
// import TrackOrder from "./TrackOrder";
// import Profile from "./Profile";
// import VerifyEmail from "./VerifyEmail";



// const App = () => {
//   return (
//     <>
     
//     {/* <BrowserRouter> */}
   
//       <Navbar />
      
//       <Routes>
//         <Route path="/" element={<Home></Home>} />
//         <Route path="/PopularFoods" element={<PopularFoods></PopularFoods>}></Route>
//         <Route path="/HotPizza" element={<HotPizza></HotPizza>}></Route>
//         <Route path="/contact" element={<Contact></Contact>}></Route>
//         <Route path="/food" element={<Food></Food>}></Route>
//         <Route path="/cart" element={<Cart></Cart>}></Route>
//         <Route path="/CartContext" element={<CartProvider></CartProvider>}></Route>
//         <Route path="/footer" element={<Footer></Footer>}></Route>
//         <Route path="/paymentForm" element={<PaymentFormPage></PaymentFormPage>}></Route>
//         <Route path="/login" element={<Login></Login>}></Route>
//         <Route path="/signup" element={<Signup></Signup>}></Route>
//         <Route path="/image" element={<Image></Image>}></Route>
//         <Route path="/my-orders" element={<MyOrders></MyOrders>}></Route>
//         <Route path="/track-order/:id" element={<TrackOrder></TrackOrder>}></Route>
//         <Route
//   path="/verify-email/:token"
//   element={<VerifyEmail />}
// />
//         <Route path="/profile" element={<Profile></Profile>}></Route> 
        
//         {/* <Route path="/food" element={<h1>Food</h1>} />
//         <Route path="/cart" element={<h1>Cart</h1>} />
//         <Route path="/contact" element={<h1>Contact</h1>} />
//          */}
//       </Routes>
      
//       {/* </BrowserRouter> */}
//     </>
//   );
// };

// export default App;


// import { Routes, Route } from "react-router-dom";
// import Navbar from "./navbar";
// import Home from "./home";
// import PopularFoods from "./PopularFoods";
// import HotPizza from "./HotPizza";
// import Footer from "./footer";
// import Food from "./food";
// import Cart from "./cart";
// import { CartProvider } from "./CartContext";
// import Contact from "./contact";
// import PaymentFormPage from "./paymentForm";
// import Login from "./login";
// import Signup from "./signup";
// import Image from "./image";
// import MyOrders from "./MyOrders";
// import TrackOrder from "./TrackOrder";
// import Profile from "./Profile";
// import VerifyEmail from "./VerifyEmail";
// import Wishlist from "./Wishlist"; // <-- ADD THIS
// import FoodDetails from "./FoodDetails";

// const App = () => {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/PopularFoods" element={<PopularFoods />} />
//         <Route path="/HotPizza" element={<HotPizza />} />
//         <Route path="/food" element={<Food />} />
//         <Route path="/food/:id" element={<FoodDetails />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/wishlist" element={<Wishlist />} /> {/* <-- ADD THIS */}
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/paymentForm" element={<PaymentFormPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/image" element={<Image />} />
//         <Route path="/my-orders" element={<MyOrders />} />
//         <Route path="/track-order/:id" element={<TrackOrder />} />
//         <Route path="/verify-email/:token" element={<VerifyEmail />} />
//         <Route path="/profile" element={<Profile />} />

//         {/* This route is not needed because CartProvider is not a page */}
//         {/* <Route path="/CartContext" element={<CartProvider />} /> */}

//         <Route path="/footer" element={<Footer />} />
//       </Routes>
//     </>
//   );
// };

// export default App;

import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./navbar";
import Home from "./home";
import PopularFoods from "./PopularFoods";
import HotPizza from "./HotPizza";
import Footer from "./footer";
import Food from "./food";
import Cart from "./cart";
import Contact from "./contact";
import PaymentFormPage from "./paymentForm";
import Login from "./login";
import Signup from "./signup";
import Image from "./image";
import MyOrders from "./MyOrders";
import TrackOrder from "./TrackOrder";
import Profile from "./Profile";
import VerifyEmail from "./VerifyEmail";
import Wishlist from "./Wishlist";
import FoodDetails from "./FoodDetails";
// Multiple Delivery Addresses
import MyAddresses from "./pages/MyAddresses";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {

  return (
    <>

      <Navbar />

      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />


      <Routes>

        <Route 
          path="/" 
          element={<Home />} 
        />


        <Route 
          path="/PopularFoods" 
          element={<PopularFoods />} 
        />


        <Route 
          path="/HotPizza" 
          element={<HotPizza />} 
        />


        <Route 
          path="/food" 
          element={<Food />} 
        />


        <Route 
          path="/food/:id" 
          element={<FoodDetails />} 
        />


        <Route 
          path="/cart" 
          element={<Cart />} 
        />


        <Route 
          path="/wishlist" 
          element={<Wishlist />} 
        />


        <Route 
          path="/contact" 
          element={<Contact />} 
        />


        <Route 
          path="/paymentForm" 
          element={<PaymentFormPage />} 
        />


        <Route 
          path="/login" 
          element={<Login />} 
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route 
          path="/signup" 
          element={<Signup />} 
        />


        <Route 
          path="/image" 
          element={<Image />} 
        />


        {/* Orders */}
        <Route 
          path="/my-orders" 
          element={<MyOrders />} 
        />


        <Route 
          path="/track-order/:id" 
          element={<TrackOrder />} 
        />


        {/* Email Verification */}
        <Route 
          path="/verify-email/:token" 
          element={<VerifyEmail />} 
        />


        {/* Profile */}
        <Route 
          path="/profile" 
          element={<Profile />} 
        />


        {/* Multiple Delivery Addresses */}
        <Route 
          path="/my-addresses" 
          element={<MyAddresses />} 
        />


        {/* Footer */}
        <Route 
          path="/footer" 
          element={<Footer />} 
        />


      </Routes>


    </>
  );
};


export default App;