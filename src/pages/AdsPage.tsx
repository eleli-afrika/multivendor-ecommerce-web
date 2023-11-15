import { useSelector } from 'react-redux';
import Popular from '../components/landing/popular';
import Filters from '../constants/Filters';
import Loader from '../constants/loader';

const AdsPage = () => {
    const Ads = useSelector((state: any) => state.AllAds.SearchResults);
    const isLoading = useSelector((state: any) => state.AllAds.isLoading);
    console.log(`Hello view my ads`, Ads);
    return (
        <div className="flex parent ">
            <Filters Ads={Ads} />
            <div className="flex-1 mx-auto  my-body p-5">
                {isLoading && <Loader />}
                {Ads?.length > 0 ? (
                    <Popular Ads={Ads} />
                ) : (
                    <p className="text-center">Sorry 0 results found</p>
                )}
            </div>
        </div>
    );
};

export default AdsPage;
