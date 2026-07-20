// import React from 'react';
// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Orders from "./pages/Orders";
// import Foods from "./pages/Foods";
// import Users from "./pages/Users";
// import AddUser from "./pages/AddUser";
// import AddFood from "./pages/AddFood";
// import EditFood from "./pages/EditFood";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/orders" element={<Orders />} />
//       <Route path="/foods" element={<Foods />} />
//       <Route path="/users" element={<Users />} />
//       <Route path="/add-user" element={<AddUser />} />
//       <Route path="/add-food" element={<AddFood />} />
//       <Route path="/edit-food/:id" element={<EditFood />} />
//     </Routes>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Foods from "./pages/Foods";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import AddFood from "./pages/AddFood";
import EditFood from "./pages/EditFood";
import Coupons from "./pages/Coupons";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/foods"
        element={
          <ProtectedRoute>
            <Foods />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-user"
        element={
          <ProtectedRoute>
            <AddUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-food"
        element={
          <ProtectedRoute>
            <AddFood />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-food/:id"
        element={
          <ProtectedRoute>
            <EditFood />
          </ProtectedRoute>
        }
      />

      <Route
  path="/coupons"
  element={
    <ProtectedRoute>
      <Coupons />
    </ProtectedRoute>
  }
/>


    </Routes>
  );
}

export default App;