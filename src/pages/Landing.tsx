import Sidebar from '../constants/sidebar';
import ImageSlider from '../components/landing/slider';
import Popular from '../components/landing/popular';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '../Redux/slices/AuthSlice';
import Minslider from '../components/landing/minislider';
import Sponsered from '../components/landing/Sponsered';
import { FetchProductsAsync } from '../Redux/slices/AdsSlice';
import { AppDispatch } from '../Redux/store';

const Landing = () => {
    const userToken = useSelector((state: any) => state.auth.userToken);
    const dispatch = useDispatch<AppDispatch>();
    const Ads = useSelector((state: any) => state.AllAds.Ads);

    useEffect(() => {
        document.title = 'eDuka';
    }, []);

    const getUser = async () => {
        dispatch(getLoggedInUser());
    };
    useEffect(() => {
        dispatch(FetchProductsAsync());
    }, []);

    useEffect(() => {
        if (userToken) {
            getUser();
        }
    }, []);
    return (
        <div>
            <div className="">
                <div className="flex parent ">
                    <Sidebar />
                    <div className="flex-1 mx-auto  my-body ">
                        <ImageSlider />
                    </div>
                </div>

                <div className="parent px-0 lg:px-5">
                    <div className="mx-0 lg:mx:auto">
                        <Minslider Ads={Ads} />
                        <Sponsered Ads={Ads} />
                        <Popular Ads={Ads} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
