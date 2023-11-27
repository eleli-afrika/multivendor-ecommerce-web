import { useRef, useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Productcard from '../Global/Productcard';
// import { products } from '../../data/sponsered';

function AnotherSlider({ Ads }: any) {
    // console.log(Ads);
    // const isLoading = useSelector((state: any) => state.AllAds.isLoading);

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

    const sliderWidth = window.innerWidth < 640 ? window.innerWidth / 2 : 220;

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
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clonedAds.length);
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

    const clonedAds = Ads?.length ? Array(200).fill(Ads).flat() : [];

    const sliderStyle: React.CSSProperties = {
        display: 'flex',
        transition: 'transform 0.7s ease',
        transform: `translateX(-${currentIndex * sliderWidth}px)`,
        width: `${clonedAds.length * sliderWidth}px`,
    };

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
                    className="w-full h-full overflow-hidden scroll-smooth scrollbar-hidden  bg-gray-light lg:bg-none"
                    style={{
                        display: 'flex',
                        overflowX: 'hidden',
                        position: 'relative',
                    }}
                >
                    <div style={sliderStyle} className="">
                        {clonedAds.map((item, index) => (
                            <div
                                key={index}
                                className=" p-[5px] lg:p-4 lg:gap-5 "
                                style={{ width: `${sliderWidth}px` }}
                            >
                                <Productcard
                                    key={item.product_data?.productid}
                                    image={` ${item?.product_data?.mainimage}`}
                                    name={item?.product_data?.productname}
                                    price={formatPriceWithCommas(item?.product_data?.productprice)}
                                    id={item?.product_data?.producttid}
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
