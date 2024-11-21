import React, { useState } from "react";
import BG from "../Component/BG";
import Footer from "../Component/Footer"; // Import the Footer component

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(data.message);
            setFormData({ name: "", email: "", subject: "", message: "" });
          } else {
            alert("Error: " + data.error);
          }
        })
        .catch((error) => {
          console.error("Error submitting the form:", error);
        });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 mb-36">
        <BG />
        <h1 className="text-center text-3xl font-extrabold text-white mb-6">
          Contact Us
        </h1>
        <div className="relative group">
          {/* Gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-800 rounded-lg blur-sm group-hover:blur opacity-75 transition duration-300"></div>

          {/* Transparent form */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-gray-950 rounded-lg p-6 border border-transparent"
          >
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.name ? "border-red-500" : ""
                }`}
                id="name"
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : ""
                }`}
                id="email"
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.subject ? "border-red-500" : ""
                }`}
                id="subject"
                type="text"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs italic">{errors.subject}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.message ? "border-red-500" : ""
                }`}
                id="message"
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs italic">{errors.message}</p>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="flex bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 px-36 rounded focus:outline-none focus:shadow-outline transition duration-1000 ease-in-out justify-center text-center"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add the Footer */}
      <Footer />
    </>
  );
};

export default ContactForm;
