import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({ image, name, price, id }: productCard) {
    const navigate = useNavigate();

    return (
        <div
            className="rounded-lg  bg-none radius-2xl w-full lg:w-[200px] h-[300px] lg:h-[300px] mb-2 duration-200 cursor-pointer hover:scale-95"
            onClick={() => navigate(`/ad_info/${id}`)}
        >
            <img
                className="w-full h-2/3 lg:h-3/5 object-cover"
                src={image}
                alt={name}
                style={{
                    borderTopRightRadius: '0.75rem',
                    borderTopLeftRadius: '0.75rem',
                }}
            />
            <div className="py-1 h-1/3 lg:h-2/5">
                <div className="flex flex-row justify-between text-md">
                    {/* <p className="text-green-dark truncate text-[14px] lg:text-md font-bold">
                        {seller}
                    </p> */}
                </div>
                <h1 className="text-[15px] text-black-main lg:text-md  capitalize line-clamp-2">
                    {name}
                </h1>
                {/* <p className="text-black-main text-[14px]  line-clamp-1 lowercase">{description}</p> */}
                <p className="text-black-main text-[18px] font-bold ">Ksh: {price}</p>

                {/* <button className="bg-primary-orange mt-2 w-full rounded-[15px] duration-300 hover:bg-secondary-orange hover:scale-105 text-white text-bold">
                    Inquire
                </button> */}
            </div>
        </div>
    );
}

export default Productcard;
