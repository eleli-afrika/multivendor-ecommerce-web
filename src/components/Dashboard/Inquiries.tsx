import { useEffect, useState } from 'react';
import { GetInquiries } from '../../Redux/hooks/inquiry';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <div className="px-8 py-20 max-w-6xl mx-auto bg-gray-light h-[100vh]">
            {inquiry.map((item: any) => (
                <ul
                    key={item.id}
                    className={`max-w-2xl mb-4 p-4 bg-black-main  ${
                        item.read ? '' : ''
                    } text-white rounded-md`}
                >
                    <Link to={'/'} className="block">
                        <p> {item.message}</p>
                        <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                    </Link>
                </ul>
            ))}
        </div>
    );
};

export default Inquiries;
