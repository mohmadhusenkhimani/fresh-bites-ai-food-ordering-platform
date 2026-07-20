import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Orders",
    path: "/orders",
  },
  {
    name: "Foods",
    path: "/foods",
  },
  {
    name: "Coupons",
    path: "/coupons",
  },
  {
    name: "Users",
    path: "/users",
  },
];
  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-md sticky top-0">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-red-500">
          Fresh Bites Admin
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Management Panel
        </p>
      </div>

      <ul className="p-4 space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-red-500 text-white shadow"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;