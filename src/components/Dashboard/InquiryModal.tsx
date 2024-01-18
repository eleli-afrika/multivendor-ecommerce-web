import { useEffect, useState } from 'react';
import { GetInquiry } from '../../Redux/hooks/inquiry';
import { Link } from 'react-router-dom';
import GlobalLoader from '../Global/GlobalLoader';

type ModalProps = {
    setShowModal: (value: boolean) => void;
    id: any;
};
const InquiryModal: React.FC<ModalProps> = ({ setShowModal, id }) => {
    const [inquiry, setinquiry] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const response = await GetInquiry(id);
            setIsLoading(false);
            setinquiry(response.data);
        };

        getData();
    }, [id]);
    return (
        <div className="fixed inset-0 px-[10px] lg:px-5  w-full bg-black-200/50 z-50 flex items-center  justify-center py-2 overflow-y-auto ">
            <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-[600px] h-[auto] min-h-[200px] border border-gray-300 flex items-center">
                {isLoading ? (
                    <div className="h-full w-full flex justify-center items-center bg-white z-10">
                        <div className=" rounded-[8px]">
                            <GlobalLoader />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="mb-4">
                            <span className="text-lg font-bold text-gray-800">Name</span>
                            <p className="text-gray-600">{inquiry?.name}</p>
                        </div>
                        <div className="mb-4">
                            <span className="text-lg font-bold text-gray-800">Message</span>
                            <p className="text-gray-600">{inquiry?.message}</p>
                        </div>
                        <div className="mb-4">
                            <span className="text-lg font-bold text-gray-800">Phone</span>
                            <p className="text-gray-600">{inquiry?.phone}</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-lg font-bold text-gray-800">Email</span>
                            <p className="text-gray-600">{inquiry?.email}</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-lg font-bold text-gray-800">Product Link</span>
                            <p className="text-blue-500 underline">
                                <Link
                                    to={`/ad_info/${inquiry?.product}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Link to Product
                                </Link>
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue"
                                onClick={() => (window.location.href = `tel:${inquiry?.phone}`)}
                            >
                                Call
                            </button>
                            <button
                                className="bg-green-light hover:bg-green-dark text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green"
                                onClick={() => (window.location.href = `mailto:${inquiry?.email}`)}
                            >
                                Send Email
                            </button>
                            <button
                                className="bg-primary-orange hover:bg-secondary-orange text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-red"
                                onClick={() => setShowModal(false)}
                            >
                                Close Inquiry
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InquiryModal;
