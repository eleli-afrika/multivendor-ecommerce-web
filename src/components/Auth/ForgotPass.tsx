import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { ResetPasswordrequest } from '../../Redux/hooks/user.actions';
import Loader from '../../constants/loader';
// import { toast } from 'react-toastify';

// interface PasswordResetInput {
//     email: string;
// }

const ForgotPass: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await ResetPasswordrequest(email);
        setIsLoading(false);
        console.log(response);
    };

    return (
        <div className="px-[5px] lg:px-0">
            <div className="w-full max-w-xl mx-auto bg-white rounded-lg ">
                {loading && <Loader />}
                <div className="flex items-center justify-center gap-3">
                    <img src={Logo} alt="logo" className="h-24 object-cover " />
                </div>
                <form className="  rounded px-4 lg:px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
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
                            onChange={(e) => setEmail(e.target.value)}
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
