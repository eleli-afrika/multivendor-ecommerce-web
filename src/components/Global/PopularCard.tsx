import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({ image, name, price, id }: productCard) {
    const navigate = useNavigate();
    return (
        <div className="w-[45vw] md:w-[230px]  rounded-xl p-0 lg:h-[300px] mb-2 cursor-pointer ">
            <div
                className="flex h-full flex-col max-w-sm rounded-xl bg-none md:bg-stone-50 radius-2xl  border-gray-300 mb-2  relative hover:scale-105 duration-300"
                onClick={() => navigate(`/ad_info/${id}`)}
            >
                <img
                    className=" w-full h-[55%] lg:h-3/5 lg:w-full object-cover object-center lg:object-cover border-none md:border border-red-500  "
                    src={image}
                    style={{
                        borderTopRightRadius: '0.75rem',
                        borderTopLeftRadius: '0.75rem',
                    }}
                />
                <div className=" py-2 lg:px-2 ">
                    <div className="flex flex-row justify-between text-md">
                        {/* <p className="text-green-dark truncate text-[15px] font-bold lg:text-md capitalize">
                            {seller}{' '}
                        </p> */}
                    </div>
                    <h1 className=" text-[15px] text-black-main lg:text-md  capitalize  line-clamp-3  ">
                        {name}
                    </h1>

                    <div className="flex flex-row items-center justify-start">
                        {/* <p className=" text-[14px] line-clamp-2 lowercase text-black-main">
                            {' '}
                            {description}{' '}
                        </p> */}
                    </div>
                    <p className=" text-[18px] font-bold text-black-main">Ksh: {price}</p>

                    {/* <button className="px-4 bg-orange-600 text-sm rounded-[0.25rem] text-white">
                        View
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default Productcard;
