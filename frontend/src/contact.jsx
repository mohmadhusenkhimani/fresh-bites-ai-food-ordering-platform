// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Footer from "./footer";
// import Image from "./image";

// function Contact() {
//   const reduxToken = useSelector((state) => state.auth.token);
//   const token = reduxToken || localStorage.getItem("token");

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [send, setSend] = useState(false);

//   // Fetch logged in user
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/auth/me",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await response.json();

//         if (data.user) {
//           setForm((prev) => ({
//             ...prev,
//             name: data.user.fullName,
//             email: data.user.email,
//           }));
//         }
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     };

//     if (token) {
//       fetchUser();
//     }
//   }, [token]);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.subject || !form.message) {
//       alert("Please fill Subject and Message");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/contact",
//         form
//       );

//       if (response.data.success) {
//         setSend(true);

//         // Keep name and email, clear only subject/message
//         setForm((prev) => ({
//           ...prev,
//           subject: "",
//           message: "",
//         }));
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to send message");
//     }
//   };

//   return (
//     <div>
//       <Image title="Contact Us" />

//       <div className="max-w-6xl mx-auto px-6 py-16">
//         <div className="grid md:grid-cols-2 gap-12">

//           {/* Left Side */}
//           <div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               Get In <span className="text-red-500">Touch</span>
//             </h2>

//             <p className="text-gray-600 mb-8">
//               Have a question or feedback? We'd love to hear from you.
//             </p>

//             <div className="space-y-6">
//               {[
//                 {
//                   icon: "ri-map-pin-line",
//                   title: "Location",
//                   text: "Sola, Ahmedabad, Gujarat",
//                 },
//                 {
//                   icon: "ri-phone-line",
//                   title: "Phone",
//                   text: "+91 12345 67890",
//                 },
//                 {
//                   icon: "ri-mail-line",
//                   title: "Email",
//                   text: "info@company.com",
//                 },
//                 {
//                   icon: "ri-time-line",
//                   title: "Working Hours",
//                   text: "Mon - Fri: 9am - 6pm",
//                 },
//               ].map((item) => (
//                 <div key={item.title} className="flex items-start gap-4">
//                   <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <i className={`${item.icon} text-red-500 text-xl`}></i>
//                   </div>

//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       {item.title}
//                     </p>
//                     <p className="text-gray-600">{item.text}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

//             {send ? (
//               <div className="text-center py-12">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <i className="ri-checkbox-circle-fill text-green-500 text-3xl"></i>
//                 </div>

//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Message Sent!
//                 </h3>

//                 <p className="text-gray-600">
//                   We'll get back to you soon.
//                 </p>

//                 <button
//                   onClick={() => setSend(false)}
//                   className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//                 >
//                   Send Another Message
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-5">

//                 <h3 className="text-xl font-bold text-gray-800">
//                   Send us a Message
//                 </h3>

//                 {/* Name */}
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">
//                     Full Name
//                   </label>

//                   <input
//                     type="text"
//                     value={form.name}
//                     readOnly
//                     className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-100"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">
//                     Email
//                   </label>

//                   <input
//                     type="email"
//                     value={form.email}
//                     readOnly
//                     className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-100"
//                   />
//                 </div>

//                 {/* Subject */}
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">
//                     Subject
//                   </label>

//                   <input
//                     type="text"
//                     name="subject"
//                     value={form.subject}
//                     onChange={handleChange}
//                     className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-300"
//                   />
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">
//                     Message
//                   </label>

//                   <textarea
//                     rows={5}
//                     name="message"
//                     value={form.message}
//                     onChange={handleChange}
//                     className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
//                 >
//                   Send Message
//                 </button>

//               </form>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Contact;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
  FaPaperPlane,
} from "react-icons/fa";
import Footer from "./footer";
import Image from "./image";

function Contact() {
  const reduxToken = useSelector(
    (state) => state.auth?.token
  );

  const token =
    reduxToken || localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);

  /*
   * Fetch logged-in user
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.user) {
          setForm((prev) => ({
            ...prev,
            name: data.user.fullName || "",
            email: data.user.email || "",
          }));
        }
      } catch (error) {
        console.error(
          "Failed to fetch user:",
          error
        );
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  /*
   * Handle Input Changes
   */
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /*
   * Submit Contact Form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.subject.trim() || !form.message.trim()) {
      alert("Please fill Subject and Message");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/contact",
        form
      );

      if (response.data.success) {
        setSend(true);

        // Keep name and email
        // Clear only subject and message
        setForm((prev) => ({
          ...prev,
          subject: "",
          message: "",
        }));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      text: "Sola, Ahmedabad, Gujarat",
    },
    {
      icon: FaPhoneAlt,
      title: "Phone",
      text: "+91 12345 67890",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      text: "info@company.com",
    },
    {
      icon: FaClock,
      title: "Working Hours",
      text: "Mon - Fri: 9am - 6pm",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080d16] text-white">

      {/* ================= BANNER ================= */}
      <Image title="Contact Us" />

      {/* ================= MAIN ================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ==================================================
              LEFT SIDE
          ================================================== */}
          <section className="flex flex-col justify-center">

            {/* Small Label */}
            <div className="inline-flex self-start items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-5">
              <FaEnvelope />
              Contact Fresh Bites
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Get In{" "}
              <span className="text-red-500">
                Touch
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              Have a question, suggestion, or feedback?
              We'd love to hear from you. Send us a message
              and our team will get back to you as soon as
              possible.
            </p>

            {/* Contact Details */}
            <div className="space-y-4">

              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 p-4 sm:p-5 bg-[#101722] border border-white/10 rounded-2xl hover:border-red-500/30 transition-all duration-300"
                  >

                    {/* Icon */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <Icon className="text-red-500 text-lg sm:text-xl" />
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <p className="text-sm text-gray-500 mb-1">
                        {item.title}
                      </p>

                      <p className="text-white font-medium text-sm sm:text-base break-words">
                        {item.text}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>
          </section>

          {/* ==================================================
              RIGHT SIDE
          ================================================== */}
          <section className="bg-[#101722] border border-white/10 rounded-2xl p-5 sm:p-7 lg:p-8 shadow-2xl">

            {send ? (

              /* ================= SUCCESS ================= */
              <div className="text-center py-10 sm:py-16">

                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <FaCheckCircle className="text-green-500 text-4xl" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  Message Sent!
                </h3>

                <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting Fresh Bites.
                  We'll get back to you soon.
                </p>

                <button
                  type="button"
                  onClick={() => setSend(false)}
                  className="mt-8 inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-red-500/10"
                >
                  <FaPaperPlane />
                  Send Another Message
                </button>

              </div>

            ) : (

              /* ================= FORM ================= */
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Form Heading */}
                <div className="mb-6">

                  <h3 className="text-2xl font-bold">
                    Send us a Message
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    Fill in the details below and we'll
                    get back to you.
                  </p>

                </div>

                {/* ================= NAME ================= */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    readOnly
                    placeholder="Your full name"
                    className="w-full bg-[#080d16] border border-white/10 text-gray-400 rounded-xl px-4 py-3 outline-none cursor-not-allowed"
                  />
                </div>

                {/* ================= EMAIL ================= */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    readOnly
                    placeholder="Your email"
                    className="w-full bg-[#080d16] border border-white/10 text-gray-400 rounded-xl px-4 py-3 outline-none cursor-not-allowed"
                  />
                </div>

                {/* ================= SUBJECT ================= */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Enter your subject"
                    required
                    className="w-full bg-[#080d16] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition"
                  />
                </div>

                {/* ================= MESSAGE ================= */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                    className="w-full bg-[#080d16] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition resize-none"
                  />
                </div>

                {/* ================= SUBMIT ================= */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-red-500/10"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>

              </form>
            )}

          </section>
        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  );
}

export default Contact;