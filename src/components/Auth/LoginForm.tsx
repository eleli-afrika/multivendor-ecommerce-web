import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { LoggingUser } from "../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../Redux/store";
import Loader from "../../constants/loader";
import { Link, useNavigate } from "react-router-dom";

const LoginForm: React.FC = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  // const userToken = useSelector((state: any) => state.auth.userToken);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(LoggingUser({ formData, navigate }));
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="h-screen mx-auto p-4 bg-gray-light w-screen ">
        {isLoading && <Loader />}
        <div
          className="min-w-[300px] max-w-[600px] h-auto  w-full bg-white rounded-2xl p-2 py-8 md:p-10  pb-20"
          style={{ margin: "auto" }}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="text-primary-orange text-8xl">
              <FaCartPlus />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto p-4  rounded-lg mt-4 "
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange h-12"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2 "
              >
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange h-12"
                placeholder={`Enter password `}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/6"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="bg-primary-orange text-white py-2 px-4 rounded-xl hover:bg-secondary-orange transition duration-300 w-full"
            >
              Submit
            </button>

            <p className="text-gray-500 text-center mt-3">
              Forgot password?
              <Link to="/reset_password_request" className="ml-2 text-blue-500">
                Reset password
              </Link>{" "}
            </p>
            <p className="text-gray-500 text-center mt-3">
              You do not have an account?
              <Link to="/register" className="ml-2 text-blue-500">
                Sign up
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
