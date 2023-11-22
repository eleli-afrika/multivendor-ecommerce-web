import Productcard from '../Global/PopularCard';
// import { ProductData } from '../../interface/common';

const Popular = ({ Ads }: any) => {
    // const dispatch = useDispatch<AppDispatch>();

    function formatPriceWithCommas(price: any) {
        if (price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return ''; // or any default value you prefer if price is undefined
    }

    return (
        <div className="mt-10">
            <div className="py-3  flex flex-row items-center justify-between ">
                <h1 className="text-stone-500 px-2">Suggested Ads</h1>
                <button className="underline rounded-lg px-2 text-sm py-1 text-slate-500">
                    see all
                </button>
            </div>

            <div className="flex px-2 gap-3 flex-wrap lg:gap-5">
                {Ads?.map((product: any) => (
                    <Productcard
                        key={product.product_data?.producttid}
                        image={product.product_data?.mainimage}
                        name={product.product_data?.productname}
                        price={formatPriceWithCommas(product?.product_data?.productprice)}
                        seller={product?.user_name}
                        id={product?.product_data?.producttid}
                        description={product?.product_data?.productdescription}
                    />
                ))}
            </div>
        </div>
    );
};

export default Popular;
