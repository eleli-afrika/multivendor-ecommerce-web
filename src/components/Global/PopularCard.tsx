import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({ image, name, price, id }: productCard) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center mt-4">
            <div
                className="flex flex-col rounded-[8px] bg-gray-light border-gray-300 relative hover:scale-105 duration-300 w-full h-full cursor-pointer "
                onClick={() => navigate(`/ad_info/${id}`)}
            >
                <img
                    className="w-full h-40 lg:h-48 object-cover rounded-t-[8px]"
                    src={image}
                    alt={name}
                    // loading="lazy"
                />
                <div className="p-2">
                    <h1 className="text-[15px] text-black-main lg:text-md capitalize h-[40px] line-clamp-2 leading-tight overflow-y-hidden">
                        {name}
                    </h1>
                    <p className="text-[15px] font-semibold text-black-main mt-2">Ksh: {price}</p>
                </div>
            </div>
        </div>
    );
}

export default Productcard;
