import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NewPassword } from "../../Redux/hooks/user.actions";
import image from "../../assets/shop.png";

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
    const token = localStorage.getItem("passToken") || "";
    setResetToken(token);
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

    try {
      const response = await NewPassword({
        requestToken: resetToken,
        password: formData.newPassword,
      });

      if (response.Success) {
        toast.success("Password reset successfully!");
        setTimeout(() => navigate("/login"), 200);
      } else {
        toast.error("Failed to reset password");
      }
    } catch (error) {
      toast.error("An error occurred while resetting your password");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <div className="h-screen mx-auto  pt-8 bg-gradient-to-r from-fuchsia-300 to-fuchsia-400  w-screen ">
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

              <div className="relative flex flex-row justify-self-center w-2/3 pt-6 rounded-lg">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  name="newPassword"
                  className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 font-semibold italic text-2xl"
                  placeholder="New password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute pt-6 right-2 top-1/2 transform -translate-y-1/2"
                  onClick={toggleShowNewPassword}
                >
                  {showNewPassword ? (
                    <VisibilityOff className="text-fuchsia-500" />
                  ) : (
                    <Visibility className="text-fuchsia-500" />
                  )}
                </button>
              </div>

              <div className="relative flex flex-row justify-self-center w-2/3 pt-6 rounded-lg">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  name="confirmPassword"
                  className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 font-semibold italic text-2xl"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute pt-6 right-2 top-1/2 transform -translate-y-1/2"
                  onClick={toggleShowConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <VisibilityOff className="text-fuchsia-500" />
                  ) : (
                    <Visibility className="text-fuchsia-500" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="flex flex-row justify-self-center w-1/2 bg-fuchsia-700 hover:bg-fuchsia-500 pointer-cursor text-2xl text-white p-1 font-serif text-center mt-6 rounded-full"
              >
                Reset Password
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

export default PasswordResetForm;
