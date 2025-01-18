import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { LoggingUser } from "../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../Redux/store";
import Loader from "../../constants/loader";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/shop.png";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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
      <div className="h-screen mx-auto p-4 bg-gradient-to-r from-fuchsia-300 to-fuchsia-400  w-screen ">
        {isLoading && <Loader />}
        <div className="h-3/4 w-3/4 ml-48 mt-8 bg-gradient-to-b from-slate-50 to-fuchsia-200">
          <div className="grid grid-cols-2 h-full gap-4">
            <div>
              <h1 className="text-5xl pt-16 pl-16 text-fuchsia-700 font-bold">
                E-COMMERCE STORE
              </h1>
              <p className="pl-16 pr-32 mt-2 text-center text-fuchsia-400 text-sm">
                Shop a variety of quality products at great prices. Find
                everything you need, from trends to essentials!
              </p>
              <img src={image} alt="image" className="h-100 w-100" />
            </div>
            <div className="h-[580px] w-[450px] bg-fuchsia-300 mt-12 mb-64 ml-52 mr-12 rounded-3xl">
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <h1 className="pt-32 text-center font-bold text-4xl text-fuchsia-700">
                      User Login
                    </h1>
                  </div>
                  <div className=" absolute pt-8 pl-6">
                    <MdEmail className="text-4xl text-fuchsia-700" />
                  </div>

                  <div className="relative flex flex-row justify-self-center w-2/3 pt-6 rounded-lg">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 font-semibold italic text-2xl"
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <div className=" absolute pt-8 pl-6">
                    <FaLock className="text-4xl text-fuchsia-700" />
                  </div>

                  <div className="relative flex flex-row justify-self-center w-2/3 pt-6 text-fuchsia-400 rounded-lg">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400  font-semibold italic text-2xl"
                      placeholder={`Password `}
                      minLength={4}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute pb-8 right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <div className="pt-14">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setShowPassword(false);
                    }}
                    type="submit"
                    className="flex flex-row justify-self-center w-1/4 bg-fuchsia-700 hover:bg-fuchsia-500 pointer-cursor text-2xl text-white p-1 font-serif text-center mt-6 rounded-full"
                  >
                    LOGIN
                  </button>
                </form>
                <p className="text-fuchsia-600 text-center mt-3">
                  Forgot your password?
                  <Link
                    to="/reset_password_request"
                    className="ml-2 text-fuchsia-500 hover:bg-fuchsia-900"
                  >
                    Reset Password
                  </Link>{" "}
                </p>
                <p className="text-fuchsia-600 text-center mt-3">
                  Don't have an account?
                  <Link
                    to="/register"
                    className="ml-2 text-fuchsia-500 hover:bg-fuchsia-900"
                  >
                    Create Account
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
