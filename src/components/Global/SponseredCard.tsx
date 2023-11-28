import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({ image, name, price, id }: productCard) {
    const navigate = useNavigate();

    return (
        <div className="relative w-[45vw] md:w-[280px] h-[200px] lg:h-[280px] p-0 cursor-pointer rounded-lg">
            <div className="absolute top-0 right-[5px] lg:left-0 z-10">
                <button className="bg-secondary-orange text-[10px] px-[3px] py-[1px] lg:text-[10px] text-white lg:px-3 lg:py-1 rounded hover:bg-primary-orange">
                    Sponsored
                </button>
            </div>
            <div
                className="flex h-full flex-col lg:flex-col rounded-lg sm:bg-[white] border-gray-300 relative hover:scale-105 duration-300"
                onClick={() => navigate(`/ad_info/${id}`)}
            >
                <img
                    className="w-full h-[55%] lg:h-3/5 lg:w-full object-cover object-center lg:object-cover border-none md:border border-red-500"
                    src={image}
                    style={{
                        borderTopRightRadius: '0.75rem',
                        borderTopLeftRadius: '0.75rem',
                    }}
                />
                <div className=" flex flex-col justify-between py-2 lg:p-2">
                    <div className="flex flex-row justify-between text-md">
                        {/* <p className="text-green-dark truncate text-[15px] font-bold lg:text-md capitalize">
                            {seller}{' '}
                        </p> */}
                    </div>
                    <div>
                        <h1 className="text-[15px] text-black-main lg:text-md capitalize h-[40px] line-clamp-2 leading-tight overflow-y-hidden">
                            {name}
                        </h1>
                        {/* <p className="text-[14px] line-clamp-3 lowercase text-black-main">
                            {' '}
                            {description}{' '}
                        </p> */}
                    </div>
                    <p className="text-[18px] font-bold text-black-main mt-2">Ksh: {price}</p>
                </div>
            </div>
        </div>
    );
}

export default Productcard;
