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
    <div className="px-4 my-3 w-full overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 w-full">
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
