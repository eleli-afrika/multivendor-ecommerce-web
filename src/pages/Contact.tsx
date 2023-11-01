import { useState } from "react";
import {
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { IconButton } from "@mui/material";

const Contact = () => {
  const [loading] = useState(false);

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 p-20  bg-gray-200 shadow-xl ">
      {/* Contact card */}
      <div className="flex-[0.55] bg-gray-light p-8 rounded-2xl">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Send us a Message
        </h1>
        <form className="space-y-6">
          {/* Your Name */}
          <div>
            <label htmlFor="name" className="block text-black font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              className="w-full py-3 px-4 bg-white text-black placeholder-text-secondary rounded-lg outline-none border-none font-medium"
            />
          </div>
          {/* Your Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-black font-medium mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full py-3 px-4 bg-white text-black placeholder-text-secondary rounded-lg outline-none border-none font-medium"
            />
          </div>
          {/* Your Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-black font-medium mb-2"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter Your Message"
              className="w-full py-3 px-4 bg-white text-black placeholder-text-secondary rounded-lg outline-none border-none font-medium resize-none"
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-3 px-8 rounded-xl text-white font-bold shadow-md focus:outline-none ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-tertiary-orange"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
      {/* Message */}
      <div>
        <h1 className="text-2xl font-bold text-primary mb-6">
          Need to Make an Enquiry?
        </h1>
        <p className="text-gray-600 mb-6">
          We respond between 9 a.m. and 9 p.m.
        </p>
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold">Reach Us</h1>
          <ul className="flex space-x-2">
            <li>
              <IconButton
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "50%",
                }}
              >
                <a href="#" className="text-black">
                  <FaFacebook color="blue" />
                </a>
              </IconButton>
            </li>
            <li>
              <IconButton
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "50%",
                }}
              >
                <a href="#" className="text-black">
                  <FaPhone color="gray" />
                </a>
              </IconButton>
            </li>
            <li>
              <IconButton
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "50%",
                }}
              >
                <a href="#" className="text-black">
                  <FaEnvelope color="orange" />
                </a>
              </IconButton>
            </li>
            <li>
              <IconButton
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "50%",
                }}
              >
                <a href="#" className="text-black">
                  <FaYoutube color="red" />
                </a>
              </IconButton>
            </li>
            <li>
              <IconButton
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "50%",
                }}
              >
                <a href="#" className="text-black">
                  <FaWhatsapp color="green" />
                </a>
              </IconButton>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
