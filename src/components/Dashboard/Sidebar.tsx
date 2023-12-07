import { Avatar } from 'antd';
import { DashboardLinks } from '../../data/links';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseTwoTone } from '@mui/icons-material';
import { setProfileOpener } from '../../Redux/slices/opener';
import Loader from '../../constants/loader';
import { useState, useEffect } from 'react';

const Sidebar = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { user, isLoading } = useSelector((state: any) => state.auth);
    const { profileOpener } = useSelector((state: any) => state.opener);
    const [active, setActive] = useState('');

    useEffect(() => {
        // Set active link based on the current location
        const currentPath = location.pathname;
        setActive(currentPath);
    }, [location.pathname]);

    const handleProfileOpenerClose = () => {
        dispatch(setProfileOpener(false));
    };

    return (
        <div onClick={handleProfileOpenerClose}>
            {/* Main Sidebar */}
            <div
                className="px-6 bg-gray-light m-3 overflow-y-auto pt-10 my-sidebar"
                style={{
                    width: '22vw',
                    height: '100vh',
                    borderRadius: '2px',
                    position: 'sticky',
                    top: '0',
                }}
            >
                <ul className="pt-6">
                    {DashboardLinks.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex rounded-md p-2 cursor-pointer  hover:text-white text-sm items-center gap-4 ${'mt-2'}`}
                        >
                            <NavLink
                                to={`/${Menu.url}`}
                                className={`flex rounded-md p-2 text-sm items-center gap-4 w-full hover:bg-secondary-orange ${
                                    index === 0 ? 'bg-light-white' : ''
                                } ${
                                    active === `/${Menu.url}`
                                        ? 'bg-primary-orange text-white font-bold'
                                        : 'bg-white'
                                }`}
                            >
                                <img src={Menu.icon} className="h-8 object-cover" alt={Menu.name} />
                                <span className={`${!open && 'hidden'} origin-left duration-200`}>
                                    {Menu.name}
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Sidebar Footer */}
                <div className="flex items-center mt-10 flex-col ">
                    <Avatar
                        alt="Jane Doe"
                        src={`data:image/jpeg;base64, ${user?.userimage}`}
                        className="h-24 w-24 border-4 border-primary-orange"
                    />
                    <span className="text mt-5 capitalize">{`${user?.firstname} ${user?.lastname}`}</span>
                </div>
            </div>

            {/* Sidebar on Small Screens */}
            {profileOpener && (
                <div
                    className="px-6 bg-gray-light m-3 mt-20 overflow-y-auto pt-10 md:hidden"
                    style={{
                        height: '80vh',
                        borderRadius: '2px',
                        top: '0',
                        position: 'fixed',
                        bottom: '10px',
                        inset: '0',
                        zIndex: '9999',
                    }}
                >
                    <div className="flex justify-end " onClick={handleProfileOpenerClose}>
                        <CloseTwoTone className="bg-primary-orange p-1 rounded-full text-right h-24 text-white cursor-pointer" />
                    </div>
                    <ul className="pt-6">
                        {DashboardLinks.map((Menu, index) => (
                            <li
                                key={index}
                                className={`flex rounded-md p-2 cursor-pointer hover:text-white text-sm items-center gap-4 ${'mt-2'}`}
                            >
                                <NavLink
                                    to={`/${Menu.url}`}
                                    className={`flex rounded-md p-2 text-sm items-center gap-4 w-full  hover:bg-secondary-orange ${
                                        index === 0 ? 'bg-light-white' : ''
                                    } ${
                                        active === `/${Menu.url}`
                                            ? 'bg-primary-orange text-white font-bold '
                                            : 'bg-white'
                                    }`}
                                >
                                    <img
                                        src={Menu.icon}
                                        className="h-8 object-cover"
                                        alt={Menu.name}
                                    />
                                    <span
                                        className={`${!open && 'hidden'} origin-left duration-200`}
                                    >
                                        {Menu.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Sidebar Footer */}
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div className="flex items-center mt-10 flex-col">
                            <Avatar
                                alt="Jane Doe"
                                src={`${user?.userimage}`}
                                className="h-24 w-24 border-4 border-primary-orange"
                            />
                            <span className="text mt-5 capitalize">{`${user?.firstname} ${user?.lastname}`}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Sidebar;
``;
