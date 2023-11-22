import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import { FetchProduct, FetchProductImages, FetchProductSeller } from '../../Redux/slices/adSlice';
import { Email, Favorite, LocationOn, Phone, Reviews, WhatsApp } from '@mui/icons-material';
import { Avatar } from 'antd';
import { Rating } from '@mui/material';
import { AppDispatch } from '../../Redux/store';
import Loader from '../../constants/loader';

const ProductInfo = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    // const navigate = useNavigate();

    const { ad, adImages, seller, isLoading } = useSelector((state: any) => state.ad);

    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();

    useEffect(() => {
        dispatch(FetchProduct(id));
        dispatch(FetchProductImages(id));
        dispatch(FetchProductSeller(id));
    }, [dispatch, id]);

    console.log(adImages);
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col md:flex-row lg:gap-5 p-3 lg:p-5 max-w-screen mb-10 h-auto">
            {/* {isLoading && <Loader />} */}
            {/* Part 1 */}
            <div className="md:flex-1">
                <div className="flex flex-col md:flex-row md:gap-5">
                    {/* Images */}
                    {/* <p>{ad.userid}</p> */}
                    <div className="md:flex-1">
                        <div className="flex flex-col gap-4">
                            <div>
                                <img
                                    src={` ${adImages && adImages[selectedImageIndex]}`}
                                    // src={pictures[selectedImageIndex]}
                                    className="h-auto w-full max-h-[30rem] rounded-md"
                                    alt=""
                                />
                            </div>
                            <div className="flex gap-4 p-4">
                                {/* {adImages.map((image: any, index: number) => ( */}
                                {adImages?.map((image: any, index: number) => (
                                    <img
                                        key={index}
                                        src={` ${image}`}
                                        // src={image}
                                        className={
                                            'h-16 w-16 object-cover rounded-md bg-gray-100 cursor-pointer' +
                                            (index === selectedImageIndex
                                                ? ' border-2 border-secondary-orange'
                                                : '')
                                        }
                                        alt=""
                                        onClick={() => setSelectedImageIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col"></div>
                <div className="flex flex-col gap-2 md:flex-row md:gap-5 p-5">
                    {/* <span>{ad?.CreatedAt}</span> */}
                    <span>
                        Category: <i className="text-primary-orange">{ad?.category}</i>
                        {/* Category: <i className="text-primary-orange">Home and Office</i> */}
                    </span>
                    <span>
                        Brand: <i className="text-primary-orange">{ad?.brand}</i>{' '}
                        {/* Brand: <i className="text-primary-orange">Innovia</i>{' '} */}
                    </span>
                </div>

                <div className="flex gap-5 items-center p-4">
                    <div>
                        <Favorite className="text-secondary-orange font-bold  animate-pulse" />
                        <span className="text-gray-500">20</span>
                    </div>

                    <div>
                        <Reviews className="text-primary-orange font-bold " />
                        <span className="text-gray-500">20</span>
                    </div>
                    {/* <div>
                        <Rating className="text-secondary-orange font-bold  " />
                        <span></span>
                    </div> */}
                </div>
            </div>

            {/* part3 */}
            <div className="md:flex-1  h-full w-screen p-4">
                <div>
                    <div>
                        <h2 className=" text-2xl capitalize font-bold">{ad?.productname}</h2>
                    </div>
                    <div className="text-2xl font-bold text-secondary-orange">
                        {' '}
                        <h2> KSh {ad?.productprice}</h2>
                        <span className="text-sm text-gray-500">
                            {' '}
                            {'{'}Fixed price{'}'}
                        </span>
                    </div>

                    <div className="">
                        {/* <h1> Description:</h1> */}
                        {/* <p className="text-gray-600">{ad?.productdescription}</p> */}
                        <p className="text-gray-600">
                            <p className="text-gray-600">{ad?.productdescription}</p>
                        </p>
                    </div>
                    <div className="flex mt-2">
                        <LocationOn className="text-secondary-orange" />
                        <p className="text-gray-700 capitalize">{seller?.seller_location} </p>
                    </div>
                    <div className="mt-2">
                        <p className="capitalize text-sm text-gray-700">stock: 5</p>
                        <p className="capitalize text-sm text-gray-700">
                            {' '}
                            ratings: <Rating className="text-secondary-orange font-bold  " />
                        </p>
                    </div>
                    <div>
                        <button className="bg-primary-orange capitalize  text-white px-12 py-3 mt-4 rounded hover:text-black-200 hover:bg-orange-300 transition-colors delay-300">
                            {' '}
                            call seller
                        </button>
                    </div>
                </div>
            </div>
            {/* Part 2 */}
            <div className="md:flex-1 p-4">
                {/* <div className="w-full  h-32  price text-center flex flex-col rounded">
                    <button className="bg-black-200 text-white px-10 py-2 mt-4 rounded hover:text-black-200 hover:bg-white transition-colors delay-300">
                      
                    </button>
                </div> */}

                <div
                    className="flex flex-col md:flex-row gap-2 p-4 mt-2 rounded"
                    style={{ backgroundColor: '#0c2e4e' }}
                >
                    <div className="text-white flex flex-col md:flex-1">
                        <h1 className="font-bold">Make Inquiry</h1>
                        <p className="text-gray-400">
                            Send your message to the seller for a quick reply
                        </p>
                    </div>
                    <div className="right md:flex-1">
                        <form>
                            <input
                                type="text"
                                className="h-10 rounded px-4 mb-2 shadow-custom w-full"
                                placeholder="Please Enter your Name"
                            />
                            <input
                                type="text"
                                className="h-10 rounded px-4 mb-2 shadow-custom w-full"
                                placeholder="Please Enter your Email"
                            />
                            <input
                                type="text"
                                className="h-10 rounded px-4 mb-2 shadow-custom w-full"
                                placeholder="Enter your phone"
                            />
                            <button className="bg-black-200 text-white px-10 py-2 mt-4 rounded hover:text-black-200 hover:bg-white transition-colors delay-300">
                                Inquire
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-2 rounded" style={{ height: 'auto' }}>
                    <div className="flex flex-col md:flex-row gap-3 md:flex-1">
                        <div className=" price lg-w-[50%]" style={{ borderRadius: '0.25rem' }}>
                            <h1 className="text-center py-4 mb-2 bg-orange-700 rounded-tl rounded-tr  text-white font-bold">
                                Seller Details
                            </h1>
                            {/* <hr
                className=""
                style={{ borderColor: "#0c2e4e", margin: "0" }}
              /> */}

                            <div className="sm:flex-1 flex-col md:justify-around  gap-4 px-5">
                                <div className="text-center">
                                    <Avatar
                                        src={` ${seller?.user_profile}`}
                                        className="h-24 w-24 "
                                    />
                                </div>
                                <div>
                                    <div className="text-gray-600 ">
                                        <p className="capitalize text-center">
                                            Name: {seller?.seller_name}
                                            {/* Name: John Doe */}
                                        </p>
                                        <p className="text-center">
                                            Phone:{seller?.seller_phonenumber}{' '}
                                            {/* Phone : 0791055992 */}
                                        </p>
                                        <p className="text-center">Email:{seller?.seller_email} </p>
                                        {/* <p className="text-center">Email:janedoe@gmail.com </p> */}
                                        {/* <div className="text-center p-2">
                                            <button
                                                className="bg-black-200 text-white px-10 py-2 mt-4 rounded hover:text-black-200 hover:bg-white transition-colors delay-300"
                                                onClick={() =>
                                                    navigate(`/seller/store/${ad.userid}`, {
                                                        state: { user: seller },
                                                    })
                                                }
                                            >
                                                View Shop
                                            </button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4 p-5 text-center">
                                <button className="p-2 rounded-full bg-gray-200" onClick={() => {}}>
                                    <Link
                                        to={`https://wa.me/+254${seller?.seller_phonenumber
                                            ?.toString()
                                            ?.substring(1)}?text=hello, ${seller?.seller_name}`}
                                        target="_blank"

                                        // to=""
                                    >
                                        <WhatsApp className="text-green-500" />
                                    </Link>
                                </button>
                                {/* <button className="p-2 rounded-full bg-gray-200">
                                    <Facebook className="text-blue-500" />
                                </button> */}
                                <button className="p-2 rounded-full bg-gray-200">
                                    <Link
                                        to={`mailto:${seller?.seller_email}`}
                                        className=""
                                        target="_blank"
                                    >
                                        <Email className="text-red-500" />
                                    </Link>
                                </button>
                                <button className="p-2 rounded-full bg-gray-200">
                                    <Link to={`tel:${seller?.seller_phonenumber}`} target="_blank">
                                        <Phone />
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-200 p-6 rounded shadow-custom md:flex-1">
                            <h1 className="font-bold">Safety tips</h1>
                            <ol className=" text-gray-600">
                                <li className="list-decimal">Meet seller in Public</li>
                                <li className="list-decimal">Avoid cash Transactions</li>
                                <li className="list-decimal">Be Keen on unrealistic offers</li>
                                <li className="list-decimal">Inspect Product Before payment</li>
                                <li className="list-decimal">Ask Questions</li>
                            </ol>
                            <button className="bg-red-600 text-white px-10 py-2 mt-4 rounded hover:text-black-200 hover-bg-white transition-colors delay-300">
                                Report Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
