// import Sidebar from "./Sidebar";

// function AdminLayout({ title, children }) {
//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       <Sidebar />

//       <div className="flex-1">
//         {/* Header */}
//         <div className="bg-white border-b px-8 py-5 shadow-sm">
//           <h1 className="text-3xl font-bold text-gray-800">
//             {title}
//           </h1>
//         </div>

//         {/* Content */}
//         <div className="p-8">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;

import Sidebar from "./Sidebar";

function AdminLayout({ title, children }) {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#080d16] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <main className="flex-1 min-w-0">

        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#080d16]/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 sm:px-6 lg:px-8 py-5">

            <div className="flex items-center justify-between gap-4">

              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-red-500 font-semibold uppercase tracking-wider mb-1">
                  Fresh Bites
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">
                  {title}
                </h1>
              </div>

              {/* Admin Status */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <span className="text-xs sm:text-sm text-gray-400">
                  Admin Online
                </span>
              </div>

            </div>

          </div>
        </header>

        {/* Page Content */}
        <section className="p-4 sm:p-6 lg:p-8">
          <div className="w-full min-w-0">
            {children}
          </div>
        </section>

      </main>

    </div>
  );
}

export default AdminLayout;