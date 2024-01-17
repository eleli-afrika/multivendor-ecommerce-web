import { useSelector } from "react-redux";
import Productcard from "../Global/PopularCard";

const Related = () => {
  const Ads = useSelector((state: any) => state.ad.similarAds);
  // console.log(Ads);

  function formatPriceWithCommas(price: any) {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return ""; // or any default value you prefer if price is undefined
  }
  return (
    <div className="py-2 mt-2  max-w-7xl mx-auto ">
      <div className="py-3 px-[20px]  flex flex-row items-center justify-between bg-gray-light my-3 rounded-t-[8px] ">
        <h1 className="text-black-main my-2 font-bold">You May also Like</h1>
      </div>
      <div className="pb-2  bg-white px-[5px] shadow-lg">
        <div className="flex flex-wrap justify-center lg:justify-start -mx-2">
          {Ads?.map((product: any) => (
            <>
              <Productcard
                key={product.producttid}
                image={`${product?.mainimage}`}
                name={product?.productname}
                price={formatPriceWithCommas(product?.productprice)}
                // seller={product?.user_name}
                id={product?.producttid}
                // description={product?.product_data?.productdescription}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Related;
