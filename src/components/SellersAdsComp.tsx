import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSellerProducts, setSearchResults } from '../Redux/slices/AdsSlice';
import { Link, useParams } from 'react-router-dom';
import { AppDispatch } from '../Redux/store';
import Loader from '../constants/loader';

import { GettingUserById } from '../Redux/slices/AuthSlice';
import { WhatsApp, Phone, Email } from '@mui/icons-material';
// import { products } from '../data/sponsered';
import Store from '../assets/store.avif';
import { Avatar } from '@mui/material';
import Filters from '../constants/Filters';
import Popular from './Global/SellersAds';

const SellersAdsComp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, Ads } = useSelector((state: any) => state.AllAds);
    const SearchResults = useSelector((state: any) => state.AllAds.SearchResults);
    console.log(`searchResults`, SearchResults);

    const theSeller = useSelector((state: any) => state.auth.theSeller);

    const { id } = useParams();

    useEffect(() => {
        dispatch(GettingUserById(id)).then((action) => {
            if (GettingUserById.fulfilled.match(action)) {
                console.log('the seller is :', theSeller);
                dispatch(FetchSellerProducts(id));
            }
        });
    }, []);

    useEffect(() => {
        dispatch(setSearchResults(Ads));
    }, [Ads, dispatch]);

    return (
        <div className="">
            <div className="px-4">
                <div className="   relative w-[100%] h-[60vh] md:h-[30vh] rounded-[8px]">
                    <img
                        src={Store}
                        alt=""
                        className="w-full h-full object-cover object-center rounded-[8px]"
                    />
                    <div className="p-5 bg-black bg-opacity-80 justify-center  border  sm:flex md:justify-around rounded-[4px] price absolute top-0 left-0 w-full h-full items-center">
                        {/* User Image and Join Date */}
                        <div className=" mb-4 sm:mb-0 flex flex-col justify-between">
                            <Avatar
                                src={` ${theSeller?.userimage}`}
                                // src={image}
                                className="w-[5rem] h-[5rem] object-cover mx-auto border border-primary-orange p-1"
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
                        <div className="flex flex-col items-center sm:items-start sm:pl-4 text-gray-300">
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
                        <div className=" text-white flex flex-col items-center">
                            <div className="flex gap-2">
                                <span>Total products:</span>
                                <span>{Ads.length}</span>
                            </div>

                            <div className="flex gap-2">
                                <span>Date Joined:</span>
                                <span>22/7/2023</span>
                            </div>
                        </div>

                        {/* user contacts */}
                    </div>
                </div>
            </div>

            {/* seller's ads */}

            <div className="flex max-w-[90rem] mx-auto my-5 ">
                <Filters Ads={SearchResults} />
                <div className="flex-1 mx-auto  my-body px:0 md:px-3 ">
                    <div className="px-[6px] md:px-0">
                        <div className="py-3 px-[20px]  flex flex-row items-center justify-between bg-gray-light my-3 rounded-t-[8px] ">
                            <h1 className="text-black-main my-2 font-bold capitalize">
                                Browse {theSeller?.firstname} Ads
                            </h1>
                        </div>
                    </div>
                    {isLoading && <Loader />}
                    {!isLoading && Ads?.length > 0 ? <Popular Ads={SearchResults} /> : <div></div>}
                </div>
            </div>
        </div>
    );
};

export default SellersAdsComp;
