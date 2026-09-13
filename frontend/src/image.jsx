// import React from "react";
// import logo from "./assets/logo.png" 
// import back from "./assets/p-3.jpg"
// function Image({ title }) {
//     return (
//         <div>
// <section
//             className="relative h-[200px] md:h-[260px] w-full bg-center bg-cover opacity-50"
//             style={{ backgroundImage: `url(${back})` }}>
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/40"></div>

//             {/* Content */}
//             <div className="relative z-10 flex items-center h-full">
//                 <div className="max-w-7xl text-left px-6">
//                     <h1 className="text-4xl md:text-5xl font-bold text-white">
//                       {title}
//                     </h1>
//                 </div>
//             </div>
//         </section>
//         </div>
//     )
// }
// export default Image

import React from "react";
import back from "./assets/p-3.jpg";

function Image({ title }) {
  return (
    <section className="relative w-full h-[180px] sm:h-[210px] md:h-[250px] lg:h-[280px] overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${back})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#080d16]/75" />

      {/* Red Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080d16]/90 via-[#080d16]/50 to-red-950/30" />

      {/* Bottom Border / Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-red-500/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            {/* Small Label */}
            <p className="text-red-500 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2">
              Fresh Bites
            </p>

            {/* Page Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {title}
            </h1>

            {/* Decorative Line */}
            <div className="mt-4 flex items-center gap-2">
              <span className="w-12 sm:w-16 h-1 bg-red-500 rounded-full" />
              <span className="w-2 h-1 bg-red-500/50 rounded-full" />
              <span className="w-2 h-1 bg-red-500/30 rounded-full" />
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}

export default Image;