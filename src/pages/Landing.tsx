import Sidebar from '../constants/sidebar';
import ImageSlider from '../components/landing/slider';
import Popular from '../components/landing/popular';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '../Redux/slices/AuthSlice';
import Minslider from '../components/landing/minislider';
import Sponsered from '../components/landing/Sponsered';
import {
    FetchProductsAsync,
    FetchSponsoredProductsAsync,
    FetchTopProductsAsync,
} from '../Redux/slices/AdsSlice';
import { AppDispatch } from '../Redux/store';

import CardHeader from '../components/Global/CardHeader';

const Landing = () => {
    const userToken = useSelector((state: any) => state.auth.userToken);
    const dispatch = useDispatch<AppDispatch>();
    const { Ads, SponseredAds, TopAds } = useSelector((state: any) => state.AllAds);

    useEffect(() => {
        document.title = 'eDuka';
    }, []);
    useEffect(() => {
        dispatch(getLoggedInUser());
    }, [dispatch]);

    const getUser = async () => {
        dispatch(getLoggedInUser());
    };

    // fetch products
    useEffect(() => {
        dispatch(FetchProductsAsync());
    }, []);

    useEffect(() => {
        dispatch(FetchTopProductsAsync());
    }, []);

    useEffect(() => {
        dispatch(FetchSponsoredProductsAsync());
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
                        <Minslider Ads={TopAds} />
                        <CardHeader
                            cardName="Sponsored Ads"
                            linkTitle={'See All'}
                            link={'/sponsored_ads'}
                        />
                        <Sponsered Ads={SponseredAds} />
                        <CardHeader
                            cardName="All Ads Listing"
                            linkTitle={'See All'}
                            link={'/all_ads'}
                        />
                        <Popular Ads={Ads} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
