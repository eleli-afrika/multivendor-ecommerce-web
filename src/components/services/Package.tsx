
import { sliderContent } from '../../data/package';

import { useNavigate } from 'react-router-dom';

const Package = () => {
    const navigate = useNavigate();

    return (
        <section className="m-2 bg-gray-light" style={{ borderRadius: '0.24rem' }}>
            <div className=" w-full px-2 py-4 ">
                <h2 className="text-3xl md:text-2xl lg:text-2xl font-bold mb-6 text-gray-600 text-center">
                    Packages
                </h2>
                <div className=" flex  justify-center items-center gap-5 text-sm flex-wrap">
                    {sliderContent.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full w-[360px] "
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
                            <div className="text-center mb-4">
                                {' '}
                                {/* Pushes buttons to the bottom */}
                                <button
                                    className="bg-primary-orange text-white py-2 px-4 rounded-md hover:bg-secondary-orange transition-colors duration-300 w-full mx-10"
                                    onClick={() => {
                                        navigate(item.button);
                                    }}
                                >
                                    Get started
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Add more event cards as needed */}
                </div>
                {/* small screens */}
            </div>
        </section>
    );
};

export default Package;
