import React, { useState } from 'react';
import Logo from '../../assets/logo.jpeg';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { RegisteringUser } from '../../Redux/slices/AuthSlice';
import { AppDispatch } from '../../Redux/store';
import Loader from '../../constants/loader';
import { locations } from '../../data/Location';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = ({}) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const isLoading = useSelector((state: any) => state.auth.isLoading);
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        phone: '',
        userimage: '',
        location: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                    const base64String = base64Data.split(',')[1]; // Extracting base64 string after comma
                    setFormData({ ...formData, userimage: base64String });
                }
            };

            reader.readAsDataURL(files[0]); // Assuming only a single image is selected for simplicity
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate first name, middle name, and last name to ensure they don't contain numbers
        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(formData.firstname)) {
            toast.error('First name cannot contain numbers.');
            return;
        }

        if (!nameRegex.test(formData.middlename)) {
            toast.error('Middle name cannot contain numbers.');
            return;
        }

        if (!nameRegex.test(formData.lastname)) {
            toast.error('Last name cannot contain numbers.');
            return;
        }

        // Password validation: at least 8 characters, one special character, and one capital letter
        const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            toast.error(
                'Password must be at least 8 characters long, contain at least one special character, and have at least one capital letter.'
            );
            return;
        }

        // Check if password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        dispatch(RegisteringUser(formData));
        navigate('/login');

        setFormData({
            firstname: '',
            middlename: '',
            lastname: '',
            email: '',
            phone: '',
            userimage: '',
            location: '',
            password: '',
            confirmPassword: '',
        });
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className="h-screen mx-auto p-4 bg-gray-light w-screen overflow-auto">
                <div
                    className="min-w-[300px] max-w-[600px] h-auto w-full bg-white rounded-2xl p-2 py-8 md:p-10 price "
                    style={{ margin: 'auto' }}
                >
                    <div className="flex items-center justify-center gap-3">
                        <img src={Logo} alt="logo" className="h-24 object-cover " />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto p-4 border rounded-lg shadow-lg mt-4"
                    >
                        <div className="flex gap-2">
                            <div className="mb-4">
                                <label
                                    htmlFor="firstname"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                    placeholder="Enter your First Name"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="middlename"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Middle Name:
                                </label>
                                <input
                                    type="text"
                                    id="middlename"
                                    name="middlename"
                                    value={formData.middlename}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                    placeholder="Enter your Middle Name"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="lastname"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Last Name:
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                placeholder="Enter your Last Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                placeholder="Enter your Email Address"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Phone Number:
                            </label>
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                placeholder="Enter your Phone Number"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="location"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Location:
                            </label>
                            <select
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange "
                                required
                            >
                                <option value="select location">select location</option>
                                {locations.map((location) => (
                                    <option key={location.id} value={location.name}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="userimage"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                User Image:
                            </label>
                            <input
                                type="file"
                                id="userimage"
                                name="userimage"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            {formData.userimage && (
                                <img
                                    src={`data:image/jpeg;base64,${formData.userimage}`}
                                    alt="User Preview"
                                    className="h-16 w-16 mt-2"
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-bold mb-2 relative"
                            >
                                Password:
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                    placeholder={`Enter password `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-4"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </label>
                            <p className="text-sm text-gray-500 px-2">
                                The password must be at least 8 characters long{' '}
                            </p>
                            <p className="text-sm text-gray-500 px-2">
                                Must contain a symbol, a number, and an Uppercase Letter
                            </p>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 text-sm font-bold mb-2 relative"
                            >
                                Confirm Password:
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                    placeholder={`confirm your password `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-4"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </label>
                        </div>
                        <button
                            onClick={() => {
                                setShowPassword(false);
                                // handleSubmit(event); // Call the handleSubmit function
                                console.log('Submit button clicked');
                            }}
                            type="submit"
                            className="bg-primary-orange text-white py-2 px-4 rounded-xl hover:bg-secondary-orange transition duration-300 w-full"
                        >
                            Submit
                        </button>
                        <p className="text-gray-500 text-center mt-3">
                            Already have an account?
                            <Link to="/login" className="ml-2 text-blue-500">
                                Sign in
                            </Link>{' '}
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
