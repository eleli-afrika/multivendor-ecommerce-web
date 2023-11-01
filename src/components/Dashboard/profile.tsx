import { Avatar } from "antd";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../Redux/store";
import { UpdattingOfUser } from "../../Redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

type FormData = {
  firstname: string;
  middlename: string;
  lastname: string;
  location: string;
  phonenumber: string;
  email: string;
  userimage: string;
};

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const userid = user?.userid;

  const [formData, setFormData] = useState<FormData>({
    firstname: user!.firstname,
    middlename: user!.middlename,
    lastname: user!.lastname,
    location: user!.location,
    phonenumber: user!.phone,
    email: user!.email,
    userimage: user!.userimage,
  });

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);
  // console.log(user);
  // Function to handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(UpdattingOfUser({ userid, formData }));

    console.log("Edited data:", formData);
    navigate("/profile");
    // You can send the data to a server or update it locally as needed
  };

  // Function to handle user image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Convert the new image to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        const base64Data = result.split(",")[1]; // Get the base64 string after the comma
        setFormData((prevData) => ({
          ...prevData,
          userimage: base64Data,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 ">
      {/* linkings */}
      <div
        className=" bg-gray-100 h-72 p-4 pb-3 flex flex-col gap-2 capitalize"
        style={{ borderRadius: "0.25rem", minWidth: "350px" }}
      >
        <div
          className="price bg-white p-4 text-gray-500"
          style={{ borderRadius: "0.25rem" }}
        >
          <p>Account Settings</p>
        </div>
        <div
          className="price bg-white p-4 text-gray-500"
          style={{ borderRadius: "0.25rem" }}
        >
          <p>Notifications</p>
        </div>
        <div
          className="price bg-white p-4 text-gray-500"
          style={{ borderRadius: "0.25rem" }}
        >
          <p>Membership plan</p>
        </div>
        <div
          className="price bg-white p-4 text-gray-500"
          style={{ borderRadius: "0.25rem" }}
        >
          <p>password and security</p>
        </div>
      </div>
      {/* userinfo */}
      <div className="bg-gray-100 h-auto w-auto flex-col p-5 pb-5">
        {/* userpic */}
        <div
          className="bg-white p-5 flex gap-3 text-gray-500 price"
          style={{ borderRadius: "0.25rem" }}
        >
          <Avatar
            src={`data:image/jpeg;base64, ${user?.userimage}`}
            className="h-24 w-24"
          />
          <div className="text-center">
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>
        {/* more userInfo */}
        <div
          className="mt-2 text-gray-500 bg-white p-4"
          style={{ borderRadius: "0.25rem" }}
        >
          <p className="text-center">Change your Info</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div>
                <div>
                  <label htmlFor="firstName">First Name:</label>
                </div>
                <div>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="bg-gray-200 w-full p-3 rounded"
                    value={formData.firstname}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="middlename">Middle Name:</label>
                </div>
                <div>
                  <input
                    type="text"
                    id="middlename"
                    name="middlename"
                    className="bg-gray-200 w-full p-3 rounded"
                    value={formData.middlename}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="lastname">Last Name:</label>
                </div>
                <div>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="bg-gray-200 w-full p-3 rounded"
                    value={formData.lastname}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="location">Location:</label>
                </div>
                <div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="bg-gray-200 w-full p-3 rounded"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="phonenumber">Phone Number:</label>
                </div>
                <div>
                  <input
                    type="text"
                    id="phonenumber"
                    name="phonenumber"
                    className="bg-gray-200 w-full p-3 rounded"
                    value={formData.phonenumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="email">Email:</label>
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-gray-200 w-full p-3 rounded"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-orange-500 w-full p-3 rounded mt-5 text-white"
            >
              Edit your info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
