import { useRef, useState, useEffect } from 'react';
// import Photo from '../../assets/M-PESA.jpeg';
import { sliderContent } from '../../data/package';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Package = () => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [intervalId, setIntervalId] = useState<number | undefined>();
    const navigate = useNavigate();

    const sliderWidth = 300; //

    const slideLeft = () => {
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex - 1;

            if (nextIndex < 0) nextIndex = sliderContent.length - 1;
            return nextIndex;
        });
    };

    const slideRight = () => {
        setCurrentIndex((currentIndex + 1) % sliderContent.length);
    };

    useEffect(() => {
        if (currentIndex === sliderContent.length) {
            setCurrentIndex(0);
        }
    }, []);

    const autoSlide = () => {
        slideRight();
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

    const clonedAds = sliderContent.length ? [...sliderContent, ...sliderContent] : [];

    const sliderStyle: React.CSSProperties = {
        display: 'flex',
        transition: 'transform 0.7s ease',
        transform: `translateX(-${currentIndex * sliderWidth}px)`,
        width: `${clonedAds.length * sliderWidth}px`,
    };

    return (
        <section className="m-2 bg-gray-light" style={{ borderRadius: '0.24rem' }}>
            <div className="max-w-6xl mx-auto w-full px-2 py-4">
                <h2 className="text-3xl md:text-2xl lg:text-2xl font-bold mb-6 text-gray-600 text-center">
                    Packages
                </h2>
                <div className="grid gap-6 lg:grid-cols-4 text-sm">
                    {sliderContent.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg overflow-hidden shadow-lg hidden lg:flex flex-col h-full"
                        >
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt="Sample Musician"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 bg-gray-800 p-4">
                                    <h3 className="text-white text-xl font-semibold mb-2">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-6 flex-grow">
                                {item.features.map((feature, index) => (
                                    <ul className="" key={index}>
                                        <li>{feature}</li>
                                    </ul>
                                ))}
                            </div>
                            <div className="p-6 mt-auto">
                                {' '}
                                {/* Pushes buttons to the bottom */}
                                <button
                                    className="bg-primary-orange text-white py-2 px-4 rounded-md hover:bg-secondary-orange transition-colors duration-300"
                                    onClick={() => {
                                        navigate(item.button);
                                    }}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Add more event cards as needed */}
                </div>
                {/* small screens */}
                <div
                    ref={sliderRef}
                    className="w-full h-full overflow-hidden whitespace-nowrap scroll-smooth scrollbar-hidden rounded-[0.25rem] "
                    style={{
                        display: '',
                        overflowX: 'hidden',
                        position: 'relative',
                    }}
                >
                    <ChevronLeft
                        onClick={slideLeft}
                        className="absolute cursor-pointer text-white left-[-5] top-[52%] transform -translate-y-[60%] z-50 bg-primary-orange rounded-full"
                        style={{ fontSize: '24px' }}
                    />
                    <ChevronRight
                        onClick={slideRight}
                        className="absolute cursor-pointer text-white right-3 top-[52%] transform -translate-y-[60%] z-50  bg-primary-orange  rounded-full"
                        style={{ fontSize: '24px' }}
                    />
                    <div
                        style={sliderStyle}
                        className=" flex gap-2 rounded-[0.25rem]  lg:hidden md:hidden overflow-x-hidden "
                    >
                        {clonedAds.map((item, index) => (
                            <div
                                key={index}
                                className=" gap-4 bg-white price block lg:hidden"
                                style={{ width: `${sliderWidth}px` }}
                            >
                                <div className="relative ">
                                    <img
                                        src={item.image}
                                        alt="Sample Musician"
                                        className="w-full h-48 object-cover rounded-t-[0.25rem]"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 bg-gray-800 p-4">
                                        <h3 className="text-white text-xl font-semibold mb-2">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-6 flex-grow">
                                    {item.features.map((feature, index) => (
                                        <ul className="" key={index}>
                                            <li>{feature}</li>
                                        </ul>
                                    ))}
                                </div>
                                <div className="p-6 mt-auto">
                                    {' '}
                                    {/* Pushes buttons to the bottom */}
                                    <button
                                        className="bg-primary-orange text-white py-2 px-4 rounded-md hover:bg-secondary-orange transition-colors duration-300 "
                                        onClick={() => {
                                            navigate(item.button);
                                        }}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* Add more event cards as needed */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Package;
