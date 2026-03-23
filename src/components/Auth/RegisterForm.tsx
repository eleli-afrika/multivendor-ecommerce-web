/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEyeSlash,
  FaEye,
  FaPhoneAlt,
  FaUserPlus,
  FaSignInAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { HiMiniUser } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

import { RegisteringUser } from "../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../Redux/store";
import Loader from "../../constants/loader";
import { locations } from "../../data/Location";

interface Location {
  id: number;
  name: string;
  subLocations: { id: number; name: string }[];
}

const authVisual =
  "https://www.techfunnel.com/wp-content/uploads/2019/07/Top-Benefits-of-ECommerce-for-Retailers-_-ECommerce-in-retail-1.png";

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
    <div className="min-h-screen bg-[#f5f3f1] px-4 py-4 md:px-6 lg:px-8">
      {isLoading && <Loader />}

      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] lg:min-h-[78vh] lg:grid-cols-[48%_52%]">
        {/* Left side */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src={authVisual}
            alt="ECommerce Benefits"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.82))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(255,106,0,0.18),transparent_30%)]" />

          <div className="relative z-10 flex h-full text-center flex-col justify-between p-8 xl:p-10">
            <p className="text-xs tracking-wide text-white/85">
              Start your shopping journey
            </p>

            <div className="max-w-md">
              <h2 className="text-4xl font-bold leading-[0.95] tracking-tight text-white xl:text-5xl">
                Create
                <br />
                Account
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/85">
                Join now to manage your account, place orders easily, and enjoy
                a seamless shopping experience.
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col bg-[#f8f7f5] px-5 py-5 sm:px-8 md:px-10 lg:px-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-tight text-[#161616]">
                Your Store
              </h1>
              <p className="text-xs text-gray-500">
                Shop smarter, faster, easier
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-primary-orange"
            >
              <FaSignInAlt className="text-xs" />
              Sign In
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center py-4">
            <div className="w-full max-w-lg">
              <div className="mb-6">
                <h2 className="text-3xl font-semibold tracking-tight text-[#161616]">
                  Sign Up
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Create your account to get started.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <HiMiniUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="h-12 w-full rounded-full border border-[#e6e1dc] bg-white pl-12 pr-4 text-sm font-medium text-gray-800 outline-none transition focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/10"
                      placeholder="First name"
                      minLength={2}
                      required
                    />
                  </div>

                  <div className="relative">
                    <HiMiniUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                    <input
                      type="text"
                      id="middlename"
                      name="middlename"
                      value={formData.middlename}
                      onChange={handleChange}
                      className="h-12 w-full rounded-full border border-[#e6e1dc] bg-white pl-12 pr-4 text-sm font-medium text-gray-800 outline-none transition focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/10"
                      placeholder="Middle name"
                      minLength={2}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <HiMiniUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="h-12 w-full rounded-full border border-[#e6e1dc] bg-white pl-12 pr-4 text-sm font-medium text-gray-800 outline-none transition focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/10"
                      placeholder="Last name"
                      minLength={2}
                      required
                    />
                  </div>

                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12 w-full rounded-full border border-[#e6e1dc] bg-white pl-12 pr-4 text-sm font-medium text-gray-800 outline-none transition focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/10"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 w-full rounded-full border border-[#e6e1dc] bg-white pl-12 pr-4 text-sm font-medium text-gray-800 outline-none transition focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/10"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-gray-400" />
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="h-12 w-full appearance-none rounded-full border border-[#e6e1dc] bg-white pl-12 pr-4 text-sm font-medium text-gray-800 outline-none transition focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/10"
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

                <div className="relative">
                  <MdPassword className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 w-full rounded-full border border-[#e6e1dc] bg-white pl-12 pr-12 text-sm font-medium text-gray-800 outline-none transition focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/10"
                    placeholder="Create password"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-primary-orange"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <p className="px-1 text-xs text-gray-500">
                  Use at least 6 characters for a secure password.
                </p>

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-orange to-secondary-orange text-sm font-semibold text-white shadow-[0_10px_24px_rgba(255,106,0,0.24)] transition duration-300 hover:scale-[1.01]"
                >
                  <FaUserPlus />
                  Create Account
                </button>

                <p className="pt-1 text-center text-sm text-gray-500">
                  Already have an account?
                  <Link
                    to="/login"
                    className="ml-2 font-semibold text-primary-orange hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default RegisterForm;