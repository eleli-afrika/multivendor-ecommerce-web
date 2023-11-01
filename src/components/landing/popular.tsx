import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchProductsAsync } from "../../Redux/slices/AdsSlice";
import Productcard from "../Global/Productcard";
import { ProductData } from "../../interface/common";
import { AppDispatch } from "../../Redux/store";

import Loader from "../../constants/loader";
const Popular = () => {
  const Ads = useSelector((state: any) => state.AllAds.Ads);
  const isLoading = useSelector((state: any) => state.AllAds.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(FetchProductsAsync());
  }, [dispatch]);

  return (
    <div className="">
      <div className="py-3  flex flex-row items-center justify-between px-5">
        <h1 className="text-stone-500">Popular Ads</h1>
        <button className="underline rounded-lg px-2 text-sm py-1 text-slate-500">
          see all
        </button>
      </div>

      <div className="responsive">
        {isLoading ? (
          // Show loading indicator or message
          <div>
            <Loader />
          </div>
        ) : (
          // Render products if not loading
          Ads.map((product: ProductData) => (
            <Productcard
              key={product.producttid}
              image={`data:image/jpeg;base64, ${product.mainimage}`}
              name={product.productname}
              price={product.productprice}
              seller="John Doe"
              id={product.producttid}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Popular;
