import { useDispatch, useSelector } from 'react-redux';
import Popular from '../components/landing/popular';
import Filters from '../constants/Filters';
import Loader from '../constants/loader';
import { useEffect } from 'react';
import { FetchSponsoredProductsAsync } from '../Redux/slices/AdsSlice';
import { AppDispatch } from '../Redux/store';

const AllAds = () => {
    const Ads = useSelector((state: any) => state.AllAds.SponseredAds);
    const isLoading = useSelector((state: any) => state.AllAds.isLoading);
    const dispatch = useDispatch<AppDispatch>();
    console.log(Ads);

    useEffect(() => {
        if (Ads && Ads.length > 0) {
            document.title = 'Ads Listings';
        } else {
            document.title = 'No results found!';
        }
    }, [Ads]);

    useEffect(() => {
        dispatch(FetchSponsoredProductsAsync());
    }, []);

    return (
        <div className="flex parent ">
            <div className="h-screen">
                {' '}
                <Filters Ads={Ads} />
            </div>
            <div className="flex-1 mx-auto  my-body  px-[2px] lg:px-5">
                <h2 className="p-[20px]">All Ads</h2>
                {isLoading && <Loader />}
                {!isLoading && Ads?.length > 0 ? <Popular Ads={Ads} /> : <div></div>}
            </div>
        </div>
    );
};

export default AllAds;
