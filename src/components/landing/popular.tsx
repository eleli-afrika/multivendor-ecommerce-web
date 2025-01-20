/* eslint-disable @typescript-eslint/no-explicit-any */
import Productcard from "../Global/PopularCard";

const Popular = ({ Ads }: any) => {
  function formatPriceWithCommas(price: any) {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  }

  return (
    <div className="px-4 w-full overflow-hidden bg-white shadow-lg py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {Ads?.map((product: any) => (
          <Productcard
            key={product?.producttid}
            image={product?.mainimage}
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
