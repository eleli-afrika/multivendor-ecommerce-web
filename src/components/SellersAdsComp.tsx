import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSellerProducts } from '../Redux/slices/AdsSlice';
import { Link, useParams } from 'react-router-dom';
import { AppDispatch } from '../Redux/store';
import Productcard from './Global/PopularCard';
import Loader from '../constants/loader';
import { ProductData } from '../interface/common';
import { GettingUserById } from '../Redux/slices/AuthSlice';
import { WhatsApp, Phone, Email } from '@mui/icons-material';
// import { products } from '../data/sponsered';
import Store from '../assets/store.avif';
import { Avatar } from '@mui/material';

const SellersAdsComp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, Ads } = useSelector((state: any) => state.AllAds);
    // console.log(Ads);

    const theSeller = useSelector((state: any) => state.auth.theSeller);

    const { id } = useParams();
    useEffect(() => {
        dispatch(GettingUserById(id)).then((action) => {
            if (GettingUserById.fulfilled.match(action)) {
                console.log('the seller is :', theSeller);
                dispatch(FetchSellerProducts(id));
            }
        });
    }, [dispatch, id]);

    return (
        <div className="">
            <div className="px-4">
                <div className=" bg-yellow-600  relative w-[100%] h-[70vh] md:h-[30vh] rounded-[8px]">
                    <img
                        src={Store}
                        alt=""
                        className="w-full h-full object-cover object-center rounded-[8px]"
                    />
                    <div className="p-5 bg-black bg-opacity-80 justify-center  border  sm:flex md:justify-around rounded-[4px] price absolute top-0 left-0 w-full h-full">
                        {/* User Image and Join Date */}
                        <div className=" mb-4 sm:mb-0 flex flex-col justify-between">
                            <Avatar
                                src={` ${theSeller?.userimage}`}
                                // src={image}
                                className="w-24 h-24 object-cover mx-auto border border-primary-orange"
                                style={{
                                    height: '100px',
                                    width: '100px',
                                }}
                            />
                            <p className="text-stone-300 text-center lg:text-start ">
                                <i>"Sellers tagline goes here"</i>
                            </p>
                            <div className="flex mt-2 space-x-2 justify-center">
                                <button className="p-2 rounded-full bg-gray-200" onClick={() => {}}>
                                    <Link
                                        to={`https://wa.me/+254${theSeller?.seller_phonenumber
                                            ?.toString()
                                            ?.substring(1)}?text=hello, ${theSeller?.seller_name}`}
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
                                        to={`mailto:${theSeller?.seller_email}`}
                                        className=""
                                        target="_blank"
                                    >
                                        <Email className="text-red-500" />
                                    </Link>
                                </button>
                                <button className="p-2 rounded-full bg-gray-200">
                                    <Link
                                        to={`tel:${theSeller?.seller_phonenumber}`}
                                        target="_blank"
                                    >
                                        <Phone />
                                    </Link>
                                </button>
                            </div>
                        </div>

                        {/* User Information */}
                        <div className="flex flex-col sm:items-start sm:pl-4 text-gray-300">
                            <p className="mb-2">
                                Name:{' '}
                                <span className="capitalize font-bold text-secondary-orange">
                                    {`${theSeller?.firstname} ${theSeller?.middlename} ${theSeller?.lastname}`}
                                    {/* Emma Marcy */}
                                </span>
                            </p>
                            <p className="mb-2">
                                Email:
                                {theSeller?.email}
                                {/* emma@gmail.com */}
                            </p>
                            <button className="p-2 bg-green-500 text-white my-2 hover:bg-green-700 rounded-md w-[200px]">
                                {theSeller?.phone}
                                {/* 0791076354 */}
                            </button>
                        </div>
                        {/* user ads info */}
                        <div className="grid grid-cols-2 gap-4 mt-2 text-white">
                            <span>Total products:</span>
                            <span>{Ads.length}</span>
                            <span>Total Reviews:</span>
                            <span>{theSeller?.comment}</span>
                            <span>Total comments:</span>
                            <span>45</span>
                            <span>Date Joined:</span>
                            <span>22/7/2023</span>
                        </div>

                        {/* user contacts */}
                    </div>
                </div>
            </div>

            {/* seller's ads */}

            <div className="flex  lg:gap-5  py-3 flex-wrap  lg:px-4 justify-center lg:justify-normal">
                {isLoading ? (
                    // Show loading indicator or message
                    <div>
                        <Loader />
                    </div>
                ) : (
                    // Render products if not loading
                    Ads.map((product: ProductData) => (
                        <Productcard
                            key={product.productname}
                            image={` ${product.mainimage}`}
                            // image={product.image}
                            name={product.productname}
                            price={product.productprice}
                            id={product.producttid}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default SellersAdsComp;
