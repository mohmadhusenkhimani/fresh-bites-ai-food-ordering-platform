import React from "react";
import logo from "./assets/logo.png" 
import back from "./assets/p-3.jpg"
function Image({ title }) {
    return (
        <div>
<section
            className="relative h-[200px] md:h-[260px] w-full bg-center bg-cover opacity-50"
            style={{ backgroundImage: `url(${back})` }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 flex items-center h-full">
                <div className="max-w-7xl text-left px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                      {title}
                    </h1>
                </div>
            </div>
        </section>
        </div>
    )
}
export default Image