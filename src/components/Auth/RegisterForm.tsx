import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { RegisteringUser } from "../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../Redux/store";
import Loader from "../../constants/loader";
import { locations } from "../../data/Location";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../Global/Icon";
import { FaCartPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { HiMiniUser } from "react-icons/hi2";

interface Location {
  id: number;
  name: string;
  subLocations: { id: number; name: string }[];
}

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    userimage: "",
    county: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [sortedLocations, setSortedLocations] = useState<Location[]>([]);

  useEffect(() => {
    const sortedCounties = [...locations].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const sortedLocationsArray: Location[] = [];
    sortedCounties.forEach((county) => {
      const sortedSubLocations = [...county.subLocations].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      sortedLocationsArray.push({
        ...county,
        subLocations: sortedSubLocations,
      });
    });
    setSortedLocations(sortedLocationsArray);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          const base64Data = event.target.result as string;
          const base64String = base64Data.split(",")[1]; // Extracting base64 string after comma
          setFormData({ ...formData, userimage: base64String });
        }
      };

      reader.readAsDataURL(files[0]); // Assuming only a single image is selected for simplicity
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!formData.county || !formData.location) {
      toast.error("Please select a county and a location.");
      return;
    }

    await dispatch(RegisteringUser({ formData, navigate }));
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      userimage: "",
      county: "",
      location: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className="mx-auto p-4 bg-gray-light w-screen overflow-auto">
        {isLoading && <Loader />}
        <div
          className="min-w-[300px] max-w-[600px] h-auto w-full bg-white rounded-2xl p-2 py-8 md:p-10 price "
          style={{ margin: "auto" }}
        >
          <div className="flex items-center justify-center gap-3">
            <Icon icon={FaCartPlus} />
          </div>
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6 mt-6">
            <FaUserAlt className="inline-block mr-2 text-blue-600" />
            Sign Up
          </h1>
          <p className="text-center">Please create an account</p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto p-4  rounded-lg  mt-4"
          >
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="mb-4 relative">
                  <HiMiniUser className="absolute text-2xl inset-y-0 mt-3 ml-2 cursor-pointer" />
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pl-10 border font-semibold rounded-lg focus:outline-none focus:border-primary-orange"
                    placeholder="First name"
                    minLength={4}
                    required
                  />
                </div>
                <div className="mb-5 relative">
                  <HiMiniUser className="absolute cursor-pointer text-2xl inset-y-0 mt-3 ml-2" />
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pl-10 border font-semibold rounded-lg focus:outline-none focus:border-primary-orange"
                    placeholder="Last name"
                    required
                    minLength={4}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4 relative">
              <MdEmail className="absolute text-2xl inset-y-0 mt-3 ml-2 cursor-pointer" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 pl-10 border rounded-lg font-semibold focus:outline-none focus:border-primary-orange"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="mb-4 relative">
              <FaPhoneAlt className="absolute cursor-pointer text-2xl inset-y-0 mt-3 ml-2" />
              <input
                type="number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 pl-10 border font-semibold rounded-lg focus:outline-none focus:border-primary-orange"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-4">
              <select
                id="county"
                name="county"
                value={formData.county}
                onChange={handleChange}
                className="w-full px-3 py-2 border font-semibold  rounded-lg focus:outline-none focus:border-primary-orange"
                required
              >
                <option value="">Select County</option>
                {sortedLocations.map((location: Location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2  border font-semibold  rounded-lg focus:outline-none focus:border-primary-orange"
                required
              >
                <option value="">Select Location</option>
                {sortedLocations
                  .find(
                    (location: Location) => location.name === formData.county,
                  )
                  ?.subLocations.map((subLocation) => (
                    <option key={subLocation.id} value={subLocation.name}>
                      {subLocation.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <input
                type="file"
                id="userimage"
                name="userimage"
                onChange={handleImageChange}
                className="rounded:lg"
                accept="image/*"
              />
              {formData.userimage && (
                <img
                  src={`data:image/jpeg;base64,${formData.userimage}`}
                  alt="User Preview"
                  className="h-16 w-16 mt-2 ml-2"
                />
              )}
            </div>
            <div className="mb-4 relative">
              <MdPassword className="absolute text-2xl inset-y-0 mt-3 ml-2 cursor-pointer" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 pl-10 border font-semibold rounded-lg focus:outline-none focus:border-primary-orange"
                placeholder={`Enter password `}
                minLength={4}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute pb-8 right-2 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <p className="text-sm text-gray-500 px-2 py-2">
                The password must be at least 4 characters long{" "}
              </p>
            </div>

            <div className="mb-4 relative">
              <MdPassword className="absolute text-2xl inset-y-0 mt-3 ml-2 cursor-pointer" />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 pl-10 border font-semibold rounded-lg focus:outline-none focus:border-primary-orange"
                placeholder={`Confirm your password `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute  right-2 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              onClick={() => {
                setShowPassword(false);
              }}
              type="submit"
              className="bg-primary-orange text-white py-2 px-4 rounded-xl hover:bg-secondary-orange transition duration-300 w-full"
            >
              Register
            </button>
            <p className="text-gray-500 text-center mt-3">
              Already have an account?
              <Link to="/login" className="ml-2 text-blue-500">
                Sign in
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
