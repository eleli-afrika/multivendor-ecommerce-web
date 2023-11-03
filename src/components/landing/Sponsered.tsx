// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { FetchProductsAsync } from '../../Redux/slices/AdsSlice';
// import Productcard from '../Global/Productcard';
import SponsereCard from '../Global/SponseredCard';
// import { ProductData } from '../../interface/common';
// import { AppDispatch } from '../../Redux/store';
import { products } from '../../data/sponsered';

// import Loader from '../../constants/loader';
const Popular = () => {
    // const Ads = useSelector((state: any) => state.AllAds.Ads);
    // const isLoading = useSelector((state: any) => state.AllAds.isLoading);
    // const dispatch = useDispatch<AppDispatch>();

    // useEffect(() => {
    //     dispatch(FetchProductsAsync());
    // }, [dispatch]);
    console.log(products);

    return (
        <div className="bg-stone-200 bg-opacity-10 mx-auto pb-2">
            <div className="py-3  flex flex-row items-center justify-between px-5 ">
                <h1 className="text-stone-500">Sponsered Ads</h1>
                <button className="underline rounded-lg px-2 text-sm py-1 text-slate-500">
                    see all
                </button>
            </div>

            <div className=" flex flex-row flex-wrap gap-5 mx-10">
                {products.map((product) => (
                    <SponsereCard
                        key={product.name}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        seller={product.seller}
                        id={product.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default Popular;
