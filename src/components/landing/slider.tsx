import { useEffect, useState } from 'react';
import { Accordions } from '../../data/slider';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { FaQuestion, FaServicestack, FaRegMoneyBillAlt } from 'react-icons/fa';
import Logo from '../../assets/logo.png';

const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % Accordions.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + Accordions.length) % Accordions.length);
    };

    useEffect(() => {
        if (currentSlide === Accordions.length) {
            setCurrentSlide(0);
        }
    }, [Accordions, currentSlide]);

    useEffect(() => {
        let slider = setInterval(() => {
            setCurrentSlide(currentSlide + 1);
        }, 3000);
        return () => {
            clearInterval(slider);
        };
    }, [currentSlide]);

    return (
        <div className="flex px-2 gap-2 ">
            <div className="relative w-[100%]  rounded-[0.25rem] h-[20dvh] lg:h-[55dvh]">
                {Accordions.map((image, index) => (
                    <div
                        key={image.id}
                        className={`absolute transition-opacity  rounded-[0.25rem] w-full duration-500 bg-black ${
                            currentSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={image.img}
                            alt={`Image ${index + 1}`}
                            className="object-cover rounded-[0.25rem] w-[100%] p-0 m-0 h-[20vh] lg:h-[55vh]"
                        />
                        <div
                            className=" hidden lg:flex flex-col py-4 absolute top-0 left-0 text-white text-center 
              rounded-[20px] w-[90%] p-[1rem] "
                            style={{
                                position: 'absolute',
                                height: '50%',
                                width: '70%',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                            }}
                        >
                            <p>eCOMMERCE</p>
                            <p>
                                <i className="text-white">Let's help you sell </i>
                            </p>
                            <h2 className=" text-xl lg:text-2xl font-bold">{image.tagline}</h2>
                            {/* <button className="border-secondary-orange border-spacing-1 bg-secondary-orange rounded p-2 capitalize m-2 font-normal text-sm hover:bg-primary-orange cursor-pointer">
                                {image.navigate}
                            </button> */}
                        </div>
                    </div>
                ))}
                <div
                    className="flex items-center  justify-between px-3"
                    style={{ height: '100%', width: '100%' }}
                >
                    <IconButton
                        className=" prev"
                        onClick={prevSlide}
                        style={{ color: '#991b1b', backgroundColor: '#eee' }}
                    >
                        <ChevronLeft />
                    </IconButton>

                    {/* Next button */}
                    <IconButton
                        className=" next"
                        onClick={nextSlide}
                        style={{ color: '#991b1b', backgroundColor: '#eee' }}
                    >
                        <ChevronRight />
                    </IconButton>
                </div>
            </div>

            <div
                className="w-72 , rounded hidden md:block"
                style={{ height: '55dvh', backgroundColor: '#0a2540', fill: '#425466' }}
            >
                <div className="flex p-2 text-gray-500 gap-1  border-b-2 border-blue-950 shadow-custom ">
                    <button className=" p-2 border-2  border-white rounded-full h-12 w-12">
                        <FaQuestion className="text-gray-400 ml-1" />
                    </button>
                    <div>
                        <p className="uppercase">Help center</p>
                        <p className="text-sm">Guide to customer care</p>
                    </div>
                </div>
                <div className="flex p-2 text-gray-500 gap-1 border-b-2 border-blue-950 shadow-custom">
                    <button className=" p-2 border-2  border-white rounded-full h-12 w-12">
                        <FaServicestack className="text-gray-400 ml-1" />
                    </button>
                    <div>
                        <p className="uppercase">Our Services</p>
                        <p className="text-sm">Best Advertisement platform</p>
                    </div>
                </div>
                <div className="flex p-2 text-gray-500 gap-1 border-b-2 border-blue-950 shadow-custom">
                    <button className=" p-2 border-2  border-white rounded-full h-12 w-12">
                        <FaRegMoneyBillAlt className="text-gray-400 ml-1" />
                    </button>
                    <div>
                        <p className="uppercase">Make Money</p>
                        <p className="text-sm">Join over 5000 sellers</p>
                    </div>
                </div>
                <div className="p-2 ">
                    <img
                        src={Logo}
                        alt=""
                        className="bg-white w-full max-h-[8rem] mt-4 animate-bounce rounded object-cover object-center"
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
