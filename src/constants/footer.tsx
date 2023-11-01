import {
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import { IconButton } from "@mui/material";

const Footer = () => {
  return (
    <div className=" w-full relative">
      <div
        className="top-0 left-0 p-10 flex flex-wrap justify-around"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "black",
          color: "#9da2ad",
          fontFamily: "Poppins, helvetica, Arial",
          fontSize: "15px",
          lineHeight: "20px",
          width: "100%",
          minHeight: "100%",
          borderRadius: "0",
        }}
      >
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <h1 className="text-lg font-semibold mb-2">Quick Links</h1>
          <ul className="list-none ">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <h1 className="text-lg font-semibold mb-2">Payment Methods</h1>
          <ul className="list-none">
            <li>
              <a href="#">M-Pesa</a>
            </li>
            <li>
              <a href="#">Credit Card</a>
            </li>
            <li>
              <a href="#">PayPal</a>
            </li>
            <li>
              <a href="#">Bitcoin</a>
            </li>
            <li>
              <a href="#">Bank Transfer</a>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <h1 className="text-lg font-semibold mb-2">Important</h1>
          <ul className="list-none">
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <h1 className="text-lg font-semibold mb-2">Reach Us</h1>
          <ul className="list-none">
            <li className="mb-1">
              <IconButton
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "50%",
                }}
              >
                <a href="#" className="text-white flex items-center">
                  <FaFacebook color="blue" />
                </a>
              </IconButton>
            </li>
            <li className="mb-1">
              <IconButton
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "50%",
                }}
              >
                <a href="#" className="text-white flex items-center">
                  <FaPhone color="gray" />
                </a>
              </IconButton>
            </li>
            <li className="mb-1">
              <IconButton
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "50%",
                }}
              >
                <a href="#" className="text-white flex items-center">
                  <FaEnvelope color="orange" />
                </a>
              </IconButton>
            </li>
            <li className="mb-1">
              <IconButton
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "50%",
                }}
              >
                <a href="#" className="text-white flex items-center">
                  <FaYoutube color="red" />
                </a>
              </IconButton>
            </li>
            <li className="mb-1">
              <IconButton
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "50%",
                }}
              >
                <a href="#" className="text-white flex items-center">
                  <FaWhatsapp color="green" />
                </a>
              </IconButton>
            </li>
          </ul>
        </div>

        <div style={{ borderTop: " solid 2px #DC5F00" }} className="w-full">
          <p className="text-center text-white py-2 mt-2">
            © EDUKA 2023 || All Rights Reserved
          </p>
          <p className="text-center text-white py-2 mt-2">0706244557</p>
          <p className="text-center text-white py-2 mt-2">
            Physical Location @ Moi Avenue , Veteran House 6Th Floor Room 606
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
