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
    // console.log(id);
    // console.log(user);

    useEffect(() => {
        dispatch(FetchLoggedUsersProducts(id));
        // console.log(id);
    }, [dispatch, id]);

    const filteredAds = Ads?.filter((product: ProductData) => !product.isapproved);
    console.log(filteredAds);

    return (
        <div className=" ">
            <div className=" ">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {/* <div className="flex px-2 gap-3 flex-wrap lg:gap-5"> */}
                    {isLoading ? (
                        <div>
                            <Loader />
                        </div>
                    ) : filteredAds?.length > 0 ? (
                        filteredAds?.map((product: ProductData) => (
                            <Productcard
                                key={product.producttid}
                                image={`${product.mainimage}`}
                                name={product.productname}
                                price={product.productprice}
                                // seller={`${user.firstname} ${user.lastname}`}
                                id={product.producttid}
                                // description={product.productdescription}
                            />
                        ))
                    ) : (
                        <p className="text-center"> You do not have any pending ads</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdsComp;
