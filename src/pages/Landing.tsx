import Sidebar from "../constants/sidebar";
import ImageSlider from "../components/landing/slider";
import Popular from "../components/landing/popular";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../Redux/slices/AuthSlice";
// import Minslider from '../components/landing/minislider';
// import Sponsered from '../components/landing/Sponsered';

import {
  FetchProductsAsync,
  FetchSponsoredProductsAsync,
  FetchTopProductsAsync,
} from "../Redux/slices/AdsSlice";
import { AppDispatch } from "../Redux/store";
import { GetInquiries } from "../Redux/hooks/inquiry";
import CardHeader from "../components/Global/CardHeader";
import ProductLoader from "../components/Global/ProductLoader";

const Landing = () => {
  const userToken = useSelector((state: any) => state.auth.userToken);
  const dispatch = useDispatch<AppDispatch>();
  // const { Ads, SponseredAds, TopAds } = useSelector((state: any) => state.AllAds);
  const { Ads, isLoading } = useSelector((state: any) => state.AllAds);
  console.log(Ads);
  const [, setInquiry] = useState([]);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    document.title = "eCommerce";
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

  useEffect(() => {
    const fetch = async () => {
      const response = await GetInquiries();
      const data = response.data;
      const usersInquiries = data.filter(
        (item: any) => item.user === user?.userid
      );
      setInquiry(usersInquiries);
    };

    fetch();
  }, []);
  console.log(Ads);
  return (
    <div>
      <div className="bg-gray-light">
        <div className="flex parent ">
          <Sidebar />
          <div className="flex-1 mx-auto  my-body ">
            <ImageSlider />
          </div>
        </div>

        <div className="py-2 mt-2  max-w-7xl mx-auto ">
          <div className="mx-0 lg:mx:auto">
            {/* <CardHeader cardName="Top Ads" linkTitle={'See All'} link={'/top_ads'} />
                        <Minslider Ads={TopAds} />
                        <CardHeader
                            cardName="Sponsored Ads"
                            linkTitle={'See All'}
                            link={'/sponsored_ads'}
                        />
                        <Sponsered Ads={SponseredAds} /> */}
            <CardHeader
              cardName="All Ads Listing"
              linkTitle={"See All"}
              link={"/all_ads"}
            />
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {" "}
                <ProductLoader count={6} />
              </div>
            ) : (
              <Popular Ads={Ads} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
