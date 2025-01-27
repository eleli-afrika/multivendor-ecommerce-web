import { FaFacebook, FaEnvelope } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


const Footer = () => {
    return (
        <div className=" w-full relative">
            <div className='mx-auto max-w-7xl flex justify-between'>
                <div
                        className="top-0 left-0 p-10 flex flex-wrap justify-center md:justify-between"
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            backgroundColor: 'black',
                            color: '#9da2ad',
                            fontFamily: 'Poppins, helvetica, Arial',
                            fontSize: '15px',
                            lineHeight: '20px',
                            width: '100%',
                            minHeight: '100%',
                            borderRadius: '0',
                        }}
                    >

                        {/* Logo Section */}
                    <div className=" w-1/2 md:w-1/4  mb-4 flex flex-col gap-7 items-center">
                        <Link
                                to="/"
                                className="flex flex-row gap-2 lg:flex-col items-center ">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className=" object-contain object-center rounded logo"
                                />
                         </Link>
                         <div className="flex flex-row md:flex-col w-1/2 md:w-1/4 mb-4">
                            <h1 className="text-lg font-semibold mb-2">Follow Us</h1>
                            <ul className="list-none flex gap-1">
                             <li className="mb-1">
                                <IconButton
                                    style={{
                                        backgroundColor: '',
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
                                    backgroundColor: '',
                                    padding: '0.4rem',
                                    borderRadius: '0.25rem',
                                }}
                            >
                                <Link
                                    to={`mailto:innovialtd@gmail.com`}
                                    target="_blank"
                                    className="text-white flex items-center"
                                >
                                    <FaInstagram color="orange" />
                                </Link>
                            </IconButton>
                        </li>
                        <li className="mb-1">
                            <IconButton
                                style={{
                                    backgroundColor: '',
                                    padding: '0.4rem',
                                    borderRadius: '0.25rem',
                                }}
                            >
                                <Link
                                    to={`mailto:innovialtd@gmail.com`}
                                    target="_blank"
                                    className="text-white flex items-center"
                                >
                                    <FaTwitter color="blue" />
                                </Link>
                            </IconButton>
                        </li>
                        <li className="mb-1">
                            <IconButton
                                style={{
                                    backgroundColor: '',
                                    padding: '0.4rem',
                                    borderRadius: '0.25rem',
                                }}
                            >
                                <Link
                                    to={`mailto:innovialtd@gmail.com`}
                                    target="_blank"
                                    className="text-white flex items-center"
                                >
                                    <FaEnvelope color="yellow" />
                                </Link>
                            </IconButton>
                        </li>
                        </ul>
                     </div>
                    </div>

                    <div className=" w-1/2 md:w-1/4  mb-4 ">
                        <h1 className="text-lg font-semibold mb-2 capitalize">EXPLORE</h1>
                        <ul className="list-none ">
                            <li className='text-base pb-2 '>
                                <Link to={'/'}> Home</Link>
                            </li>
                            <li className='text-base pb-2 '>
                                <Link to={'/'}> Products</Link>
                            </li>
                            <li className='text-base pb-2 '>
                                <Link to={'/services'}>Services</Link>
                            </li>
                            
                            <li className='text-base pb-2 '>
                                <Link to={'/contact'}>Contact us</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="w-1/2 md:w-1/4 mb-4">
                        <h1 className="text-lg font-semibold mb-3">QUICK LINKS</h1>
                        <ul className="list-none ">
                            <li className='text-base pb-2 '>
                                <Link to={'/contact'} >Support</Link>
                            </li>
                            <li  className='text-base pb-2 '>
                                <Link to={'/eduka/faq'}>FAQS</Link>
                            </li>
                            <li  className='text-base pb-2 '>
                                <Link to={'/terms_and_conditions'}>Terms and conditions</Link>
                            </li>
                            <li className='text-base pb-2 '>
                                <Link to={'/privacy-policy'}>Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="w-1/2 md:w-1/4 mb-4">
                        <h2 className="text-lg font-semibold mb-3">REACH US</h2>
                        <p className='pb-4'>(+254) 719 722292</p>
                        <p>eleliafrika@gmail.com</p>

                    </div>

                    <div className="flex justify-center w-full">
                        <div style={{ borderTop: 'solid 2px #DC5F00', width: '75%' }}
                            className="w-auto my-7"></div>
                           
                     </div>
                     <div className='flex justify-center w-full'>
                     <p className="text-center text-white py-2 mt-2">© EDUKA 2023 || All Rights Reserved </p>
                     </div>


                </div>
            </div>
        </div>
    );
};

export default Footer;
