import { useDispatch, useSelector } from 'react-redux';
import Popular from '../components/landing/popular';
import Filters from '../constants/Filters';
import Loader from '../constants/loader';
import { useEffect } from 'react';
import { AppDispatch } from '../Redux/store';
import { FetchTopProductsAsync } from '../Redux/slices/AdsSlice';

const AllTopAds = () => {
    const Ads = useSelector((state: any) => state.AllAds.TopAds);
    const isLoading = useSelector((state: any) => state.AllAds.isLoading);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(FetchTopProductsAsync());
    }, []);

    useEffect(() => {
        if (Ads && Ads.length > 0) {
            document.title = 'View Top Ads';
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
                <h2 className="p-[20px]">Top Ads</h2>
                {isLoading && <Loader />}
                {!isLoading && Ads?.length > 0 ? <Popular Ads={Ads} /> : <div></div>}
            </div>
        </div>
    );
};

export default AllTopAds;
