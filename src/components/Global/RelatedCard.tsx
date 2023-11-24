import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({ image, name, price, id }: productCard) {
    const navigate = useNavigate();
    return (
        <div className="w-[45vw] md:w-72  rounded-xl p-0 lg:h-[350px] mb-2 cursor-pointer ">
            <div
                className="flex h-full flex-col max-w-sm rounded-xl bg-none  radius-2xl   mb-2  relative hover:scale-105 duration-300"
                onClick={() => navigate(`/ad_info/${id}`)}
            >
                <img
                    className="rounded-xl w-full h-2/3 lg:h-3/5  object-contain lg-object-cover"
                    src={image}
                    style={{
                        borderTopRightRadius: '0.75rem',
                        borderTopLeftRadius: '0.75rem',
                    }}
                />
                <div className=" py-2">
                    <div className="flex flex-row justify-between text-md">
                        {/* <p className="text-green-400 truncate text-[12px] font-bold lg:text-md ">
                            {seller}{' '}
                        </p> */}
                    </div>
                    <h1 className=" text-[15px] text-black-main lg:text-md  capitalize  line-clamp-3 ">
                        {name}
                    </h1>
                    <div className="flex flex-row items-center justify-start">
                        {/* <p className=" text-[14px] line-clamp-2 lowercase text-black-main">
                            {' '}
                            {description}{' '}
                        </p> */}
                    </div>
                    <p className=" text-[18px] font-bold text-black-main">Ksh: {price}</p>
                </div>
            </div>
        </div>
    );
}

export default Productcard;
