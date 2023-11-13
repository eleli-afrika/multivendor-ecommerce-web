import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';
// import { FaFacebook, FaPhone, FaWhatsapp } from 'react-icons/fa';

function Productcard({ image, name, price, seller, description, id }: productCard) {
    const navigate = useNavigate();
    return (
        <div className="relative w-[45vw] md:w-72 lg:h-[350px]  p-0 h-[300px] mb-2 cursor-pointer  rounded-lg radius-2xl ">
            <div className="absolute top-0 right-[5px] lg:left-0 z-10 ">
                <button className="bg-blue-800 text-[8px] px-[3px] py-[1px] lg:text-[10px] text-white lg:px-3 lg:py-1 rounded ">
                    Sponsored
                </button>
            </div>
            <div
                className="flex h-full flex-col lg:flex-col rounded-lg radius-2xl sm:bg-[white] border-gray-300 mb-2  relative  lg:hover:bg-green-100 hover:scale-105 duration-300"
                onClick={() => navigate(`/ad_info/${id}`)}
            >
                <img
                    className="rounded-xl w-full h-2/3 lg:h-3/5 lg:w-full object-cover object-center lg:object-cover"
                    src={image}
                />
                <div className="px-3 py-0 lg:py-2">
                    <div className="flex flex-row justify-between text-md">
                        <p className="text-green-400 truncate text-[12px] font-bold lg:text-md capitalize">
                            {seller}{' '}
                        </p>
                    </div>
                    <h1 className=" text-[12px] text-stone-400 lg:text-md font-bold uppercase ">
                        {name}
                    </h1>
                    <div className="flex flex-row items-center justify-start">
                        <p className="text-slate-400 text-[14px] line-clamp-2 lowercase ">
                            {' '}
                            {description}{' '}
                        </p>
                    </div>
                    <p className="text-stone-500 text-[18px] font-bold">Ksh: {price}</p>
                </div>
            </div>
        </div>
    );
}

export default Productcard;
