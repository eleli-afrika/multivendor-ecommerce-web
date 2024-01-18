import { useEffect, useState } from 'react';
import { GetInquiries, MarkAsRead } from '../../Redux/hooks/inquiry';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Delete, FiberManualRecord, Visibility } from '@mui/icons-material';
import InquiryModal from './InquiryModal';
import Loader from '../../constants/loader';
import { getLoggedInUser } from '../../Redux/slices/AuthSlice';
import { AppDispatch } from '../../Redux/store';
import GlobalLoader from '../Global/GlobalLoader';

const Inquiries = () => {
    const [inquiry, setInquiry] = useState([]);
    const { user } = useSelector((state: any) => state.auth);
    const { loader } = useSelector((state: any) => state.auth.isLoading);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, SetSelectedId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            await dispatch(getLoggedInUser());
            const response = await GetInquiries();
            const data = response.data;
            const usersInquiries = await data.filter((item: any) => item.user === user?.userid);
            setInquiry(usersInquiries);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch, user?.userid]);

    const markInquiryAsRead = async (inquiryId: any): Promise<void> => {
        try {
            setIsLoading(true);
            await MarkAsRead(inquiryId);
            setIsLoading(false);
            fetchData();
        } catch (error) {
            console.error('Error marking inquiry as read:', error);
        }
    };

    return (
        <div className=" px-[10px] py-[20px] md:px-8 md:py-20 max-w-6xl mx-auto bg-white h-[100vh] shadow-lg">
            {isLoading && <Loader />}
            {loader && <GlobalLoader />}
            {inquiry?.map((item: any) => (
                <ul
                    key={item?._id}
                    className={`max-w-2xl mb-2 bg-white text-black-main text-[16px] rounded-md shadow-lg  border-t border-t-gray-100  ${
                        item?.read
                            ? 'border-l-3  border-green-light '
                            : 'border-l-4 border-green-dark'
                    }`}
                >
                    <li className="flex justify-between items-center py-3 px-[10px] rounded-[8px]">
                        <Link
                            to={'#'}
                            className="flex-1 pr-4"
                            onClick={() => {
                                setShowModal(true);
                                SetSelectedId(item?._id);
                                markInquiryAsRead(item?._id);
                            }}
                        >
                            <p className={` line-clamp-1 ${item.read ? '' : 'font-bold'}`}>
                                {item?.message}
                            </p>
                            <p className="text-gray-500">
                                {new Date(item?.createdAt).toLocaleDateString()}
                            </p>
                            {/* <p>status: {item?.read ? 'has been read' : 'has not been read'}</p> */}
                        </Link>
                        <div className="flex items-center space-x-2">
                            {item?.read ? (
                                <Visibility
                                    className="text-green-500"
                                    onClick={() => {
                                        setShowModal(true);
                                        SetSelectedId(item?._id);
                                        markInquiryAsRead(item?._id);
                                    }}
                                />
                            ) : (
                                <FiberManualRecord
                                    className="text-green-dark"
                                    onClick={() => {
                                        setShowModal(true);
                                        SetSelectedId(item?._id);
                                        markInquiryAsRead(item?._id);
                                    }}
                                />
                            )}
                            <Delete className="text-red-600" />
                        </div>
                    </li>
                </ul>
            ))}

            {showModal && <InquiryModal setShowModal={setShowModal} id={selectedId} />}
        </div>
    );
};
export default Inquiries;
