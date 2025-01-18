import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { RegisteringUser } from "../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../Redux/store";
import Loader from "../../constants/loader";
import { locations } from "../../data/Location";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/shop.png";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaFileImage } from "react-icons/fa6";

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
      <div className="h-screen mx-auto p-4 bg-gradient-to-r from-fuchsia-300 to-fuchsia-400 w-screen">
        {isLoading && <Loader />}
        <div className="h-auto w-3/4 ml-48 mt-8 bg-gradient-to-b from-slate-50 to-fuchsia-200">
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
            <div className="h-auto w-[450px] bg-fuchsia-300 mt-12 mb-64 ml-52 mr-12 rounded-3xl">
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <h1 className="mt-6 mb-3 text-center font-bold text-4xl text-fuchsia-700">
                      User Registration
                    </h1>
                  </div>
                  <div className="absolute pt-2 pl-6">
                    <FaUser className="text-3xl text-fuchsia-700" />
                  </div>

                  <div className="">
                    <div className="relative flex flex-row justify-self-center w-2/3  text-fuchsia-400 rounded-lg">
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 h-1/4 font-semibold italic text-lg"
                        placeholder="First name"
                        minLength={4}
                        required
                      />
                    </div>
                    <div className="absolute pt-7 pl-6">
                      <FaUser className="text-3xl text-fuchsia-700" />
                    </div>
                    <div className="relative flex flex-row justify-self-center w-2/3 pt-6 text-fuchsia-400 rounded-lg">
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 h-1/4 font-semibold italic text-lg"
                        placeholder="Last name"
                        required
                        minLength={4}
                      />
                    </div>
                  </div>
                  <div className="absolute pt-7 pl-6">
                    <MdEmail className="text-3xl text-fuchsia-700" />
                  </div>
                  <div className="relative flex flex-row justify-self-center w-2/3 pt-6 text-fuchsia-400 rounded-lg">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 h-1/4 font-semibold italic text-lg"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div className="absolute pt-7 pl-6">
                    <FaPhoneAlt className="text-3xl text-fuchsia-700" />
                  </div>
                  <div className="relative flex flex-row justify-self-center w-2/3 pt-6 text-fuchsia-400 rounded-lg">
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 h-1/4 font-semibold italic text-lg"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div className="absolute pt-5 pl-6">
                    <FaLocationDot className="text-3xl text-fuchsia-700" />
                  </div>
                  <div className="relative flex flex-row justify-self-center w-2/3 pt-6 text-fuchsia-400 rounded-lg">
                    <select
                      id="county"
                      name="county"
                      value={formData.county}
                      onChange={handleChange}
                      className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 h-1/4 font-semibold italic text-lg"
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
                  <div className="absolute pt-5 pl-6">
                    <FaLocationDot className="text-3xl text-fuchsia-700" />
                  </div>
                  <div className="relative flex flex-row justify-self-center w-2/3 pt-6 text-fuchsia-400 rounded-lg">
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 h-1/4 font-semibold italic text-lg"
                      required
                    >
                      <option
                        value=""
                        className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 h-1/4 font-semibold italic text-lg"
                      >
                        Select Location
                      </option>
                      {sortedLocations
                        .find(
                          (location: Location) =>
                            location.name === formData.county,
                        )
                        ?.subLocations.map((subLocation) => (
                          <option key={subLocation.id} value={subLocation.name}>
                            {subLocation.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="absolute pt-14 pl-6">
                    <FaFileImage className="text-3xl text-fuchsia-700" />
                  </div>
                  <div className="relative flex flex-row justify-self-center w-2/3 pt-6 text-fuchsia-400 rounded-lg">
                    <input
                      type="file"
                      id="userimage"
                      name="userimage"
                      onChange={handleImageChange}
                      className="flex flex-row justify-self-center w-full rounded-lg bg-fuchsia-700 hover:bg-fuchsia-500 pointer-cursor text-2xl text-white p-1 font-serif text-center mt-6"
                      accept="image/*"
                    />
                    <div className="ml-4">
                      {formData.userimage && (
                        <img
                          src={`data:image/jpeg;base64,${formData.userimage}`}
                          alt="User Preview"
                          className="h-20 w-18 mt-6"
                        />
                      )}
                    </div>
                  </div>
                  <div className="absolute pt-8 pl-6">
                    <FaLock className="text-3xl text-fuchsia-700" />
                  </div>

                  <div className="relative flex flex-row justify-self-center w-2/3 pt-6 text-fuchsia-400 rounded-lg">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 h-1/4 font-semibold italic text-lg"
                      placeholder="Enter password"
                      minLength={4}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute pt-6  right-2 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="absolute pt-8 pl-6">
                    <FaLock className="text-3xl text-fuchsia-700" />
                  </div>

                  <div className="relative flex flex-row justify-self-center w-2/3 pt-6 text-fuchsia-400 rounded-lg">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full font-serif text-fuchsia-500 placeholder-fuchsia-400 h-1/4 font-semibold italic text-lg"
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute pt-6 right-2 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="flex flex-row justify-self-center w-1/4 bg-fuchsia-700 hover:bg-fuchsia-500 pointer-cursor text-2xl text-white p-1 font-serif text-center mt-6 rounded-full"
                    >
                      Register
                    </button>
                  </div>
                </form>
                <div className="text-fuchsia-600 text-center mt-3">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="ml-2 text-fuchsia-500 hover:bg-fuchsia-900"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
