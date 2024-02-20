import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
// import { toast } from 'react-toastify';

interface PasswordResetInput {
    email: string;
    newPassword: string;
    confirmPassword: string;
}

const ForgotPass: React.FC = () => {
    const [formData, setFormData] = useState<PasswordResetInput>({
        email: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <div className="w-full max-w-xl mx-auto bg-white rounded-lg ">
                <div className="flex items-center justify-center gap-3">
                    <img src={Logo} alt="logo" className="h-24 object-cover " />
                </div>
                <form className="  rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center">
                        {' '}
                        <p className="mb-4 text-sm text-black-main ">
                            Forgot your password? Please enter the email address associated with
                            your account, and we will send you a link to reset your password.
                        </p>
                    </div>
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

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-primary-orange hover:bg-secondary-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center w-full"
                            type="submit"
                        >
                            Get Link
                        </button>
                    </div>
                    <p className="items-center mt-5 text-gray-700 text-center">
                        {' '}
                        Back to{' '}
                        <Link to="/login" className="text-blue-400 ml-2">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPass;
