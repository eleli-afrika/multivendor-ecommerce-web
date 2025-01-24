import { useSelector } from 'react-redux';
import { sliderContent } from '../../data/package';
import { Avatar } from 'antd';


const PremiumPackage = () => {
    const Premium = sliderContent[2];
    const user = useSelector((state: any) => state.auth.user);
   
    return (
        <div className=" w-[100%] lg:p-10 text-white  overflow-x-hidden">
            <div className="flex h-auto w-full bg-[white-smoke] rounded-[0.25rem] flex-wrap p-2 ">
                {/* Premium Information */}
                <div className="flex flex-col w-full p-[10px] lg:px-20 py-5 lg:w-2/3  gap-3  ">
                    <div>
                        <div className="p-4 bg-yellow-600 rounded-t-[0.25rem] ">
                            <p>{Premium.title}</p>
                        </div>
                        <div className="price text-gray-700 p-2 pb-5 rounded-b-[0.25rem]">
                            {Premium.features.map((item: any, index) => (
                                <ul key={index}>
                                    <li> {item}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col w-full  price  ">
                        <div className="p-4 bg-green-dark rounded-t-[0.25rem] ">
                            <p>Payment Details</p>
                        </div>
                        <div className=" text-gray-700 p-2 pb-5 rounded-b-[0.25rem] flex lg:flex-row flex-col lg:justify-between gap-2 lg:gap-20 ">
                            <div className="w-full lg:w-1/2">
                                <div className="flex flex-col">
                                
                                    <h2 className="capitalize mt-5 font-bold"> paypill No:</h2>
                                    <ul className="flex gap-3 font-bold text-2xl">
                                        <div className="flex  gap-1 lg:gap-2">
                                            <li className=" border-[4px] rounded p-2 lg:p-5 border-green-dark">
                                                5
                                            </li>
                                            <li className=" border-[4px] rounded p-2 lg:p-5 border-green-dark">
                                                4
                                            </li>
                                            <li className=" border-[4px] rounded p-2 lg:p-5 border-green-dark">
                                                6
                                            </li>
                                        </div>
                                        <div className="flex gap-1 lg:gap-2">
                                            <li className=" border-[4px] rounded  p-2 lg:p-5 border-green-dark">
                                                1
                                            </li>
                                            <li className=" border-[4px] rounded p-2 lg:p-5 border-green-dark">
                                                5
                                            </li>
                                            <li className=" border-[4px] rounded p-2 lg:p-5 border-green-dark">
                                                9
                                            </li>
                                        </div>
                                    </ul>
                                    <h2 className="capitalize mt-5 font-bold"> account No:</h2>
                                    <h2 className="capitalize mt-1 font-bold">
                                        {' '}
                                        {`${user?.phone} Premium`}
                                    </h2>
                                </div>
                            </div>

                            <div className="w-full  lg:w-1/2 p-2">
                                <p>Instructions</p>
                                <ul className="text-sm flex flex-wrap gap-3 lg:block ">
                                    <li className="list-decimal mx-2">Go to Lipa na Mpesa</li>
                                    <li className="list-decimal mx-2">Enter Paypill no</li>
                                    <li className="list-decimal mx-2"> Enter Acc no</li>
                                    <li className="list-decimal mx-2"> Enter Amount and pin</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                

                {/* Details sec */}
                <div className="flex flex-col w-full p-[10px] lg:px-20 py-5 lg:w-1/3 gap-5">
                    {/* user details */}
                    <div className="flex flex-col price">
                        <div className="bg-gray-800 p-4 rounded-t-[0.25rem]  lg:text-center">
                            <p>Billing Detail</p>
                        </div>
                        <div className="flex gap-4 bg-white text-gray-600 p-4 rounded-b-[0.25rem]">
                            <Avatar src={`${user?.userimage}`} className="h-24 w-24" />
                            <div className="">
                                <p className="uppercase font-bold">{`${user?.firstname} ${user?.middlename} ${user?.lastname}`}</p>
                                <p>{user?.location}</p>
                                <p>{user?.email}</p>
                                <p>{user?.phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col price">
                        <div className="bg-primary-orange p-4 rounded-t-[0.25rem] lg:text-center">
                            <p>Order Summary</p>
                        </div>
                        <div className="flex flex-col gap-4 bg-white text-gray-600 p-4 rounded-b-[0.25rem]">
                            <div className="flex justify-between ">
                                <span>Premium Package</span>
                                <span>KES {Premium.price}</span>
                            </div>
                            <div className="flex justify-between font-bold  text-gray-800">
                                <span>Total</span>
                                <span>KES {Premium.price}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* end of details Sec */}
            </div>
        </div>
    );
};

export default PremiumPackage;
