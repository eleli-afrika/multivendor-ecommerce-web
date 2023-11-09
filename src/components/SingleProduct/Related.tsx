import { useSelector } from 'react-redux';
import Productcard from '../Global/RelatedCard';

const Related = () => {
    const Ads = useSelector((state: any) => state.AllAds.Ads);
    function formatPriceWithCommas(price: any) {
        if (price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return ''; // or any default value you prefer if price is undefined
    }
    return (
        <div className="lg:p-5 ">
            <div className="bg-green-700 bg-opacity-10 pb-2 ">
                <div className="py-3  flex flex-row items-center justify-between px-5 md:justify-center">
                    <h1 className="text-stone-700">You May also like</h1>
                    <button className="underline rounded-lg px-2 text-sm py-1 text-slate-500">
                        see all
                    </button>
                </div>

                <div className="flex lg:px-5 gap-3 lg:gap-10 px-2 flex-wrap ">
                    {Ads?.map((product: any) => (
                        <Productcard
                            key={product?.product_data.producttid}
                            image={`data:image/jpeg;base64, ${product?.product_data.mainimage}`}
                            name={product?.product_data.productname}
                            price={formatPriceWithCommas(product?.product_data.productprice)}
                            seller={product?.user_name}
                            id={product?.product_data.producttid}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Related;
