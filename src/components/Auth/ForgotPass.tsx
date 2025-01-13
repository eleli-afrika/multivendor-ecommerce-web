import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ResetPasswordrequest } from "../../Redux/hooks/user.actions";
import Loader from "../../constants/loader";
import { FaCartPlus } from "react-icons/fa";
import Icon from "../Global/Icon";
import { MdEmail } from "react-icons/md";

const ForgotPass: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await ResetPasswordrequest(email);
    setIsLoading(false);
    console.log(response);
    if (response.Success) {
      setTimeout(() => {
        navigate("/confirm_code");
      }, 200);
    } else {
    }

    setIsLoading(false);
  };

  return (
    <div className="px-[5px] lg:px-0">
      <div className="w-full max-w-xl mx-auto bg-white rounded-lg ">
        {loading && <Loader />}
        <div className="flex items-center justify-center gap-3">
          <div className="mt-6">
            <Icon icon={FaCartPlus} />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-center text-3xl pt-4">
            Reset Password
          </h1>
        </div>

        <form
          className="  rounded px-4 lg:px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-center">
            {" "}
            <p className="mb-4 text-sm text-black-main ">
              Forgot your password? Please enter the email address associated
              with your account, and we will send you a code to reset your
              password.
            </p>
          </div>
          <div className="mb-6 relative">
            <MdEmail className="absolute text-2xl inset-y-0 mt-3 ml-2 cursor-pointer" />
            <input
              type="email"
              id="email"
              name="email"
              className="border pl-10 font-semibold rounded-lg focus:outline-none focus:border-primary-orange rounded w-full py-2 px-3 text-gray-700 leading-tight "
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-primary-orange hover:bg-secondary-orange text-white font-bold py-2 px-4 rounded-lg   items-center w-full"
              type="submit"
            >
              Get Link
            </button>
          </div>
          <p className="items-center mt-5 text-gray-700 text-center">
            {" "}
            Back to{" "}
            <Link to="/login" className="text-blue-400 ml-2">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
