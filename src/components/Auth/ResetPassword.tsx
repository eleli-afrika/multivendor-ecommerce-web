import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { toast } from 'react-toastify';

interface PasswordResetInput {
    email: string;
    newPassword: string;
    confirmPassword: string;
}

const PasswordResetForm: React.FC = () => {
    const [formData, setFormData] = useState<PasswordResetInput>({
        email: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match');
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
                    <img src={Logo} alt="logo" className="h-24 object-cover " />
                </div>
                <form className="  rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
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
                                type={showNewPassword ? 'text' : 'password'}
                                id="new-password"
                                name="newPassword"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                type={showConfirmPassword ? 'text' : 'password'}
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
                            className="bg-primary-orange hover:bg-secondary-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center"
                            type="submit"
                        >
                            Reset Password
                        </button>
                    </div>
                    <p className="items-center mt-4 text-gray-700">
                        {' '}
                        Back to{' '}
                        <Link to="/login" className="text-blue-400">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetForm;
