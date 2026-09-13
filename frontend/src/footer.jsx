// import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
// import { FiSend } from "react-icons/fi";
// import { useState } from "react";
// import logo from "./assets/logo.png";

// export default function Footer() {
//   const [email, setEmail] = useState("");
//   const [msg, setMsg] = useState("");

//   const handleSubscribe = async () => {
//     if (!email) return;
//     try {
//       const res = await fetch("http://localhost:5000/api/newsletter/subscribe", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await res.json();
//       setMsg(data.message);
//       if (data.success) setEmail("");
//       setTimeout(() => setMsg(""), 3000);
//     } catch {
//       setMsg("Something went wrong.");
//     }
//   };

//   return (
//     <footer className="bg-[#fde9e7] pt-14 pb-6">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

//         {/* LOGO */}
//         <div>
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
//               <img src={logo} alt="FoodApp Logo" className="h-10 w-auto" />
//             </div>
//             <h2 className="text-xl font-bold text-gray-900">Fresh Bites</h2>
//           </div>
//           <p className="text-gray-600 leading-relaxed text-sm">
//             Welcome to Fresh Bites, your ultimate destination for delicious and fresh online food ordering!
//           </p>
//         </div>

//         {/* DELIVERY TIME */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Delivery Time</h3>
//           <p className="font-medium text-gray-800">Monday - Friday</p>
//           <p className="text-sm text-gray-600 mb-4">10:00am - 11:00pm</p>
//           <p className="font-medium text-gray-800">Saturday - Sunday</p>
//           <p className="text-sm text-gray-600">Full Day</p>
//         </div>

//         {/* CONTACT */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Contact</h3>
//           <p className="text-sm text-gray-700 mb-2"><span className="font-medium">Location:</span> Sola, Ahmedabad</p>
//           <p className="text-sm text-gray-700 mb-2"><span className="font-medium">Phone:</span> 8511755852</p>
//           <p className="text-sm text-gray-700 mb-2"><span className="font-medium">Email:</span> support@freshbites.com</p>
//         </div>

//         {/* NEWSLETTER */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
//           <p className="text-sm text-gray-600 mb-4">Subscribe our newsletter</p>
//           <div className="flex">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="px-4 py-2 w-full border border-gray-300 rounded-l-md focus:outline-none text-sm"
//             />
//             <button
//               onClick={handleSubscribe}
//               className="bg-red-600 px-4 flex items-center justify-center rounded-r-md text-white hover:bg-red-700 transition"
//             >
//               <FiSend />
//             </button>
//           </div>
//           {msg && <p className={`text-xs mt-2 ${msg.includes("success") || msg.includes("🎉") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
//         </div>

//       </div>

//       {/* BOTTOM BAR */}
//       <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
//        <p className="text-sm text-gray-600">
//   © {new Date().getFullYear()} Fresh Bites. All Rights Reserved.
// </p>
//         <div className="flex items-center gap-4">
//           <span className="text-sm font-medium">Follow:</span>
//           {[FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn].map((Icon, i) => (
//             <a key={i} className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-red-700 transition">
//               <Icon />
//             </a>
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// }

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import { FiSend, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { useState } from "react";
import logo from "./assets/logo.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMsg("Please enter your email.");
      setTimeout(() => setMsg(""), 3000);
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/newsletter/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      setMsg(data.message);

      if (data.success) {
        setEmail("");
      }

      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Newsletter Error:", error);
      setMsg("Something went wrong.");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  return (
    <footer className="relative bg-[#060b13] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 lg:pt-20 pb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* LOGO / ABOUT */}
          <div className="sm:col-span-2 lg:col-span-1">

            <div className="flex items-center gap-3 mb-5">

              {/* Logo */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Fresh Bites Logo"
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Fresh{" "}
                  <span className="text-red-500">
                    Bites
                  </span>
                </h2>

                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">
                  Fresh • Fast • Delicious
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Welcome to Fresh Bites, your ultimate destination
              for delicious, fresh, and quality food delivered
              straight to your doorstep.
            </p>

            {/* Social Icons */}
            <div className="mt-6">

              <p className="text-sm font-semibold text-gray-300 mb-3">
                Follow Us
              </p>

              <div className="flex items-center gap-3">

                <a
                  href="#"
                  aria-label="Facebook"
                  className="
                    w-9 h-9
                    rounded-xl
                    bg-[#101722]
                    border border-white/10
                    flex items-center justify-center
                    text-gray-400
                    hover:bg-red-500
                    hover:text-white
                    hover:border-red-500
                    transition-all duration-300
                  "
                >
                  <FaFacebookF className="text-sm" />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="
                    w-9 h-9
                    rounded-xl
                    bg-[#101722]
                    border border-white/10
                    flex items-center justify-center
                    text-gray-400
                    hover:bg-red-500
                    hover:text-white
                    hover:border-red-500
                    transition-all duration-300
                  "
                >
                  <FaInstagram className="text-sm" />
                </a>

                <a
                  href="#"
                  aria-label="YouTube"
                  className="
                    w-9 h-9
                    rounded-xl
                    bg-[#101722]
                    border border-white/10
                    flex items-center justify-center
                    text-gray-400
                    hover:bg-red-500
                    hover:text-white
                    hover:border-red-500
                    transition-all duration-300
                  "
                >
                  <FaYoutube className="text-sm" />
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="
                    w-9 h-9
                    rounded-xl
                    bg-[#101722]
                    border border-white/10
                    flex items-center justify-center
                    text-gray-400
                    hover:bg-red-500
                    hover:text-white
                    hover:border-red-500
                    transition-all duration-300
                  "
                >
                  <FaLinkedinIn className="text-sm" />
                </a>

              </div>
            </div>
          </div>

          {/* DELIVERY TIME */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-5">
              Delivery Time
            </h3>

            <div className="space-y-5">

              <div>
                <p className="text-sm font-semibold text-gray-200">
                  Monday - Friday
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  10:00 AM - 11:00 PM
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-200">
                  Saturday - Sunday
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Full Day
                </p>
              </div>

              {/* Status */}
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <span className="text-xs font-medium text-green-400">
                  Open for Orders
                </span>
              </div>

            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-5">
              Contact Us
            </h3>

            <div className="space-y-4">

              {/* Location */}
              <div className="flex items-start gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <FiMapPin className="text-red-400" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    Location
                  </p>

                  <p className="text-sm text-gray-300">
                    Sola, Ahmedabad
                  </p>
                </div>

              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <FiPhone className="text-red-400" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    Phone
                  </p>

                  <p className="text-sm text-gray-300">
                    8511755852
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex items-start gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <FiMail className="text-red-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-1">
                    Email
                  </p>

                  <p className="text-sm text-gray-300 break-all">
                    support@freshbites.com
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-5">
              Newsletter
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Subscribe to our newsletter and get the latest
              food updates, offers, and special deals.
            </p>

            {/* Email Input */}
            <div className="flex w-full bg-[#101722] border border-white/10 rounded-xl overflow-hidden focus-within:border-red-500/50 transition">

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubscribe();
                  }
                }}
                className="
                  min-w-0
                  flex-1
                  px-3 sm:px-4
                  py-3
                  bg-transparent
                  text-white
                  placeholder-gray-600
                  text-xs sm:text-sm
                  focus:outline-none
                "
              />

              <button
                onClick={handleSubscribe}
                aria-label="Subscribe to newsletter"
                className="
                  w-11 sm:w-12
                  flex-shrink-0
                  flex
                  items-center
                  justify-center
                  bg-red-500
                  hover:bg-red-600
                  active:scale-95
                  text-white
                  transition-all duration-200
                "
              >
                <FiSend className="text-base" />
              </button>

            </div>

            {/* Message */}
            {msg && (
              <p
                className={`
                  text-xs
                  mt-3
                  ${
                    msg.toLowerCase().includes("success") ||
                    msg.includes("🎉")
                      ? "text-green-400"
                      : "text-red-400"
                  }
                `}
              >
                {msg}
              </p>
            )}

            <p className="text-[11px] text-gray-600 mt-3">
              We respect your privacy. No spam.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mt-12 sm:mt-14" />

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-7 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-300 font-medium">
              Fresh Bites
            </span>
            . All Rights Reserved.
          </p>

          <div className="flex items-center gap-5 text-xs sm:text-sm text-gray-500">

            <a
              href="#"
              className="hover:text-red-400 transition"
            >
              Privacy Policy
            </a>

            <span className="w-1 h-1 rounded-full bg-gray-700" />

            <a
              href="#"
              className="hover:text-red-400 transition"
            >
              Terms & Conditions
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
}