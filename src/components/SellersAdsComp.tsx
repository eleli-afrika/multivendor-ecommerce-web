import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchSellerProducts } from "../Redux/slices/AdsSlice";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../Redux/store";
import Productcard from "./Global/Productcard";
import Loader from "../constants/loader";
import { ProductData } from "../interface/common";
import { GettingUserById } from "../Redux/slices/AuthSlice";
import { Avatar } from "antd";
import { WhatsApp, Facebook, YouTube, Phone } from "@mui/icons-material";

const SellersAdsComp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, Ads } = useSelector((state: any) => state.AllAds);
  const theSeller = useSelector((state: any) => state.auth.theSeller);
  const { id } = useParams();

  useEffect(() => {
    dispatch(GettingUserById(id)).then((action) => {
      if (GettingUserById.fulfilled.match(action)) {
        console.log(theSeller);
        dispatch(FetchSellerProducts(id));
      }
    });
  }, [dispatch, id]);

  return (
    <div className="flex flex-col ">
      <div className="p-5 m-5 border rounded-lg sm:flex md:justify-around price ">
        {/* User Image and Join Date */}
        <div className=" mb-4 sm:mb-0">
          <Avatar
            src={`data:image/jpeg;base64, ${theSeller?.userimage}`}
            className="w-24 h-24 object-cover mx-auto"
          />
          <p className="text-gray-700">
            Joined Eduka:{" "}
            <span className="text-gray-500 underline font-bold">
              {theSeller?.CreatedAt
                ? new Date(theSeller?.CreatedAt).toLocaleDateString()
                : "Date Not Available"}
            </span>
          </p>
        </div>

        {/* User Information */}
        <div className="flex flex-col sm:items-start sm:pl-4">
          <p className="mb-2">
            Name:{" "}
            <span className="capitalize font-bold text-secondary-orange">
              {`${theSeller?.firstname} ${theSeller?.middlename} ${theSeller?.lastname}`}
            </span>
          </p>
          <p className="mb-2">Email: {theSeller?.email}</p>
          <button className="p-2 bg-green-500 text-white my-2 hover:bg-green-700 rounded-md">
            {theSeller?.phone}
          </button>
          <div className="flex mt-2 space-x-2">
            <button className="p-2 bg-gray-200 rounded-full">
              <WhatsApp className="text-green-500" />
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <Facebook className="text-blue-500" />
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <YouTube className="text-red-500" />
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <Phone />
            </button>
          </div>
        </div>
      </div>

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
          )}
        </div>
      </div>
    </div>
  );
};

export default SellersAdsComp;
