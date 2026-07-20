import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "./footer";
import Image from "./image";

function Contact() {
  const reduxToken = useSelector((state) => state.auth.token);
  const token = reduxToken || localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [send, setSend] = useState(false);

  // Fetch logged in user
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
            name: data.user.fullName,
            email: data.user.email,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.subject || !form.message) {
      alert("Please fill Subject and Message");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        form
      );

      if (response.data.success) {
        setSend(true);

        // Keep name and email, clear only subject/message
        setForm((prev) => ({
          ...prev,
          subject: "",
          message: "",
        }));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <div>
      <Image title="Contact Us" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Left Side */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Get In <span className="text-red-500">Touch</span>
            </h2>

            <p className="text-gray-600 mb-8">
              Have a question or feedback? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: "ri-map-pin-line",
                  title: "Location",
                  text: "Sola, Ahmedabad, Gujarat",
                },
                {
                  icon: "ri-phone-line",
                  title: "Phone",
                  text: "+91 12345 67890",
                },
                {
                  icon: "ri-mail-line",
                  title: "Email",
                  text: "info@company.com",
                },
                {
                  icon: "ri-time-line",
                  title: "Working Hours",
                  text: "Mon - Fri: 9am - 6pm",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`${item.icon} text-red-500 text-xl`}></i>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.title}
                    </p>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

            {send ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-checkbox-circle-fill text-green-500 text-3xl"></i>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Message Sent!
                </h3>

                <p className="text-gray-600">
                  We'll get back to you soon.
                </p>

                <button
                  onClick={() => setSend(false)}
                  className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                <h3 className="text-xl font-bold text-gray-800">
                  Send us a Message
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    readOnly
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    readOnly
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-100"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Message
                  </label>

                  <textarea
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Send Message
                </button>

              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;