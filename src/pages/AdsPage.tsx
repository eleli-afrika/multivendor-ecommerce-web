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
        <div className="flex parent ">
            <div className="h-screen">
                {' '}
                <Filters Ads={Ads} />
            </div>
            <div className="flex-1 mx-auto  my-body ">
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
