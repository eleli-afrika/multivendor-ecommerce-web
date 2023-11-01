import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchLoggedUsersProducts } from "../../Redux/slices/AdsSlice";
import { GettingUserById } from "../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../Redux/store";
import Loader from "../../constants/loader";
import { ProductData } from "../../interface/common";
import Productcard from "../Global/Productcard";

const AdsComp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, Ads } = useSelector((state: any) => state.AllAds);
  const user = useSelector((state: any) => state.auth.user);
  const id = user?.userid;

  useEffect(() => {
    dispatch(GettingUserById(id)).then((action) => {
      if (GettingUserById.fulfilled.match(action)) {
        console.log(user);
        dispatch(FetchLoggedUsersProducts(id));
      }
    });
  }, [dispatch, id]);

  // console.log(Ads);
 

return (
  <div className="flex flex-col ">
    {/* seller's ads */}
    <div>
      <div className="responsive">
        {isLoading ? (
          // Show loading indicator or message
          <div>
            <Loader />
          </div>
        ) : (
          // Render products if not loading
          Ads.length > 0 ? (
            Ads.map((product: ProductData) => (
              <Productcard
                key={product.producttid}
                image={`data:image/jpeg;base64, ${product.mainimage}`}
                name={product.productname}
                price={product.productprice}
                seller="John Doe"
                id={product.producttid}
              />
            ))
          ) : (
            // Display a message when there are no ads
            <p className="text-center"> You do not have any ads</p>
          )
        )}
      </div>
    </div>
  </div>
);

};

export default AdsComp;
