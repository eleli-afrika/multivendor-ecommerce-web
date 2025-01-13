import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NewPassword } from "../../Redux/hooks/user.actions";
import { FaCartPlus } from "react-icons/fa";

interface PasswordResetInput {
  newPassword: string;
  confirmPassword: string;
}

const PasswordResetForm: React.FC = () => {
  const [formData, setFormData] = useState<PasswordResetInput>({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setResetToken(localStorage.getItem("passToken") || ""); // Initialize resetToken with an empty string if not found in localStorage
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetToken) {
      toast.error("Reset token is missing");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Call the reset password service
    try {
      const response = await NewPassword({
        requestToken: resetToken,
        password: formData.newPassword,
      });

      if (response.Success) {
        setTimeout(() => {
          navigate("/login");
        }, 200);
      } else {
      }
    } catch (error: any) {
      // Handle errors, possibly extracting message from error object
      toast.error("An error occurred while resetting your password");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div>
      <div className="w-full max-w-xl mx-auto bg-white rounded-lg ">
        <div className="flex items-center justify-center gap-3">
          <div className="text-primary-orange text-8xl">
            <FaCartPlus />
          </div>
        </div>
        <form className="  rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="flex ">
            <p className="mb-4 text-sm text-black-main text-center">
              Reset your password below
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="new-password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="new-password"
                name="newPassword"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary-orange"
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2"
                onClick={toggleShowNewPassword}
              >
                {showNewPassword ? (
                  <VisibilityOff className="text-gray-600" />
                ) : (
                  <Visibility className="text-gray-600" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2"
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? (
                  <VisibilityOff className="text-gray-600" />
                ) : (
                  <Visibility className="text-gray-600" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary-orange hover:bg-secondary-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center w-full"
              type="submit"
            >
              Reset Password
            </button>
          </div>
          <p className="items-center mt-4 text-gray-700 text-center">
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

export default PasswordResetForm;
