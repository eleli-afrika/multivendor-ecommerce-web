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
    <div className="px-4  w-full overflow-hidden bg-white shadow-lg">
      <div className="flex flex-wrap justify-center lg:justify-start md:-mx-2  -mx-[4px]">
        {Ads?.slice(0, 6).map((product: any) => (
          <SponsereCard
            key={product.product_data?.producttid}
            image={`${product.product_data?.mainimage}`}
            name={product.product_data?.productname}
            price={formatPriceWithCommas(product?.product_data?.productprice)}
            id={product?.product_data?.producttid}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
