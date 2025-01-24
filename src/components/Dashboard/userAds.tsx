import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchLoggedUsersProducts } from '../../Redux/slices/AdsSlice';
import { AppDispatch } from '../../Redux/store';
import Loader from '../../constants/loader';
import { ProductData } from '../../interface/common';
import Productcard from '../Global/RelatedCard';

const AdsComp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, Ads } = useSelector((state: any) => state.AllAds);
    const user = useSelector((state: any) => state.auth.user);
    const id = user?.userid;
    

    useEffect(() => {
        dispatch(FetchLoggedUsersProducts(id));
        
    }, [dispatch, id]);


    return (
        <div className=" ">
            <div className=" ">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {isLoading ? (
                        <div>
                            <Loader />
                        </div>
                    ) : Ads?.length > 0 ? (
                        Ads?.map((product: ProductData) => (
                            <Productcard
                                key={product.producttid}
                                image={`${product.mainimage}`}
                                name={product.productname}
                                price={product.productprice}
                               
                                id={product.producttid}
                               
                            />
                        ))
                    ) : (
                        <p className="text-center"> You do not have any ads</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdsComp;
