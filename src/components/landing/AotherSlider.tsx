import { useRef, useEffect, useState } from 'react';
import { Categories } from '../../data/categories';

import { Category } from '@mui/icons-material';
import Cart from '../../assets/shopping.jpg';

function AnotherSlider() {
    const sliderRef = useRef<HTMLDivElement | null>(null); // Explicitly specify the type
    const [currentIndex, setCurrentIndex] = useState(0);


    const slideRight = () => {
        const slider = sliderRef.current;
        if (slider) {
            const firstChild = slider.firstElementChild as HTMLElement;
            const itemWidth = firstChild.offsetWidth + 24; // Adjust 16 to match your margin or padding
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Categories.length);
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

    const clonedCategories = [...Categories, ...Categories, ...Categories];

    return (
        <>
            <h1 className="my-2 px-2 text-stone-500 capitalize text-sm lg:hidden">
                browse by categories
            </h1>
            <div className="relative flex items-center mt-3 px-2">
                <div
                    ref={sliderRef}
                    className="relative w-full h-full overflow-hidden whitespace-nowrap scroll-smooth scrollbar-hide rounded"
                    style={{
                        display: 'flex',
                    }}
                >
                    {clonedCategories.map((item, index) => (
                        <div
                            key={index}
                            className="cursor-pointer relative text-gray-400 rounded duration-300 gap-3 w-40 text-center"
                            style={{
                                flex: '0 0 auto',
                                margin: '0 8px', // Add margin
                                display:
                                    index >= currentIndex &&
                                    index < currentIndex + Categories.length
                                        ? 'block'
                                        : 'none',
                            }}
                        >
                            <img
                                src={Cart} // Replace this with your cart image
                                alt="Cart"
                                className="w-full h-full rounded" // Adjust image size
                            />
                            <div className="absolute rounded top-0 left-0 w-full h-full bg-black bg-opacity-70 hover:bg-opacity-40 duration-300">
                                <Category />
                                <p className="text-sm truncate text-white">{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AnotherSlider;
