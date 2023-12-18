import { useSelector } from 'react-redux';
import Productcard from '../Global/PopularCard';

const Related = () => {
    const Ads = useSelector((state: any) => state.ad.similarAds);
    // console.log(Ads);

    function formatPriceWithCommas(price: any) {
        if (price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return ''; // or any default value you prefer if price is undefined
    }
    return (
        <div className="lg:p-5 ">
            <div className="pb-2  bg-gray-light ">
                <div className="py-3  flex flex-row items-center justify-between px-5 md:justify-center">
                    <h1 className="text-stone-700">You may also like</h1>
                    {/* <button className="underline rounded-lg px-2 text-sm py-1 text-slate-500">
                      
                    </button> */}
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-normal">
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
