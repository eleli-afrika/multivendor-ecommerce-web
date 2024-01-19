import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Links } from '../data/links';
import close from '../assets/close.png';
import menu from '../assets/menu.png';
import logo from '../assets/logo.png';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { BiSolidBellRing } from 'react-icons/bi';
import { setProfileOpener } from '../Redux/slices/opener';
import Searchbar from './searchbar';
// import { setLoader } from "../Redux/slices/LoaderSlice";
import { getLoggedInUser, setUser } from '../Redux/slices/AuthSlice';
import { AppDispatch } from '../Redux/store';
// import { Search } from '@mui/icons-material';
// import { currentUser } from "../Redux/hooks/user.actions";
// import { toast } from "react-toastify";

type NavbarProps = {
    SetShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
    SetShowAdsForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ SetShowAdsForm }) => {
    const [active, setActive] = useState('');
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: any) => state.auth.user);
    const { profileOpener } = useSelector((state: any) => state.opener);
    const userToken = useSelector((state: any) => state.auth.userToken);

    useEffect(() => {
        dispatch(getLoggedInUser());
    }, [userToken]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {}, [user]);
    const [userSmallnav, setUserSmallNav] = React.useState(false);
    // console.log(user);

    const Logout = async () => {
        localStorage.removeItem('userToken');
        await dispatch(setUser(null));
        navigate('/');
    };

    useEffect(() => {}, [userToken, user]);
    return (
        <nav
            className={`w-full  flex flex-col items-center justify-center price py-0  fixed  top-0 z-20 ${
                scrolled ? 'bg-white' : 'bg-white'
            }`}
            // style={{ marginBottom: "2px" }}
        >
            <div className="w-full flex  justify-center md:justify-between items-center py-2   px-[10px] lg:px-20">
                <div className="flex gap-2 items-center   ">
                    {user && (
                        <AiOutlineMenuUnfold
                            size="32"
                            className="text-black bg-gray-light p-2 rounded-full md:hidden mt-[11px]"
                            onClick={() => {
                                dispatch(setProfileOpener(!profileOpener));
                                console.log('hello , this is my', profileOpener);
                            }}
                        />
                    )}
                    <Link
                        to="/"
                        className="flex flex-row gap-2 lg:flex-col items-center "
                        onClick={() => {
                            setActive('');
                            window.scrollTo(0, 0);
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            className=" object-contain object-center rounded  logo"
                        />
                        {/* <p className="text-slate-600 text-xs italic">let's help you sell</p> */}
                    </Link>

                    <div className="p-2 ml-5 block sm:hidden">
                        <button
                            className="bg-primary-orange text-white p-1 capitalize rounded px-5 hover:bg-secondary-orange py-2 mt-2"
                            onClick={() => {
                                user ? SetShowAdsForm(true) : navigate('/login');
                            }}
                        >
                            Sell
                        </button>
                    </div>
                </div>

                <ul className="list-none hidden sm:flex flex-row gap-10 items-center px-2">
                    <div>
                        <button
                            className="bg-primary-orange text-white p-1 capitalize rounded px-4 hover:bg-secondary-orange"
                            onClick={() => {
                                user ? SetShowAdsForm(true) : navigate('/login');
                            }}
                        >
                            Sell
                        </button>
                    </div>
                    {Links.map((nav) => (
                        <li
                            key={nav.name}
                            className={`${
                                active === nav.name ? 'text-primary-orange' : 'text-black'
                            } capitalize hover:text-primary-orange text-[18px] font-medium cursor-pointer`}
                            onClick={() => setActive(nav.name)}
                        >
                            <Link to={nav.url}>{nav.name}</Link>
                        </li>
                    ))}
                    {user ? (
                        <ul className="font-medium flex flex-col px-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                            <div
                                className="h-[50px] w-[50px] rounded-full border border-slate-500 p-1 relative cursor-pointer"
                                onClick={() => {
                                    setUserSmallNav(!userSmallnav);
                                }}
                            >
                                <div className="h-4 w-4 rounded-full absolute top-0 right-0">
                                    <BiSolidBellRing className="text-red-400" />
                                </div>
                                <div className="h-4 text-center w-4 rounded-full absolute bg-green-400 top-0 left-0 text-[10px]">
                                    9+
                                </div>
                                <img
                                    className=" rounded-full w-full h-full object-cover object-top"
                                    src={`${user?.userimage}`}
                                    alt=""
                                />
                                {userSmallnav && (
                                    <div
                                        className=" absolute text-sm flex text-start justify-start items-start text-stone-600  flex-col gap-1 p-4 font-normal  rounded-[3px] bg-gray-200 right-4 w-[150px] "
                                        onClick={() => setToggle(false)}
                                        onMouseLeave={() => setUserSmallNav(false)}
                                    >
                                        <p
                                            className="hover:underline hover:text-green-400 cursor-pointer"
                                            onClick={() => navigate('/profile')}
                                        >
                                            profile
                                        </p>
                                        <p
                                            className="hover:underline hover:text-green-400 cursor-pointer"
                                            onClick={() => navigate('/profile/myads')}
                                        >
                                            dashboard
                                        </p>
                                        <p
                                            className="hover:underline hover:text-green-400 cursor-pointer"
                                            onClick={() => navigate('/notifications')}
                                        >
                                            notifications
                                        </p>
                                        <button
                                            className="hover:underline hover:text-green-400 cursor-pointer"
                                            onClick={Logout}
                                        >
                                            log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </ul>
                    ) : (
                        <div>
                            <button
                                className="bg-primary-orange text-white p-1 rounded px-4 hover:bg-secondary-orange"
                                onClick={() => navigate('/login')}
                            >
                                Sign in
                            </button>
                        </div>
                    )}
                </ul>

                <div className="sm:hidden flex flex-1 justify-end items-center">
                    {/* <button
                        className="bg-gray-light h-10  w-10 mr-4 rounded-full"
                        onClick={() => dispatch(setOpener(!open))}
                    >
                        {' '}
                        <Search className="font-bold" />
                    </button> */}
                    <IconButton
                        style={{
                            color: '#991b1b',
                            backgroundColor: '#eee',
                            cursor: 'pointer',
                            marginTop: '10px',
                        }}
                    >
                        <img
                            src={toggle ? close : menu}
                            alt="menu"
                            className="w-[20px] h-[20px] object-contain "
                            onClick={() => setToggle(!toggle)}
                        />
                    </IconButton>

                    <div
                        className={`${
                            !toggle ? 'hidden' : 'flex'
                        } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[300px]  text-white capitalize z-10 rounded-xl`}
                        onMouseLeave={() => {
                            setUserSmallNav(false);
                            setToggle(false);
                        }}
                    >
                        <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                            {/* <div>
                                <button
                                    className="bg-primary-orange text-white p-1 capitalize rounded px-4 hover:bg-secondary-orange"
                                    onClick={() => {
                                        user ? SetShowAdsForm(true) : navigate('/login');
                                    }}
                                >
                                    Sell me
                                </button>
                            </div> */}
                            {Links.map((nav) => (
                                <li
                                    key={nav.name}
                                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                                        active === nav.name
                                            ? 'text-primary-orange'
                                            : 'text-secondary'
                                    }`}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.url);
                                    }}
                                >
                                    <Link to={nav.url}>{nav.name}</Link>
                                </li>
                            ))}
                            {user ? (
                                <ul className="font-medium flex flex-col px-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                                    <div
                                        className="h-[50px] w-[50px] rounded-full border border-slate-500 p-1 relative cursor-pointer"
                                        onClick={() => {
                                            setUserSmallNav(!userSmallnav);
                                        }}
                                    >
                                        <div className="h-4 w-4 rounded-full absolute top-0 right-0">
                                            <BiSolidBellRing className="text-red-400" />
                                        </div>
                                        <div className="h-4 text-center w-4 rounded-full absolute bg-green-400 top-0 left-0 text-[10px]">
                                            9+
                                        </div>
                                        <img
                                            className=" rounded-full w-full h-full object-cover object-top"
                                            src={`${user?.userimage}`}
                                            alt=""
                                        />
                                        {userSmallnav && (
                                            <div
                                                className=" absolute text-sm flex text-start justify-start items-start text-stone-600  flex-col gap-1 p-4 font-normal  rounded-[3px] bg-gray-200  right-4"
                                                onClick={() => setToggle(false)}
                                                onMouseLeave={() => {
                                                    setUserSmallNav(false);
                                                    setToggle(false);
                                                }}
                                            >
                                                <p
                                                    className="hover:underline hover:text-green-400 cursor-pointer"
                                                    onClick={() => navigate('/profile')}
                                                >
                                                    profile
                                                </p>
                                                <p
                                                    className="hover:underline hover:text-green-400 cursor-pointer"
                                                    onClick={() => navigate('/profile/myads')}
                                                >
                                                    dashboard
                                                </p>
                                                <p
                                                    className="hover:underline hover:text-green-400 cursor-pointer"
                                                    onClick={() => navigate('/notifications')}
                                                >
                                                    notifications
                                                </p>
                                                <button
                                                    className="hover:underline hover:text-green-400 cursor-pointer "
                                                    onClick={Logout}
                                                >
                                                    log out
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </ul>
                            ) : (
                                <div>
                                    <button
                                        className="bg-primary-orange text-white p-1 rounded px-4 hover:bg-secondary-orange"
                                        onClick={() => {
                                            navigate('/login');
                                            setToggle(false);
                                        }}
                                    >
                                        Sign in
                                    </button>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <Searchbar />
        </nav>
    );
};

export default Navbar;
