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
        <div className="px-4  w-full overflow-hidden bg-white shadow-lg py-4 ">
            <div className="flex flex-wrap justify-center lg:justify-start -mx-2 ">
                {Ads?.map((product: any) => (
                    <Productcard
                        key={product.productname}
                        image={` ${product.mainimage}`}
                        name={formatPriceWithCommas(product.productname)}
                        price={product.productprice}
                        id={product.producttid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Popular;
