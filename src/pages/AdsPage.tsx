import { useSelector } from 'react-redux';
import Popular from '../components/landing/popular';
import Filters from '../constants/Filters';
import Loader from '../constants/loader';
import Search from '../assets/seatch.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdsPage = () => {
    const Ads = useSelector((state: any) => state.AllAds.SearchResults);
    const isLoading = useSelector((state: any) => state.AllAds.isLoading);
    const navigate = useNavigate();

    useEffect(() => {
        if (Ads && Ads.length > 0) {
            document.title = 'Search';
        } else {
            document.title = 'No results found!';
        }
    }, [Ads]);

    return (
        <div className="flex parent  max-w-[90rem] mx-auto mt-2">
            <div className="">
                {' '}
                <Filters Ads={Ads} />
            </div>
            <div className="flex-1 mx-auto  my-body px:0 md:px-3  ">
                <div className="px-[6px] md:px-0">
                    <div className="py-3 px-[20px]  flex flex-row items-center justify-between bg-gray-light my-3 rounded-t-[8px] ">
                        <h1 className="text-black-main my-2 font-bold">Search Results</h1>
                    </div>
                </div>
                {isLoading && <Loader />}
                {!isLoading && Ads?.length > 0 ? (
                    <Popular Ads={Ads} />
                ) : (
                    <div>
                        {!isLoading && (
                            <div className="flex items-center flex-col">
                                <img src={Search} alt="" className="h-[200px] w-[200px]" />
                                <p className="text-center text-[14px] text-black-main font-bold">
                                    Sorry 0 results found
                                </p>

                                <button
                                    className="px-[10px] py-4 mt-3 bg-primary-orange hover:bg-secondary-orange text-white rounded"
                                    onClick={() => navigate('/')}
                                >
                                    Back to homepage
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdsPage;
