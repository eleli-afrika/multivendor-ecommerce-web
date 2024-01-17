import { useEffect, useState } from 'react';
import { GetInquiries } from '../../Redux/hooks/inquiry';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Delete, FiberManualRecord, Visibility } from '@mui/icons-material';

const Inquiries = () => {
    const [inquiry, setInquiry] = useState([]);
    const user = useSelector((state: any) => state.auth.user);

    useEffect(() => {
        const fetch = async () => {
            const response = await GetInquiries();
            const data = response.data;
            const usersInquiries = data.filter((item: any) => item.user === user?.userid);
            setInquiry(usersInquiries);
        };

        fetch();
    }, []);

    return (
        <div className="px-8 py-20 max-w-6xl mx-auto bg-white h-[100vh] shadow-lg">
            {inquiry.map((item: any) => (
                <ul
                    key={item.id}
                    className={`max-w-2xl mb-2 bg-white text-black-main text-[16px] rounded-md shadow-lg  border-t border-t-gray-100  ${
                        item.read ? 'border-l-3  border-green-500' : 'border-l-4 border-blue-500'
                    }`}
                >
                    <li className="flex justify-between items-center py-3 px-[10px] rounded-[8px]">
                        <Link to={'/'} className="flex-1 pr-4">
                            <p className="font-bold">{item.message}</p>
                            <p className="text-gray-500">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                        </Link>
                        <div className="flex items-center space-x-2">
                            {item.read ? (
                                <Visibility className="text-green-500" />
                            ) : (
                                <FiberManualRecord className="text-blue-500" />
                            )}
                            <Delete className="text-red-600" />
                        </div>
                    </li>
                </ul>
            ))}
        </div>
    );
};
export default Inquiries;
