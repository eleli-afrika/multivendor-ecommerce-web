import { useDispatch, useSelector } from 'react-redux';
import Popular from '../components/landing/popular';
import Filters from '../constants/Filters';
import Loader from '../constants/loader';
import { useEffect } from 'react';
import { AppDispatch } from '../Redux/store';
import { FetchTopProductsAsync, setSearchResults } from '../Redux/slices/AdsSlice';

const AllTopAds = () => {
    const Ads = useSelector((state: any) => state.AllAds.TopAds);
    const SearchResults = useSelector((state: any) => state.AllAds.SearchResults);
    const isLoading = useSelector((state: any) => state.AllAds.isLoading);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Fetch top products
        dispatch(FetchTopProductsAsync());
        document.title = 'View Top Ads';
    }, [dispatch]);

    useEffect(() => {
        dispatch(setSearchResults(Ads));
        document.title = Ads && Ads.length > 0 ? 'View Top Ads' : 'No results found!';
    }, [Ads, dispatch]);

    return (
        <div className="flex parent max-w-[90rem] mx-auto mt-2 ">
            <div className="">
                <Filters Ads={SearchResults} />
            </div>
            <div className="flex-1 mx-auto  my-body px:0 md:px-3 ">
                <div className="px-[6px] md:px-0">
                    <div className="py-3 px-[20px]  flex flex-row items-center justify-between bg-gray-light my-3 rounded-t-[8px] ">
                        <h1 className="text-black-main my-2 font-bold">Browse Top Ads</h1>
                    </div>
                </div>
                {isLoading && <Loader />}
                {!isLoading && Ads?.length > 0 ? <Popular Ads={SearchResults} /> : <div></div>}
            </div>
        </div>
    );
};

export default AllTopAds;
