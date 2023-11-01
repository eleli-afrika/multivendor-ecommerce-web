import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import {
  FetchProduct,
  FetchProductImages,
  FetchProductSeller,
} from "../../Redux/slices/adSlice";
import {
  Facebook,
  Favorite,
  Phone,
  Reviews,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import { Avatar } from "antd";
import { Rating } from "@mui/material";
import { AppDispatch } from "../../Redux/store";
import Loader from "../../constants/loader";

const ProductInfo = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();

  const { ad, adImages, seller, isLoading } = useSelector(
    (state: any) => state.ad
  );

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {
    dispatch(FetchProduct(id));
    dispatch(FetchProductImages(id));
    dispatch(FetchProductSeller(id));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-5 p-5 bg-gray-light mb-10 h-auto">
      {/* Part 1 */}
      <div className="md:flex-1">
        <div>
          <h2 className="text-center text-2xl capitalize font-bold">
            {ad?.productname}
          </h2>
          <div className="flex flex-col gap-2 md:flex-row md:gap-5">
            <span>Posted on: 22 April 2023</span>
            <span>
              Category: <i className="text-primary-orange">{ad?.category}</i>
            </span>
            <span>
              Brand: <i className="text-primary-orange">{ad?.brand}</i>{" "}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-5">
          {/* Images */}
          <div className="md:flex-1">
            <div className="flex flex-col gap-4">
              <div>
                <img
                  src={`data:image/jpeg;base64, ${adImages[selectedImageIndex]}`}
                  className="main w-full"
                  alt=""
                />
              </div>
              <div className="flex gap-4">
                {adImages.map((image: any, index: number) => (
                  <img
                    key={index}
                    src={`data:image/jpeg;base64, ${image}`}
                    className={
                      "h-16 w-16 object-cover rounded-md bg-gray-100 cursor-pointer" +
                      (index === selectedImageIndex
                        ? " border-2 border-secondary-orange"
                        : "")
                    }
                    alt=""
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border border-gray-300 p-2 m-2 rounded">
            <h1> Description:</h1>
            <p className="text-gray-600">{ad?.productdescription}</p>
          </div>
        </div>
        <div className="border border-gray-300 p-2 m-2 rounded">
          <h1> Location:</h1>
          <p className="text-gray-600">Nairobi Area</p>
        </div>

        <div className="flex gap-5 items-center">
          <div>
            <Favorite className="text-secondary-orange font-bold  animate-pulse" />
            <span className="text-gray-500">20</span>
          </div>

          <div>
            <Reviews className="text-primary-orange font-bold " />
            <span className="text-gray-500">20</span>
          </div>
          <div>
            <Rating className="text-secondary-orange font-bold  " />
            <span></span>
          </div>
        </div>
      </div>

      {/* Part 2 */}
      <div className="md:flex-1 p-4">
        <div className="w-full bg-white h-32  price text-center flex flex-col rounded">
          <h2>Price:</h2>
          <p className="text-2xl font-bold text-secondary-orange">
            {" "}
            Ksh {ad?.productprice}
          </p>
          <button className="bg-black-200 text-white px-10 py-2 mt-4 rounded hover:text-black-200 hover:bg-white transition-colors delay-300">
            Fixed Price
          </button>
        </div>

        <div
          className="flex flex-col md:flex-row gap-2 p-4 mt-2 rounded"
          style={{ backgroundColor: "#0c2e4e" }}
        >
          <div className="text-white flex flex-col md:flex-1">
            <h1 className="font-bold">Make Inquiry</h1>
            <p className="text-gray-400">
              Send your message to the seller for a quick reply
            </p>
          </div>
          <div className="right md:flex-1">
            <form>
              <input
                type="text"
                className="h-10 rounded px-4 mb-2 shadow-custom w-full"
                placeholder="Please Enter your Name"
              />
              <input
                type="text"
                className="h-10 rounded px-4 mb-2 shadow-custom w-full"
                placeholder="Please Enter your Email"
              />
              <input
                type="text"
                className="h-10 rounded px-4 mb-2 shadow-custom w-full"
                placeholder="Enter your phone"
              />
              <button className="bg-black-200 text-white px-10 py-2 mt-4 rounded hover:text-black-200 hover:bg-white transition-colors delay-300">
                Inquire
              </button>
            </form>
          </div>
        </div>

        <div className="mt-2 rounded" style={{ height: "auto" }}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="   price" style={{ borderRadius: "0.25rem" }}>
              <h1 className="text-center py-4 mb-2 bg-orange-700 rounded-tl rounded-tr  text-white font-bold">
                Posted By
              </h1>
              {/* <hr
                className=""
                style={{ borderColor: "#0c2e4e", margin: "0" }}
              /> */}

              <div className="sm:flex md:justify-around  gap-4 px-5">
                <div className="text-center">
                  <Avatar
                    src={`data:image/jpeg;base64, ${seller.seller_image}`}
                    className="h-24 w-24 "
                  />
                </div>
                <div>
                  <div className="text-gray-600 ">
                    <p className="capitalize text-center">
                      Name: {seller.seller_name}
                    </p>
                    <p className="text-center">
                      Phone:{seller.seller_phonenumber}{" "}
                    </p>
                    <p className="text-center">Email:{seller.seller_email} </p>
                    <div className="text-center p-2">
                      <button
                        className="bg-black-200 text-white px-10 py-2 mt-4 rounded hover:text-black-200 hover:bg-white transition-colors delay-300"
                        onClick={() =>
                          navigate(`/seller/store/${ad.userid}`, {
                            state: { user: seller },
                          })
                        }
                      >
                        View Shop
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4 p-5 text-center">
                <button className="p-2 rounded-full bg-gray-200">
                  <WhatsApp className="text-green-500" />
                </button>
                <button className="p-2 rounded-full bg-gray-200">
                  <Facebook className="text-blue-500" />
                </button>
                <button className="p-2 rounded-full bg-gray-200">
                  <YouTube className="text-red-500" />
                </button>
                <button className="p-2 rounded-full bg-gray-200">
                  <Phone />
                </button>
              </div>
            </div>
            <div className="bg-gray-200 p-6 rounded shadow-custom md:flex-1">
              <h1 className="font-bold">Safety tips</h1>
              <ol className=" text-gray-600">
                <li className="list-decimal">Meet seller in Public</li>
                <li className="list-decimal">Avoid cash Transactions</li>
                <li className="list-decimal">Be Keen on unrealistic offers</li>
                <li className="list-decimal">Inspect Product Before payment</li>
                <li className="list-decimal">Ask Questions</li>
              </ol>
              <button className="bg-red-600 text-white px-10 py-2 mt-4 rounded hover:text-black-200 hover-bg-white transition-colors delay-300">
                Report Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
