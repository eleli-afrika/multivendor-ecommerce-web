// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { FetchProductsAsync } from '../../Redux/slices/AdsSlice';
// import Productcard from '../Global/Productcard';
import SponsereCard from '../Global/SponseredCard';
// import { ProductData } from '../../interface/common';
// import { AppDispatch } from '../../Redux/store';
// import { products } from '../../data/sponsered';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FetchProductsAsync } from '../../Redux/slices/AdsSlice';
import { AppDispatch } from '../../Redux/store';
// import { ProductData } from '../../interface/common';
import Loader from '../../constants/loader';
// import { FaFacebook, FaPhone, FaWhatsapp } from 'react-icons/fa';

// import Loader from '../../constants/loader';
const Popular = () => {
    const Ads = useSelector((state: any) => state.AllAds.Ads);
    const isLoading = useSelector((state: any) => state.AllAds.isLoading);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(FetchProductsAsync());
    }, [dispatch]);
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
        <div className=" bg-opacity-10 mx-auto pb-2 ">
            <div className="py-3  flex flex-row items-center justify-between px-5 flex-wrap ">
                <h1 className="text-stone-500">Sponsored Ads</h1>
                <button className="underline rounded-lg px-2 text-sm py-1 text-slate-500">
                    see all
                </button>
            </div>

            <div className="flex flex-wrap gap-3 px-2 lg:px-10 lg:gap-5">
                {Ads?.map((product: any) => (
                    <SponsereCard
                        key={product.product_data.producttid}
                        image={`data:image/jpeg;base64, ${product.product_data.mainimage}`}
                        name={product.product_data.productname}
                        price={formatPriceWithCommas(product?.product_data.productprice)}
                        seller={product?.user_name}
                        id={product?.product_data.producttid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Popular;
