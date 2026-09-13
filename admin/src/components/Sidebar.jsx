// import { Link, useLocation } from "react-router-dom";

// function Sidebar() {
//   const location = useLocation();
// const menuItems = [
//   {
//     name: "Dashboard",
//     path: "/dashboard",
//   },
//   {
//     name: "Orders",
//     path: "/orders",
//   },
//   {
//     name: "Foods",
//     path: "/foods",
//   },
//   {
//     name: "Coupons",
//     path: "/coupons",
//   },
//   {
//     name: "Users",
//     path: "/users",
//   },
// ];
//   return (
//     <div className="w-64 min-h-screen bg-white border-r shadow-md sticky top-0">
//       <div className="p-6 border-b">
//         <h2 className="text-2xl font-bold text-red-500">
//           Fresh Bites Admin
//         </h2>

//         <p className="text-sm text-gray-500 mt-1">
//           Management Panel
//         </p>
//       </div>

//       <ul className="p-4 space-y-2">
//         {menuItems.map((item) => (
//           <li key={item.path}>
//             <Link
//               to={item.path}
//               className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
//                 location.pathname === item.path
//                   ? "bg-red-500 text-white shadow"
//                   : "text-gray-700 hover:bg-red-50 hover:text-red-500"
//               }`}
//             >
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiShoppingBag,
  FiCoffee,
  FiTag,
  FiUsers,
  FiChevronRight,
} from "react-icons/fi";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiGrid,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: FiShoppingBag,
    },
    {
      name: "Foods",
      path: "/foods",
      icon: FiCoffee,
    },
    {
      name: "Coupons",
      path: "/coupons",
      icon: FiTag,
    },
    {
      name: "Users",
      path: "/users",
      icon: FiUsers,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#080d16] border-r border-white/10 sticky top-0 flex flex-col">
      
      {/* Logo / Header */}
      <div className="px-6 py-7 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <FiCoffee className="text-red-500 text-xl" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white leading-tight">
              Fresh Bites
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="text-[11px] uppercase tracking-widest text-gray-600 font-semibold px-3 mb-3">
          Management
        </p>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              (item.path !== "/dashboard" &&
                location.pathname.startsWith(item.path + "/"));

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                      : "text-gray-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-white rounded-r-full" />
                  )}

                  <Icon
                    className={`text-xl flex-shrink-0 ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-red-400"
                    }`}
                  />

                  <span className="flex-1">{item.name}</span>

                  {isActive && (
                    <FiChevronRight className="text-white/80 text-lg" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10">
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center">
              <FiUsers className="text-red-500" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">
                Administrator
              </p>

              <p className="text-xs text-gray-500 truncate">
                Fresh Bites
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;