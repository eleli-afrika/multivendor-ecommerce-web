import { useRef, useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Productcard from '../Global/Productcard';
import { products } from '../../data/sponsered';

function AnotherSlider() {
    const Ads = products;
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();

    const sliderWidth = 300; // Assuming each card is 300px wide
    const totalAds = Ads.length;

    const slideLeft = () => {
        // Add a delay in milliseconds
        const delay = 500; // Adjust this value as needed

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

            // Set the max index value
            const maxIndex = totalAds * 2;

            // Calculate the adjusted index to maintain continuous scrolling
            const adjustedIndex = nextIndex % maxIndex;

            // Update the index

            if (nextIndex == Ads.length) nextIndex = 0;
            return nextIndex;
        });
    };

    const autoSlide = () => {
        slideRight();
    };

    useEffect(() => {
        const id = setInterval(autoSlide, 7000);
        setIntervalId(id);

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [currentIndex]); // Update based on currentIndex

    const clonedAds = Ads.length ? [...Ads, ...Ads, ...Ads, ...Ads, ...Ads, ...Ads] : [];

    const sliderStyle: React.CSSProperties = {
        display: 'flex',
        transition: 'transform 0.7s ease',
        transform: `translateX(-${currentIndex * sliderWidth}px)`,
        width: `${clonedAds.length * sliderWidth}px`,
    };

    return (
        <div className="flex mt-5">
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
                            className="p-4 gap-3 responsive"
                            style={{ width: `${sliderWidth}px` }}
                        >
                            <Productcard
                                key={item.name}
                                image={item.image}
                                name={item?.name}
                                price={item.price}
                                seller={item.seller}
                                id={item.name}
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
    );
}

export default AnotherSlider;
