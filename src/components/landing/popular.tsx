import Productcard from '../Global/PopularCard';
// import { ProductData } from '../../interface/common';z

const Popular = ({ Ads }: any) => {
    // const dispatch = useDispatch<AppDispatch>();

    function formatPriceWithCommas(price: any) {
        if (price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return ''; // or any default value you prefer if price is undefined
    }

    return (
        <div className=" ">
            {/* <div className="py-1 flex flex-row items-center justify-between px-[10px] ">
                <h1 className="text-stone-500 px-2 my-2 font-bold underline capitalize ">
                    View all ads
                </h1>
                <button className="rounded-lg px-2 text-sm py-1 text-slate-500 my-2 font-bold ">
                    See all
                </button>
            </div> */}

            <div className="flex  gap-2 flex-wrap lg:gap-5 items-center justify-center lg:justify-normal">
                {Ads?.map((product: any) => (
                    <Productcard
                        key={product.product_data?.producttid}
                        image={product.product_data?.mainimage}
                        name={product.product_data?.productname}
                        price={formatPriceWithCommas(product?.product_data?.productprice)}
                        // seller={product?.user_name}
                        id={product?.product_data?.producttid}
                        // description={product?.product_data?.productdescription}
                    />
                ))}
            </div>
        </div>
    );
};

export default Popular;
