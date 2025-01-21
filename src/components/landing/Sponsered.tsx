/* eslint-disable @typescript-eslint/no-explicit-any */
import SponsereCard from "../Global/SponseredCard";
import { useSelector } from "react-redux";
import Loader from "../../constants/loader";

const Popular = ({ Ads }: any) => {
  const isLoading = useSelector((state: any) => state.AllAds.isLoading);

  function formatPriceWithCommas(price: any) {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  }

  if (isLoading) {
    return (
      <div className="h-[50vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-4  w-full overflow-hidden bg-white shadow-lg py-4 rounded-b-[8px]">
      <div className="flex flex-wrap justify-center lg:justify-start md:-mx-2  -mx-[5px] ">
        {Ads?.slice(0, 6).map((product: any) => (
          <SponsereCard
            key={product?.producttid}
            image={`${product?.mainimage}`}
            name={product?.productname}
            price={formatPriceWithCommas(product?.productprice)}
            id={product?.producttid}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
