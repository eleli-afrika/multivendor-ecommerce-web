/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaEye, FaCartPlus, FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { HiMiniUser } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

import { RegisteringUser } from "../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../Redux/store";
import Loader from "../../constants/loader";
import { locations } from "../../data/Location";
import Icon from "../Global/Icon";

interface Location {
  id: number;
  name: string;
  subLocations: { id: number; name: string }[];
}

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    phone: "",
    location: "",
    password: "",
  });

  const [sortedLocations, setSortedLocations] = useState<Location[]>([]);

  useEffect(() => {
    const sortedCounties = [...locations].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedLocations(sortedCounties);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.location) {
      toast.error("Please select a county.");
      return;
    }

    console.log("Submitting formData:", formData);

    try {
      await dispatch(RegisteringUser({ formData, navigate })).unwrap();

      setFormData({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        phone: "",
        location: "",
        password: "",
      });
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  return (
    <div className="mx-auto p-4 bg-gray-light w-screen overflow-auto">
      {isLoading && <Loader />}

      <div
        className="min-w-[300px] max-w-[600px] h-auto w-full bg-white rounded-2xl p-2 py-8 md:p-10 price"
        style={{ margin: "auto" }}
      >
        <div className="flex items-center justify-center gap-3">
          <Icon icon={FaCartPlus} />
        </div>

        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6 mt-6">
          <FaUserAlt className="inline-block mr-2 text-blue-600" />
          Sign Up
        </h1>

        <p className="text-center">Please create an account</p>

        <form onSubmit={handleSubmit} className="mx-auto p-4 rounded-lg mt-4">
          <div className="mb-4 relative">
            <HiMiniUser className="absolute text-2xl inset-y-0 mt-3 ml-2 cursor-pointer" />
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border font-semibold rounded-lg focus:outline-none focus:border-primary-orange"
              placeholder="First name"
              minLength={2}
              required
            />
          </div>

          <div className="mb-4 relative">
            <HiMiniUser className="absolute text-2xl inset-y-0 mt-3 ml-2 cursor-pointer" />
            <input
              type="text"
              id="middlename"
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border font-semibold rounded-lg focus:outline-none focus:border-primary-orange"
              placeholder="Middle name"
              minLength={2}
              required
            />
          </div>

          <div className="mb-4 relative">
            <HiMiniUser className="absolute text-2xl inset-y-0 mt-3 ml-2 cursor-pointer" />
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border font-semibold rounded-lg focus:outline-none focus:border-primary-orange"
              placeholder="Last name"
              minLength={2}
              required
            />
          </div>

          <div className="mb-4 relative">
            <MdEmail className="absolute text-2xl inset-y-0 mt-3 ml-2 cursor-pointer" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border rounded-lg font-semibold focus:outline-none focus:border-primary-orange"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="mb-4 relative">
            <FaPhoneAlt className="absolute text-2xl inset-y-0 mt-3 ml-2 cursor-pointer" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border font-semibold rounded-lg focus:outline-none focus:border-primary-orange"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-4">
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border font-semibold rounded-lg focus:outline-none focus:border-primary-orange"
              required
            >
              <option value="">Select County</option>
              {sortedLocations.map((county: Location) => (
                <option key={county.id} value={county.name}>
                  {county.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 relative">
            <MdPassword className="absolute text-2xl inset-y-0 mt-3 ml-2 cursor-pointer" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border font-semibold rounded-lg focus:outline-none focus:border-primary-orange"
              placeholder="Enter password"
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p className="text-sm text-gray-500 px-2 py-2">
              Enter a secure password
            </p>
          </div>

          <button
            type="submit"
            className="bg-primary-orange text-white py-2 px-4 rounded-xl hover:bg-secondary-orange transition duration-300 w-full"
          >
            Register
          </button>

          <p className="text-gray-500 text-center mt-3">
            Already have an account?
            <Link to="/login" className="ml-2 text-blue-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;