import React, { useState } from 'react';
import Logo from '../../assets/logo.png';

import { useDispatch, useSelector } from 'react-redux';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { LoggingUser } from '../../Redux/slices/AuthSlice';
import { AppDispatch } from '../../Redux/store';
import Loader from '../../constants/loader';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm: React.FC = ({}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState(false);
    const isLoading = useSelector((state: any) => state.auth.isLoading);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await dispatch(LoggingUser(formData));
            setFormData({
                email: '',
                password: '',
            });

            navigate('/');
        } catch (error) {
            navigate('/login');
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className="h-screen mx-auto p-4 bg-gray-light w-screen">
                <div
                    className="min-w-[300px] max-w-[600px] h-5/6 w-full bg-white rounded-2xl p-2 py-8 md:p-10 price "
                    style={{ margin: 'auto' }}
                >
                    <div className="flex items-center justify-center gap-3">
                        <img src={Logo} alt="logo" className="h-24 object-cover " />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto p-4 border rounded-lg shadow-lg mt-4 price"
                    >
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
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange h-12"
                                placeholder="Enter your email address"
                            />
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
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange h-12"
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
                        </div>

                        <button
                            type="submit"
                            className="bg-primary-orange text-white py-2 px-4 rounded-xl hover:bg-secondary-orange transition duration-300 w-full"
                        >
                            Submit
                        </button>

                        <p className="text-gray-500 text-center mt-3">
                            Forgot password?
                            <Link to="/login" className="ml-2 text-blue-500">
                                Reset password
                            </Link>{' '}
                        </p>
                        <p className="text-gray-500 text-center mt-3">
                            You do not have an account?
                            <Link to="/register" className="ml-2 text-blue-500">
                                Sign up
                            </Link>{' '}
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
