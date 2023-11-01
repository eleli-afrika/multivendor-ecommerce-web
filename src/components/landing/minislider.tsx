import { useRef, useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { setLoader } from "../../Redux/slices/LoaderSlice";
import { FetchProducts } from "../../Redux/hooks/Ads.actions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAds } from "../../Redux/slices/AdsSlice";
import Productcard from "../Global/Productcard";

function AnotherSlider() {
  const Ads = useSelector((state: any) => state.AllAds.Ads);
  const dispatch = useDispatch();
  const sliderRef = useRef<HTMLDivElement | null>(null); // Explicitly specify the type
  const [currentIndex, setCurrentIndex] = useState(0);

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await FetchProducts();
      dispatch(setLoader(false));
      dispatch(setAds(response.Data));
    } catch (error: any) {
      dispatch(setLoader(false));
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  const slideLeft = () => {
    const slider = sliderRef.current;
    if (slider) {
      const firstChild = slider.firstElementChild as HTMLElement;
      const itemWidth = firstChild.offsetWidth + 16; // Adjust 16 to match your margin or padding
      setCurrentIndex((prevIndex) => (prevIndex - 1 + Ads.length) % Ads.length);
      slider.scrollLeft -= itemWidth;
    }
  };

  const slideRight = () => {
    const slider = sliderRef.current;
    if (slider) {
      const firstChild = slider.firstElementChild as HTMLElement;
      const itemWidth = firstChild.offsetWidth + 16; // Adjust 16 to match your margin or padding
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Ads.length);
      slider.scrollLeft += itemWidth;
    }
  };

  const autoSlide = () => {
    slideRight();
  };

  useEffect(() => {
    // Automatically slide every 2 seconds
    const intervalId = setInterval(autoSlide, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Clone Ads to create the effect of an infinite loop
  const clonedAds = [...Ads, ...Ads, ...Ads];

  return (
    <div className="relative flex items-center mt-10">
      <MdChevronLeft
        className="opacity-50 cursor-pointer hover:opacity-100 hidden"
        onClick={slideLeft}
        size={40}
      />
      <div
        ref={sliderRef}
        className="w-full h-full overflow-hidden whitespace-nowrap scroll-smooth scrollbar-hide"
        style={{
          display: "flex",
          overflowX: "hidden", // Hide overflow of card elements
        }}
      >
        {clonedAds.map((item, index) => (
          <div
            key={index}
            className="p-4 gap-3 responsive"
            style={{
              display:
                index >= currentIndex && index < currentIndex + Ads.length
                  ? "block"
                  : "none",
            }}
          >
            <div className="w-[300px]">
              <Productcard
                key={item.producttid}
                image={`data:image/jpeg;base64, ${item.mainimage}`}
                name={item?.productname}
                price={item.productprice}
                seller="John Doe"
                id={item.producttid}
              />
            </div>
          </div>
        ))}
      </div>
      <MdChevronRight
        className="opacity-50 cursor-pointer hover:opacity-100"
        onClick={slideRight}
        size={40}
      />
    </div>
  );
}

export default AnotherSlider;
