import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ResetPasswordrequest } from "../../Redux/hooks/user.actions";
import Loader from "../../constants/loader";
import image from "../../assets/shop.png";
import { MdEmail } from "react-icons/md";

const ForgotPass: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await ResetPasswordrequest(email);
      if (response.Success) {
        setTimeout(() => {
          navigate("/confirm_code");
        }, 200);
      } else {
        console.error("Error:", response.Error || "Unknown error");
      }
    } catch (error) {
      console.error("Error during password reset request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen pt-8 bg-gradient-to-r from-fuchsia-300 to-fuchsia-400">
      {isLoading && <Loader />}
      <div className="h-3/4 w-3/4 mx-auto mt-8 bg-gradient-to-b from-slate-50 to-fuchsia-200 rounded-xl">
        <div className="grid grid-cols-2 h-full gap-4">
          {/* Left Section */}
          <div>
            <h1 className="text-5xl pt-16 pl-16 text-fuchsia-700 font-bold">
              E-COMMERCE STORE
            </h1>
            <p className="pl-16 pr-32 mt-2 text-center text-fuchsia-400 text-sm">
              Shop a variety of quality products at great prices. Find
              everything you need, from trends to essentials!
            </p>
            <img src={image} alt="E-commerce preview" className="h-100 w-100" />
          </div>

          {/* Right Section */}
          <div className="h-[580px] w-[450px] bg-fuchsia-300 mt-12 mb-64 mx-auto rounded-3xl">
            <div>
              <h1 className="pt-32 text-center font-bold text-4xl text-fuchsia-700">
                Forgot Password
              </h1>
              <p className="pl-8 pr-8 mt-2 text-center text-fuchsia-600 text-sm">
                Forgot your password? Please enter the email address associated
                with your account, and we will send you a code to reset your
                password.
              </p>
              <form onSubmit={handleSubmit}>
                <div className=" absolute pt-8 pl-6">
                  <MdEmail className="text-4xl text-fuchsia-700" />
                </div>

                <div className="relative flex flex-row justify-self-center w-2/3 pt-6 rounded-lg">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 font-semibold italic text-2xl"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  className="flex flex-row justify-self-center w-1/3 bg-fuchsia-700 hover:bg-fuchsia-500 pointer-cursor text-2xl text-white p-1 font-serif text-center mt-6 rounded-full"
                  type="submit"
                >
                  Get Link
                </button>
                <p className="text-fuchsia-600 text-center mt-3">
                  Back to{" "}
                  <Link
                    to="/login"
                    className="ml-2 text-fuchsia-500 hover:bg-fuchsia-900"
                  >
                    Login
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

export default ForgotPass;
