import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({ image, name, price, seller, description, id }: productCard) {
    const navigate = useNavigate();
    return (
        <div className="w-[45vw] md:w-72  rounded-xl p-0 lg:h-[350px] mb-2 cursor-pointer">
            <div
                className="flex h-full flex-col max-w-sm rounded-xl bg-none md:bg-stone-50 radius-2xl  border-gray-300 mb-2  relative lg:hover:bg-green-100 hover:scale-105 duration-300"
                onClick={() => navigate(`/ad_info/${id}`)}
            >
                <img
                    className="rounded-xl w-full h-2/3 lg:h-3/5  object-contain lg-object-cover"
                    src={image}
                />
                <div className="px-3 py-2">
                    <div className="flex flex-row justify-between text-md">
                        <p className="text-green-400 truncate text-[12px] font-bold lg:text-md ">
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
