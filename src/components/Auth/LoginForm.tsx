/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEyeSlash,
  FaEye,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { LoggingUser } from "../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../Redux/store";
import Loader from "../../constants/loader";

const loginVisual =
  "https://www.techfunnel.com/wp-content/uploads/2019/07/Top-Benefits-of-ECommerce-for-Retailers-_-ECommerce-in-retail-1.png";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state: any) => state.auth.isLoading);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(LoggingUser({ formData, navigate })).unwrap();
      setFormData({
        username: "",
        password: "",
      });
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3f1] px-4 py-4 md:px-6 lg:px-8">
      {isLoading && <Loader />}

      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] lg:min-h-[78vh] lg:grid-cols-[48%_52%]">
        {/* Left side */}
        <div className="relative hidden overflow-hidden lg:block">

          <img
            src={loginVisual}
            alt="ECommerce Benefits"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.82))]" />

          {/* glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(255,106,0,0.18),transparent_30%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between p-8 xl:p-10">
            <p className="text-xs tracking-wide text-white/85">
              Smart shopping made simple
            </p>

            <div className="max-w-md">
              <h2 className="text-4xl font-bold leading-[0.95] tracking-tight text-white xl:text-5xl">
                Welcome
                <br />
                Back
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/85">
                Sign in to access your account, manage your orders, and continue
                where you left off.
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
              to="/register"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-primary-orange"
            >
              <FaUserPlus className="text-xs" />
              Sign Up
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center py-4">
            <div className="w-full max-w-md">
              <div className="mb-6">
                <h2 className="text-3xl font-semibold tracking-tight text-[#161616]">
                  Sign In
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter your details to continue.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="h-12 w-full rounded-full border border-[#e6e1dc] bg-white pl-12 pr-4 text-sm font-medium text-gray-800 outline-none transition focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/10"
                    placeholder="Email or Username"
                    required
                  />
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
                    placeholder="Password"
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

                <div className="flex items-center justify-end">
                  <Link
                    to="/reset_password_request"
                    className="text-sm font-medium text-primary-orange transition hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-orange to-secondary-orange text-sm font-semibold text-white shadow-[0_10px_24px_rgba(255,106,0,0.24)] transition duration-300 hover:scale-[1.01]"
                >
                  <FaSignInAlt />
                  Sign In
                </button>

                <p className="pt-1 text-center text-sm text-gray-500">
                  Don&apos;t have an account?
                  <Link
                    to="/register"
                    className="ml-2 font-semibold text-primary-orange hover:underline"
                  >
                    Sign up
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

export default LoginForm;