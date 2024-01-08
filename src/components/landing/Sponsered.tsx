// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { FetchProductsAsync } from '../../Redux/slices/AdsSlice';
// import Productcard from '../Global/Productcard';
import SponsereCard from '../Global/SponseredCard';
// import { ProductData } from '../../interface/common';
// import { AppDispatch } from '../../Redux/store';
// import { products } from '../../data/sponsered';
import { useSelector } from 'react-redux';
// import { ProductData } from '../../interface/common';
import Loader from '../../constants/loader';
// import { useNavigate } from 'react-router-dom';
// import { FaFacebook, FaPhone, FaWhatsapp } from 'react-icons/fa';

// import Loader from '../../constants/loader';
const Popular = ({ Ads }: any) => {
    const isLoading = useSelector((state: any) => state.AllAds.isLoading);
    // const navigate = useNavigate();

    // console.log(products);

    function formatPriceWithCommas(price: any) {
        if (price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return ''; // or any default value you prefer if price is undefined
    }

    if (isLoading) {
        return (
            <div className="h-[50vh]">
                {' '}
                <Loader />
            </div>
        );
    }
    return (
        <div className="mt-3">
            {/* <div className="py-3 px-[20px]  flex flex-row items-center justify-between ">
                <h1 className="text-stone-500 my-2 font-bold">Sponsored Ads</h1>
                <button
                    className="underline rounded-lg px-2 text-sm py-1 text-slate-500 my-2 font-bold"
                    onClick={() => navigate('/sponsored_ads')}
                >
                    See all
                </button>
            </div> */}

            <div className="flex  gap-4 flex-wrap lg:gap-5 items-center justify-center lg:justify-normal">
                {Ads?.map((product: any) => (
                    <SponsereCard
                        key={product.product_data?.producttid}
                        image={`${product.product_data?.mainimage}`}
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
