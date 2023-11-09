import { Avatar } from 'antd';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '../../Redux/slices/AuthSlice';
import { AppDispatch } from '../../Redux/store';
import { UpdattingOfUser } from '../../Redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../constants/loader';

type FormData = {
    firstname: string;
    middlename: string;
    lastname: string;
    location: string;
    phone: string;
    email: string;
    userimage: string;
};

const Profile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.auth.user);
    const userid = user?.userid;
    const { isLoading } = useSelector((state: any) => state.loaders);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(getLoggedInUser());
    }, []);

    const [formData, setFormData] = useState<FormData>({
        firstname: user?.firstname,
        middlename: user?.middlename,
        lastname: user?.lastname,
        location: user?.location,
        phone: user?.phone,
        email: user?.email,
        userimage: user?.userimage,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(UpdattingOfUser({ userid, formData }));
        navigate('/login');
        setIsEditing(false); // Toggle editing off after submission
    };

    const handleEdit = () => {
        setIsEditing(true);
    };
    // Function to handle user image upload
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            // Convert the new image to base64
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                const base64Data = result.split(',')[1]; // Get the base64 string after the comma
                setFormData((prevData) => ({
                    ...prevData,
                    userimage: base64Data,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col md:flex-row gap-10 ">
            {/* linkings */}
            <div
                className=" bg-gray-100 h-72 p-4 pb-3 flex flex-col gap-2 capitalize min-w-[350px] lg:min-w-[400px]"
                style={{ borderRadius: '0.25rem', minWidth: '350px' }}
            >
                <div
                    className="price bg-primary-orange p-4 text-white"
                    style={{ borderRadius: '0.25rem' }}
                >
                    <p>Account Settings</p>
                </div>
                <div
                    className="price bg-white p-4 text-gray-500"
                    style={{ borderRadius: '0.25rem' }}
                    onClick={() => navigate('/notifications')}
                >
                    <p>Notifications</p>
                </div>
                <div
                    className="price bg-white p-4 text-gray-500"
                    style={{ borderRadius: '0.25rem' }}
                >
                    <p>Membership plan</p>
                </div>
                <div
                    className="price bg-white p-4 text-gray-500"
                    style={{ borderRadius: '0.25rem' }}
                >
                    <p>password and security</p>
                </div>
            </div>
            {/* userinfo */}
            <div className="bg-gray-100 h-auto w-auto flex-col p-5 pb-5">
                {/* userpic */}
                <div
                    className="bg-white p-5 flex gap-3 text-gray-500 price"
                    style={{ borderRadius: '0.25rem' }}
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
                    style={{ borderRadius: '0.25rem' }}
                >
                    <div className="text-center">
                        {!isEditing && (
                            <button
                                onClick={handleEdit}
                                className="bg-primary-orange p-3 text-white rounded hover:bg-secondary-orange transition-colors delay-300 "
                            >
                                Update your Info
                            </button>
                        )}
                        {isEditing && (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-primary-orange p-3 text-white rounded hover:bg-secondary-orange transition-colors delay-300 "
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="my-form">
                        <div className="flex flex-col gap-4">
                            <div>
                                <div>
                                    <label htmlFor="firstName">First Name:</label>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                            className="bg-gray-200 w-full p-3 rounded"
                                            value={formData.firstname}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{user?.firstname}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="middleName">Middle Name:</label>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="middlename"
                                            name="middlename"
                                            className="bg-gray-200 w-full p-3 rounded"
                                            value={formData.middlename}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{user?.middlename}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="lastName">Last Name:</label>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            className="bg-gray-200 w-full p-3 rounded"
                                            value={formData.lastname}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{user?.lastname}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="location">Location:</label>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            className="bg-gray-200 w-full p-3 rounded"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{user?.location}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="phone">Phone Number:</label>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            className="bg-gray-200 w-full p-3 rounded"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{user?.phone}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="bg-gray-200 w-full p-3 rounded"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{user?.email}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        {isEditing && (
                            <button
                                type="submit"
                                className="bg-primary-orange hover:bg-secondary-orange transition-colors delay-300 w-full p-3 rounded mt-5 text-white"
                            >
                                Save Changes
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
