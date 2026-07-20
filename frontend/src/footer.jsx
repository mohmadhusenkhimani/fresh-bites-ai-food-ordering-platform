import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import logo from "./assets/logo.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async () => {
    if (!email) return;
    try {
      const res = await fetch("http://localhost:5000/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMsg(data.message);
      if (data.success) setEmail("");
      setTimeout(() => setMsg(""), 3000);
    } catch {
      setMsg("Something went wrong.");
    }
  };

  return (
    <footer className="bg-[#fde9e7] pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LOGO */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
              <img src={logo} alt="FoodApp Logo" className="h-10 w-auto" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Fresh Bites</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            Welcome to Fresh Bites, your ultimate destination for delicious and fresh online food ordering!
          </p>
        </div>

        {/* DELIVERY TIME */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Delivery Time</h3>
          <p className="font-medium text-gray-800">Monday - Friday</p>
          <p className="text-sm text-gray-600 mb-4">10:00am - 11:00pm</p>
          <p className="font-medium text-gray-800">Saturday - Sunday</p>
          <p className="text-sm text-gray-600">Full Day</p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-700 mb-2"><span className="font-medium">Location:</span> Sola, Ahmedabad</p>
          <p className="text-sm text-gray-700 mb-2"><span className="font-medium">Phone:</span> 8511755852</p>
          <p className="text-sm text-gray-700 mb-2"><span className="font-medium">Email:</span> support@freshbites.com</p>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-600 mb-4">Subscribe our newsletter</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-l-md focus:outline-none text-sm"
            />
            <button
              onClick={handleSubscribe}
              className="bg-red-600 px-4 flex items-center justify-center rounded-r-md text-white hover:bg-red-700 transition"
            >
              <FiSend />
            </button>
          </div>
          {msg && <p className={`text-xs mt-2 ${msg.includes("success") || msg.includes("🎉") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
       <p className="text-sm text-gray-600">
  © {new Date().getFullYear()} Fresh Bites. All Rights Reserved.
</p>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Follow:</span>
          {[FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn].map((Icon, i) => (
            <a key={i} className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-red-700 transition">
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
