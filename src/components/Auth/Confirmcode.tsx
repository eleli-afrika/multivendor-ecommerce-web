import React, { useEffect, useState } from "react";
import { ConfirmCode } from "../../Redux/hooks/user.actions";
import Loader from "../../constants/loader";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/shop.png";

const ConfirmCodeForm: React.FC = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setResetToken(localStorage.getItem("passToken") || ""); // Initialize resetToken with an empty string if not found in localStorage
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the function to confirm the code
      setLoading(true);
      const response = await ConfirmCode({
        requestCode: code,
        requestToken: resetToken,
      });
      setLoading(false);
      if (response.Success) {
        setTimeout(() => {
          navigate("/reset_password");
        }, 200);
      } else {
        // Handle unsuccessful response if needed
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      // Handle error here, such as displaying a toast message or other feedback to the user
    }
  };

  return (
    <div className="h-screen mx-auto p-4 bg-gradient-to-r from-fuchsia-300 to-fuchsia-400 w-screen">
      <div className="h-3/4 w-3/4 ml-48 mt-8 bg-gradient-to-b from-slate-50 to-fuchsia-200">
        <div className="grid grid-cols-2 h-full gap-4">
          <div className="flex flex-col justify-center items-start p-16">
            <h1 className="text-5xl font-bold text-fuchsia-700">
              E-COMMERCE STORE
            </h1>
            <p className="mt-4 text-sm text-fuchsia-400">
              Shop a variety of quality products at great prices. Find
              everything you need, from trends to essentials!
            </p>
            <img src={image} alt="E-Commerce" className="h-100 w-100" />
          </div>
          <div className="h-[580px] w-[450px] bg-fuchsia-300 mx-auto mt-12 mb-16 rounded-3xl p-8">
            <form onSubmit={handleSubmit}>
              <h1 className="pt-32 text-center font-bold text-4xl text-fuchsia-700">
                Password Reset
              </h1>
              <p className="pl-8 pr-8 mt-2 text-center text-fuchsia-600 text-sm">
                Please enter the confirmation code sent to your email address.
                You may need to check your spam folder.
              </p>
              <div className="relative flex flex-row justify-self-center w-2/3 pt-6 rounded-lg">
                <input
                  type="text"
                  id="code"
                  name="code"
                  className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 font-semibold italic text-2xl"
                  placeholder="Confirmation code"
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <button
                className="flex flex-row justify-self-center w-1/2 bg-fuchsia-700 hover:bg-fuchsia-500 pointer-cursor text-2xl text-white p-1 font-serif text-center mt-6 rounded-full"
                type="submit"
              >
                Confirm Code
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
  );
};

export default ConfirmCodeForm;
