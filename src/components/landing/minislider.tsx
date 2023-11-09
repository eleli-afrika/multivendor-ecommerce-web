import { useRef, useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Productcard from '../Global/Productcard';
// import { products } from '../../data/sponsered';
import { useSelector, useDispatch } from 'react-redux';
import { FetchProductsAsync } from '../../Redux/slices/AdsSlice';
import { AppDispatch } from '../../Redux/store';

function AnotherSlider() {
    const Ads = useSelector((state: any) => state.AllAds.Ads);
    // console.log(Ads);
    // const isLoading = useSelector((state: any) => state.AllAds.isLoading);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(FetchProductsAsync());
    }, [dispatch]);

    function formatPriceWithCommas(price: any) {
        if (price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return ''; // or any default value you prefer if price is undefined
    }

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [intervalId, setIntervalId] = useState<number | undefined>();
    // const userId = '8522c53e-6473-472d-bb09-49095097c1ba';

    const sliderWidth = 220; // Assuming each card is 300px wide
    const totalAds = Ads?.length;

    const slideLeft = () => {
        // Add a delay in milliseconds
        const delay = 0; // Adjust this value as needed

        // Set a timeout to delay the sliding action
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + totalAds) % totalAds);
        }, delay);
    };

    // const slideRight = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % totalAds);
    // };

    const slideRight = () => {
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + 1;

            // If the next index exceeds the total number of ads, reset it to 0
            if (nextIndex === clonedAds.length) {
                nextIndex = 0;
            }
            return nextIndex;
        });
    };

    const autoSlide = () => {
        if (currentIndex === clonedAds.length - 1) {
            setCurrentIndex(0); // Reset back to the beginning
        } else {
            slideRight(); // Move to the next slide
        }
    };

    useEffect(() => {
        const id = setInterval(autoSlide, 5000);
        setIntervalId(id);

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [currentIndex]); // Update based on currentIndex

    const clonedAds = Ads?.length ? Array(50).fill(Ads).flat() : [];

    const sliderStyle: React.CSSProperties = {
        display: 'flex',
        transition: 'transform 0.7s ease',
        transform: `translateX(-${currentIndex * sliderWidth}px)`,
        width: `${clonedAds.length * sliderWidth}px`,
    };
    // if (isLoading) {
    //     return (
    //         <div className="">
    //             <Loader />
    //         </div>
    //     );
    // }

    return (
        <>
            <h1 className="mt-2 lg:mt-5 px-2 text-stone-500 lg:px-7 text-md capitalize">
                top products
            </h1>
            <div className="">
                <MdChevronLeft
                    className="opacity-50 top-0 cursor-pointer hover:opacity-100 absolute"
                    onClick={slideLeft}
                    size={20}
                />
                <div
                    ref={sliderRef}
                    className="w-full h-full overflow-hidden whitespace-nowrap scroll-smooth scrollbar-hide"
                    style={{
                        display: 'flex',
                        overflowX: 'hidden',
                        position: 'relative',
                    }}
                >
                    <div style={sliderStyle}>
                        {clonedAds.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 lg:gap-3 "
                                style={{ width: `${sliderWidth}px` }}
                            >
                                <Productcard
                                    key={item.product_data.productid}
                                    image={` ${item?.product_data.mainimage}`}
                                    name={item?.product_data.productname}
                                    price={formatPriceWithCommas(item?.product_data.productprice)}
                                    seller={item?.user_name}
                                    id={item?.product_data.producttid}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <MdChevronRight
                    className="opacity-50 top-0 cursor-pointer hover:opacity-100 absolute"
                    onClick={slideRight}
                    size={20}
                />
            </div>
        </>
    );
}

export default AnotherSlider;
