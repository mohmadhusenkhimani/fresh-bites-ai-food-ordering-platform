import Sidebar from "./Sidebar";

function AdminLayout({ title, children }) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b px-8 py-5 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">
            {title}
          </h1>
        </div>

        {/* Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;