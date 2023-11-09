import { useState } from 'react';
import { FaFacebook, FaPhone, FaEnvelope, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { IconButton } from '@mui/material';

const Contact = () => {
    const [loading] = useState(false);

    return (
        <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 p-20  bg-gray-200 shadow-xl ">
            {/* Contact card */}
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0 border-r-2 pr-4">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Phone
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="name"
                            type="text"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none bg-gray-100"
                            id="message"
                            placeholder="Your message here"
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            className="bg-primary-orange hover:bg-secondary-orange text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
            {/* Message */}
            <div>
                <h1 className="text-2xl font-bold text-primary mb-6">Need to Make an Enquiry?</h1>
                <p className="text-gray-600 mb-6">We respond between 9 a.m. and 9 p.m.</p>
                <div className="flex items-center space-x-2">
                    <h1 className="text-lg font-semibold">Reach Us</h1>
                    <div className="flex items-center space-x-2">
                        <a href="#" className="text-black">
                            <button className="rounded-full p-2 bg-white">
                                <FaFacebook className="text-blue-500" />
                            </button>
                        </a>
                        <a href="#" className="text-black">
                            <button className="rounded-full p-2 bg-white">
                                <FaPhone className="text-gray-500" />
                            </button>
                        </a>
                        <a href="#" className="text-black">
                            <button className="rounded-full p-2 bg-white">
                                <FaEnvelope className="text-orange-500" />
                            </button>
                        </a>
                        <a href="#" className="text-black">
                            <button className="rounded-full p-2 bg-white">
                                <FaYoutube className="text-red-500" />
                            </button>
                        </a>
                        <a href="#" className="text-black">
                            <button className="rounded-full p-2 bg-white">
                                <FaWhatsapp className="text-green-500" />
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
