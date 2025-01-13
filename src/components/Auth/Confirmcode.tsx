import React, { useEffect, useState } from "react";
import { ConfirmCode } from "../../Redux/hooks/user.actions";
import Loader from "../../constants/loader";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

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
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      // Handle error here, such as displaying a toast message or other feedback to the user
    }
  };

  return (
    <div className="px-[5px] lg:px-0">
      <div className="w-full max-w-xl mx-auto bg-white rounded-lg ">
        {loading && <Loader />}

        <div className="flex items-center justify-center gap-3">
          <div className="text-primary-yellow text-8xl">
            <FaCartPlus />
          </div>
        </div>
        <form
          className="  rounded px-4 lg:px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="flex ">
            <p className="mb-4 text-sm text-black-main">
              Please enter the confirmation code sent to your email address. You
              may need to check your spam folder.
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="code"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirmation Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter confirmation code"
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-primary-orange hover:bg-secondary-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center w-full"
              type="submit"
            >
              Confirm Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmCodeForm;
