import { useDispatch, useSelector } from 'react-redux';
import Popular from '../components/landing/Sponsered';
import Filters from '../constants/Filters';
import Loader from '../constants/loader';
import { useEffect } from 'react';
import { FetchSponsoredProductsAsync, setSearchResults } from '../Redux/slices/AdsSlice';
import { AppDispatch } from '../Redux/store';

const AllSponsoredAds = () => {
    const Ads = useSelector((state: any) => state.AllAds.SponseredAds);
    const isLoading = useSelector((state: any) => state.AllAds.isLoading);
    const SearchResults = useSelector((state: any) => state.AllAds.SearchResults);
    const dispatch = useDispatch<AppDispatch>();
    console.log(Ads);

    useEffect(() => {
        dispatch(setSearchResults(Ads));
        if (Ads && Ads.length > 0) {
            document.title = 'View Sponsered Ads';
        } else {
            document.title = 'No results found!';
        }
    }, [Ads, dispatch]);

    useEffect(() => {
        dispatch(FetchSponsoredProductsAsync());
    }, []);

    return (
        <div className="flex parent ">
            <div className="h-screen">
                {' '}
                <Filters Ads={SearchResults} />
            </div>
            <div className="flex-1 mx-auto  my-body  px-[2px] lg:px-5">
                <h2 className="p-[20px]">Sponsored Ads</h2>
                {isLoading && <Loader />}
                {!isLoading && Ads?.length > 0 ? <Popular Ads={SearchResults} /> : <div></div>}
            </div>
        </div>
    );
};

export default AllSponsoredAds;
