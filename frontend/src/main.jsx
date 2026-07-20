// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'
// // import { CartProvider } from "./CartContext";
// // import React from 'react';
// // // import ReactDOM from "react-dom/client";
// // import { Provider } from "react-redux";
// // import { store } from "./store";

// // createRoot(document.getElementById('root')).render(
// //   <React.StrictMode>
// //     <Provider store={store}>
// //     <CartProvider>
// //     <App />
// //     </CartProvider>
// //     </Provider>
// //   </React.StrictMode>
// // )

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { CartProvider } from "./CartContext";
// import React from 'react';

// import { Provider } from "react-redux";
// import { store } from "./store";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { BrowserRouter } from "react-router-dom";

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <CartProvider>
//           <App />
//           <ToastContainer position="top-right" autoClose={2000} />
//         </CartProvider>
//       </Provider>
//     </BrowserRouter>
//   </React.StrictMode>
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';

import { Provider } from "react-redux";
import { store } from "./store";

import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

      <Provider store={store}>

        <CartProvider>

          <WishlistProvider>

            <App />

            <ToastContainer 
              position="top-right" 
              autoClose={2000} 
            />

          </WishlistProvider>

        </CartProvider>

      </Provider>

    </BrowserRouter>
  </React.StrictMode>
)