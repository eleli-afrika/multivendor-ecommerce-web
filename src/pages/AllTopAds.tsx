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
    }, [dispatch]);

    useEffect(() => {
        dispatch(setSearchResults(Ads));
        document.title = Ads && Ads.length > 0 ? 'View Top Ads' : 'No results found!';
    }, [Ads, dispatch]);

    return (
        <div className="flex parent ">
            <div className="h-screen">
                <Filters Ads={SearchResults} />
            </div>
            <div className="flex-1 mx-auto  my-body ">
                <h2 className="p-[20px]">Top Ads</h2>
                {isLoading && <Loader />}
                {!isLoading && Ads?.length > 0 ? <Popular Ads={SearchResults} /> : <div></div>}
            </div>
        </div>
    );
};

export default AllTopAds;
