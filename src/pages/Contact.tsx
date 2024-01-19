import { useState, FormEvent } from 'react';
import { IconButton } from '@mui/material';
import { FaFacebook, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { createInquiry } from '../Redux/hooks/inquiry';

interface FormData {
    name: string;
    phone: string;
    email: string;
    message: string;
    user: string;
    product: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
        phone: '',
        user: 'admin',
        product: 'nil',
    });

    const updateFormData = (key: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    const handleInquirySubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await createInquiry({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            product: formData.product,
            user: formData.user,
        });

        setFormData({
            name: '',
            email: '',
            message: '',
            phone: '',
            user: '',
            product: '',
        });
    };

    return (
        <div className="xl:mt-12 flex xl:flex-row flex-col gap-10 p-[5px] lg:p-20  pb-10 ">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0 border-r-2 px-[10px] price rounded-[0.25rem]">
                <form className="bg-white rounded px-8 pt-6 pb-8" onSubmit={handleInquirySubmit}>
                    <div className=" mt-8 py-2 ">
                        <p className="text-2xl font-bold mb-4">Hi there!</p>
                        <p className="text-bas text-green-dark  ">
                            We're delighted to hear from you. Please fill out the form below to get
                            in touch with us. Whether you have a question, feedback, or an inquiry,
                            we're here to help!
                        </p>
                    </div>

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
                            onChange={(e) => updateFormData('name', e.target.value)}
                            value={formData.name}
                            required
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
                            id="phone"
                            type="text"
                            placeholder="Enter your phone number"
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            value={formData.phone}
                            required
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
                            onChange={(e) => updateFormData('email', e.target.value)}
                            value={formData.email}
                            required
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
                            onChange={(e) => updateFormData('message', e.target.value)}
                            value={formData.message}
                            required
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            className="bg-primary-orange hover:bg-secondary-orange text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full lg:w-1/2 px-[20px] price h-[fit-content] rounded-[0.25rem] lg:px-20 py-5 bg-black-main text-white items-center ">
                <h1 className="text-2xl font-bold text-primary mb-6">Need to make an enquiry?</h1>
                <p className=" mb-6">We respond between 9 a.m. and 9 p.m.</p>
                <div className="w-full  mb-4 ">
                    <p className="text  mb-2 w-full bg-yellow">You may also reach us here:</p>
                    <ul className="list-none flex gap-1">
                        <li className="mb-1">
                            <IconButton
                                style={{
                                    backgroundColor: 'white',
                                    color: 'blue',
                                    padding: '0.4rem',
                                    borderRadius: '0.25rem',
                                }}
                            >
                                <Link
                                    to="https://www.facebook.com/eduka.ke.9"
                                    target="_blank"
                                    className="text-white flex items-center"
                                >
                                    <FaFacebook color="blue" />
                                </Link>
                            </IconButton>
                        </li>
                        <li className="mb-1">
                            <IconButton
                                style={{
                                    backgroundColor: 'white',
                                    padding: '0.4rem',
                                    borderRadius: '0.25rem',
                                }}
                            >
                                <Link
                                    to={`mailto:innovialtd@gmail.com`}
                                    target="_blank"
                                    className="text-white flex items-center"
                                >
                                    <FaEnvelope color="orange" />
                                </Link>
                            </IconButton>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Contact;
